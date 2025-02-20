import { Metadata } from "next";
import Pagination from "@/app/ui/users/Pagination";
import Search from "@/app/ui/users/Search";
import CoursesTable from "@/app/ui/courses/table";
import { fetchCoursesPages, fetchFilteredCourses, fetchTeachers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Course allocation",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string } | Promise<{ query?: string; page?: string }>;
}) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams;

  const query = params?.query ?? "";
  const currentPage = parseInt(params?.page ?? "1", 10);

  const teachers = await fetchTeachers();
  const courses = await fetchFilteredCourses(query, currentPage);
  const totalPages = await fetchCoursesPages(query);

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap w-full items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">Gestion des Cours</h1>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 md:mt-8 mb-3">
        <Search placeholder="Rechercher un cours..." />
      </div>

      <div className="overflow-x-auto max-w-full whitespace-nowrap">
        <CoursesTable courses={courses} currentPage={currentPage} teachers={teachers} />
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
