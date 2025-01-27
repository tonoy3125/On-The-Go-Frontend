import Protectedroute from "@/routes/ProtectedRoute/ProtectedRoute";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Protectedroute role="*">
      {/* <Header /> */}
      <main className="layout_container">{children}</main>
    </Protectedroute>
  );
};

export default layout;
