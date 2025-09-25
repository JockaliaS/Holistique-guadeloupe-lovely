import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Compass, Heart, Calendar, MapPin, Clock, Star, ArrowLeft, FileEdit as Edit3, Trash2, Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getJourneySpaceById, updateJourneySpace, deleteJourneySpace } from '@/lib/journeySpaces';

const intentionLabels = {
  detente: { label: 'Détente', icon: '🌊', color: 'text-cyan-500' },
  guerison: { label: 'Guérison', icon: '💚', color: 'text-emerald-500' },
  creativite: { label: 'Créativité', icon: '🎨', color: 'text-purple-500' },
  connexion: { label: 'Connexion', icon: '🤝', color: 'text-blue-500' },
  transformation: { label: 'Transformation', icon: '🔥', color: 'text-red-500' }
};

const durationLabels = {
  'demi-journee': 'Une demi-journée',
  'journee': 'Une journée complète',
  'mini-retraite': '1 à 2 jours (mini-retraite)'
};

const locationLabels = {
  'plage': 'Plage',
  'foret': 'Forêt',
  'espace-sacre': 'Espace sacré',
  'atelier-creatif': 'Atelier créatif',
  'salle-cosy': 'Salle cosy'
};

const PersonalJourneySpacePage = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journeySpace, setJourneySpace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const space = getJourneySpaceById(spaceId);
    if (space) {
      setJourneySpace(space);
      // Mettre à jour la dernière visite
      updateJourneySpace(spaceId, {});
    } else {
      toast({
        variant: "destructive",
        title: "Espace non trouvé",
        description: "Cet espace de voyage n'existe pas ou a été supprimé."
      });
      navigate('/mon-voyage-interieur');
    }
  }, [spaceId, navigate, toast]);

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet espace de voyage ?')) {
      deleteJourneySpace(spaceId);
      toast({
        title: "Espace supprimé",
        description: "Votre espace de voyage a été supprimé avec succès."
      });
      navigate('/mon-voyage-interieur');
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Lien copié !",
      description: "Le lien vers votre espace a été copié dans le presse-papiers.",
    });
  };

  if (!journeySpace) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p>Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  const currentIntention = intentionLabels[journeySpace.intention];
  const selectedExperiences = journeySpace.experience || {};

  return (
    <div className="pt-16 min-h-screen mystical-gradient">
      <Helmet>
        <title>Mon Espace Personnel - Voyage Intérieur</title>
        <meta name="description" content="Votre espace personnel de voyage intérieur sur Terra Nova." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <Link to="/mon-voyage-interieur" className="inline-flex items-center text-primary hover:text-emerald-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour au voyage intérieur
          </Link>
          
          <div className="flex gap-2">
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? 'Annuler' : 'Modifier'}
            </Button>
            <Button onClick={handleDelete} variant="destructive" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="crystal-card rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <Compass className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="aura-text font-['Dancing_Script']">
                Mon Espace Personnel
              </span>
            </h1>
            <div className="flex justify-center items-center gap-4 text-foreground/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Créé le {new Date(journeySpace.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{journeySpace.visits} visite{journeySpace.visits > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Intention */}
            <div className="crystal-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-primary" />
                Mon Intention
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{currentIntention.icon}</span>
                <div>
                  <p className={`text-2xl font-semibold ${currentIntention.color}`}>
                    {currentIntention.label}
                  </p>
                  <p className="text-foreground/70">L'énergie qui guide mon parcours</p>
                </div>
              </div>
            </div>

            {/* Expériences */}
            {Object.keys(selectedExperiences).length > 0 && (
              <div className="crystal-card rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-primary" />
                  Mes Expériences
                </h2>
                <div className="space-y-4">
                  {Object.entries(selectedExperiences).map(([categoryId, subcategories]) => (
                    <div key={categoryId} className="bg-background/30 rounded-xl p-4">
                      <h3 className="font-semibold text-lg mb-2 text-primary">
                        {categoryId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {subcategories.map(subcategoryId => (
                          <span key={subcategoryId} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {subcategoryId.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modalités */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {journeySpace.duration && (
                <div className="crystal-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Durée Souhaitée
                  </h2>
                  <p className="text-lg text-foreground/80">
                    {durationLabels[journeySpace.duration]}
                  </p>
                </div>
              )}

              {journeySpace.location && (
                <div className="crystal-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Lieu d'Ambiance
                  </h2>
                  <p className="text-lg text-foreground/80">
                    {locationLabels[journeySpace.location]}
                  </p>
                </div>
              )}
            </div>

            {/* Suggestions personnalisées */}
            <div className="crystal-card rounded-2xl p-6 bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Compass className="w-6 h-6 mr-3 text-primary" />
                Suggestions Personnalisées
              </h2>
              <div className="space-y-3">
                <p className="text-foreground/80">
                  🌟 Basé sur votre intention de <strong>{currentIntention.label.toLowerCase()}</strong>, nous vous recommandons :
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Des praticiens spécialisés dans votre domaine d'intention</li>
                  <li>Des créateurs dont l'art résonne avec votre énergie</li>
                  <li>Des lieux et expériences adaptés à votre durée souhaitée</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link to="/annuaire-gate" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    Explorer les Thérapeutes
                  </Button>
                </Link>
                <Link to="/artistes" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    Découvrir les Artistes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalJourneySpacePage;