import Header from "@/components/Layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex antialiased h-screen">
      {/* <Sidebar /> */}
      <main className="w-full h-full overflow-auto main-background flex flex-col">
        <Header />
        {children}
      </main>
    </div>
  );
}
