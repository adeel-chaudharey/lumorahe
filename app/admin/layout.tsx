import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />

        {children}
      </main>
    </div>
  );
}