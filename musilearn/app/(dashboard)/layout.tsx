import SideNav from "@/app/ui/dashboard/sidenav";
import { getUserRole } from "../lib/actions";

async function LayoutContent({ children }: { children: React.ReactNode }) {

  const role = await getUserRole();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-1/5">
        <SideNav role={role} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContent>{children}</LayoutContent>
  );
}
