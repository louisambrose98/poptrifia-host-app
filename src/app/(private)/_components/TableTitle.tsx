"use client";

type Props = { title: string };

const TableTitle = ({ title }: Props) => (
  <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 whitespace-normal break-words">
    {title}
  </h1>
);

export default TableTitle;
