import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, Image, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import InteractiveCard from '../components/InteractiveCard';
import AnimatedSkillBar from '../components/AnimatedSkillBar';
import CertificationCard from '../components/CertificationCard';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';

// Neon color palette
const neonColors = {
  darkGreen: '#059212',
  neonGreen: '#06D001',
  lightYellow: '#F3FF90',
  lime: '#9BEC00'
};

// Skills data
const skills = [
  { name: 'Full Stack Development', icon: 'lucide:code', level: 95, category: 'development' },
  { name: 'Penetration Testing', icon: 'lucide:shield', level: 90, category: 'security' },
  { name: 'Cloud Security', icon: 'lucide:cloud', level: 85, category: 'security' },
  { name: 'React/Next.js', icon: 'lucide:atom', level: 92, category: 'development' },
  { name: 'Node.js/Express', icon: 'lucide:server', level: 88, category: 'development' },
  { name: 'Python/Django', icon: 'lucide:terminal', level: 87, category: 'development' },
  { name: 'AWS/Azure', icon: 'lucide:cloud-sun', level: 83, category: 'cloud' },
  { name: 'Docker/Kubernetes', icon: 'lucide:package', level: 80, category: 'cloud' },
  { name: 'Network Security', icon: 'lucide:network', level: 91, category: 'security' },
  { name: 'UI/UX Design', icon: 'lucide:palette', level: 86, category: 'design' },
  { name: 'Database Design', icon: 'lucide:database', level: 89, category: 'development' },
  { name: 'DevOps/CI-CD', icon: 'lucide:git-branch', level: 84, category: 'cloud' }
];

// Features data
const features = [
  {
    title: 'Secure Web Development',
    description: 'Building web applications with security-first approach, implementing OWASP best practices and conducting thorough security audits.',
    icon: 'lucide:shield-check',
    highlights: ['OWASP Compliance', 'Security Audits', 'Penetration Testing'],
    color: neonColors.darkGreen
  },
  {
    title: 'Cloud Architecture',
    description: 'Designing and deploying scalable cloud solutions on AWS and Azure with proper security configurations and cost optimization.',
    icon: 'lucide:cloud-sun-rain',
    highlights: ['AWS Solutions', 'Azure DevOps', 'Cost Optimization'],
    color: neonColors.neonGreen
  },
  {
    title: 'Cybersecurity Consulting',
    description: 'Comprehensive security assessments including vulnerability scanning, penetration testing, and security training for teams.',
    icon: 'lucide:bug',
    highlights: ['Vulnerability Assessment', 'Security Training', 'Compliance'],
    color: neonColors.lime
  },
  {
    title: 'Performance Optimization',
    description: 'Optimizing application performance through code optimization, database tuning, and implementing caching strategies.',
    icon: 'lucide:zap',
    highlights: ['Speed Optimization', 'Database Tuning', 'CDN Implementation'],
    color: neonColors.lightYellow
  }
];

// Projects data
const projects = [
  {
    title: 'E-Commerce Security Platform',
    description: 'Built a secure e-commerce platform with real-time fraud detection and payment processing.',
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=ecommerce-security',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'web',
    featured: true
  },
  {
    title: 'Cloud Security Scanner',
    description: 'Automated security scanning tool for cloud infrastructure with vulnerability assessment.',
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=cloud-scanner',
    tech: ['Python', 'AWS', 'Docker', 'Kubernetes'],
    category: 'security',
    featured: true
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive dashboard for business analytics with real-time data processing and visualization.',
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=analytics-dashboard',
    tech: ['Next.js', 'WebSocket', 'MongoDB', 'D3.js'],
    category: 'data',
    featured: false
  },
  {
    title: 'Mobile Security App',
    description: 'Cross-platform mobile application for security awareness and incident reporting.',
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=mobile-security',
    tech: ['React Native', 'Firebase', 'Node.js'],
    category: 'mobile',
    featured: false
  }
];

