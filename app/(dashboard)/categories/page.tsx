import { Metadata } from "next";
import CategoriesPageClient from "./components/category-client";

export const metadata: Metadata = {
  title: "Categories | FinFlow",
  description:
    "Manage your financial categories with FinFlow. Create, edit, and organize expense and income categories. Use search and bulk operations for efficient financial tracking.",
};

const CategoriesPage = () => {
  return (
    <>
      <CategoriesPageClient />
    </>
  );
};

export default CategoriesPage;
