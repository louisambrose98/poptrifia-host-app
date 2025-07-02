"use client";

import { NEXT, OF, PREVIOUS, SHOWING } from "@/constants/general";
import { sentence } from "@/lib/guards";

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  label: string;
};

const Button = ({ onClick, disabled, label }: ButtonProps) => (
  <button
    className="p-2 rounded-lg border bg-muted text-foreground disabled:opacity-50 shadow-sm hover:bg-accent transition"
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

type Props = {
  total: number;
  current: number;
  onPrevious: () => void;
  onNext: () => void;
};

const PanelPrevNext = ({ total, current, onPrevious, onNext }: Props) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex-1 mb-4">
      <p className="text-center text-muted-foreground text-sm">
        {sentence(SHOWING, current + 1, OF, total)}
      </p>
    </div>

    <div className="flex gap-4">
      <Button onClick={onPrevious} disabled={current === 0} label={PREVIOUS} />
      <Button onClick={onNext} disabled={current === total - 1} label={NEXT} />
    </div>
  </div>
);

export default PanelPrevNext;
