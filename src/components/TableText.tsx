import { EMPTY } from "@/constants/general";
import { isValidNumber, isValidString, str } from "@/lib/guards";

interface Props {
  title: string | number | null;
  className?: string;
}

export const TableText = ({
  title,
  className = "max-w-xs truncate",
}: Props) => {
  const getTitle = () => {
    if (isValidNumber(title)) return str(title);
    if (!isValidString(title)) return EMPTY;
    return title;
  };

  return (
    <div className={className} title={getTitle()}>
      {getTitle()}
    </div>
  );
};

export default TableText;
