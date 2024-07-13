import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ImportTable from "./import-table";
import { format, parse } from "date-fns";

interface ImportCardProps {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

const ImportCard: React.FC<ImportCardProps> = ({
  data,
  onCancel,
  onSubmit,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  );

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value == "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const headers = data[0];
  const body = data.slice(1);

  const progress = Object.values(selectedColumns).filter(
    (value) => value
  ).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });
          return transformedRow.every((item) => item == null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, curr, index) => {
        const header = mappedData.headers[index];
        if (header) {
          acc[header] = curr;
        }
        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
      amount: parseFloat(item.amount),
    }));

    onSubmit(formattedData);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              onClick={handleContinue}
              disabled={progress < requiredOptions.length}
            >
              Continue {progress}/{requiredOptions.length}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
