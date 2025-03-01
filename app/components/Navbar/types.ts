export interface MenuItem {
  href: string;
  label: string;
  testId: string;
}

export interface LinkStyles {
  default: string;
  active: string;
}

export interface DesktopMenuProps {
  pathname: string;
  linkStyles: LinkStyles;
}

export interface MobileMenuProps {
  isMenuOpen: boolean;
  pathname: string;
  linkStyles: LinkStyles;
  setIsMenuOpen: (open: boolean) => void;
}

export interface MobileMenuToggleProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}
