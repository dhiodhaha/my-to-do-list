import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-3xl"> {children}</div>
    </div>
  );
};
