import Header from "@/components/ui/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
