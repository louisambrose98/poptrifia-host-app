interface Props {
  title: string;
}

export const TableText = ({ title }: Props) => {
  return (
    <div className="max-w-xs truncate" title={title}>
      {title}
    </div>
  );
};

export default TableText;
