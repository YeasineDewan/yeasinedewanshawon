import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Image, Chip, Progress, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ projects: 0, clients: 0, years: 0, certs: 0 });
  
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
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Animate stats when in view
  useEffect(() => {
    if (statsInView) {
      const duration = 2000;
      const steps = 60;
      const increment = {
        projects: stats[0].number / steps,
        clients: stats[1].number / steps,
        years: stats[2].number / steps,
        certs: stats[3].number / steps
      };
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setAnimatedStats({
          projects: Math.min(Math.round(increment.projects * currentStep), stats[0].number),
          clients: Math.min(Math.round(increment.clients * currentStep), stats[1].number),
          years: Math.min(Math.round(increment.years * currentStep), stats[2].number),
          certs: Math.min(Math.round(increment.certs * currentStep), stats[3].number)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [statsInView]);
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-lime-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      as={Link}
                      to="/projects"
                      size="lg"
                      className="px-8 py-4 text-lg font-semibold text-black"
                      style={{ 
                        backgroundColor: neonColors.neonGreen,
                        boxShadow: `0 0 30px ${neonColors.neonGreen}`
                      }}
                    >
                      <Icon icon="lucide:rocket" className="mr-2" />
                      View Projects
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      as={Link}
                      to="/services"
                      size="lg"
                      variant="bordered"
                      className="px-8 py-4 text-lg font-semibold border-2"
                      style={{ 
                        borderColor: neonColors.lime,
                        color: neonColors.lightYellow,
                        boxShadow: `0 0 20px ${neonColors.lime}`
                      }}
                    >
                      <Icon icon="lucide:user" className="mr-2" />
                      Hire Me
                    </Button>
                  </motion.div>
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
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="h-full bg-gray-900/50 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 group"
                  style={{ borderColor: feature.color }}
                >
                  <CardBody className="p-6 text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: feature.color }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon icon={feature.icon} className="w-8 h-8 text-black" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: feature.color }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon icon="lucide:check" className="w-4 h-4" style={{ color: feature.color }} />
                          <span className="text-xs text-gray-400">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
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
            {[
              { number: animatedStats.projects, label: 'Projects Completed', icon: 'lucide:briefcase' },
              { number: animatedStats.clients, label: 'Happy Clients', icon: 'lucide:users' },
              { number: animatedStats.years, label: 'Years Experience', icon: 'lucide:calendar' },
              { number: animatedStats.certs, label: 'Certifications', icon: 'lucide:award' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                    boxShadow: `0 0 30px ${neonColors.neonGreen}`
                  }}
                >
                  <Icon icon={stat.icon} className="w-8 h-8 text-black" />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: neonColors.lightYellow }}>
                  {stat.number}+
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
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
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={skillsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500 transition-all duration-300">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: neonColors.neonGreen }}
                      >
                        <Icon icon={skill.icon} className="w-5 h-5 text-black" />
                      </div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Proficiency</span>
                        <span style={{ color: neonColors.lightYellow }}>{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        size="sm"
                        className="h-2"
                        color="success"
                        style={{
                          background: '#1a1a1a',
                          boxShadow: `0 0 10px ${neonColors.neonGreen}`
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
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
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border-2" style={{ borderColor: neonColors.neonGreen }}>
                <CardBody className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl">{testimonials[currentTestimonial].avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Icon key={i} icon="lucide:star" className="w-5 h-5" style={{ color: neonColors.lightYellow }} />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>
                      <div>
                        <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                        <div className="text-sm" style={{ color: neonColors.lime }}>
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          {/* Testimonial Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'w-8' 
                    : ''
                }`}
                style={{
                  backgroundColor: currentTestimonial === index ? neonColors.neonGreen : '#4a4a4a',
                  boxShadow: currentTestimonial === index ? `0 0 10px ${neonColors.neonGreen}` : 'none'
                }}
              />
            ))}
          </div>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  as={Link}
                  to="/contact"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold"
                  style={{ 
                    backgroundColor: neonColors.lightYellow,
                    color: '#000'
                  }}
                >
                  <Icon icon="lucide:message-square" className="mr-2" />
                  Start a Project
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  as={Link}
                  to="/services"
                  size="lg"
                  variant="bordered"
                  className="px-8 py-4 text-lg font-semibold border-2 text-white"
                  style={{ borderColor: neonColors.lightYellow }}
                >
                  <Icon icon="lucide:file-text" className="mr-2" />
                  View Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;