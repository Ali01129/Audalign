import React from "react";
import Logo from "../../assets/images/logo.png";
import {
  MediaIcon,
  AudioIcon,
  TransitionIcon,
  LayoutIcon,
} from "./NavIcons";

const NavItem = ({ icon: Icon, label, isActive }) => (
  <nav
    className={`flex flex-col justify-center items-center px-2 py-4 text-xs cursor-pointer h-[88px] ${isActive ? "text-white" : "text-neutral-400"} w-[84px]`}
  >
    <Icon className="w-9 h-9 mb-2" />
    <span>{label}</span>
  </nav>
);

export default function Sidebar() {
  return (
    <aside className="flex flex-col items-center pt-4 bg-gray-800 w-[84px]">
      <img src={Logo} alt="Logo" className="mb-4 h-[50px] w-[50px]" />
      <NavItem icon={MediaIcon} label="Media" />
      <NavItem icon={AudioIcon} label="Audio" isActive />
      <NavItem icon={TransitionIcon} label="Transition" />
      <NavItem icon={LayoutIcon} label="Layout" />
    </aside>
  );
}
