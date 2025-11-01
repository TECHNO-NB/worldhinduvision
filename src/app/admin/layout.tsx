import LayoutAdmin from "@/components/admin-comp/LayoutAdmin";
import Sidebar from "@/components/admin-comp/Sidebar";

export const metadata = {
  title: "WHV Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <LayoutAdmin>
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </LayoutAdmin>
    </div>
  );
}
