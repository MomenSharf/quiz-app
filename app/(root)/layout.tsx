import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col antialiased min-h-screen">
      <Header />
      <div className="w-full min-h-screen  main-background flex">
        <Sidebar />
        <main className="flex-1 max-w-full sm:max-w-[calc(100%-3.5rem)] sm:ml-14 mt-14">{children}</main>
      </div>
    </div>
  );
}
