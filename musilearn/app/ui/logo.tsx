import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/logo_musilearn.png"
        width={125}
        height={125}
        className="hidden md:block"
        alt="logo of Musilearn"
      />
      <p className="text-[44px]">Musilearn</p>
    </div>
  );
}
