import { Metadata } from "next";
import Pagination from "@/app/ui/users/pagination";
import Search from "@/app/ui/search";
import UsersTable from "@/app/ui/users/table";
import { fetchUsersPages, fetchFilteredUser } from "@/app/lib/data";
import { any } from "zod";

export const metadata: Metadata = {
  title: "Users Management",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const params = (await searchParams) || {};
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;

  const users = await fetchFilteredUser(query, currentPage);
  const totalPages = await fetchUsersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 mb-3">
        <Search placeholder="Search users..." />
      </div>
      <UsersTable users={users} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
