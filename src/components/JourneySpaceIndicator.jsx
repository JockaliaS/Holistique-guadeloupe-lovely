import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentJourneySpaceFromCookie, clearJourneySpaceCookie } from '@/lib/journeySpaces';

const JourneySpaceIndicator = () => {
  const [journeySpace, setJourneySpace] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const space = getCurrentJourneySpaceFromCookie();
    if (space) {
      setJourneySpace(space);
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    clearJourneySpaceCookie();
    setJourneySpace(null);
  };

  if (!journeySpace || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="fixed top-20 right-4 z-40 max-w-sm"
      >
        <div className="crystal-card rounded-2xl p-4 border border-primary/20 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {journeySpace.userName ? `Espace de ${journeySpace.userName}` : 'Votre Voyage Personnel'}
                </p>
                <p className="text-xs text-foreground/70">
                  Créé le {new Date(journeySpace.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-foreground/50 hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-3 flex gap-2">
            <Link to={`/mon-espace/${journeySpace.id}`} className="flex-1">
              <Button size="sm" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs">
                Voir mon espace
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JourneySpaceIndicator;