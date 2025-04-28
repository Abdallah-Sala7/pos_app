import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ItemInterface {
  icon?: React.ReactNode;
  color?: string;
  title?: string;
  key?: string;
  value?: string | number;
  url?: string;
  permission?: string[] | string;
  needStore?: boolean;
}

export const MiniDashboardSingleCard: FC<{
  item: ItemInterface;
  className?: string;
  filter_key?: string;
  refetch?: () => void;
}> = ({ item, className, filter_key = "filter_key", refetch }): JSX.Element => {
  const [params, setSearchParams] = useSearchParams();
  const activeKey = params.get(filter_key);
  const navigate = useNavigate();

  return (
    <button
      // to={item.url || "#"}
      onClick={() => {
        if (activeKey !== item.key && !item.url && item.key) {
          setSearchParams((prev) => {
            prev.set(filter_key, item.key || "");
            return prev;
          });
        } else if (activeKey === item.key) {
          setSearchParams((prev) => {
            prev.delete(filter_key);
            return prev;
          });
        } else if (activeKey !== item.key && item.url) {
          navigate(item.url);
        }

        refetch?.();
      }}
      className={`bg-white border p-5 rounded-xl flex gap-4 items-center shadow-2xl shadow-gray-600/5 w-full
        ${activeKey === item.key ? "border-primary" : "border-gray-200"}
        ${className || ""}
      `}
    >
      <span
        className={["shrink-0 inline", item.color || "text-gray-600"].join(" ")}
      >
        {item.icon}
      </span>
      <div className="flex-1 text-start">
        <p dangerouslySetInnerHTML={{ __html: item.value as string }}></p>

        <p>{item.title}</p>
      </div>
    </button>
  );
};
