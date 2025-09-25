import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, MapPin, Star, Heart, Phone, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { getAllTherapists } from '@/lib/therapists';

const TherapistsDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [therapists, setTherapists] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    setTherapists(getAllTherapists());
  }, []);

  const filteredTherapists = useMemo(() => {
    return therapists.filter(therapist => {
      const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           therapist.vibrationalPhrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           therapist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  }, [searchTerm, therapists]);

  const contactTherapist = (therapist) => {
    toast({
      title: `🌟 Connexion avec ${therapist.name}`,
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Annuaire des Thérapeutes - Thérapies Holistiques Guadeloupe</title>
        <meta name="description" content="Découvrez notre annuaire complet des thérapeutes holistiques en Guadeloupe. Trouvez votre praticien idéal par spécialité et localisation." />
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
                Annuaire des Thérapeutes
              </span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Explorez un réseau d'âmes-médecines, d'artistes sacrés et d'artisans du vivant. Chaque praticien est une étoile, laissez votre cœur vous guider vers la vibration qui résonne avec vous.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background/50 backdrop-blur-sm border-b border-border/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un thérapeute..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-lg text-foreground/80">
              {filteredTherapists.length} thérapeute{filteredTherapists.length > 1 ? 's' : ''} trouvé{filteredTherapists.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTherapists.map((therapist, index) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="therapy-card rounded-3xl p-6 relative overflow-hidden flex flex-col"
              >
                {therapist.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Vedette
                  </div>
                )}

                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <img 
                      className="w-full h-48 md:h-full object-cover rounded-2xl shadow-lg" 
                      alt={`${therapist.name}, thérapeute holistique`}
                      src={therapist.image} 
                    />
                  </div>

                  <div className="md:col-span-2 space-y-4 flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">
                        <span className="aura-text font-['Dancing_Script']">
                          {therapist.name}
                        </span>
                      </h3>
                      <p className="text-foreground/80 leading-relaxed italic mb-3">
                        "{therapist.vibrationalPhrase}"
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {therapist.specialties.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-foreground/80">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{therapist.commune}</span>
                      </div>
                      <div className="flex items-center text-foreground/80">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{therapist.rating > 0 ? therapist.rating : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => contactTherapist(therapist)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-full flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contacter
                  </Button>
                  <Link to={`/therapeute/${therapist.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-secondary w-full px-4 py-2 rounded-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le profil
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTherapists.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-card to-background flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground/80 mb-4">
                Aucun thérapeute trouvé
              </h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos critères de recherche.
              </p>
              <Button
                onClick={() => setSearchTerm('')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full"
              >
                Voir tous les thérapeutes
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TherapistsDirectoryPage;