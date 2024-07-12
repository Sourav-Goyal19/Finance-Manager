import { useOpenCategory } from "@/features/categories/hooks/use-edit-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-edit-transaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface CategoryColumnProps {
  id: string;
  category: string | null;
  categoryId: string | null;
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({
  id,
  category,
  categoryId,
}) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const handleClick = () => {
    if (!categoryId) {
      onOpenTransaction(id);
    } else {
      onOpenCategory(categoryId);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
    >
      {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};

export default CategoryColumn;
