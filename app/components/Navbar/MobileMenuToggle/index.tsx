import { MobileMenuToggleProps } from '@/app/components/Navbar/types';
import { CloseIcon } from '@/app/components/Navbar/Icons/CloseIcon';
import { MenuIcon } from '@/app/components/Navbar/Icons/MenuIcon';

export const MobileMenuToggle = ({ isMenuOpen, toggleMenu }: MobileMenuToggleProps) => (
  <button
    type="button"
    onClick={toggleMenu}
    className="inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 lg:hidden -mr-2"
    aria-controls="mobile-menu"
    aria-labelledby="mobile-menu-toggle"
    aria-expanded={isMenuOpen}>
    <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
  </button>
);
