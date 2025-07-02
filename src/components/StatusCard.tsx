import React from "react";

type Props = {
  title: string;
  value: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

const StatusCard = ({
  title,
  value,
  description,
  children,
  className = "",
}: Props) => {
  return (
    <div
      className={`rounded-lg border bg-card p-4 shadow-sm flex flex-col gap-1 ${className}`}
    >
      <div className="text-xs text-muted-foreground font-medium mb-1">
        {title}
      </div>
      <div className="text-lg font-semibold leading-tight">{value}</div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
      {children}
    </div>
  );
};

export default StatusCard;
