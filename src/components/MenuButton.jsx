import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Upload a Video', link: '/Upload' },
    { name: 'Login', link: '/Auth' }
  ];

  return (
    <div className="relative min-h-[50px]">
      {/* Menu Button */}
      {!isOpen && (
        <button
          className="gap-2.5 px-5 py-3.5 whitespace-nowrap bg-lime-300 rounded-3xl min-h-[50px] active:scale-95 transition-transform duration-150"
          onClick={() => setIsOpen(true)}
        >
          MENU
        </button>
      )}

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-[300px] min-h-[50px] bg-[#D0FF71] rounded-xl p-6 shadow-lg"
          style={{ zIndex: 100 }}
        >
          {/* Close Button */}
          <button
            className="bg-black text-white rounded-full px-4 py-2 mb-4 active:scale-95 transition-transform duration-150"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>

          {/* Menu Items */}
          <ul className="space-y-4">
            {menuItems.map((menuItem, index) => (
              <li
                key={index}
                className="group text-black text-2xl font-bold cursor-pointer flex items-center"
                onClick={() => {navigate(menuItem.link)}}
              >
                {/* Arrow appears on hover */}
                <span className="group-hover:mr-3 transition-all duration-400 text-3xl"></span>
                {menuItem.name}
              </li>
            ))}
          </ul>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-8 text-black text-base">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
          </div>
          <div className="flex gap-4 mt-2 text-black text-sm">
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;