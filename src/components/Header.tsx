import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Switch } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useThemeContext } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2">
          <img src="img/logo/web_logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-inherit">MD. Yeasine Dewan Shawon</span>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-foreground">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/projects" className="text-foreground">Projects</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/services" className="text-foreground">Services</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/blog" className="text-foreground">Blog</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/pentesting-lab" className="text-foreground">Pentesting Lab</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            size="sm"
            color="secondary"
            startContent={<Icon icon="lucide:sun" />}
            endContent={<Icon icon="lucide:moon" />}
          />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} to="/contact" color="primary" variant="flat">
            Contact
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;