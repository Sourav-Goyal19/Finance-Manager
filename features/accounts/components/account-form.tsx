import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertAccountSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formFields = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formFields>;

interface AccountFormProps {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues || { name: "" },
    resolver: zodResolver(formFields),
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Cash, Bank, Credit Card"
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={disabled || form.watch("name").length < 1}
          >
            {id ? "Save Changes" : "Create Account"}
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
              Delete Account
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
