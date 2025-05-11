import DeleteAccount from "@/components/Auth/DeleteAccount";
import { TokenHasExpired } from "@/lib/actions/auth/token-expires";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) {
  const session = await getCurrentUser();
  
  const searchParams = await props.searchParams;
  const token = searchParams?.token || "";


  if (token && typeof token === "string") {
    const hasExpired = await TokenHasExpired(token);

    if (hasExpired) {
      if (!session) {
        return redirect("/login");
      }
      return redirect("/");
    } else {
      return (
        <div className="flex justify-center items-center h-full">
          <DeleteAccount token={token} />
        </div>
      );
    }
  }
}