// Certifications data
const certifications = [
  {
    name: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: '2023',
    credentialId: 'ECC123456789',
    icon: 'lucide:award',
    color: neonColors.darkGreen
  },
  {
    name: 'AWS Certified Security - Specialty',
    issuer: 'Amazon Web Services',
    date: '2023',
    credentialId: 'AWS-SSEC-123456',
    icon: 'lucide:cloud',
    color: neonColors.neonGreen
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: '2022',
    credentialId: 'COMP-SEC-789012',
    icon: 'lucide:shield-check',
    color: neonColors.lime
  },
  {
    name: 'Certified Cloud Security Professional (CCSP)',
    issuer: '(ISC)²',
    date: '2023',
    credentialId: 'CCSP-123456789',
    icon: 'lucide:cloud-sun',
    color: neonColors.lightYellow
  }
];

// Stats data
const stats = [
  { number: 50, label: 'Projects Completed', icon: 'lucide:briefcase' },
  { number: 30, label: 'Happy Clients', icon: 'lucide:users' },
  { number: 5, label: 'Years Experience', icon: 'lucide:calendar' },
  { number: 15, label: 'Certifications', icon: 'lucide:award' }
];

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechStart',
    content: 'Exceptional developer with deep security knowledge. Delivered our e-commerce platform ahead of schedule with robust security measures.',
    avatar: '👩‍💼',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Security Lead at CloudCorp',
    content: 'Outstanding penetration testing skills. Identified critical vulnerabilities we had missed and provided detailed remediation guidance.',
    avatar: '👨‍💻',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager at InnovateCo',
    content: 'Full-stack expertise combined with security awareness is rare. Built our analytics platform with excellent performance and security.',
    avatar: '👩‍🎨',
    rating: 5
  }
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Animated Background Particles */}
      <FloatingParticles count={25} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10"
      >
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-lime-900/20" />
          
          <div className="relative z-10 container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={heroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={heroInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block"
                >
                  <Chip 
                    className="px-4 py-2 text-sm font-semibold"
                    style={{ 
                      backgroundColor: neonColors.neonGreen,
                      color: '#000',
                      boxShadow: `0 0 20px ${neonColors.neonGreen}`
                    }}
                  >
                    <Icon icon="lucide:zap" className="mr-2" />
                    Full Stack Developer & Security Expert
                  </Chip>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="block" style={{ color: neonColors.lightYellow }}>
                    Building Secure
                  </span>
                  <span 
                    className="block"
                    style={{ 
                      background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: `drop-shadow(0 0 30px ${neonColors.neonGreen})`
                    }}
                  >
                    Digital Future
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Specialized in creating robust web applications with cutting-edge security measures. 
                  From concept to deployment, I ensure your digital presence is both powerful and protected.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <NeonButton 
                    icon="lucide:rocket"
                    color={neonColors.neonGreen}
                    href="/projects"
                  >
                    View Projects
                  </NeonButton>
                  
                  <NeonButton 
                    icon="lucide:user"
                    color={neonColors.lime}
                    variant="bordered"
                    href="/services"
                  >
                    Hire Me
                  </NeonButton>
                </motion.div>
                
                <motion.div 
                  className="flex gap-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {[
                    { icon: 'lucide:shield-check', label: 'Security First' },
                    { icon: 'lucide:zap', label: 'High Performance' },
                    { icon: 'lucide:award', label: 'Expert Level' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon 
                        icon={item.icon} 
                        className="w-5 h-5"
                        style={{ color: neonColors.lime }}
                      />
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={heroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="relative"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                      filter: 'blur(40px)',
                      opacity: 0.3
                    }}
                  />
                  <Image
                    src="https://img.heroui.chat/image/ai?w=600&h=400&u=cybersecurity-developer"
                    alt="Cybersecurity Developer"
                    className="relative z-10 rounded-2xl shadow-2xl border-2"
                    style={{ borderColor: neonColors.neonGreen }}
                  />
                </motion.div>
                
                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 z-20"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={heroInView ? { scale: 1, rotate: 360 } : {}}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                >
                  <div 
                    className="px-4 py-2 rounded-full text-black font-bold text-sm"
                    style={{ backgroundColor: neonColors.lightYellow }}
                  >
                    <Icon icon="lucide:star" className="inline mr-1" />
                    Top Rated
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 z-20"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={heroInView ? { scale: 1, rotate: -360 } : {}}
                  transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                >
                  <div 
                    className="px-4 py-2 rounded-full text-black font-bold text-sm"
                    style={{ backgroundColor: neonColors.lime }}
                  >
                    <Icon icon="lucide:shield-check" className="inline mr-1" />
                    Security Expert
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        ref={featuresRef}
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={featuresInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span style={{ color: neonColors.lightYellow }}>Core</span>{' '}
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Delivering comprehensive solutions with specialized skills in web development, cybersecurity, and cloud architecture.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <InteractiveCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                highlights={feature.highlights}
                color={feature.color}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        ref={statsRef}
        className="relative z-10 py-20"
        style={{
          background: `linear-gradient(135deg, ${neonColors.darkGreen}20, ${neonColors.neonGreen}10, ${neonColors.lime}20)`
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={statsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                target={stat.number}
                label={stat.label}
                icon={stat.icon}
                color={neonColors.neonGreen}
                delay={0.2 + index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div 
        ref={skillsRef}
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        animate={skillsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={skillsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span style={{ color: neonColors.lightYellow }}>Technical</span>{' '}
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Skills
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive skill set covering modern web development, cybersecurity, and cloud technologies.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSkillBar
                key={index}
                name={skill.name}
                icon={skill.icon}
                level={skill.level}
                color={neonColors.neonGreen}
                delay={0.3 + index * 0.05}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Showcase */}
      <motion.div 
        ref={projectsRef}
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        animate={projectsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={projectsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
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
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Showcasing innovative solutions that demonstrate expertise across different domains.
            </p>
            
            {/* Category Filter */}
            <div className="flex justify-center gap-2 flex-wrap">
              {['all', 'web', 'security', 'data', 'mobile'].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: selectedCategory === category ? neonColors.neonGreen : 'transparent',
                    color: selectedCategory === category ? '#000' : neonColors.lightYellow,
                    border: `1px solid ${neonColors.lime}`,
                    boxShadow: selectedCategory === category ? `0 0 20px ${neonColors.neonGreen}` : 'none'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500 transition-all duration-300 overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      {project.featured && (
                        <div 
                          className="absolute top-4 right-4 px-3 py-1 rounded-full text-black font-bold text-xs"
                          style={{ backgroundColor: neonColors.lightYellow }}
                        >
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardBody className="p-6">
                      <h3 className="text-xl font-bold mb-2" style={{ color: neonColors.lightYellow }}>
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <Chip
                            key={i}
                            size="sm"
                            className="text-xs"
                            style={{
                              backgroundColor: neonColors.neonGreen,
                              color: '#000'
                            }}
                          >
                            {tech}
                          </Chip>
                        ))}
                      </div>
                      <Button
                        as={Link}
                        to="/projects"
                        size="sm"
                        className="text-black font-semibold"
                        style={{ backgroundColor: neonColors.lime }}
                      >
                        View Details
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Certifications Showcase */}
      <motion.div 
        className="relative z-10 py-20"
        style={{
          background: `linear-gradient(135deg, ${neonColors.darkGreen}20, ${neonColors.neonGreen}10, ${neonColors.lime}20)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span style={{ color: neonColors.lightYellow }}>Professional</span>{' '}
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Certifications
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-recognized certifications validating expertise in cybersecurity, cloud architecture, and development.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={index}
                name={cert.name}
                issuer={cert.issuer}
                date={cert.date}
                credentialId={cert.credentialId}
                icon={cert.icon}
                color={cert.color}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        ref={testimonialsRef}
        className="relative z-10 py-20"
        style={{
          background: `linear-gradient(135deg, ${neonColors.darkGreen}20, ${neonColors.neonGreen}10, ${neonColors.lime}20)`
        }}
        initial={{ opacity: 0 }}
        animate={testimonialsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={testimonialsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span style={{ color: neonColors.lightYellow }}>Client</span>{' '}
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              What clients say about working with me
            </p>
          </motion.div>
          
          <TestimonialCarousel 
            testimonials={testimonials}
            color={neonColors.neonGreen}
          />
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative z-10 py-20"
        initial={{ opacity: 0 }}
        animate={testimonialsInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center p-12 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${neonColors.darkGreen}, ${neonColors.neonGreen})`,
              boxShadow: `0 0 50px ${neonColors.neonGreen}`
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-black">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl mb-8 text-black/90">
              Let's discuss your project and create a solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton 
                icon="lucide:message-square"
                color={neonColors.lightYellow}
                href="/contact"
              >
                Start a Project
              </NeonButton>
              
              <NeonButton 
                icon="lucide:file-text"
                color={neonColors.lightYellow}
                variant="bordered"
                href="/services"
              >
                View Services
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;