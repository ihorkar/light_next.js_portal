import React, { useRef, useEffect, useState, useCallback, ChangeEvent } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/navigation";
import API from "@/utils/api/api";
import DefaultButton from "../ui/buttons/DefaultButton";
import Modal from "../ui/modal/Modal";
import DefaultInput from "../ui/elements/DefaultInput";
import Notiflix from "notiflix";
import IconButton from "../ui/buttons/IconButton";
import { DocumentMinusIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";

const ItemTypes = {
  CARD: "card"
};
export interface MovableItemProps {
  name: string;
  index: number;
  currentFormPageName: string;
  moveCardHandler: (dragIndex: number, hoverIndex: number, currentFormPageName: string) => void
  setItems: any
}

const MovableItem = ({
  name,
  index,
  currentFormPageName,
  moveCardHandler,
  setItems
}: MovableItemProps) => {

  const changeItemFormPage = (currentItem: any, formPageName: any) => {  // renamed function
    setItems((prevState: any) => {
      return prevState.map((e: any) => {
        return {
          ...e,
          name: e.element.name === currentItem.name ? formPageName : e.name
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex, item.currentFormPageName);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      index,
      name,
      currentFormPageName,  // renamed from currentColumnName
      type: ItemTypes.CARD
    },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      changeItemFormPage(item, dropResult.name);  // renamed function
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {name}
    </div>
  );
};

interface FormPageType {
  children: any;
  className: string;
  title: string;
  onDelete: (name: string) => void;
}

const FormPage = ({ children, className, title, onDelete }: FormPageType) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div 
      key={title} 
      ref={drop} 
      className={`overflow-hidden rounded-xl border border-borderdefault mb-4 ${isOver ? 'bg-actionsecondaryhovered' : ''}`}
    >
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm font-medium leading-6 text-gray-900">{title}</div>
        <div className="relative ml-auto">
          <IconButton
            label="Delete Page"
            icon={<DocumentMinusIcon className="h-5 w-5" />}
            onClick={() => onDelete(title)}
            type='default'
            visible={() => true}
          />
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex flex-col justify-between gap-x-4 py-3">
          {children}
        </div>
      </dl>
    </div>
  );
};


const InitialList = ({ children, className, title, onAddNewPage }: { children: any, className: string, title: string, onAddNewPage: () => void }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div ref={drop} className={`overflow-hidden rounded-xl border border-borderdefault mb-4 ${isOver ? 'bg-actionsecondaryhovered' : ''} ${className}`}>
      <div className="flex justify-between items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm font-medium leading-6 text-gray-900">{title}</div>
        <IconButton
          label="Add New Page"
          icon={<DocumentPlusIcon className="h-5 w-5" />}
          onClick={onAddNewPage}
          type="success"
          visible={() => true}
        />
      </div>
      {children}
    </div>
  );
};


export interface DataBlocks {
  column: string;
  datablock: DataBlocks;
}[]

export const FormPagesDropzone = (
  params: {
    organisationId: string,
    formId: string
  }) => {
  const [dataBlocks, setDatablocks] = useState<any[]>([])
  const [pages, setPages] = useState<any[]>([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [pageName, setPageName] = useState("");
  const formEl = useRef<HTMLFormElement>(null);

  const router = useRouter();

  useEffect(() => {
    initializeDropZone()
  }, [])

  const initializeDropZone = async () => {
    let datablocks: any[] = [];
    let pagelist: any[] = [];

    const form = await API.getOrganisationFormByID(params.organisationId, params.formId);

    // Determine current pages are in the form
    let pages: any[] = []

    if (form.data.form) pages = form.data.form.pages;

    setPages(pages)

    // Create a set of datablock names that are already on pages.
    const existingDatablockNames = new Set();
    pages?.forEach((page: any) => {
      page.elements.forEach((element: any) => {
        existingDatablockNames.add(element.name);
      });
    });

    // Create the initial list with all datablocks.
    const formDataBlocks = await API.getDatablockFromForm(params.organisationId, params.formId);
    formDataBlocks.data.forEach((block: any) => {
      if (!existingDatablockNames.has(block.datablock.name)) {
        datablocks.push({ name: "initialList", element: block.datablock });
      }
    });

    // Create the pagelist with datablocks that are on pages.
    pages?.forEach((page: any) => {
      page.elements.forEach((element: any) => {
        pagelist.push({ name: page.name, element: element });
      });
    });

    // Combine pagelist with datablocks.
    setDatablocks([...datablocks, ...pagelist]);
  };

  const moveCardHandler = (dragIndex: number, hoverIndex: number, currentFormPageName: string) => {
    let filteredDataBlocks = dataBlocks.filter(block => block.name === currentFormPageName)
    const dragItem = filteredDataBlocks[dragIndex];
    if (dragItem) {
      setDatablocks((prevState: any) => {
        const copiedStateArray = [...prevState].filter(block => block.name === currentFormPageName);
        const restArray = [...prevState].filter(block => block.name !== currentFormPageName);
        const [removed] = copiedStateArray.splice(dragIndex, 1);
        copiedStateArray.splice(hoverIndex, 0, removed);
        const resultArray = [...restArray, ...copiedStateArray];
        return resultArray;
      });
    }
  };

  const returnItemsForFormPage = (FormPageName: string, dataBlocks: any[]) => {
    return dataBlocks?.filter((item: any) => item.name === FormPageName)
      .map((item: any, index: number) => (
        <div key={index} className="p-1 m-1 border border-gray-900">
          <MovableItem
            key={item._id}
            name={item.element.name}
            currentFormPageName={item.name}
            setItems={setDatablocks}
            index={index}
            moveCardHandler={moveCardHandler}
          />
        </div>
      ));
  };

  const handleDeletePage = (pageName: string) => {
    // Remove the page from the list of pages
    setPages((prevPages) => prevPages.filter((page) => page.name !== pageName));

    // Move all data elements of the deleted page back to the initial list
    setDatablocks((prevDataBlocks) =>
      prevDataBlocks.map((item) =>
        item.name === pageName ? { ...item, name: 'initialList' } : item
      )
    );
  };

  const handleChangeProjectInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value)
  }, [])

  const addNewPage = () => {
    if (!formEl.current?.reportValidity()) return;
    let existedPage = pages.filter((page: any) => page.name === pageName)

    if (existedPage.length === 0) {
      setPages(prevState => [...prevState, { name: pageName }])
      setVisibleModal(false)
    } else {
      alert("The page already exists!")
    }
  }

  const getDataList = () => {
    let dataList: any[] = []

    dataBlocks.forEach((item: any) => {
      if (item.name !== "initialList") {
        const existingItem = dataList.find((newItem: any) => newItem.name === item.name);

        if (existingItem) {
          existingItem.elements.push(item.element)
        } else {
          dataList.push({
            name: item.name,
            elements: [item.element]
          })
        }
      }
    })

    return dataList
  }

  const handleOnClickNextBtn = async () => {
    const initialData = dataBlocks.filter((item: any) => item.name === "initialList");

    if (initialData.length !== 0) {
      Notiflix.Notify.failure("Not all datablocks have been assigned to a page.")
    } else {
      let data = getDataList()
      await API.setOrganisationFormByID(params.organisationId, params.formId, data)
        .then(response => {
          if (response.status === 201) router.push(`/${params.organisationId}/campaign/${params.formId}/review`)
        })
    }
  }

  return (
    <div className="container mx-auto">
      <Modal
        visible={visibleModal}
        onOkClick={addNewPage}
        onCancelClick={() => setVisibleModal(false)}
        title="Add New Page"
        type="secondary"
        ok_text="Add"
        cancel_text="Cancel"
      >
        <form ref={formEl}>
          <DefaultInput
            name="New Page"
            title="New page"
            id="newPage"
            autoComplete="Page Name"
            placeholder="Page Name"
            onChange={handleChangeProjectInput}
            required
          />
        </form>
      </Modal>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-8">
          <InitialList
            title="initialList"
            className="w-1/3"
            onAddNewPage={() => setVisibleModal(true)}
          >
            {returnItemsForFormPage("initialList", dataBlocks)}
          </InitialList>

          <div className="w-2/3">
            {
              pages?.length > 0 && pages?.map((page, index) => (
                <FormPage
                  key={`formPage${index}`}
                  title={page.name}
                  className="mb-4"
                  onDelete={handleDeletePage}
                >
                  {returnItemsForFormPage(page.name, dataBlocks)}
                </FormPage>
              ))
            }
          </div>
        </div>
      </DndProvider>
      <div className="flex justify-end mt-4">
        <DefaultButton
          label="Next"
          onClick={handleOnClickNextBtn}
        />
      </div>
    </div>
  );

};
