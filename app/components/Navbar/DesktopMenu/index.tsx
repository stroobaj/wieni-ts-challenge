import Link from 'next/link';
import { menuItems } from '@/app/components/Navbar/constants';
import { DesktopMenuProps } from '@/app/components/Navbar/types';

export const DesktopMenu = ({ pathname, linkStyles }: DesktopMenuProps) => (
  <div className="hidden lg:block">
    <ul className="flex flex-row md:space-x-8 md:text-sm md:font-medium">
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            data-testid={item.testId}
            href={item.href}
            className={linkStyles[pathname === item.href ? 'active' : 'default']}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
