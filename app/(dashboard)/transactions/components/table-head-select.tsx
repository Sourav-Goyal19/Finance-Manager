import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TableHeadSelectProps {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string) => void;
}

const options = ["amount", "date", "payee"];

const TableHeadSelect: React.FC<TableHeadSelectProps> = ({
  columnIndex,
  selectedColumns,
  onChange,
}) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];
  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelection && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] != option;
          return (
            <SelectItem
              disabled={disabled}
              key={index}
              className="capitalize"
              value={option}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TableHeadSelect;
