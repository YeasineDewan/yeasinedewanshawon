export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO string
  author: string;
  category: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Securing Your Web Application: Best Practices',
    excerpt:
      'Learn about the latest techniques to protect your web applications from common vulnerabilities and implement robust security measures.',
    content:
      'In this comprehensive guide, we explore essential security practices every developer should implement to protect their web applications from modern threats...',
    date: '2024-03-15',
    author: 'MD. Yeasine Dewan Shawon',
    category: 'Web Security',
    readTime: 8,
    tags: ['Security', 'Web Development', 'Best Practices'],
    featured: true,
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=web-security',
  },
  {
    id: 2,
    title: 'Introduction to Penetration Testing',
    excerpt:
      "Discover the basics of penetration testing and why it's crucial for your organization's security posture.",
    content:
      'Penetration testing is a critical component of any comprehensive security strategy. This article covers the fundamentals...',
    date: '2024-03-10',
    author: 'MD. Yeasine Dewan Shawon',
    category: 'Penetration Testing',
    readTime: 12,
    tags: ['Pentesting', 'Security', 'Ethical Hacking'],
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=pentesting',
  },
  {
    id: 3,
    title: 'The Rise of AI in Cybersecurity',
    excerpt:
      'Explore how artificial intelligence is revolutionizing the field of cybersecurity with advanced threat detection.',
    content:
      'Artificial intelligence is transforming cybersecurity in unprecedented ways. From machine learning-powered threat detection...',
    date: '2024-03-05',
    author: 'MD. Yeasine Dewan Shawon',
    category: 'Cybersecurity Trends',
    readTime: 10,
    tags: ['AI', 'Machine Learning', 'Cybersecurity', 'Future Tech'],
    featured: true,
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=ai-cybersecurity',
  },
  {
    id: 4,
    title: 'Building Scalable APIs with Node.js',
    excerpt:
      'Learn how to design and implement RESTful APIs that can handle millions of requests efficiently.',
    content:
      'Building scalable APIs requires careful planning and the right architectural patterns. In this article, we explore...',
    date: '2024-02-28',
    author: 'MD. Yeasine Dewan Shawon',
    category: 'Backend Development',
    readTime: 15,
    tags: ['Node.js', 'API', 'Backend', 'Scalability'],
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=nodejs-api',
  },
  {
    id: 5,
    title: 'Cloud Security Best Practices',
    excerpt:
      'Essential security measures every organization should implement when migrating to cloud infrastructure.',
    content:
      'Cloud security presents unique challenges and opportunities. This comprehensive guide covers...',
    date: '2024-02-20',
    author: 'MD. Yeasine Dewan Shawon',
    category: 'Cloud Security',
    readTime: 11,
    tags: ['Cloud', 'Security', 'AWS', 'Azure'],
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=cloud-security',
  },
  {
    id: 6,
    title: 'Modern Frontend Development with React',
    excerpt:
      'Discover the latest React patterns and best practices for building performant web applications.',
    content:
      'React continues to evolve with new features and patterns. This article explores modern React development...',
    date: '2024-02-15',
    author: 'MD. Yeasine Dewan Shawon',
    category: 'Frontend Development',
    readTime: 9,
    tags: ['React', 'Frontend', 'JavaScript', 'Web Development'],
    image: 'https://img.heroui.chat/image/ai?w=600&h=400&u=react-development',
  },
];

export const blogCategoryOptions = [
  { id: 'all', name: 'All Posts', icon: 'lucide:grid' },
  { id: 'web-security', name: 'Web Security', icon: 'lucide:shield' },
  { id: 'pentesting', name: 'Penetration Testing', icon: 'lucide:bug' },
  { id: 'cybersecurity-trends', name: 'Cybersecurity Trends', icon: 'lucide:trending-up' },
  { id: 'backend', name: 'Backend Development', icon: 'lucide:server' },
  { id: 'cloud', name: 'Cloud Security', icon: 'lucide:cloud' },
  { id: 'frontend', name: 'Frontend Development', icon: 'lucide:monitor' },
] as const;

