interface FormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Form({ handleSubmit, value, setValue }: FormProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit} className="hbox(stretch) w(100%) space-between gap(8)">
      <input
        type="text"
        name="value"
        placeholder="해야 할 일을 입력하세요."
        value={value}
        onChange={handleChange}
        className="w(0~) flex-grow flex-shrink b(2/solid/#C8C8D0) r(4) p(4/8) letter-spacing(-0.5px)"
      />
      <input
        type="submit"
        value="입력"
        className="b(2/solid/skyblue) r(4) bg(white) pointer p(4/4) font(14) letter-spacing(-1px)
      hover:bg(skyblue)+c(white)"
      />
    </form>
  );
}
