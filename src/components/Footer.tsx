import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import NeonButton from './NeonButton';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Resources',
      links: [
        { path: '/projects', label: 'Project Showcase', icon: 'lucide:diamond' },
        { path: '/services', label: 'Service Overview', icon: 'lucide:arrow-right-circle' },
        { path: '/blog', label: 'Blog & Articles', icon: 'lucide:book-open' },
        { path: '/contact', label: 'Newsletter', icon: 'lucide:mail' }
      ]
    },
    {
      title: 'Services',
      links: [
        { path: '/services', label: 'Pricing', icon: 'lucide:dollar-sign' },
        { path: '/pentesting-lab', label: 'Pentesting Lab', icon: 'lucide:link' },
        { path: '/projects', label: 'Web Development', icon: 'lucide:circle' },
        { path: '/contact', label: 'Client Consultation', icon: 'lucide:users' }
      ]
    },
    {
      title: 'Company',
      links: [
        { 
          href: 'https://linkedin.com/in/md-yeasine-dewan-shawon-07a383210', 
          label: 'LinkedIn', 
          icon: 'logos:linkedin-icon',
          external: true
        },
        { path: '/contact', label: 'Contact us', icon: 'lucide:message-circle' },
        { path: '/privacy', label: 'Privacy Policy', icon: 'lucide:lock' },
        { path: '/terms', label: 'Terms', icon: 'lucide:check-circle' }
      ]
    }
  ];

  return (
    <footer 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)`,
        borderTop: `3px solid ${neonColors.neonGreen}`,
        boxShadow: `0 -5px 20px rgba(6, 208, 1, 0.15)`
      }}
    >
      {/* Wave Shape at Top */}
      <svg
        className="absolute top-0 left-0 w-full h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          fill: neonColors.neonGreen,
          opacity: 0.05
        }}
      >
        <motion.path
          d="M0,56 C150,100 350,0 600,56 C850,112 1050,0 1200,56 L1200,0 L0,0 Z"
          animate={{
            d: [
              "M0,56 C150,100 350,0 600,56 C850,112 1050,0 1200,56 L1200,0 L0,0 Z",
              "M0,56 C150,0 350,100 600,56 C850,12 1050,100 1200,56 L1200,0 L0,0 Z",
              "M0,56 C150,100 350,0 600,56 C850,112 1050,0 1200,56 L1200,0 L0,0 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: neonColors.neonGreen,
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: neonColors.neonGreen }}
                whileHover={{ rotate: 360 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon icon="lucide:code" className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">MD. Yeasine Dewan Shawon</h3>
            </motion.div>
            
            <motion.p 
              className="text-sm text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Full Stack Developer | Cybersecurity Specialist | Data Entry Expert
            </motion.p>
            
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <NeonButton 
                icon="lucide:arrow-right"
                color={neonColors.lightYellow}
                href="/services"
                className="w-full"
              >
                Hire Me
              </NeonButton>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon icon="lucide:award" className="w-4 h-4" style={{ color: neonColors.lightYellow }} />
              </motion.div>
              <span>Portfolio of the day</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <Icon icon="lucide:star" className="w-4 h-4" style={{ color: neonColors.lightYellow }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h4 
                className="text-lg font-semibold mb-6 text-white"
                style={{ textShadow: `0 0 10px ${neonColors.neonGreen}` }}
                whileHover={{ scale: 1.05 }}
              >
                {section.title}
              </motion.h4>
              
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {link.external ? (
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon icon={link.icon} className="w-4 h-4" style={{ color: neonColors.lime }} />
                        </motion.div>
                        <span>{link.label}</span>
                      </motion.a>
                    ) : (
                      <Link
                        to={link.path!}
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/5"
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon icon={link.icon} className="w-4 h-4" style={{ color: neonColors.lime }} />
                        </motion.div>
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Address and Copyright */}
        <motion.div 
          className="mt-12 pt-8 border-t"
          style={{ borderColor: `${neonColors.neonGreen}30` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div 
              className="text-sm text-gray-300 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <Icon icon="lucide:map-pin" className="w-4 h-4" style={{ color: neonColors.lightYellow }} />
              <span>146/5/a, Bank colony, 60 feet barekmolla mor, mirpur-2, Dhaka, Bangladesh</span>
            </motion.div>
            
            <motion.div 
              className="text-sm text-gray-300"
              whileHover={{ scale: 1.05 }}
              style={{ textShadow: `0 0 5px ${neonColors.neonGreen}` }}
            >
              <p>&copy; {currentYear} MD. Yeasine Dewan Shawon. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${neonColors.neonGreen}, transparent)`,
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${neonColors.lime}, transparent)`,
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;