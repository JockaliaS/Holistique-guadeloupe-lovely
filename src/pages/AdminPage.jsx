import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Palette, BookOpen, FileEdit as Edit, Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { getAllTherapists, deleteTherapist } from '@/lib/therapists';
import { getAllCreators, deleteCreator } from '@/lib/creators';
import { getAllBlogPosts, deleteBlogPost } from '@/lib/blog';
import { getCurrentUser, isAdmin } from '@/lib/admin';
import { useNavigate, Link } from 'react-router-dom';

const AdminPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('therapists');
  const [searchTerm, setSearchTerm] = useState('');
  const [therapists, setTherapists] = useState([]);
  const [creators, setCreators] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || !isAdmin(currentUser.id)) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions d'administrateur."
      });
      navigate('/');
      return;
    }

    loadData();
  }, [navigate, toast]);

  const loadData = () => {
    setTherapists(getAllTherapists());
    setCreators(getAllCreators());
    setBlogPosts(getAllBlogPosts());
  };

  const handleDelete = async (type, id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${name} ?`)) {
      try {
        switch (type) {
          case 'therapist':
            deleteTherapist(id);
            break;
          case 'creator':
            deleteCreator(id);
            break;
          case 'blog':
            deleteBlogPost(id);
            break;
        }
        loadData();
        toast({
          title: "Suppression réussie",
          description: `${name} a été supprimé(e) avec succès.`
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression."
        });
      }
    }
  };

  const filteredData = (data) => {
    return data.filter(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.craft?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
        activeTab === id 
          ? 'bg-primary text-white shadow-lg' 
          : 'bg-background/50 text-foreground/80 hover:bg-background/80'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{count}</span>
    </button>
  );

  const DataTable = ({ data, type }) => (
    <div className="crystal-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background/50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Image</th>
              <th className="px-6 py-4 text-left font-semibold">Nom</th>
              <th className="px-6 py-4 text-left font-semibold">
                {type === 'blog' ? 'Statut' : 'Commune'}
              </th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-t border-border/20 hover:bg-background/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <img 
                    src={item.image} 
                    alt={item.name || item.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">{item.name || item.title}</p>
                    {item.craft && <p className="text-sm text-foreground/60">{item.craft}</p>}
                    {item.vibrationalPhrase && <p className="text-sm text-white/70 italic">"{item.vibrationalPhrase}"</p>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {type === 'blog' ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  ) : (
                    <span className="text-white/80">{item.commune}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {type === 'blog' ? (
                      <Link to={`/blog/${item.slug}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Link to={type === 'therapist' ? `/therapeute/${item.id}` : `/artiste/${item.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast({ title: "🚧 Modification", description: "Fonctionnalité en développement" })}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(type, item.id, item.name || item.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Administration - Terra Nova</title>
        <meta name="description" content="Interface d'administration pour gérer les thérapeutes, créateurs et contenus de Terra Nova." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">
                Administration Terra Nova
              </span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Gérez l'écosystème holistique de la plateforme
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80 space-y-4">
              <TabButton 
                id="therapists" 
                label="Thérapeutes" 
                icon={Users} 
                count={therapists.length}
              />
              <TabButton 
                id="creators" 
                label="Créateurs" 
                icon={Palette} 
                count={creators.length}
              />
              <TabButton 
                id="blog" 
                label="Articles" 
                icon={BookOpen} 
                count={blogPosts.length}
              />
            </div>

            <div className="flex-1 space-y-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'therapists' && (
                  <motion.div
                    key="therapists"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DataTable data={filteredData(therapists)} type="therapist" />
                  </motion.div>
                )}

                {activeTab === 'creators' && (
                  <motion.div
                    key="creators"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DataTable data={filteredData(creators)} type="creator" />
                  </motion.div>
                )}

                {activeTab === 'blog' && (
                  <motion.div
                    key="blog"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DataTable data={filteredData(blogPosts)} type="blog" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;