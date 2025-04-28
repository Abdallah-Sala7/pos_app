import { cn } from "@/lib/utils";
import moment from "moment";

const DateFormate = ({
  date,
  hasTime,
}: {
  date: string;
  hasTime?: boolean;
}) => {
  if (!date) return "-";

  return (
    <div>
      {hasTime && <p className="text-sm">{moment(date).format("h:mm A")}</p>}
      <p className={cn("text-sm", hasTime && "text-xs text-muted-foreground")}>
        {moment(date).format("DD-MM-YYYY")}
      </p>
    </div>
  );
};

export default DateFormate;
