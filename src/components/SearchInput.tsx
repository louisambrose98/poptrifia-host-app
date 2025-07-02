import { ChangeEvent } from "react";
import { Input } from "./ui/input";

type Props = {
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ value, className, onChange }: Props) => {
  return (
    <Input
      placeholder="Search Room..."
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default SearchInput;
