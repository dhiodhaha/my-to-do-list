import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-autopx-4 sm:px-6 lg:px-8 flex item-centerjustify-center relative min-h-screen max-w-[52rem] flex-1 pr-1 pt-10 lg:ml-[16rem] lg:mr-10 lg:pl-20 lg:pt-[2.8rem]">
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  );
};
