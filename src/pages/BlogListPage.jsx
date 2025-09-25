import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllBlogPosts } from '@/lib/blog';

const BlogListPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    setBlogPosts(getAllBlogPosts());
  }, []);

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Transmissions - Terra Nova</title>
        <meta name="description" content="Découvrez des textes sacrés, enseignements, témoignages et réflexions vibrantes pour nourrir votre âme." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">
                Transmissions de l'Âme
              </span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Un espace sacré pour nourrir votre esprit, éveiller votre conscience et vous connecter à la sagesse universelle.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="crystal-card rounded-3xl p-6 relative overflow-hidden flex flex-col"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
                />
                <h2 className="text-2xl font-bold mb-2 aura-text font-['Dancing_Script']">
                  {post.title}
                </h2>
                <p className="text-sm text-foreground/70 flex items-center mb-4">
                  <Calendar className="w-4 h-4 mr-2" /> {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-foreground/80 leading-relaxed flex-grow mb-4">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-secondary">
                    <BookOpen className="w-4 h-4 mr-2" /> Lire la suite
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
              Le Rituel du Vendredi
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-6">
              Chaque semaine, une nouvelle inspiration pour votre âme.
            </p>
            <Button className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 text-lg rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" /> S'abonner aux Lettres de l'Âme
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;