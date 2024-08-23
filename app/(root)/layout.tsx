import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  antialiased h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 h-full overflow-auto">{children}</main>
      </div>
    </div>
  );
}
