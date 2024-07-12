import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { AmountInput } from "@/components/amount-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Trash } from "lucide-react";

import { insertTransactionsSchema } from "@/db/schema";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const formFields = z.object({
  date: z.coerce.date(),
  accountId: z.string().trim(),
  categoryId: z.string().nullable().optional(),
  payee: z.string().trim(),
  amount: z.string().trim(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionsSchema.omit({
  id: true,
  userId: true,
});

type FormValues = z.input<typeof formFields>;
type ApiFormValues = z.input<typeof apiSchema>;

interface TransactionFormProps {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(formFields),
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const amount = parseFloat(data.amount);
    onSubmit({ ...data, amount });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 pt-2"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={field.onChange}
                    value={field.value}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an account"
                    options={accountOptions}
                    onChange={field.onChange}
                    onCreate={onCreateAccount}
                    value={field.value}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select a category"
                    options={categoryOptions}
                    onChange={field.onChange}
                    onCreate={onCreateCategory}
                    value={field.value}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add a payee"
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <AmountInput
                    {...field}
                    placeholder="0.00"
                    disabled={disabled}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Optional Notes"
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={disabled}>
            {id ? "Save Changes" : "Create Transaction"}
          </Button>
          {!!id && (
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={handleDelete}
              className="flex items-center justify-center w-full gap-2"
            >
              <Trash className="size-4 mr-2" />
              Delete Transaction
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
