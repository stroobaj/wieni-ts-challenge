import { LinkStyles } from '@/app/components/Navbar/types';

export const navbarLinkStyles: LinkStyles = {
  default:
    'block border-b border-gray-700 py-2 font-bold text-gray-300 uppercase hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white',
  active: 'block py-2 font-bold text-white uppercase md:bg-transparent md:p-0 md:text-white',
};

export const mobileMenuLinkStyles: LinkStyles = {
  default:
    'block py-4 font-bold uppercase text-gray-300 hover:text-white transition-colors duration-200',
  active: 'block py-4 font-bold uppercase text-white',
};
