import { FC, ReactNode } from "react";

export const Main: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <main className="min-h-[70vh] pl-16 pr-16 pb-5 pt-5 text-center text-red-700">
      {children}
    </main>
  );
};
