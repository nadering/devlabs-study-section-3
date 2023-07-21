import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import List from "./List";

export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}

interface ListsProps {
  todoData: TodoProps[] | undefined;
  setTodoData: React.Dispatch<React.SetStateAction<TodoProps[] | undefined>>;
  handleClick: (id: string) => void;
}

export const Lists = React.memo(({ todoData, setTodoData, handleClick }: ListsProps) => {
  const handleEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTodoData = todoData;

    // 드래그 이벤트가 발생했다면 TodoData는 반드시 ListProps[] 형태이므로,
    // non-null assertion operator (!)를 사용할 수 있습니다.
    const [reorderedItem] = newTodoData!.splice(result.source.index, 1);
    newTodoData!.splice(result.destination.index, 0, reorderedItem);

    setTodoData(newTodoData);
  };

  return (
    <div className="w(100%)">
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="vbox"
            >
              {todoData?.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});
