import { formatCurrency } from "@/lib/utils";

export const CategoryTooltip = ({ active, payload, label }: any) => {
  if (!active) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-sm shadow-sm border overflow-hidden">
        <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
          {name}
        </div>
        <hr className="mx-2" />
        <div className="p-2 px-3 space-y-1">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-2">
              <div className="size-1.5 bg-rose-500 rounded-full" />
              <p className="text-sm text-muted-foreground">Expenses</p>
            </div>
            <p className="text-sm text-right font-medium">
              {formatCurrency(value * -1)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
