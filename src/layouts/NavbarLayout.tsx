import type { ReactNode } from "react";
import Navbar from "../components/core/Navbar";

interface NavBarLayoutProps {
  children: ReactNode;
  showNavbar: boolean;
}
const NavbarLayout = ({ children, showNavbar }: NavBarLayoutProps) => {
  return (
    <div>
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default NavbarLayout;
