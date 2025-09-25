import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getBlogPostBySlug } from '@/lib/blog';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = getBlogPostBySlug(slug);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié !",
      description: "Le lien vers cet article a été copié dans votre presse-papiers.",
    });
  };

  const handleLike = () => {
    toast({
      title: "Merci pour votre amour !",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀",
    });
  };

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p>Article non trouvé</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen mystical-gradient">
      <Helmet>
        <title>{post.title} - Terra Nova</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-64 md:h-80 relative"
      >
        <img 
          alt={post.title} 
          className="w-full h-full object-cover" 
          src={post.image} 
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="aura-text font-['Dancing_Script']">
                {post.title}
              </span>
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-emerald-600 transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour aux transmissions
          </Link>

          <main className="crystal-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 text-foreground/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            <article className="prose prose-lg lg:prose-xl max-w-none text-foreground prose-headings:aura-text prose-headings:font-['Dancing_Script'] prose-p:leading-relaxed prose-strong:text-primary prose-headings:mb-4 prose-p:mb-6">
              <p className="lead text-xl text-foreground/80 italic mb-8">{post.excerpt}</p>
              
              <div className="whitespace-pre-line">
                {post.content}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/20">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <div className="mt-12 pt-8 border-t border-border/20 flex justify-between items-center">
              <p className="text-sm text-foreground/60">
                Publié le {new Date(post.publishedAt).toLocaleDateString('fr-FR')} par {post.author}
              </p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleShare} className="text-foreground/70 hover:bg-background/50 hover:text-foreground rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLike} className="text-foreground/70 hover:bg-background/50 hover:text-foreground rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;