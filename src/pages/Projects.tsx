import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Image, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  category: string;
  featured?: boolean;
  technologies: string[];
  client?: string;
  duration?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ShirtBazar E-commerce Platform",
    description: "Developed and managed a comprehensive e-commerce platform for clothing retail. Implemented secure payment processing and inventory management systems.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=ecommerce-shirtbazar",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "Bootstrap"],
    demoLink: "https://shirtbazar.com",
    codeLink: "https://github.com/yeasinedewan/shirtbazar",
    category: "e-commerce",
    featured: true,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    client: "ShirtBazar Ltd.",
    duration: "3 months"
  },
  {
    id: 2,
    title: "Cybersecurity Training Platform",
    description: "Created educational content and training modules for cybersecurity awareness. Developed interactive learning materials for ethical hacking and penetration testing.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=cybersecurity-training",
    tags: ["Python", "Cybersecurity", "Pentesting", "Network Security"],
    demoLink: "https://cyber-training-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/cyber-training",
    category: "security",
    featured: true,
    technologies: ["Python", "Django", "PostgreSQL", "Docker"],
    client: "TechEdu Institute",
    duration: "2 months"
  },
  {
    id: 3,
    title: "Data Management System",
    description: "Built efficient data entry and management systems for election commission. Implemented secure data handling and reporting mechanisms.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=data-management",
    tags: ["Python", "Database", "Data Entry", "Security"],
    demoLink: "https://data-system-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/data-management",
    category: "data",
    technologies: ["Python", "Flask", "MySQL", "Redis"],
    client: "Election Commission",
    duration: "4 months"
  },
  {
    id: 4,
    title: "Event Management System",
    description: "Developed comprehensive event management solutions for Sesame Street events. Created registration, scheduling, and reporting systems.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=event-management",
    tags: ["HTML5", "CSS3", "JavaScript", "Event Management"],
    demoLink: "https://event-system-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/event-management",
    category: "management",
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
    client: "Sesame Street Events",
    duration: "2 months"
  },
  {
    id: 5,
    title: "Real-Time Analytics Dashboard",
    description: "Built interactive dashboard for business analytics with real-time data processing and visualization.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=analytics-dashboard",
    tags: ["React", "D3.js", "WebSocket", "Analytics"],
    demoLink: "https://analytics-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/analytics",
    category: "analytics",
    featured: true,
    technologies: ["React", "D3.js", "WebSocket", "MongoDB"],
    client: "Analytics Corp",
    duration: "3 months"
  },
  {
    id: 6,
    title: "Mobile Security App",
    description: "Cross-platform mobile application for security awareness and incident reporting.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=mobile-security",
    tags: ["React Native", "Firebase", "Security"],
    demoLink: "https://mobile-security-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/mobile-security",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Node.js"],
    client: "SecureMobile Inc.",
    duration: "2 months"
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: 'lucide:grid' },
  { id: 'e-commerce', name: 'E-Commerce', icon: 'lucide:shopping-cart' },
  { id: 'security', name: 'Security', icon: 'lucide:shield' },
  { id: 'data', name: 'Data Management', icon: 'lucide:database' },
  { id: 'management', name: 'Management', icon: 'lucide:calendar' },
  { id: 'analytics', name: 'Analytics', icon: 'lucide:bar-chart' },
  { id: 'mobile', name: 'Mobile', icon: 'lucide:smartphone' }
];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [sortBy, setSortBy] = useState<'featured' | 'recent' | 'name'>('featured');

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'recent':
          return b.id - a.id;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <FloatingParticles count={20} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ textShadow: `0 0 30px ${neonColors.neonGreen}` }}
          >
            <span style={{ color: neonColors.lightYellow }}>Featured</span>{' '}
            <span 
              style={{ 
                background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Projects
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore my portfolio of innovative web applications, cybersecurity solutions, and data management systems.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-gray-900/50 backdrop-blur-sm border-2 text-white placeholder-gray-400 focus:outline-none"
                style={{ borderColor: neonColors.neonGreen }}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: `0 0 20px ${neonColors.neonGreen}40`
                }}
              />
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon icon="lucide:search" className="w-5 h-5" style={{ color: neonColors.lime }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
                style={{
                  backgroundColor: selectedCategory === category.id ? neonColors.neonGreen : 'transparent',
                  color: selectedCategory === category.id ? '#000' : neonColors.lightYellow,
                  border: `1px solid ${neonColors.lime}`,
                  boxShadow: selectedCategory === category.id ? `0 0 20px ${neonColors.neonGreen}` : 'none'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={category.icon} className="w-4 h-4" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Sort Options */}
          <motion.div 
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { value: 'featured', label: 'Featured', icon: 'lucide:star' },
              { value: 'recent', label: 'Recent', icon: 'lucide:clock' },
              { value: 'name', label: 'Name', icon: 'lucide:sort-asc' }
            ].map((sort) => (
              <motion.button
                key={sort.value}
                onClick={() => setSortBy(sort.value as any)}
                className="px-3 py-1 rounded-lg text-sm transition-all flex items-center gap-2"
                style={{
                  backgroundColor: sortBy === sort.value ? `${neonColors.lime}20` : 'transparent',
                  color: sortBy === sort.value ? neonColors.lime : neonColors.lightYellow,
                  border: sortBy === sort.value ? `1px solid ${neonColors.lime}` : '1px solid transparent'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={sort.icon} className="w-3 h-3" />
                {sort.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${sortBy}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                layout
              >
                <Card 
                  className="bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                  style={{ borderColor: neonColors.neonGreen }}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-black font-bold text-xs"
                      style={{ backgroundColor: neonColors.lightYellow }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <Icon icon="lucide:star" className="inline mr-1 w-3 h-3" />
                      Featured
                    </motion.div>
                  )}

                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>

                  <CardBody className="p-6">
                    <motion.h3 
                      className="text-xl font-bold mb-3"
                      style={{ color: neonColors.lightYellow }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 text-sm mb-4 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Project Details */}
                    {project.client && (
                      <motion.div 
                        className="flex items-center gap-2 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        <Icon icon="lucide:building" className="w-4 h-4" style={{ color: neonColors.lime }} />
                        <span className="text-xs text-gray-400">{project.client}</span>
                      </motion.div>
                    )}

                    {project.duration && (
                      <motion.div 
                        className="flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <Icon icon="lucide:clock" className="w-4 h-4" style={{ color: neonColors.lime }} />
                        <span className="text-xs text-gray-400">{project.duration}</span>
                      </motion.div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={tech}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.05, type: 'spring' }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <Chip
                            size="sm"
                            className="text-xs"
                            style={{
                              backgroundColor: neonColors.neonGreen,
                              color: '#000'
                            }}
                          >
                            {tech}
                          </Chip>
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>

                  <CardFooter className="p-6 pt-0">
                    <div className="flex gap-3 w-full">
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <NeonButton
                          icon="lucide:external-link"
                          color={neonColors.lime}
                          href={project.demoLink}
                          size="sm"
                          className="w-full"
                        >
                          Live Demo
                        </NeonButton>
                      </motion.div>
                      
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <NeonButton
                          icon="lucide:code"
                          color={neonColors.lightYellow}
                          variant="bordered"
                          href={project.codeLink}
                          size="sm"
                          className="w-full"
                        >
                          Source Code
                        </NeonButton>
                      </motion.div>
                    </div>
                  </CardFooter>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${neonColors.neonGreen}10, transparent)`,
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    animate={{
                      background: [
                        `radial-gradient(circle at center, ${neonColors.neonGreen}10, transparent)`,
                        `radial-gradient(circle at 30% 30%, ${neonColors.lime}10, transparent)`,
                        `radial-gradient(circle at center, ${neonColors.neonGreen}10, transparent)`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: neonColors.neonGreen }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Icon icon="lucide:search" className="w-12 h-12 text-black" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: neonColors.lightYellow }}>
              No Projects Found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or browse different categories.
            </p>
            <NeonButton
              icon="lucide:refresh-cw"
              color={neonColors.lime}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('featured');
              }}
            >
              Reset Filters
            </NeonButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
