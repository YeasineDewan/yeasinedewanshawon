import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Switch } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from './ThemeProvider';
import NeonButton from './NeonButton';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: 'lucide:home' },
    { path: '/projects', label: 'Projects', icon: 'lucide:briefcase' },
    { path: '/services', label: 'Services', icon: 'lucide:settings' },
    { path: '/blog', label: 'Blog', icon: 'lucide:book-open' },
    { path: '/pentesting-lab', label: 'Pentesting Lab', icon: 'lucide:shield' }
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{
          borderBottom: isScrolled ? `2px solid ${neonColors.neonGreen}` : 'none',
          boxShadow: isScrolled ? `0 4px 20px rgba(6, 208, 1, 0.2)` : 'none',
          borderRadius: isScrolled ? '0 0 50px 50px / 50px' : '0',
          clipPath: isScrolled ? 'ellipse(100% 40px at 50% 100%)' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Overlay Shape */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: isScrolled 
              ? `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(5,146,18,0.1) 50%, rgba(0,0,0,0.9) 100%)`
              : 'transparent',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          }}
          initial={{ height: 0 }}
          animate={{ height: isScrolled ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center gap-2">
                <motion.div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: neonColors.neonGreen }}
                  whileHover={{ rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon icon="lucide:code" className="w-5 h-5 text-black" />
                </motion.div>
                <motion.span 
                  className="font-bold text-white text-lg"
                  whileHover={{ scale: 1.05 }}
                  style={{ textShadow: `0 0 10px ${neonColors.neonGreen}` }}
                >
                  MD. Yeasine Dewan Shawon
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        location.pathname === item.path
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: location.pathname === item.path ? `${neonColors.neonGreen}20` : 'transparent',
                        border: location.pathname === item.path ? `1px solid ${neonColors.neonGreen}` : 'none',
                        boxShadow: location.pathname === item.path ? `0 0 20px ${neonColors.neonGreen}40` : 'none'
                      }}
                    >
                      <Icon icon={item.icon} className="w-4 h-4" />
                      <span>{item.label}</span>
                      
                      {/* Animated underline */}
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: neonColors.lightYellow }}
                          layoutId="activeTab"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <Switch
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  size="sm"
                  className="border-2"
                  style={{
                    borderColor: neonColors.lime,
                    backgroundColor: theme === 'dark' ? neonColors.neonGreen : 'transparent'
                  }}
                  startContent={
                    <motion.div
                      animate={{ rotate: theme === 'dark' ? 0 : 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon icon="lucide:sun" className="w-3 h-3" />
                    </motion.div>
                  }
                  endContent={
                    <motion.div
                      animate={{ rotate: theme === 'dark' ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon icon="lucide:moon" className="w-3 h-3" />
                    </motion.div>
                  }
                />
              </motion.div>

              {/* Contact Button */}
              <NeonButton
                icon="lucide:message-square"
                color={neonColors.lightYellow}
                href="/contact"
                size="sm"
              >
                Contact
              </NeonButton>

              {/* Mobile Menu Toggle */}
              <motion.button
                className="md:hidden p-2 rounded-lg"
                style={{ backgroundColor: `${neonColors.neonGreen}20` }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon 
                  icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"} 
                  className="w-5 h-5"
                  style={{ color: neonColors.lightYellow }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md border-l"
              style={{ borderColor: neonColors.neonGreen }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold" style={{ color: neonColors.lightYellow }}>
                    Menu
                  </h3>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon icon="lucide:x" className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                            location.pathname === item.path
                              ? 'text-white'
                              : 'text-gray-300 hover:text-white'
                          }`}
                          style={{
                            backgroundColor: location.pathname === item.path ? `${neonColors.neonGreen}20` : 'transparent',
                            border: location.pathname === item.path ? `1px solid ${neonColors.neonGreen}` : 'none'
                          }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon icon={item.icon} className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;