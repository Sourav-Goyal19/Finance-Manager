import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { useOpenCategory } from "../hooks/use-edit-category";
import { useGetCategory } from "../api/use-get-category";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const formFields = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formFields>;

const EditCategorySheet = () => {
  const { data } = useSession();
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const categoryQuery = useGetCategory(id!, data?.user?.email!);

  // console.log(CategoryQuery.data);

  const mutation = useEditCategory(id!, data?.user?.email!);
  const deleteMutation = useDeleteCategory(id!, data?.user?.email!);

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isPending = mutation.isPending || deleteMutation.isPending;

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data && {
    name: categoryQuery.data?.name,
  };

  return (
    <Sheet
      open={isOpen && categoryQuery.data != undefined}
      onOpenChange={onClose}
    >
      <ConfirmDialog />
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Edit Category </SheetTitle>
          <SheetDescription>Edit an existing category.</SheetDescription>
        </SheetHeader>

        {categoryQuery.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <CategoryForm
            id={id}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            disabled={isPending}
            onDelete={onDelete}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditCategorySheet;
