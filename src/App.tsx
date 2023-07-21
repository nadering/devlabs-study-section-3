import { useState, useCallback } from "react";
import "adorable-css";
import { Lists, TodoProps } from "./components/Lists";
import Form from "./components/Form";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function App() {
  const [todoData, setTodoData] = useState<TodoProps[]>();
  const [value, setValue] = useState<string>("");

  const handleClick = useCallback(
    (id: string) => {
      let newTodoData = todoData?.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  const handleRemoveclick = () => {
    setTodoData([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value.trim() === "") return;

    let newTodo: TodoProps = {
      id: Date.now().toString(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [
      ...(Array.isArray(todoData) ? todoData : []),
      newTodo,
    ]);
    setValue("");
  };

  return (
    <div className="pack w(100vw) h(100vh) bg(#D6E6FD)">
      <div className="vbox bg(white) w(40%~80%) p(16) gap(12) r(4) box-shadow(2/2/2/#B4B4B4)">
        <div className="hbox space-between">
          <div className="font(20) semibold nowrap">할 일 목록</div>
          <button
            className={
              "font(16) nowrap text-right c(#B4B4B4) " +
              (Array.isArray(todoData) &&
                Object.keys(todoData).length !== 0 &&
                "c(black)!")
            }
            onClick={handleRemoveclick}
          >
            모두 삭제
          </button>
        </div>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}

export default App;
