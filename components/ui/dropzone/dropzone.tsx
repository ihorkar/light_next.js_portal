import React, { useRef, useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import API from "@/utils/api/api";
import DefaultButton from "../buttons/DefaultButton";
import Modal from "../modal/Modal";

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
            column: e.datablock.name === currentItem.name ? columnName : e.column
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

  useEffect(() => {
    initializeDropZone()
  }, [])

  const initializeDropZone = async () => {
    let datablocks: any[] = [];

    const form = await API.getOrganisationFormByID(params.organisationId, params.formId);
    const pages = form.data.form.pages;
    setPages(pages)
    const formDataBlocks = await API.getDatablockFromForm(params.organisationId, params.formId);
    formDataBlocks.data.map((block: any, blockIndex: number) => {
      datablocks.push({column: "initialList", datablock: block})
      pages.map((page: any) => {
        page.elements.map((element: any) => {
          if(block.datablock.name === element.name){
            datablocks[blockIndex] = {column: page.name, datablock: block}
          }
        })
      })
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
    return dataBlocks?.filter((item: any) => item.column === columnName)
      .map((item: any, index: number) => 
        <div className="p-1 m-1 border border-gray-900">
          <MovableItem
            key={item._id}
            name={item.datablock.name}
            currentColumnName={item.column}
            setItems={setDatablocks}
            index={index}
            moveCardHandler={moveCardHandler}
          />
        </div>
      );
  };

  const addNewPage = () => {
    setVisibleModal(false)
  }

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen overflow-y-scroll">
          <Column title="initialList" className="w-1/4 border rounded p-3 h-full">
            {returnItemsForColumn("initialList", dataBlocks)}
          </Column>
          <div className="w-3/4 border rounded p-3">
            {pages?.length > 0 ? pages?.map(page => <Column title={page.name} className="h-48 border m-1">{returnItemsForColumn(page.name, dataBlocks)}</Column>) :
              <Column title="initialList" className="column">{returnItemsForColumn("initialList", dataBlocks)}</Column>
            }
            <div className="flex justify-end">
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
                children=""
              />
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};
