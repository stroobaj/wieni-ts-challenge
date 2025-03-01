'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/app/components';
import { DesktopMenu } from '@/app/components/Navbar/DesktopMenu';
import { MobileMenu } from '@/app/components/Navbar/MobileMenu';
import { MobileMenuToggle } from '@/app/components/Navbar/MobileMenuToggle';
import { mobileMenuLinkStyles, navbarLinkStyles } from '@/app/components/Navbar/styles';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 p-6 select-none overflow-hidden">
      <div className="container mx-auto flex items-center justify-between h-6">
        <Link href="/" className="flex items-center text-white">
          <Logo />
          <span className="sr-only">Wieni</span>
        </Link>
        <MobileMenuToggle isMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
        <DesktopMenu pathname={pathname} linkStyles={navbarLinkStyles} />
      </div>
      <MobileMenu
        isMenuOpen={isMobileMenuOpen}
        pathname={pathname}
        linkStyles={mobileMenuLinkStyles}
        setIsMenuOpen={setIsMobileMenuOpen}
      />
    </nav>
  );
};
