import React, { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="md:mt-40 mt-28 container min-h-screen">
      {children}
    </section>
  );
};

export default PageLayout;
