import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableHeadSelect from "./table-head-select";

interface ImportTableProps {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (columnNumber: number, value: string | null) => void;
}

const ImportTable: React.FC<ImportTableProps> = ({
  headers,
  body,
  selectedColumns,
  onTableHeadSelectChange,
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            {headers.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((item, index) => (
            <TableRow key={index}>
              {item.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportTable;
