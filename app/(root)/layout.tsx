import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col relative  antialiased min-h-screen">
      <Header />
      <div className="flex-1 flex " style={{ backgroundImage: "url(/)" }}>
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
