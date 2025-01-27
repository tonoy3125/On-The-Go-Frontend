import NavbarHeader from "@/components/shared/Navbar/NavbarHeader/NavbarHeader";
import Protectedroute from "@/routes/ProtectedRoute/ProtectedRoute";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Protectedroute role="*">
      <NavbarHeader />
      <main className="layout_container">{children}</main>
    </Protectedroute>
  );
};

export default layout;
