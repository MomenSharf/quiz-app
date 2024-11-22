export default function Layout({ children }: { children: React.ReactNode }) {
  return(
    <main className="w-full min-h-screen flex justify-center items-center bg-[hsl(var(--main-background))]">
      {children}
    </main>
  )
}