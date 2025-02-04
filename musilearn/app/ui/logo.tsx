import { lusitana } from "@/app/ui/fonts";

export default function MLLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <img
        src="logo_musilearn.png"
        alt="Logo of MusiLearn music note"
        width={75}
        height={75}
      />
      <p className="text-[44px]">MusiLearn</p>
    </div>
  );
}
