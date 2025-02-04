import {
  AcademicCapIcon,
  UserIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function UserStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-yellow-500 text-white": status === "admin",
          "bg-blue-500 text-white": status === "professor",
          "bg-green-500 text-white": status === "student",
        }
      )}
    >
      {status === "admin" ? (
        <>
          Admin
          <KeyIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "professor" ? (
        <>
          Professor
          <AcademicCapIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "student" ? (
        <>
          Student
          <UserIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
