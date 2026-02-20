import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button, Input, Textarea, Badge } from '@heroui/react';
import { Modal } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read?: boolean;
  source?: 'contact' | 'portfolio' | 'blog';
  category?: 'inquiry' | 'feedback' | 'collaboration' | 'support';
}

interface BlogReaction {
  id: number;
  postId: number;
  postTitle: string;
  reaction: 'like' | 'comment' | 'share';
  userEmail?: string;
  comment?: string;
  date: string;
}

interface PortfolioInteraction {
  id: number;
  type: 'view' | 'download' | 'contact' | 'hire';
  projectName?: string;
  userAgent?: string;
  location?: string;
  date: string;
}

interface BlogPost {
  id: number | null;
  title: string;
  date: string;
  status: string;
  content: string;
}

interface PortfolioRating {
  id: number;
  rating: number;
  comment?: string;
  date: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'Pending';
  startDate: string;
  endDate: string;
}

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [portfolioRatings, setPortfolioRatings] = useState<PortfolioRating[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState<string>('');
  const [showRatingModal, setShowRatingModal] = useState(false);

  // New state for enhanced analytics
  const [blogReactions, setBlogReactions] = useState<BlogReaction[]>([]);
  const [portfolioInteractions, setPortfolioInteractions] = useState<PortfolioInteraction[]>([]);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  // Dashboard metrics
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchMessages(),
        fetchPortfolioRatings(),
        fetchBlogPosts(),
        fetchProjects(),
        fetchBlogReactions(),
        fetchPortfolioInteractions()
      ]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blog-posts');
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      // Mock data for demo
      setBlogPosts([
        { id: 1, title: 'Web Security Best Practices', date: '2024-01-15', status: 'Published', content: 'Content here...' },
        { id: 2, title: 'Cybersecurity Trends 2024', date: '2024-01-10', status: 'Draft', content: 'Content here...' },
        { id: 3, title: 'React Development Tips', date: '2024-01-05', status: 'Published', content: 'Content here...' }
      ]);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      // Mock data for demo
      setProjects([
        { id: 1, name: 'E-commerce Platform', description: 'Full-stack e-commerce solution', status: 'Active', startDate: '2024-01-01', endDate: '2024-03-01' },
        { id: 2, name: 'Cybersecurity Training Portal', description: 'Online training platform', status: 'Completed', startDate: '2023-10-01', endDate: '2023-12-31' },
        { id: 3, name: 'Data Management System', description: 'Enterprise data solution', status: 'Pending', startDate: '2024-02-01', endDate: '2024-05-01' }
      ]);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      // Mock data for demo
      setMessages([
        { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', message: 'I would like to discuss a potential project...', date: '2024-01-15T10:30:00Z', read: false },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Collaboration Request', message: 'Looking for a developer to collaborate...', date: '2024-01-14T15:45:00Z', read: true },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Service Question', message: 'What services do you offer for...', date: '2024-01-13T09:20:00Z', read: false }
      ]);
    }
  };

  const fetchPortfolioRatings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio-ratings');
      const data = await response.json();
      setPortfolioRatings(data);
    } catch (error) {
      console.error('Failed to fetch portfolio ratings:', error);
      // Mock data for demo
      setPortfolioRatings([
        { id: 1, rating: 5, comment: 'Excellent work and communication!', date: '2024-01-15T12:00:00Z' },
        { id: 2, rating: 4, comment: 'Great developer, highly recommended', date: '2024-01-14T16:30:00Z' },
        { id: 3, rating: 5, comment: 'Outstanding quality and professionalism', date: '2024-01-13T11:15:00Z' },
        { id: 4, rating: 4, comment: 'Very satisfied with the results', date: '2024-01-12T14:20:00Z' },
        { id: 5, rating: 5, comment: 'Amazing attention to detail', date: '2024-01-11T10:45:00Z' }
      ]);
    }
  };

  const fetchBlogReactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blog-reactions');
      const data = await response.json();
      setBlogReactions(data);
    } catch (error) {
      console.error('Failed to fetch blog reactions:', error);
      // Mock data for demo
      setBlogReactions([
        { id: 1, postId: 1, postTitle: 'Web Security Best Practices', reaction: 'like', date: '2024-01-15T10:30:00Z' },
        { id: 2, postId: 1, postTitle: 'Web Security Best Practices', reaction: 'comment', userEmail: 'john@example.com', comment: 'Great insights on security!', date: '2024-01-15T09:15:00Z' },
        { id: 3, postId: 2, postTitle: 'Cybersecurity Trends 2024', reaction: 'share', date: '2024-01-14T16:45:00Z' },
        { id: 4, postId: 3, postTitle: 'React Development Tips', reaction: 'like', date: '2024-01-14T14:20:00Z' },
        { id: 5, postId: 3, postTitle: 'React Development Tips', reaction: 'comment', userEmail: 'sarah@example.com', comment: 'These tips saved me hours!', date: '2024-01-14T11:30:00Z' },
        { id: 6, postId: 1, postTitle: 'Web Security Best Practices', reaction: 'share', date: '2024-01-13T15:10:00Z' }
      ]);
    }
  };

  const fetchPortfolioInteractions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio-interactions');
      const data = await response.json();
      setPortfolioInteractions(data);
    } catch (error) {
      console.error('Failed to fetch portfolio interactions:', error);
      // Mock data for demo
      setPortfolioInteractions([
        { id: 1, type: 'view', projectName: 'E-commerce Platform', location: 'New York, US', date: '2024-01-15T12:00:00Z' },
        { id: 2, type: 'download', projectName: 'Cybersecurity Training Portal', location: 'London, UK', date: '2024-01-15T10:30:00Z' },
        { id: 3, type: 'contact', projectName: 'Data Management System', location: 'Toronto, CA', date: '2024-01-15T09:15:00Z' },
        { id: 4, type: 'hire', projectName: 'E-commerce Platform', location: 'Sydney, AU', date: '2024-01-14T16:45:00Z' },
        { id: 5, type: 'view', projectName: 'React Development Tips', location: 'Berlin, DE', date: '2024-01-14T14:20:00Z' },
        { id: 6, type: 'download', projectName: 'Web Security Guide', location: 'Tokyo, JP', date: '2024-01-14T11:30:00Z' },
        { id: 7, type: 'contact', projectName: 'Portfolio Website', location: 'Mumbai, IN', date: '2024-01-13T15:10:00Z' },
        { id: 8, type: 'view', projectName: 'Mobile App Development', location: 'São Paulo, BR', date: '2024-01-13T12:45:00Z' }
      ]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'dewan_shawon' && password === '123123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };



  const deleteMessage = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchMessages();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to delete message'), 'delete message');
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      // Remove from local state for demo
      setMessages(prev => prev.filter(msg => msg.id !== id));
      refreshDashboard();
    }
  };

  // Enhanced CRUD operations for Messages
  const updateMessage = async (id: number, updatedData: Partial<Message>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        await fetchMessages();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to update message'), 'update message');
      }
    } catch (error) {
      console.error('Failed to update message:', error);
      // Update local state for demo
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, ...updatedData } : msg));
      refreshDashboard();
    }
  };

  const addMessage = async (newMessage: Omit<Message, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      if (response.ok) {
        await fetchMessages();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to add message'), 'add message');
      }
    } catch (error) {
      console.error('Failed to add message:', error);
      // Add to local state for demo
      const newId = Math.max(...messages.map(m => m.id), 0) + 1;
      setMessages(prev => [...prev, { ...newMessage, id: newId }]);
      refreshDashboard();
    }
  };

  const queryMessages = async (filters: {
    source?: string;
    category?: string;
    read?: boolean;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
      
      const response = await fetch(`http://localhost:5000/api/messages/query?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        handleError(new Error('Failed to query messages'), 'query messages');
      }
    } catch (error) {
      console.error('Failed to query messages:', error);
      // Filter local state for demo
      let filtered = messages;
      if (filters.source) filtered = filtered.filter(m => m.source === filters.source);
      if (filters.category) filtered = filtered.filter(m => m.category === filters.category);
      if (filters.read !== undefined) filtered = filtered.filter(m => m.read === filters.read);
      if (filters.dateFrom) filtered = filtered.filter(m => new Date(m.date) >= new Date(filters.dateFrom!));
      if (filters.dateTo) filtered = filtered.filter(m => new Date(m.date) <= new Date(filters.dateTo!));
      setMessages(filtered);
    }
  };



  const openProjectModal = (project: Project | null) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setShowProjectModal(false);
  };

  const saveProject = async () => {
    if (!selectedProject) return;
    const method = selectedProject.id ? 'PUT' : 'POST';
    const url = selectedProject.id
      ? `http://localhost:5000/api/projects/${selectedProject.id}`
      : 'http://localhost:5000/api/projects';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedProject),
      });
      if (response.ok) {
        await fetchProjects();
        closeProjectModal();
        // Refresh dashboard metrics
        refreshDashboard();
      } else {
        handleError(new Error(`HTTP ${response.status}`), 'save project');
      }
    } catch (error) {
      handleError(error, 'save project');
      // Update local state for demo
      if (selectedProject.id) {
        setProjects(prev => prev.map(p => p.id === selectedProject.id ? selectedProject : p));
      } else {
        setProjects(prev => [...prev, { ...selectedProject, id: Date.now() }]);
      }
      closeProjectModal();
    }
  };

  // Enhanced CRUD operations for Projects
  const deleteProject = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchProjects();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to delete project'), 'delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      // Remove from local state for demo
      setProjects(prev => prev.filter(project => project.id !== id));
      refreshDashboard();
    }
  };

  const updateProject = async (id: number, updatedData: Partial<Project>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        await fetchProjects();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to update project'), 'update project');
      }
    } catch (error) {
      console.error('Failed to update project:', error);
      // Update local state for demo
      setProjects(prev => prev.map(project => project.id === id ? { ...project, ...updatedData } : project));
      refreshDashboard();
    }
  };

  const addProject = async (newProject: Omit<Project, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        await fetchProjects();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to add project'), 'add project');
      }
    } catch (error) {
      console.error('Failed to add project:', error);
      // Add to local state for demo
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects(prev => [...prev, { ...newProject, id: newId }]);
      refreshDashboard();
    }
  };

  const queryProjects = async (filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    name?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
      
      const response = await fetch(`http://localhost:5000/api/projects/query?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        handleError(new Error('Failed to query projects'), 'query projects');
      }
    } catch (error) {
      console.error('Failed to query projects:', error);
      // Filter local state for demo
      let filtered = projects;
      if (filters.status) filtered = filtered.filter(p => p.status === filters.status);
      if (filters.name) filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.name!.toLowerCase()));
      if (filters.dateFrom) filtered = filtered.filter(p => new Date(p.startDate) >= new Date(filters.dateFrom!));
      if (filters.dateTo) filtered = filtered.filter(p => new Date(p.endDate) <= new Date(filters.dateTo!));
      setProjects(filtered);
    }
  };

  const savePost = async () => {
    if (!editingPost) return;
    const method = editingPost.id ? 'PUT' : 'POST';
    const url = editingPost.id
      ? `http://localhost:5000/api/blog-posts/${editingPost.id}`
      : 'http://localhost:5000/api/blog-posts';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost),
      });
      if (response.ok) {
        await fetchBlogPosts();
        closeEditModal();
        // Refresh dashboard metrics
        refreshDashboard();
      } else {
        handleError(new Error(`HTTP ${response.status}`), 'save blog post');
      }
    } catch (error) {
      handleError(error, 'save blog post');
      // Update local state for demo
      if (editingPost.id) {
        setBlogPosts(prev => prev.map(p => p.id === editingPost.id ? editingPost : p));
      } else {
        setBlogPosts(prev => [...prev, { ...editingPost, id: Date.now() }]);
      }
      closeEditModal();
    }
  };

  // Enhanced CRUD operations for Blog Posts
  const deleteBlogPost = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog-posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchBlogPosts();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to delete blog post'), 'delete blog post');
      }
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      // Remove from local state for demo
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      refreshDashboard();
    }
  };

  const updateBlogPost = async (id: number, updatedData: Partial<BlogPost>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog-posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        await fetchBlogPosts();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to update blog post'), 'update blog post');
      }
    } catch (error) {
      console.error('Failed to update blog post:', error);
      // Update local state for demo
      setBlogPosts(prev => prev.map(post => post.id === id ? { ...post, ...updatedData } : post));
      refreshDashboard();
    }
  };

  const addBlogPost = async (newPost: Omit<BlogPost, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        await fetchBlogPosts();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to add blog post'), 'add blog post');
      }
    } catch (error) {
      console.error('Failed to add blog post:', error);
      // Add to local state for demo
      const newId = Math.max(...blogPosts.map(p => p.id || 0), 0) + 1;
      setBlogPosts(prev => [...prev, { ...newPost, id: newId }]);
      refreshDashboard();
    }
  };

  const queryBlogPosts = async (filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    title?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
      
      const response = await fetch(`http://localhost:5000/api/blog-posts/query?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        handleError(new Error('Failed to query blog posts'), 'query blog posts');
      }
    } catch (error) {
      console.error('Failed to query blog posts:', error);
      // Filter local state for demo
      let filtered = blogPosts;
      if (filters.status) filtered = filtered.filter(p => p.status === filters.status);
      if (filters.title) filtered = filtered.filter(p => p.title.toLowerCase().includes(filters.title!.toLowerCase()));
      if (filters.dateFrom) filtered = filtered.filter(p => new Date(p.date) >= new Date(filters.dateFrom!));
      if (filters.dateTo) filtered = filtered.filter(p => new Date(p.date) <= new Date(filters.dateTo!));
      setBlogPosts(filtered);
    }
  };

  const openMessageModal = (message: Message | null) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
    setShowMessageModal(false);
  };

  const openEditModal = (post: BlogPost | null) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingPost(null);
    setShowEditModal(false);
  };

  const openRatingModal = () => {
    setNewRating(0);
    setNewComment('');
    setShowRatingModal(true);
  };

  const closeRatingModal = () => {
    setShowRatingModal(false);
  };

  const submitRating = async () => {
    if (newRating === 0) {
      handleError(new Error('Please select a rating'), 'submit rating');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/portfolio-rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: newRating, comment: newComment }),
      });
      if (response.ok) {
        await fetchPortfolioRatings();
        closeRatingModal();
        // Refresh dashboard metrics
        refreshDashboard();
      } else {
        handleError(new Error(`HTTP ${response.status}`), 'submit rating');
      }
    } catch (error) {
      handleError(error, 'submit rating');
      // Add to local state for demo
      setPortfolioRatings(prev => [...prev, {
        id: Date.now(),
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString()
      }]);
      closeRatingModal();
    }
  };

  // Enhanced CRUD operations for Portfolio Ratings
  const deleteRating = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/portfolio-ratings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchPortfolioRatings();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to delete rating'), 'delete rating');
      }
    } catch (error) {
      console.error('Failed to delete rating:', error);
      // Remove from local state for demo
      setPortfolioRatings(prev => prev.filter(rating => rating.id !== id));
      refreshDashboard();
    }
  };

  const updateRating = async (id: number, updatedData: Partial<PortfolioRating>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/portfolio-ratings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        await fetchPortfolioRatings();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to update rating'), 'update rating');
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
      // Update local state for demo
      setPortfolioRatings(prev => prev.map(rating => rating.id === id ? { ...rating, ...updatedData } : rating));
      refreshDashboard();
    }
  };

  const addRating = async (newRating: Omit<PortfolioRating, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio-ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRating),
      });
      if (response.ok) {
        await fetchPortfolioRatings();
        refreshDashboard();
      } else {
        handleError(new Error('Failed to add rating'), 'add rating');
      }
    } catch (error) {
      console.error('Failed to add rating:', error);
      // Add to local state for demo
      const newId = Math.max(...portfolioRatings.map(r => r.id), 0) + 1;
      setPortfolioRatings(prev => [...prev, { ...newRating, id: newId }]);
      refreshDashboard();
    }
  };

  const queryRatings = async (filters: {
    rating?: number;
    dateFrom?: string;
    dateTo?: string;
    hasComment?: boolean;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });
      
      const response = await fetch(`http://localhost:5000/api/portfolio-ratings/query?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setPortfolioRatings(data);
      } else {
        handleError(new Error('Failed to query ratings'), 'query ratings');
      }
    } catch (error) {
      console.error('Failed to query ratings:', error);
      // Filter local state for demo
      let filtered = portfolioRatings;
      if (filters.rating) filtered = filtered.filter(r => r.rating === filters.rating);
      if (filters.hasComment !== undefined) filtered = filtered.filter(r => (r.comment && r.comment.length > 0) === filters.hasComment);
      if (filters.dateFrom) filtered = filtered.filter(r => new Date(r.date) >= new Date(filters.dateFrom!));
      if (filters.dateTo) filtered = filtered.filter(r => new Date(r.date) <= new Date(filters.dateTo!));
      setPortfolioRatings(filtered);
    }
  };

  const markMessageAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  // Enhanced button handlers with loading states and error handling
  const handleViewMessages = () => {
    openMessageModal(null);
  };

  const handleCreateBlogPost = () => {
    openEditModal({ id: null, title: '', date: '', status: 'Draft', content: '' });
  };

  const handleAddProject = () => {
    openProjectModal(null);
  };

  const handleAddRating = () => {
    openRatingModal();
  };

  const handleViewAnalytics = () => {
    setShowAnalyticsModal(true);
  };

  // Real-time update functions
  const refreshDashboard = async () => {
    await fetchAllData();
  };

  // Enhanced error handling for all operations
  const handleError = (error: any, operation: string) => {
    console.error(`Failed to ${operation}:`, error);
    // You can add toast notifications here
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon={i < Math.floor(rating) ? "lucide:star" : i < rating ? "lucide:star-half" : "lucide:star"}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Dashboard metrics calculations
  const unreadMessages = messages.filter(msg => !msg.read).length;
  const latestMessage = messages.length > 0 ? messages[0] : null;
  
  const averageRating = portfolioRatings.length > 0 
    ? portfolioRatings.reduce((sum, rating) => sum + rating.rating, 0) / portfolioRatings.length 
    : 0;
  
  const draftPosts = blogPosts.filter(post => post.status === 'Draft').length;
  const publishedPosts = blogPosts.filter(post => post.status === 'Published').length;
  
  const activeProjects = projects.filter(project => project.status === 'Active').length;
  const completedProjects = projects.filter(project => project.status === 'Completed').length;
  const pendingProjects = projects.filter(project => project.status === 'Pending').length;

  // Enhanced analytics metrics
  const contactMessages = messages.filter(msg => msg.source === 'contact').length;
  const portfolioMessages = messages.filter(msg => msg.source === 'portfolio').length;
  const blogMessages = messages.filter(msg => msg.source === 'blog').length;

  const blogLikes = blogReactions.filter(reaction => reaction.reaction === 'like').length;
  const blogComments = blogReactions.filter(reaction => reaction.reaction === 'comment').length;
  const blogShares = blogReactions.filter(reaction => reaction.reaction === 'share').length;

  const portfolioViews = portfolioInteractions.filter(interaction => interaction.type === 'view').length;
  const portfolioDownloads = portfolioInteractions.filter(interaction => interaction.type === 'download').length;
  const portfolioContacts = portfolioInteractions.filter(interaction => interaction.type === 'contact').length;
  const portfolioHires = portfolioInteractions.filter(interaction => interaction.type === 'hire').length;

  // Top performing content
  const topBlogPost = blogReactions.reduce((top, reaction) => {
    const postReactions = blogReactions.filter(r => r.postId === reaction.postId).length;
    const topReactions = blogReactions.filter(r => r.postId === top?.postId).length || 0;
    return postReactions > topReactions ? reaction : top;
  }, null as BlogReaction | null);



  // Login Form - Show when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="bg-content2 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-semibold">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" color="primary" className="w-full">
            Login
          </Button>
        </form>
      </div>
    );
  }

  // Dashboard - Show when authenticated
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-foreground-500 mt-2">Monitor and manage your portfolio metrics</p>
        </div>
        <div className="flex gap-2">
          <Button 
            color="primary" 
            variant="flat" 
            onClick={refreshDashboard}
            startContent={<Icon icon="lucide:refresh-cw" />}
            aria-label="Refresh dashboard data"
          >
            Refresh
          </Button>
          <Button 
            color="danger" 
            variant="flat" 
            onClick={() => setIsAuthenticated(false)}
            startContent={<Icon icon="lucide:log-out" />}
            aria-label="Logout from admin panel"
          >
            Logout
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Advanced Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Messages Card */}
            <Card 
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer group" 
              onClick={handleViewMessages}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleViewMessages()}
              aria-label="View messages dashboard"
            >
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <Icon icon="lucide:mail" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Messages</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300">Communication hub</p>
                  </div>
                </div>
                {unreadMessages > 0 && (
                  <Badge color="danger" size="sm" aria-label={`${unreadMessages} unread messages`}>
                    {unreadMessages}
                  </Badge>
                )}
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">{messages.length}</span>
                    <span className="text-sm text-blue-600 dark:text-blue-300">Total</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">{unreadMessages}</span>
                    <span className="text-sm text-blue-600 dark:text-blue-300">Unread</span>
                  </div>
                  {latestMessage && (
                    <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                        Latest: {latestMessage.subject}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        {new Date(latestMessage.date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <Button 
                    size="sm" 
                    color="primary" 
                    variant="flat" 
                    className="w-full mt-2"
                    onClick={(e) => { e.stopPropagation(); handleViewMessages(); }}
                    aria-label="View all messages"
                  >
                    View All Messages
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Portfolio Ratings Card */}
            <Card 
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700 hover:shadow-lg transition-all duration-300 cursor-pointer group" 
              onClick={handleAddRating}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleAddRating()}
              aria-label="Add portfolio rating"
            >
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500 rounded-lg group-hover:bg-yellow-600 transition-colors">
                    <Icon icon="lucide:star" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">Ratings</h3>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300">Portfolio feedback</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{portfolioRatings.length}</span>
                    <span className="text-sm text-yellow-600 dark:text-yellow-300">Total Reviews</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {renderStars(averageRating)}
                      <span className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 ml-1">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-yellow-600 dark:text-yellow-300">Average</span>
                  </div>
                  <div className="pt-2 border-t border-yellow-200 dark:border-yellow-700">
                    <p className="text-sm text-yellow-900 dark:text-yellow-100">
                      {portfolioRatings.filter(r => r.rating === 5).length} 5-star reviews
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    color="warning" 
                    variant="flat" 
                    className="w-full mt-2"
                    onClick={(e) => { e.stopPropagation(); handleAddRating(); }}
                    aria-label="Add new portfolio rating"
                  >
                    Add New Rating
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Blog Posts Card */}
            <Card 
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300"
              role="region"
              aria-label="Blog posts management"
            >
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
                    <Icon icon="lucide:file-text" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Blog Posts</h3>
                    <p className="text-sm text-green-600 dark:text-green-300">Content management</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-900 dark:text-green-100">{blogPosts.length}</span>
                    <span className="text-sm text-green-600 dark:text-green-300">Total Posts</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-green-200 dark:bg-green-800 rounded" role="status" aria-label={`${publishedPosts} published posts`}>
                      <span className="text-lg font-semibold text-green-900 dark:text-green-100">{publishedPosts}</span>
                      <p className="text-xs text-green-600 dark:text-green-300">Published</p>
                    </div>
                    <div className="text-center p-2 bg-yellow-200 dark:bg-yellow-800 rounded" role="status" aria-label={`${draftPosts} draft posts`}>
                      <span className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">{draftPosts}</span>
                      <p className="text-xs text-yellow-600 dark:text-yellow-300">Drafts</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    color="success" 
                    variant="flat" 
                    className="w-full mt-2"
                    onClick={handleCreateBlogPost}
                    startContent={<Icon icon="lucide:plus" />}
                    aria-label="Create new blog post"
                  >
                    New Post
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Projects Card */}
            <Card 
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300"
              role="region"
              aria-label="Projects management"
            >
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors">
                    <Icon icon="lucide:briefcase" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Projects</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-300">Portfolio showcase</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">{projects.length}</span>
                    <span className="text-sm text-purple-600 dark:text-purple-300">Total Projects</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-center p-1 bg-green-200 dark:bg-green-800 rounded" role="status" aria-label={`${activeProjects} active projects`}>
                      <span className="text-sm font-semibold text-green-900 dark:text-green-100">{activeProjects}</span>
                      <p className="text-xs text-green-600 dark:text-green-300">Active</p>
                    </div>
                    <div className="text-center p-1 bg-blue-200 dark:bg-blue-800 rounded" role="status" aria-label={`${completedProjects} completed projects`}>
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">{completedProjects}</span>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Done</p>
                    </div>
                    <div className="text-center p-1 bg-yellow-200 dark:bg-yellow-800 rounded" role="status" aria-label={`${pendingProjects} pending projects`}>
                      <span className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">{pendingProjects}</span>
                      <p className="text-xs text-yellow-600 dark:text-yellow-300">Pending</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    color="secondary" 
                    variant="flat" 
                    className="w-full mt-2"
                    onClick={handleAddProject}
                    startContent={<Icon icon="lucide:plus" />}
                    aria-label="Create new project"
                  >
                    New Project
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Enhanced Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Contact Analytics Card */}
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg group-hover:bg-indigo-600 transition-colors">
                    <Icon icon="lucide:phone" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Contact Analytics</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-300">Engagement insights</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{contactMessages}</span>
                    <span className="text-sm text-indigo-600 dark:text-indigo-300">Contact Form</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-blue-200 dark:bg-blue-800 rounded">
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">{portfolioMessages}</span>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Portfolio</p>
                    </div>
                    <div className="text-center p-2 bg-purple-200 dark:bg-purple-800 rounded">
                      <span className="text-sm font-semibold text-purple-900 dark:text-purple-100">{blogMessages}</span>
                      <p className="text-xs text-purple-600 dark:text-purple-300">Blog</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-indigo-200 dark:border-indigo-700">
                    <p className="text-sm text-indigo-900 dark:text-indigo-100">
                      {unreadMessages > 0 ? `${unreadMessages} new inquiries` : 'All caught up!'}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Blog Engagement Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 rounded-lg group-hover:bg-emerald-600 transition-colors">
                    <Icon icon="lucide:trending-up" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Blog Engagement</h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-300">Content performance</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{blogReactions.length}</span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-300">Total Reactions</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-center p-1 bg-red-200 dark:bg-red-800 rounded">
                      <span className="text-sm font-semibold text-red-900 dark:text-red-100">{blogLikes}</span>
                      <p className="text-xs text-red-600 dark:text-red-300">Likes</p>
                    </div>
                    <div className="text-center p-1 bg-blue-200 dark:bg-blue-800 rounded">
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">{blogComments}</span>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Comments</p>
                    </div>
                    <div className="text-center p-1 bg-green-200 dark:bg-green-800 rounded">
                      <span className="text-sm font-semibold text-green-900 dark:text-green-100">{blogShares}</span>
                      <p className="text-xs text-green-600 dark:text-green-300">Shares</p>
                    </div>
                  </div>
                  {topBlogPost && (
                    <div className="pt-2 border-t border-emerald-200 dark:border-emerald-700">
                      <p className="text-sm text-emerald-900 dark:text-emerald-100 truncate">
                        Top: {topBlogPost.postTitle}
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Portfolio Performance Card */}
            <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border border-rose-200 dark:border-rose-700 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500 rounded-lg group-hover:bg-rose-600 transition-colors">
                    <Icon icon="lucide:bar-chart-3" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-100">Portfolio Performance</h3>
                    <p className="text-sm text-rose-600 dark:text-rose-300">Project analytics</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-rose-900 dark:text-rose-100">{portfolioInteractions.length}</span>
                    <span className="text-sm text-rose-600 dark:text-rose-300">Total Interactions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-blue-200 dark:bg-blue-800 rounded">
                      <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">{portfolioViews}</span>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Views</p>
                    </div>
                    <div className="text-center p-2 bg-green-200 dark:bg-green-800 rounded">
                      <span className="text-sm font-semibold text-green-900 dark:text-green-100">{portfolioDownloads}</span>
                      <p className="text-xs text-green-600 dark:text-green-300">Downloads</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-yellow-200 dark:bg-yellow-800 rounded">
                      <span className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">{portfolioContacts}</span>
                      <p className="text-xs text-yellow-600 dark:text-yellow-300">Contacts</p>
                    </div>
                    <div className="text-center p-2 bg-purple-200 dark:bg-purple-800 rounded">
                      <span className="text-sm font-semibold text-purple-900 dark:text-purple-100">{portfolioHires}</span>
                      <p className="text-xs text-purple-600 dark:text-purple-300">Hires</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Global Reach Card */}
            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border border-cyan-200 dark:border-cyan-700 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex justify-between items-start pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500 rounded-lg group-hover:bg-cyan-600 transition-colors">
                    <Icon icon="lucide:globe" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">Global Reach</h3>
                    <p className="text-sm text-cyan-600 dark:text-cyan-300">Geographic insights</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">
                      {new Set(portfolioInteractions.map(i => i.location?.split(',')[1]?.trim())).size}
                    </span>
                    <span className="text-sm text-cyan-600 dark:text-cyan-300">Countries</span>
                  </div>
                  <div className="space-y-2">
                    {Array.from(new Set(portfolioInteractions.map(i => i.location?.split(',')[1]?.trim())))
                      .slice(0, 3)
                      .map((country, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-cyan-900 dark:text-cyan-100">{country}</span>
                          <span className="text-cyan-600 dark:text-cyan-300">
                            {portfolioInteractions.filter(i => i.location?.includes(country || '')).length}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="pt-2 border-t border-cyan-200 dark:border-cyan-700">
                    <p className="text-sm text-cyan-900 dark:text-cyan-100">
                      {portfolioInteractions.length > 0 ? 'Active global presence' : 'Building reach'}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Quick Actions Section */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Icon icon="lucide:zap" className="w-5 h-5" />
                Quick Actions
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Button 
                  color="primary" 
                  variant="flat" 
                  className="h-16 text-left justify-start hover:scale-105 transition-transform"
                  onClick={handleViewMessages}
                  startContent={<Icon icon="lucide:mail" className="w-6 h-6" />}
                  aria-label={`View messages - ${unreadMessages} unread`}
                >
                  <div>
                    <p className="font-semibold">View Messages</p>
                    <p className="text-sm opacity-70">{unreadMessages} unread</p>
                  </div>
                </Button>
                <Button 
                  color="success" 
                  variant="flat" 
                  className="h-16 text-left justify-start hover:scale-105 transition-transform"
                  onClick={handleCreateBlogPost}
                  startContent={<Icon icon="lucide:edit" className="w-6 h-6" />}
                  aria-label="Create new blog post"
                >
                  <div>
                    <p className="font-semibold">Create Blog Post</p>
                    <p className="text-sm opacity-70">Add new content</p>
                  </div>
                </Button>
                <Button 
                  color="secondary" 
                  variant="flat" 
                  className="h-16 text-left justify-start hover:scale-105 transition-transform"
                  onClick={handleAddProject}
                  startContent={<Icon icon="lucide:plus-circle" className="w-6 h-6" />}
                  aria-label="Add new project to portfolio"
                >
                  <div>
                    <p className="font-semibold">Add Project</p>
                    <p className="text-sm opacity-70">Update portfolio</p>
                  </div>
                </Button>
                <Button 
                  color="warning" 
                  variant="flat" 
                  className="h-16 text-left justify-start hover:scale-105 transition-transform"
                  onClick={handleAddRating}
                  startContent={<Icon icon="lucide:star" className="w-6 h-6" />}
                  aria-label="Add portfolio rating"
                >
                  <div>
                    <p className="font-semibold">Add Rating</p>
                    <p className="text-sm opacity-70">Portfolio feedback</p>
                  </div>
                </Button>
                <Button 
                  color="secondary" 
                  variant="flat" 
                  className="h-16 text-left justify-start hover:scale-105 transition-transform"
                  onClick={handleViewAnalytics}
                  startContent={<Icon icon="lucide:bar-chart-3" className="w-6 h-6" />}
                  aria-label="View detailed analytics"
                >
                  <div>
                    <p className="font-semibold">View Analytics</p>
                    <p className="text-sm opacity-70">Detailed insights</p>
                  </div>
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Data Management Section */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Icon icon="lucide:database" className="w-5 h-5" />
                Data Management
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Messages Management */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon icon="lucide:mail" className="w-4 h-4" />
                    Messages
                  </h3>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      color="success" 
                      variant="flat"
                      onClick={() => addMessage({
                        name: 'Test User',
                        email: 'test@example.com',
                        subject: 'Test Message',
                        message: 'This is a test message',
                        date: new Date().toISOString(),
                        source: 'contact',
                        category: 'inquiry'
                      })}
                      startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                    >
                      Add Test Message
                    </Button>
                    <Button 
                      size="sm" 
                      color="warning" 
                      variant="flat"
                      onClick={() => queryMessages({ source: 'contact', read: false })}
                      startContent={<Icon icon="lucide:search" className="w-4 h-4" />}
                    >
                      Query Unread Contact
                    </Button>
                    <Button 
                      size="sm" 
                      color="danger" 
                      variant="flat"
                      onClick={() => messages.length > 0 && deleteMessage(messages[0].id)}
                      startContent={<Icon icon="lucide:trash" className="w-4 h-4" />}
                      disabled={messages.length === 0}
                    >
                      Delete First Message
                    </Button>
                    <Button 
                      size="sm" 
                      color="secondary" 
                      variant="flat"
                      onClick={() => messages.length > 0 && updateMessage(messages[0].id, { read: true })}
                      startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
                      disabled={messages.length === 0}
                    >
                      Mark First Read
                    </Button>
                  </div>
                </div>

                {/* Blog Posts Management */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon icon="lucide:edit" className="w-4 h-4" />
                    Blog Posts
                  </h3>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      color="success" 
                      variant="flat"
                      onClick={() => addBlogPost({
                        title: 'Test Blog Post',
                        date: new Date().toISOString(),
                        status: 'Draft',
                        content: 'This is a test blog post content.'
                      })}
                      startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                    >
                      Add Test Post
                    </Button>
                    <Button 
                      size="sm" 
                      color="warning" 
                      variant="flat"
                      onClick={() => queryBlogPosts({ status: 'Draft' })}
                      startContent={<Icon icon="lucide:search" className="w-4 h-4" />}
                    >
                      Query Drafts
                    </Button>
                    <Button 
                      size="sm" 
                      color="danger" 
                      variant="flat"
                      onClick={() => blogPosts.length > 0 && blogPosts[0].id && deleteBlogPost(blogPosts[0].id)}
                      startContent={<Icon icon="lucide:trash" className="w-4 h-4" />}
                      disabled={blogPosts.length === 0}
                    >
                      Delete First Post
                    </Button>
                    <Button 
                      size="sm" 
                      color="secondary" 
                      variant="flat"
                      onClick={() => blogPosts.length > 0 && blogPosts[0].id && updateBlogPost(blogPosts[0].id, { status: 'Published' })}
                      startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
                      disabled={blogPosts.length === 0}
                    >
                      Publish First Post
                    </Button>
                  </div>
                </div>

                {/* Projects Management */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon icon="lucide:folder" className="w-4 h-4" />
                    Projects
                  </h3>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      color="success" 
                      variant="flat"
                      onClick={() => addProject({
                        name: 'Test Project',
                        description: 'This is a test project description.',
                        status: 'Active',
                        startDate: new Date().toISOString(),
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                      })}
                      startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                    >
                      Add Test Project
                    </Button>
                    <Button 
                      size="sm" 
                      color="warning" 
                      variant="flat"
                      onClick={() => queryProjects({ status: 'Active' })}
                      startContent={<Icon icon="lucide:search" className="w-4 h-4" />}
                    >
                      Query Active
                    </Button>
                    <Button 
                      size="sm" 
                      color="danger" 
                      variant="flat"
                      onClick={() => projects.length > 0 && deleteProject(projects[0].id)}
                      startContent={<Icon icon="lucide:trash" className="w-4 h-4" />}
                      disabled={projects.length === 0}
                    >
                      Delete First Project
                    </Button>
                    <Button 
                      size="sm" 
                      color="secondary" 
                      variant="flat"
                      onClick={() => projects.length > 0 && updateProject(projects[0].id, { status: 'Completed' })}
                      startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
                      disabled={projects.length === 0}
                    >
                      Complete First Project
                    </Button>
                  </div>
                </div>

                {/* Ratings Management */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon icon="lucide:star" className="w-4 h-4" />
                    Ratings
                  </h3>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      color="success" 
                      variant="flat"
                      onClick={() => addRating({
                        rating: 5,
                        comment: 'Excellent work!',
                        date: new Date().toISOString()
                      })}
                      startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                    >
                      Add Test Rating
                    </Button>
                    <Button 
                      size="sm" 
                      color="warning" 
                      variant="flat"
                      onClick={() => queryRatings({ rating: 5 })}
                      startContent={<Icon icon="lucide:search" className="w-4 h-4" />}
                    >
                      Query 5-Star
                    </Button>
                    <Button 
                      size="sm" 
                      color="danger" 
                      variant="flat"
                      onClick={() => portfolioRatings.length > 0 && deleteRating(portfolioRatings[0].id)}
                      startContent={<Icon icon="lucide:trash" className="w-4 h-4" />}
                      disabled={portfolioRatings.length === 0}
                    >
                      Delete First Rating
                    </Button>
                    <Button 
                      size="sm" 
                      color="secondary" 
                      variant="flat"
                      onClick={() => portfolioRatings.length > 0 && updateRating(portfolioRatings[0].id, { rating: 5 })}
                      startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
                      disabled={portfolioRatings.length === 0}
                    >
                      Update First to 5-Star
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bulk Operations */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Icon icon="lucide:settings" className="w-4 h-4" />
                  Bulk Operations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    color="primary" 
                    variant="flat"
                    onClick={() => {
                      queryMessages({});
                      queryBlogPosts({});
                      queryProjects({});
                      queryRatings({});
                    }}
                    startContent={<Icon icon="lucide:refresh" className="w-4 h-4" />}
                  >
                    Reset All Queries
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="flat"
                    onClick={() => {
                      messages.forEach(msg => updateMessage(msg.id, { read: true }));
                    }}
                    startContent={<Icon icon="lucide:check-all" className="w-4 h-4" />}
                    disabled={messages.length === 0}
                  >
                    Mark All Read
                  </Button>
                  <Button 
                    color="warning" 
                    variant="flat"
                    onClick={() => {
                      const avgRating = portfolioRatings.reduce((sum, r) => sum + r.rating, 0) / portfolioRatings.length;
                      alert(`Average Rating: ${avgRating.toFixed(2)}`);
                    }}
                    startContent={<Icon icon="lucide:bar-chart" className="w-4 h-4" />}
                    disabled={portfolioRatings.length === 0}
                  >
                    Calculate Avg Rating
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}

      {/* Messages Modal */}
      <Modal isOpen={showMessageModal} onClose={closeMessageModal} size="3xl" title="Messages Management">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Icon icon="lucide:inbox" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No messages available.</p>
            </div>
          )}
          {messages.map((msg: Message) => (
            <div 
              key={msg.id} 
              className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && (setSelectedMessage(msg), markMessageAsRead(msg.id))}
              onClick={() => { setSelectedMessage(msg); markMessageAsRead(msg.id); }}
              aria-label={`Message from ${msg.name} about ${msg.subject}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold">{msg.name}</p>
                    <span className="text-sm text-gray-500">({msg.email})</span>
                    {!msg.read && (
                      <Badge color="danger" size="sm" aria-label="Unread message">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">{msg.subject}</p>
                  <p className="text-sm text-gray-500">{new Date(msg.date).toLocaleString()}</p>
                </div>
                <Button 
                  color="danger" 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                  aria-label={`Delete message from ${msg.name}`}
                >
                  <Icon icon="lucide:trash-2" />
                </Button>
              </div>
            </div>
          ))}
          {selectedMessage && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-3 text-lg">Message Details</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedMessage.name}</p>
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                <p><strong>Message:</strong></p>
                <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                  {selectedMessage.message}
                </div>
                <p><strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}</p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    color="primary" 
                    size="sm"
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                    startContent={<Icon icon="lucide:mail" />}
                  >
                    Reply
                  </Button>
                  <Button 
                    color="default" 
                    variant="flat" 
                    size="sm"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Blog Post Edit Modal */}
      <Modal isOpen={showEditModal} onClose={closeEditModal} size="2xl" title={editingPost?.id ? 'Edit Blog Post' : 'New Blog Post'}>
        {editingPost && (
          <form onSubmit={(e) => { e.preventDefault(); savePost(); }}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Title</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  required
                  placeholder="Enter post title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Date</label>
                  <Input
                    type="date"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Status</label>
                  <select
                    aria-label="Blog post status"
                    value={editingPost.status}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Content</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={8}
                  required
                  placeholder="Write your blog post content here..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" color="primary" className="flex-1">
                  {editingPost.id ? 'Update Post' : 'Create Post'}
                </Button>
                <Button color="default" variant="flat" onClick={closeEditModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      {/* Portfolio Rating Modal */}
      <Modal isOpen={showRatingModal} onClose={closeRatingModal} title="Add Portfolio Rating & Comment">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Rating (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className={`p-2 rounded-lg transition-colors ${
                    star <= newRating 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon icon="lucide:star" className="w-6 h-6" />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">Selected: {newRating} stars</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Comment</label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              placeholder="Share your feedback about the portfolio..."
            />
          </div>
          <div className="flex gap-2">
            <Button color="primary" className="flex-1" onClick={submitRating}>
              Submit Rating
            </Button>
            <Button color="default" variant="flat" onClick={closeRatingModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Project Edit Modal */}
      <Modal isOpen={showProjectModal} onClose={closeProjectModal} size="2xl" title={selectedProject?.id ? 'Edit Project' : 'New Project'}>
        {selectedProject && (
          <form onSubmit={(e) => { e.preventDefault(); saveProject(); }}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Project Name</label>
                <Input
                  value={selectedProject.name}
                  onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                  required
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Description</label>
                <Textarea
                  value={selectedProject.description}
                  onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                  rows={4}
                  required
                  placeholder="Describe the project..."
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Status</label>
                  <select
                    aria-label="Project status"
                    value={selectedProject.status}
                    onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value as 'Active' | 'Completed' | 'Pending' })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Start Date</label>
                  <Input
                    type="date"
                    value={selectedProject.startDate}
                    onChange={(e) => setSelectedProject({ ...selectedProject, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">End Date</label>
                  <Input
                    type="date"
                    value={selectedProject.endDate}
                    onChange={(e) => setSelectedProject({ ...selectedProject, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" color="primary" className="flex-1">
                  {selectedProject.id ? 'Update Project' : 'Create Project'}
                </Button>
                <Button color="default" variant="flat" onClick={closeProjectModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      {/* Analytics Modal */}
      <Modal isOpen={showAnalyticsModal} onClose={() => setShowAnalyticsModal(false)} size="4xl" title="Portfolio Analytics Dashboard">
        <div className="space-y-6">
          {/* Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Total Engagement</h3>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {messages.length + blogReactions.length + portfolioInteractions.length}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-300">All interactions</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Conversion Rate</h3>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {portfolioInteractions.length > 0 ? Math.round((portfolioHires / portfolioInteractions.length) * 100) : 0}%
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">Views to hires</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Global Reach</h3>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {new Set(portfolioInteractions.map(i => i.location?.split(',')[1]?.trim())).size}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-300">Countries reached</p>
            </div>
          </div>

          {/* Top Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Blog Posts */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon icon="lucide:trending-up" className="w-5 h-5" />
                Top Performing Blog Posts
              </h3>
              <div className="space-y-3">
                {blogPosts.map(post => {
                  const postReactions = blogReactions.filter(r => r.postId === post.id).length;
                  return (
                    <div key={post.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-500">{post.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{postReactions}</p>
                        <p className="text-xs text-gray-500">reactions</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Projects */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon icon="lucide:bar-chart-3" className="w-5 h-5" />
                Most Viewed Projects
              </h3>
              <div className="space-y-3">
                {projects.map(project => {
                  const projectViews = portfolioInteractions.filter(i => i.projectName === project.name).length;
                  return (
                    <div key={project.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{projectViews}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon icon="lucide:activity" className="w-5 h-5" />
              Recent Activity
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[...messages, ...blogReactions, ...portfolioInteractions]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {('name' in item) ? `${item.name} sent a message` :
                         ('reaction' in item) ? `New ${item.reaction} on "${item.postTitle}"` :
                         `New ${item.type} on ${item.projectName}`}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon icon="lucide:globe" className="w-5 h-5" />
              Geographic Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from(new Set(portfolioInteractions.map(i => i.location?.split(',')[1]?.trim())))
                .slice(0, 8)
                .map((country, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-semibold">{country}</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {portfolioInteractions.filter(i => i.location?.includes(country || '')).length}
                    </p>
                    <p className="text-xs text-gray-500">interactions</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPanel;
