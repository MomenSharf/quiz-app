'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { title } from "process";

export default function Home() {

  

  return (
    <main>
      <Link href='/quiz/create' className={buttonVariants()}
      onClick={() => {
        toast({
          title: "Error",
          description: "There was an error logging in with Google",
          variant: "destructive",
        });
      }}
      >
        dd
      </Link>
    </main>
  );
}
