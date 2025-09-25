import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, Heart, Calendar, MapPin, Clock, Star, ArrowLeft, Share2, Bookmark, FileEdit as Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createJourneySpace, getCurrentJourneySpaceFromCookie } from '@/lib/journeySpaces';

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

const JourneyResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journeySpace, setJourneySpace] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [userName, setUserName] = useState('');

  const journeyData = location.state?.journeyData;

  useEffect(() => {
    if (!journeyData) {
      // Vérifier s'il y a un espace existant dans les cookies
      const existingSpace = getCurrentJourneySpaceFromCookie();
      if (existingSpace) {
        setJourneySpace(existingSpace);
      } else {
        navigate('/mon-voyage-interieur');
      }
    }
  }, [journeyData, navigate]);

  const handleCreateSpace = async () => {
    if (!journeyData) return;
    
    setIsCreating(true);
    
    try {
      const dataWithName = {
        ...journeyData,
        userName: userName || 'Voyageur Anonyme'
      };
      const newSpace = createJourneySpace(dataWithName);
      setJourneySpace(newSpace);
      
      toast({
        title: "✨ Votre Espace Personnel Créé !",
        description: "Votre voyage a été sauvegardé. Vous pouvez y revenir à tout moment.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre espace."
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleShare = () => {
    if (journeySpace) {
      const shareUrl = `${window.location.origin}/mon-espace/${journeySpace.id}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Lien copié !",
        description: "Le lien vers votre espace personnel a été copié.",
      });
    }
  };

  const dataToShow = journeySpace || journeyData;
  
  if (!dataToShow) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p>Aucune donnée de voyage trouvée...</p>
      </div>
    );
  }

  const currentIntention = intentionLabels[dataToShow.intention];
  const selectedExperiences = dataToShow.experience || {};

  return (
    <div className="pt-16 min-h-screen mystical-gradient">
      <Helmet>
        <title>Récapitulatif de votre Voyage Intérieur - Terra Nova</title>
        <meta name="description" content="Découvrez le récapitulatif personnalisé de votre voyage intérieur holistique." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/mon-voyage-interieur" className="inline-flex items-center text-primary hover:text-emerald-300 transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour au voyage intérieur
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="crystal-card rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary floating-animation" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="aura-text font-['Dancing_Script']">
                Votre Voyage Intérieur
              </span>
            </h1>
            {journeySpace ? (
              <p className="text-xl text-foreground/80">
                Créé le {new Date(journeySpace.createdAt).toLocaleDateString('fr-FR')}
              </p>
            ) : (
              <p className="text-xl text-foreground/80">
                Récapitulatif de votre parcours personnalisé
              </p>
            )}
          </div>

          <div className="space-y-8">
            {/* Intention */}
            <div className="crystal-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-primary" />
                Votre Intention
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{currentIntention.icon}</span>
                <div>
                  <p className={`text-2xl font-semibold ${currentIntention.color}`}>
                    {currentIntention.label}
                  </p>
                  <p className="text-white/80">L'énergie qui guide votre parcours</p>
                </div>
              </div>
            </div>

            {/* Expériences sélectionnées */}
            {Object.keys(selectedExperiences).length > 0 && (
              <div className="crystal-card rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-primary" />
                  Vos Expériences Choisies
                </h2>
                <div className="space-y-4">
                  {Object.entries(selectedExperiences).map(([categoryId, subcategories]) => (
                    <div key={categoryId} className="bg-background/30 rounded-xl p-4">
                      <h3 className="font-semibold text-lg mb-2 text-primary">
                        {categoryId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {subcategories.map(subcategoryId => (
                          <span key={subcategoryId} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                            {subcategoryId.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Durée et Lieu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataToShow.duration && (
                <div className="crystal-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Durée
                  </h2>
                  <p className="text-lg text-white/90">
                    {durationLabels[dataToShow.duration]}
                  </p>
                </div>
              )}

              {dataToShow.location && (
                <div className="crystal-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Lieu d'Ambiance
                  </h2>
                  <p className="text-lg text-white/90">
                    {locationLabels[dataToShow.location]}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-primary/20 pt-8">
              {!journeySpace ? (
                <div className="text-center space-y-4">
                  <p className="text-lg text-white/90 mb-6">
                    Souhaitez-vous sauvegarder ce voyage dans votre espace personnel ?
                  </p>
                  <div className="max-w-md mx-auto mb-6">
                    <Label htmlFor="userName" className="text-white/90 mb-2 block">
                      Votre nom (optionnel)
                    </Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Entrez votre nom..."
                      className="text-center"
                    />
                  </div>
                  <Button
                    onClick={handleCreateSpace}
                    disabled={isCreating}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-xl rounded-full shadow-lg energy-pulse"
                  >
                    {isCreating ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Création en cours...
                      </div>
                    ) : (
                      <>
                        <Bookmark className="w-5 h-5 mr-3" />
                        Créer mon Espace Personnel
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-emerald-600 mb-2">
                      ✨ Votre Espace Personnel est Créé !
                    </h3>
                    <p className="text-foreground/80 mb-4">
                      Votre voyage est sauvegardé et accessible à tout moment via vos cookies.
                    </p>
                    <p className="text-sm text-white/70">
                      ID de votre espace : <code className="bg-background/50 px-2 py-1 rounded">{journeySpace.id}</code>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-secondary"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager mon voyage
                    </Button>
                    
                    <Link to={`/mon-espace/${journeySpace.id}`}>
                      <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Gérer mon espace
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="crystal-card rounded-2xl p-6 bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-primary" />
                Prochaines Étapes Suggérées
              </h2>
              <div className="space-y-3">
                <p className="text-white/90">
                  🌟 Basé sur votre intention de <strong>{currentIntention.label.toLowerCase()}</strong>, nous vous recommandons :
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90 ml-4">
                  <li>Des praticiens spécialisés dans votre domaine d'intention</li>
                  <li>Des créateurs dont l'art résonne avec votre énergie</li>
                  <li>Des lieux et expériences adaptés à votre durée souhaitée</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link to="/annuaire-gate" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    Voir les Thérapeutes
                  </Button>
                </Link>
                <Link to="/artistes" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    Voir les Artistes
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

export default JourneyResultsPage;