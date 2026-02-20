import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Image, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ShirtBazar E-commerce Platform",
    description: "Developed and managed a comprehensive e-commerce platform for clothing retail. Implemented secure payment processing and inventory management systems.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=ecommerce-shirtbazar",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "Bootstrap"],
    demoLink: "https://shirtbazar.com",
    codeLink: "https://github.com/yeasinedewan/shirtbazar"
  },
  {
    id: 2,
    title: "Cybersecurity Training Platform",
    description: "Created educational content and training modules for cybersecurity awareness. Developed interactive learning materials for ethical hacking and penetration testing.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=cybersecurity-training",
    tags: ["Python", "Cybersecurity", "Pentesting", "Network Security"],
    demoLink: "https://cyber-training-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/cyber-training"
  },
  {
    id: 3,
    title: "Data Management System",
    description: "Built efficient data entry and management systems for election commission. Implemented secure data handling and reporting mechanisms.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=data-management",
    tags: ["Python", "Database", "Data Entry", "Security"],
    demoLink: "https://data-system-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/data-management"
  },
  {
    id: 4,
    title: "Event Management System",
    description: "Developed comprehensive event management solutions for Sesame Street events. Created registration, scheduling, and reporting systems.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=event-management",
    tags: ["HTML5", "CSS3", "JavaScript", "Event Management"],
    demoLink: "https://event-system-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/event-management"
  },
  {
    id: 5,
    title: "Network Design & Security",
    description: "Designed and implemented secure network architectures. Created network protocols and security layers for enterprise environments.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=network-design",
    tags: ["Network Design", "Network Security", "Protocols", "Infrastructure"],
    demoLink: "https://network-demo.example.com",
    codeLink: "https://github.com/yeasinedewan/network-design"
  },
  {
    id: 6,
    title: "Web Development Portfolio",
    description: "Personal portfolio showcasing full-stack development skills. Features responsive design, modern UI/UX, and interactive components.",
    image: "https://img.heroui.chat/image/ai?w=400&h=200&u=portfolio-website",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    demoLink: "https://yeasinedewan.dev",
    codeLink: "https://github.com/yeasinedewan/portfolio"
  }
];



const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Web Development', 'App Development', 'Cybersecurity', 'Others'];

  const getFilteredProjects = () => {
    if (filter === 'All') return projects;
    
    const categoryMap: { [key: string]: string[] } = {
      'Web Development': ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      'App Development': ['React', 'TypeScript', 'Vite'],
      'Cybersecurity': ['Python', 'Cybersecurity', 'Pentesting', 'Network Security', 'Security'],
      'Others': ['Event Management', 'Network Design', 'Protocols', 'Infrastructure', 'Database', 'Data Entry']
    };
    
    const allowedTags = categoryMap[filter] || [];
    return projects.filter(project => 
      project.tags.some(tag => allowedTags.includes(tag))
    );
  };

  const filteredProjects = getFilteredProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <Chip
            key={category}
            color={filter === category ? "primary" : "default"}
            variant={filter === category ? "solid" : "bordered"}
            onClick={() => setFilter(category)}
          >
            {category}
          </Chip>
        ))}
      </div>

      {/* Category Info Cards */}
      {filter === 'All' && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Project Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Web Development Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-400 hover:glow-blue card-hover">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon icon="lucide:globe" width="48" height="48" className="text-blue-600 hover:text-blue-700 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-blue-800">Web Development</h4>
              </CardHeader>
              <CardBody className="text-center">
                <p className="text-sm text-blue-700 mb-4">
                  Modern, responsive websites and web applications built with cutting-edge technologies.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {['HTML5', 'CSS3', 'JavaScript', 'React', 'PHP', 'Bootstrap'].map(tech => (
                    <Chip key={tech} size="sm" variant="flat" className="bg-blue-200 text-blue-800 hover:bg-blue-300 transition-colors">
                      {tech}
                    </Chip>
                  ))}
                </div>
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={() => setFilter('Web Development')}
                  className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 btn-hover-effect"
                >
                  View Projects
                </Button>
              </CardBody>
            </Card>

            {/* App Development Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-green-400 hover:glow-green card-hover">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon icon="lucide:smartphone" width="48" height="48" className="text-green-600 hover:text-green-700 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-green-800">App Development</h4>
              </CardHeader>
              <CardBody className="text-center">
                <p className="text-sm text-green-700 mb-4">
                  Cross-platform mobile applications and progressive web apps for modern businesses.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {['React', 'TypeScript', 'Vite', 'PWA'].map(tech => (
                    <Chip key={tech} size="sm" variant="flat" className="bg-green-200 text-green-800 hover:bg-green-300 transition-colors">
                      {tech}
                    </Chip>
                  ))}
                </div>
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={() => setFilter('App Development')}
                  className="bg-green-600 hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-200 btn-hover-effect"
                >
                  View Projects
                </Button>
              </CardBody>
            </Card>

            {/* Cybersecurity Card */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-red-400 hover:glow-red card-hover">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon icon="lucide:shield" width="48" height="48" className="text-red-600 hover:text-red-700 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-red-800">Cybersecurity</h4>
              </CardHeader>
              <CardBody className="text-center">
                <p className="text-sm text-red-700 mb-4">
                  Security assessments, penetration testing, and cybersecurity solutions for organizations.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {['Python', 'Pentesting', 'Network Security', 'Security'].map(tech => (
                    <Chip key={tech} size="sm" variant="flat" className="bg-red-200 text-red-800 hover:bg-red-300 transition-colors">
                      {tech}
                    </Chip>
                  ))}
                </div>
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={() => setFilter('Cybersecurity')}
                  className="bg-red-600 hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-all duration-200 btn-hover-effect"
                >
                  View Projects
                </Button>
              </CardBody>
            </Card>

            {/* Others Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-purple-400 hover:glow-purple card-hover">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon icon="lucide:settings" width="48" height="48" className="text-purple-600 hover:text-purple-700 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-purple-800">Others</h4>
              </CardHeader>
              <CardBody className="text-center">
                <p className="text-sm text-purple-700 mb-4">
                  Specialized services including event management, network design, and data solutions.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {['Event Management', 'Network Design', 'Data Entry', 'Infrastructure'].map(tech => (
                    <Chip key={tech} size="sm" variant="flat" className="bg-purple-200 text-purple-800 hover:bg-purple-300 transition-colors">
                      {tech}
                    </Chip>
                  ))}
                </div>
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={() => setFilter('Others')}
                  className="bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-200 btn-hover-effect"
                >
                  View Projects
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <Card key={project.id} className="bg-content2 hover:shadow-md transition-shadow">
            <CardBody className="p-0">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <Chip key={tag} size="sm" variant="flat">{tag}</Chip>
                  ))}
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between">
              <Button as="a" href={project.demoLink} target="_blank" color="primary" variant="flat" size="sm">
                <Icon icon="lucide:external-link" className="mr-1" /> Demo
              </Button>
              <Button as="a" href={project.codeLink} target="_blank" color="secondary" variant="flat" size="sm">
                <Icon icon="lucide:code" className="mr-1" /> Code
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;