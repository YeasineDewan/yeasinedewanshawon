import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Avatar, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import FloatingParticles from '../components/FloatingParticles';
import { neonColors } from '../theme/theme';
import { blogPosts, blogCategoryOptions } from '../data/blog';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title'>('recent');

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => {
        const slug = post.category.toLowerCase().replace(/\s+/g, '-');
        return slug === selectedCategory;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort posts
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <FloatingParticles count={20} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 container mx-auto px-4 py-16 pt-28 md:pt-32">
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
            <span style={{ color: neonColors.lightYellow }}>Technical</span>{' '}
            <span 
              style={{ 
                background: `linear-gradient(135deg, ${neonColors.neonGreen}, ${neonColors.lime})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Blog
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Insights on web development, cybersecurity, and emerging technologies. Stay updated with the latest trends and best practices.
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
                placeholder="Search articles..."
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
            {blogCategoryOptions.map((category) => (
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
              { value: 'recent', label: 'Recent', icon: 'lucide:clock' },
              { value: 'popular', label: 'Popular', icon: 'lucide:star' },
              { value: 'title', label: 'Title', icon: 'lucide:sort-asc' }
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

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${sortBy}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
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
                  {post.featured && (
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

                  {/* Post Image */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <motion.div
                        className="text-6xl"
                        style={{ color: neonColors.neonGreen }}
                        animate={{ rotate: [0, 6, -6, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon icon="lucide:file-text" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>

                  <CardBody className="p-6">
                    <motion.div className="flex items-center gap-3 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Avatar
                          src={`https://img.heroui.chat/image/avatar?w=40&h=40&u=${post.author}`}
                          size="md"
                          className="border-2"
                          style={{ borderColor: neonColors.lime }}
                        />
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-xl font-bold mb-1"
                          style={{ color: neonColors.lightYellow }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {post.title}
                        </motion.h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <motion.div
                            className="flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                          >
                            <Icon icon="lucide:calendar" className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                          >
                            <Icon icon="lucide:clock" className="w-4 h-4" />
                            <span>{post.readTime} min read</span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.p 
                      className="text-gray-300 text-sm mb-4 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {post.excerpt}
                    </motion.p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <motion.div
                          key={tag}
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
                            {tag}
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
                          icon="lucide:book-open"
                          color={neonColors.lime}
                          to={`/blog/${post.id}`}
                          size="sm"
                          className="w-full"
                        >
                          Read More
                        </NeonButton>
                      </motion.div>
                      
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <NeonButton
                          icon="lucide:share"
                          color={neonColors.lightYellow}
                          variant="bordered"
                          size="sm"
                          className="w-full"
                        >
                          Share
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
                    transition={{ duration: 0.25 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
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
              No Articles Found
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
                setSortBy('recent');
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

export default Blog;
