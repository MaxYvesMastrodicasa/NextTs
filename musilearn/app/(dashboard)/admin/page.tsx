import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
import { getUserName } from "@/app/lib/actions";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Page() {
  const userName = await getUserName();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {userName}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}
