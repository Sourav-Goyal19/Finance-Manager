import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import React from "react";
import { float } from "drizzle-orm/mysql-core";

interface AmountInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;
    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-cente text-white",
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-rose-500 hover:bg-rose-600"
              )}
            >
              {!parsedValue && <Info className="size-3" />}
              {isIncome && <PlusCircle className="size-3" />}
              {isExpense && <MinusCircle className="size-3" />}
            </button>
          </TooltipTrigger>
          <TooltipContent align="start">
            Use [+] for income and [-] for expense
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="₹"
        onValueChange={onChange}
        value={value}
        decimalScale={2}
        decimalsLimit={2}
        placeholder={placeholder}
        disabled={disabled}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
      />
      <div className="text-xs text-muted-foreground mt-2">
        <p>{isIncome && "This will count as an income"}</p>
        <p>{isExpense && "This will count as an expense"}</p>
      </div>
    </div>
  );
};
