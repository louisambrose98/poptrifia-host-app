import { ChangeEvent } from "react";
import { Input } from "./ui/input";

type Props = {
  placeholder: string;
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ placeholder, value, className, onChange }: Props) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default SearchInput;
