import { FullLogo } from "@components/index.ts";

export const HomeHeader = () => {
  return (
    <header
      className="flex items-center justify-center top-0 z-50 py-5 pr-5 pl-5 pt-12 pb-12 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/photos/home/header-bg.jpeg')" }}
    >
      <div
        className="p-5 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(255, 248, 233, 0.65)" }}
      >
        <FullLogo className="max-h-90" />
      </div>
    </header>
  );
};
