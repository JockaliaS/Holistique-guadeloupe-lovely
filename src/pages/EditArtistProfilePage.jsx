import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Palette, Heart, Type, Image as ImageIcon, UserCheck, Compass, MessageSquare, Save, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getArtistById, updateArtist } from '@/lib/database';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

const guadeloupeCommunes = [
  "Les Abymes", "Anse-Bertrand", "Baie-Mahault", "Baillif", "Basse-Terre",
  "Bouillante", "Capesterre-Belle-Eau", "Capesterre-de-Marie-Galante",
  "Deshaies", "La Désirade", "Le Gosier", "Gourbeyre", "Grand-Bourg",
  "Lamentin", "Morne-à-l'Eau", "Le Moule", "Petit-Bourg", "Petit-Canal",
  "Pointe-à-Pitre", "Pointe-Noire", "Port-Louis", "Saint-Claude",
  "Saint-François", "Saint-Louis", "Sainte-Anne", "Sainte-Rose",
  "Terre-de-Bas", "Terre-de-Haut", "Trois-Rivières", "Vieux-Fort", "Vieux-Habitants"
];

const categories = [
  "Peinture", "Sculpture", "Bijoux", "Tissage", "Poterie", "Photographie", 
  "Musique", "Danse", "Écriture", "Artisanat", "Autre"
];

const EditArtistProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [formData, setFormData] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const userType = localStorage.getItem('loggedInUserType');
    
    if (!loggedInUserId || userType !== 'artist') {
      toast({ 
        variant: "destructive", 
        title: "Accès non autorisé", 
        description: "Vous devez être connecté en tant qu'artiste pour modifier un profil." 
      });
      navigate('/');
      return;
    }

    const artistData = getArtistById(parseInt(loggedInUserId));
    if (artistData) {
      setArtist(artistData);
      setFormData({
        name: artistData.name || '',
        commune: artistData.commune || '',
        contact: artistData.contact || '',
        craft: artistData.craft || '',
        description: artistData.description || '',
        category: artistData.category || '',
        techniques: artistData.techniques || [],
        priceRange: artistData.priceRange || '',
        portraitPhoto: artistData.image || null,
        portfolioImages: artistData.portfolioImages || [],
      });
    } else {
      toast({ 
        variant: "destructive", 
        title: "Profil non trouvé", 
        description: "Impossible de charger les données du profil." 
      });
      navigate('/artistes');
    }
  }, [navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleTechniqueChange = (technique, checked) => {
    setFormData(prev => {
      const newTechniques = checked 
        ? [...prev.techniques, technique]
        : prev.techniques.filter(t => t !== technique);
      return { ...prev, techniques: newTechniques };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateArtist(artist.id, formData);
    toast({
      title: "🎨 Profil Mis à Jour !",
      description: "Votre fiche artiste a été mise à jour avec succès.",
    });
    navigate(`/artiste/${artist.id}`);
  };

  if (!formData) {
    return <div className="pt-24 min-h-screen flex items-center justify-center">Chargement de votre espace...</div>;
  }

  const SectionTitle = ({ icon: Icon, children }) => (
    <div className="flex items-center text-2xl font-bold font-['Dancing_Script'] aura-text">
      <Icon className="w-6 h-6 mr-3 text-primary" />
      {children}
    </div>
  );

  const commonTechniques = {
    "Peinture": ["Acrylique", "Aquarelle", "Huile", "Techniques mixtes", "Peinture numérique"],
    "Sculpture": ["Argile", "Bois", "Pierre", "Métal", "Résine"],
    "Bijoux": ["Métaux précieux", "Perles", "Pierres naturelles", "Macramé", "Résine"],
    "Tissage": ["Macramé", "Tissage traditionnel", "Fibres naturelles", "Broderie", "Tapisserie"],
    "Poterie": ["Tournage", "Modelage", "Raku", "Grès", "Faïence"]
  };

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Modifier ma Fiche Artiste - {artist?.name}</title>
        <meta name="description" content="Modifiez votre fiche artiste sur Terra Nova." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="aura-text font-['Dancing_Script']">Modifier mon art</span>
            </h1>
            <p className="text-xl text-foreground/80 mt-4">Faites rayonner votre nouvelle création, {artist?.name}.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="crystal-card rounded-3xl p-8 md:p-12 space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-['Dancing_Script'] aura-text text-3xl">Nom d'Artiste</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commune" className="font-['Dancing_Script'] aura-text text-3xl">Commune</Label>
                <Select onValueChange={(value) => handleSelectChange('commune', value)} value={formData.commune}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{guadeloupeCommunes.sort().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact" className="font-['Dancing_Script'] aura-text text-3xl">Contact</Label>
                <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="font-['Dancing_Script'] aura-text text-3xl">Catégorie</Label>
                <Select onValueChange={(value) => handleSelectChange('category', value)} value={formData.category}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Palette}>Ma spécialité artistique</SectionTitle>
              <Input id="craft" name="craft" value={formData.craft} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <SectionTitle icon={Heart}>Description de mon art</SectionTitle>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
            </div>

            <div className="space-y-2">
              <SectionTitle icon={Type}>Gamme de prix</SectionTitle>
              <Input id="priceRange" name="priceRange" value={formData.priceRange} onChange={handleChange} />
            </div>

            {formData.category && commonTechniques[formData.category] && (
              <div className="space-y-4">
                <SectionTitle icon={Compass}>Techniques maîtrisées</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonTechniques[formData.category].map(technique => (
                    <div key={technique} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`edit-technique-${technique}`}
                        checked={formData.techniques.includes(technique)}
                        onCheckedChange={(checked) => handleTechniqueChange(technique, checked)}
                      />
                      <Label htmlFor={`edit-technique-${technique}`} className="text-sm cursor-pointer">
                        {technique}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center pt-8 border-t border-primary/20">
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Save className="w-5 h-5 mr-3" />
                Enregistrer mes créations
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default EditArtistProfilePage;