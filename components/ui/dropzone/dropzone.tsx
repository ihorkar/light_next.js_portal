import React, { useRef, useEffect, useState, useCallback, ChangeEvent } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/navigation";
import API from "@/utils/api/api";
import DefaultButton from "../buttons/DefaultButton";
import Modal from "../modal/Modal";
import DefaultInput from "../elements/DefaultInput";

const ItemTypes = {
  CARD: "card"
};
export interface MovableItemProps {
  name: string;
  index: number;
  currentColumnName: string;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  setItems: any
}

const MovableItem = ({
    name,
    index,
    currentColumnName,
    moveCardHandler,
    setItems
  }: MovableItemProps) => {
    const changeItemColumn = (currentItem: any, columnName:any) => {
      setItems((prevState: any) => {
        return prevState.map((e: any) => {
          return {
            ...e,
            name: e.element.name === currentItem.name ? columnName : e.name
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
        moveCardHandler(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.CARD,
      item: { 
        index, name, currentColumnName, type: ItemTypes.CARD 
      },
      end: (item, monitor) => {
        const dropResult: any = monitor.getDropResult();
        changeItemColumn(item, dropResult.name)
      },
      collect: (monitor: any ) => ({
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

interface ColumnType {
  children: any;
  className: string;
  title: string;
}

const Column = ({children, className, title }: ColumnType) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const getBackgroundColor = () => {
    if (isOver) {
      return "rgb(188,251,255)";
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p className="text-center bg-[#55CB64]">{title}</p>
      {children}
    </div>
  );
};

export interface DataBlocks {
  column: string;
  datablock: DataBlocks;
}[]

export const DropZone = (
  params: { 
      organisationId: string,
      formId: string
  }) => {
  const [ dataBlocks, setDatablocks ] = useState<any[]>([])
  const [ pages, setPages ] = useState<any[]>([])
  const [ visibleModal, setVisibleModal ] = useState(false)
  const [ pageName, setPageName ] = useState("");
  const formEl = useRef<HTMLFormElement>(null);
  
  const router = useRouter();

  useEffect(() => {
    initializeDropZone()
  }, [])

  const initializeDropZone = async () => {
    let datablocks: any[] = [];
    let pagelist: any[] = [];

    const form = await API.getOrganisationFormByID(params.organisationId, params.formId);
    const pages = form.data.form.pages;
    setPages(pages)
    
    pages.map((page: any) => {
      page.elements.map((element: any) => {
        pagelist.push({name: page.name, element: element})
      })
    })

    const formDataBlocks = await API.getDatablockFromForm(params.organisationId, params.formId);

    formDataBlocks.data.map((block: any, blockIndex: number) => {
      datablocks.push({name: "initialList", element: block.datablock})
      pagelist.map((page: any) => {
        if(page.element.name === block.datablock.name) datablocks.splice(blockIndex-1, 1)
      })
    })

    pagelist.map((page: any) => {
      datablocks.push(page)
    })
    setDatablocks(datablocks)
  }

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    //@ts-ignore
    const dragItem = dataBlocks[dragIndex];

    if (dragItem) {
      setDatablocks((prevState: any) => {
        const coppiedStateArray = [...prevState];

        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: string, dataBlocks: any[]) => {
    return dataBlocks?.filter((item: any) => item.name === columnName)
      .map((item: any, index: number) => (
        <div key={index} className="p-1 m-1 border border-gray-900">
          <MovableItem
            key={item._id}
            name={item.element.name}
            currentColumnName={item.element.name}
            setItems={setDatablocks}
            index={index}
            moveCardHandler={moveCardHandler}
          />
        </div>
      ));
  };

  const handleChangeProjectInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value)
  }, [pageName])

  const addNewPage = () => {
    if(!formEl.current?.reportValidity()) return;
    const existedPage = pages.filter((page: any) => {page.name === pageName})
    
    if(!existedPage) {
      setPages(prevState => [...prevState, {name: pageName}])
      setVisibleModal(false)
    } else {
      alert("The page already exists!")
    }
  }

  const getDataList = () => {
    let dataList: any[] = []

    dataBlocks.forEach((item: any) => {
      if(item.name !== "initialList") {
        const existingItem = dataList.find((newItem: any) => newItem.name === item.name);
  
        if(existingItem) {
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
    let data = getDataList()
    console.log(data)
    await API.setOrganisationFormByID(params.organisationId, params.formId, data)
    .then(response => {
      if(response.status === 201) router.push(`/${params.organisationId}/campaign/${params.formId}/review`)
    })
  }

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-[44rem] overflow-y-scroll mt-4">
          <Column title="initialList" className="w-1/4 border rounded p-3 h-full">
            {returnItemsForColumn("initialList", dataBlocks)}
          </Column>
          <div className="w-3/4 border rounded p-3">
            {
              pages?.length > 0 && pages?.map((page, index) => <Column key={`column${index}`} title={page.name} className="h-48 border m-1">{returnItemsForColumn(page.name, dataBlocks)}</Column>)
            }
            <div className="flex justify-end mt-3">
              <DefaultButton
                label="Add New Page"
                onClick={() => setVisibleModal(true)}
              />
              <Modal
                visible={visibleModal}
                onOkClick={addNewPage}
                onCancelClick={() => setVisibleModal(false)}
                title="Add New Page"
                ok_text="Add"
                cancel_text="Cancle"
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
            </div>
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
