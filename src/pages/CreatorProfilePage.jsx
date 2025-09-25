import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MapPin, Euro, FileEdit as Edit, Palette, Mail, Phone, Brush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getCreatorById } from '@/lib/creators';

const CreatorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchedCreator = getCreatorById(parseInt(id));
    if (fetchedCreator) {
      setCreator(fetchedCreator);
    } else {
      navigate('/artistes');
    }
  }, [id, navigate]);
  
  const handleManageProfile = () => {
    localStorage.setItem('loggedInUserId', creator.id);
    localStorage.setItem('loggedInUserType', 'creator');
    toast({
      title: `Bienvenue, ${creator.name} !`,
      description: "Vous êtes maintenant connecté(e) et pouvez gérer votre fiche.",
    });
    navigate('/edit-creator-profile');
  };

  const handleContact = () => {
    toast({
      title: `🎨 Contacter ${creator.name}`,
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };

  if (!creator) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Helmet>
        <title>{creator.name} - Créateur Artisan Guadeloupe</title>
        <meta name="description" content={`${creator.name}, créateur en Guadeloupe. ${creator.craft} - ${creator.description}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link to="/artistes">
          <Button variant="outline" className="border-2 border-slate-300 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux créateurs
          </Button>
        </Link>
        <Button onClick={handleManageProfile} variant="secondary">
          <Edit className="w-4 h-4 mr-2" />
          Gérer ma fiche
        </Button>
      </div>

      <section className="mystical-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="aura-text font-['Dancing_Script']">
                  {creator.name}
                </span>
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Palette className="w-4 h-4" /> {creator.category}
              </div>

              <p className="text-2xl text-emerald-600 font-semibold">
                {creator.craft}
              </p>
              
              <p className="text-lg text-white/90 leading-relaxed">
                {creator.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-white/80">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  <span>Atelier: {creator.commune}</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Euro className="w-5 h-5 text-green-500" />
                  <span>Tarifs: {creator.priceRange}</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <span>Contact: {creator.contact}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleContact}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-full energy-pulse"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Commander une Œuvre
                </Button>
                
                <Button 
                  onClick={handleContact}
                  variant="outline" 
                  className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contacter
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-3xl blur-3xl floating-animation"></div>
              <img  
                className="relative w-full h-96 lg:h-full object-cover rounded-3xl shadow-2xl chakra-glow" 
                alt={`${creator.name}, créateur artisan`}
                src={creator.image} 
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorProfilePage;