import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex antialiased h-screen">
      <Sidebar />
      <main className="w-full h-full overflow-auto bg-[hsl(var(--main-background))] flex flex-col gap-3">
        <Header />
        {children}
      </main>
    </div>
  );
}
