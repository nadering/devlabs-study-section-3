import React, { useState } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { TodoProps } from "./Lists";

interface ListProps {
  id: string;
  title: string;
  completed: boolean;
  todoData: TodoProps[] | undefined;
  setTodoData: React.Dispatch<React.SetStateAction<TodoProps[] | undefined>>;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  handleClick: (id: string) => void;
}

function List({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
  handleClick,
}: ListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const handleCompleteChange = () => {
    let newTodoData = todoData?.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    if (newTodoData) setTodoData(newTodoData);
  };

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    let newTodoData = todoData?.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    if (newTodoData) setTodoData(newTodoData);
    setEditedTitle("");
    setIsEditing(false);
  };

  return (
    <div
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={snapshot.isDragging ? "selected" : "not-selected"}
    >
      <div className="hbox relative space-between h(36) bg(#F2F2F4) my(4) p(4/8) r(4) cursor(default) ring(#E3E3E8) .selected:bg(gray)">
        {isEditing ? (
          <>
            <form>
              <input
                value={editedTitle}
                className="letter-spacing(-0.5px)"
                onChange={(event) => setEditedTitle(event.target.value)}
                onSubmit={handleSubmit}
                autoFocus
              ></input>
              <button
                className="layer(right:36) font(14) c(gray) hover:c(black)"
                type="submit"
                onClick={handleSubmit}
              >
                저장
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="hbox gap(8)">
              <input
                type="checkbox"
                onChange={() => handleCompleteChange()}
                defaultChecked={completed}
              />
              <span
                className={
                  "w(~calc(70vw-70px)) nowrap... letter-spacing(-0.5px) " +
                  (completed ? "line-through" : "")
                }
              >
                {title}
              </span>
            </div>
            <div className="space(12)"></div>
            <button
              className="layer(right:12) translateY(-2px) c(gray) hover:c(black)"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="layer(right:36) font(14) c(gray) hover:c(black)"
              onClick={() => {
                setEditedTitle(title);
                setIsEditing(true);
              }}
            >
              수정
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(List);
