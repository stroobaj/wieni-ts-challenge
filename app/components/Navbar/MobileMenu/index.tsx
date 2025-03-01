import Link from 'next/link';
import { MobileMenuProps } from '@/app/components/Navbar/types';
import { menuItems } from '@/app/components/Navbar/constants';

export const MobileMenu = ({ isMenuOpen, pathname, linkStyles, setIsMenuOpen }: MobileMenuProps) =>
  isMenuOpen && (
    <div className="fixed inset-0 top-[72px] bg-gray-900 lg:hidden">
      <div className="container mx-auto px-6 pt-6">
        <ul className="flex flex-col items-center text-xl">
          {menuItems.map((item) => {
            const menuStyle = pathname === item.href ? linkStyles.active : linkStyles.default;

            return (
              <li key={item.href} className="w-full text-center">
                <Link
                  data-testid={`${item.testId}-mobile`}
                  href={item.href}
                  className={menuStyle}
                  onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
