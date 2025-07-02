import { ChangeEvent } from "react";

type Props = {
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DateInput = ({ value, className, onChange }: Props) => {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default DateInput;
