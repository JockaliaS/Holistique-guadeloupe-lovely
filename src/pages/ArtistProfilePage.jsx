import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Star, Heart, Phone, Globe, MapPin, Calendar, Euro, Edit, Palette, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getArtistById } from '@/lib/database';

const ArtistProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchedArtist = getArtistById(parseInt(id));
    if (fetchedArtist) {
      setArtist(fetchedArtist);
    } else {
      navigate('/artistes');
    }
  }, [id, navigate]);
  
  const handleManageProfile = () => {
    localStorage.setItem('loggedInUserId', artist.id);
    localStorage.setItem('loggedInUserType', 'artist');
    toast({
      title: `Bienvenue, ${artist.name} !`,
      description: "Vous êtes maintenant connecté(e) et pouvez gérer votre fiche.",
    });
    navigate('/mon-compte/modifier-profil-artiste');
  };

  const handleContact = () => {
    toast({
      title: `🎨 Contacter ${artist.name}`,
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne t'inquiète pas ! Tu peux la demander dans ton prochain message ! 🚀"
    });
  };

  if (!artist) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <Helmet>
        <title>{artist.name} - Artiste Créateur Guadeloupe</title>
        <meta name="description" content={`${artist.name}, artiste en Guadeloupe. ${artist.craft} - ${artist.description}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link to="/artistes">
          <Button variant="outline" className="border-2 border-slate-300 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux artistes
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
                  {artist.name}
                </span>
              </h1>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Palette className="w-4 h-4" /> {artist.category}
              </div>

              <p className="text-2xl text-emerald-600 font-semibold">
                {artist.craft}
              </p>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                {artist.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  <span>Atelier: {artist.commune}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <Euro className="w-5 h-5 text-green-500" />
                  <span>Tarifs: {artist.priceRange}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <span>Contact: {artist.contact}</span>
                </div>
                {artist.techniques && artist.techniques.length > 0 && (
                  <div className="flex items-center space-x-3 text-slate-700">
                    <Brush className="w-5 h-5 text-orange-500" />
                    <span>Techniques: {artist.techniques.join(', ')}</span>
                  </div>
                )}
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
                alt={`${artist.name}, artiste créateur`}
                src={artist.image} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {artist.portfolioImages && artist.portfolioImages.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="aura-text font-['Dancing_Script']">
                  Portfolio
                </span>
              </h2>
              <p className="text-xl text-foreground/80">
                Découvrez quelques-unes de mes créations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artist.portfolioImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="crystal-card rounded-2xl overflow-hidden"
                >
                  <img 
                    src={image} 
                    alt={`Œuvre ${index + 1} de ${artist.name}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ArtistProfilePage;