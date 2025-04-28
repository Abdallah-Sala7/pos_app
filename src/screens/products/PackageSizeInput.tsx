import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useCallback, useState } from "react";

export default function PackageSizeInput({ onChange, onRemove, values }: any) {
  const [tags, setTags] = useState<string[]>(values);
  const [value, setValue] = useState<string>();

  const onInputChange = useCallback(
    (ev: any) => {
      const { value: val }: any = ev.target;
      const mapTags = [...tags, val];

      setValue(val);

      if (ev.key == "Enter") {
        ev.preventDefault();
        setTags(mapTags);
        setValue(undefined);
        ev.target.value = null;
        onChange(mapTags);
        return;
      }
    },
    [value, tags]
  );

  const onTagRemove = useCallback(
    (index: number) => {
      onRemove(tags[index]);
      const filter = tags.filter((_: string, idx: number) => idx !== index);
      setTags(filter);
    },
    [tags]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded border p-3 items-center">
        {tags?.sort()?.map((tag: string, index: number) => (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => onTagRemove(index)}
            key={index}
            type="button"
          >
            <XIcon size={14} />
            <span>{tag}</span>
          </Button>
        ))}
        <input
          type="text"
          className="flex-1 shrink-0 text-sm outline-none"
          placeholder="Type here.."
          defaultValue={value}
          onKeyDown={onInputChange}
        />
      </div>
    </div>
  );
}
