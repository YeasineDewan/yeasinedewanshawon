import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Card, CardBody, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import FloatingParticles from '../components/FloatingParticles';
import NeonButton from '../components/NeonButton';
import { neonColors } from '../theme/theme';
import { blogPosts } from '../data/blog';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <FloatingParticles count={16} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />
        <div className="relative z-10 container mx-auto px-4 py-16 pt-28 md:pt-32">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: neonColors.neonGreen }}
            >
              <Icon icon="lucide:file-x" className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: neonColors.lightYellow }}>
              Post not found
            </h1>
            <p className="text-gray-300 mb-8">The article you’re looking for doesn’t exist.</p>
            <NeonButton icon="lucide:arrow-left" color={neonColors.lime} onClick={() => navigate('/blog')}>
              Back to Blog
            </NeonButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles count={16} colors={[neonColors.neonGreen, neonColors.lime, neonColors.lightYellow]} />

      <div className="relative z-10 container mx-auto px-4 py-16 pt-28 md:pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <NeonButton icon="lucide:arrow-left" color={neonColors.lime} variant="bordered" onClick={() => navigate(-1)}>
              Back
            </NeonButton>
            <Chip
              size="sm"
              variant="flat"
              className="text-xs"
              style={{ backgroundColor: `${neonColors.neonGreen}26`, color: neonColors.lightYellow, border: `1px solid ${neonColors.lime}` }}
            >
              {post.category}
            </Chip>
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textShadow: `0 0 30px ${neonColors.neonGreen}` }}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 mb-10 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <Avatar
                src={`https://img.heroui.chat/image/avatar?w=40&h=40&u=${post.author}`}
                size="sm"
                className="border-2"
                style={{ borderColor: neonColors.lime }}
              />
              <span className="font-medium" style={{ color: neonColors.lightYellow }}>
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:calendar" className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:clock" className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <Card className="bg-gray-900/50 backdrop-blur-sm border-2" style={{ borderColor: neonColors.neonGreen }}>
            <CardBody className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Chip
                    key={tag}
                    size="sm"
                    className="text-xs"
                    style={{ backgroundColor: neonColors.neonGreen, color: '#000' }}
                  >
                    {tag}
                  </Chip>
                ))}
              </div>

              <p className="text-gray-200 leading-relaxed">
                {post.content}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

