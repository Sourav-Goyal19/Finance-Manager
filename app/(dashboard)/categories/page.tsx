import { Metadata } from "next";
import CategoriesPageClient from "./components/category-client";

export const metadata: Metadata = {
  title: "Categories | FinFlow",
  description:
    "Manage your financial categories with FinFlow. Create, edit, and organize expense and income categories. Use search and bulk operations for efficient financial tracking.",
  openGraph: {
    title: "Manage Your Categories - FinFlow",
    description:
      "Organize your finances with FinFlow's category manager. Easily create, edit, and delete categories. Search functionality and bulk operations for customized financial organization.",
    type: "website",
    // url: "https://finflow.com/categories",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "FinFlow Categories Management Page",
      },
    ],
  },
};

const CategoriesPage = () => {
  return (
    <>
      <CategoriesPageClient />
    </>
  );
};

export default CategoriesPage;
