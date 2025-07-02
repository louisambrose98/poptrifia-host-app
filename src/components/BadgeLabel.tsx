import { Badge } from "@/components/ui/badge";
import { COLON } from "@/constants/general";
import { sentence } from "@/lib/guards";

type Props = {
  label: string;
  value: string | number;
  color?: string;
};

export const BadgeLabel = ({ label, value, color = "gray" }: Props) => {
  return (
    <Badge
      className={`bg-${color}-100 text-${color}-800 border-${color}-200 rounded-full`}
    >
      {sentence(label, COLON, value)}
    </Badge>
  );
};

export default BadgeLabel;
