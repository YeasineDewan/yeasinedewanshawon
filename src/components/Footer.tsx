import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-content1 text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="img/logo/web_logo.png" alt="Logo" className="w-8 h-8" />
              <h3 className="text-xl font-bold">MD. Yeasine Dewan Shawon</h3>
            </div>
            <p className="text-sm text-foreground-600 mb-4">
              Full Stack Developer | Cybersecurity Specialist | Data Entry Expert
            </p>
            <Button 
              as={Link}
              to="/services"
              color="primary" 
              variant="solid" 
              className="bg-yellow-400 text-black border border-black mb-4 hover:bg-yellow-500 transition-colors"
            >
              Hire Me
              <Icon icon="lucide:arrow-right" className="ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-foreground-600">
              <Icon icon="lucide:award" className="text-gray-500" />
              <span>Portfolio of the day</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="lucide:star" className="text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-700">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/projects" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:diamond" className="w-4 h-4" />
                  <span>Project Showcase</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:arrow-right-circle" className="w-4 h-4" />
                  <span>Service Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:book-open" className="w-4 h-4" />
                  <span>Blog & Articles</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:mail" className="w-4 h-4" />
                  <span>Newsletter</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-700">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/services" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:dollar-sign" className="w-4 h-4" />
                  <span>Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/pentesting-lab" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:link" className="w-4 h-4" />
                  <span>Pentesting Lab</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:circle" className="w-4 h-4" />
                  <span>Web Development</span>
                </Link>
              </li>
              <li className="pt-2">
                <span className="text-xs text-gray-500 font-medium">Use cases</span>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:users" className="w-4 h-4" />
                  <span>Client Consultation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-700">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://linkedin.com/in/md-yeasine-dewan-shawon-07a383210" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Icon icon="logos:linkedin-icon" className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:message-circle" className="w-4 h-4" />
                  <span>Contact us</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:lock" className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon icon="lucide:check-circle" className="w-4 h-4" />
                  <span>Terms</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Address and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-foreground-600">
              <p>146/5/a, Bank colony, 60 feet barekmolla mor, mirpur-2, Dhaka, Bangladesh</p>
            </div>
            <div className="text-sm text-foreground-600">
              <p>&copy; {new Date().getFullYear()} MD. Yeasine Dewan Shawon. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;