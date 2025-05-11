import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col antialiased h-screen">
      {/* <Sidebar /> */}
        <Header />
      <main className="w-full h-full overflow-auto main-background flex">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
