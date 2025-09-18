import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Palette, Heart, Type, Image as ImageIcon, UserCheck, Compass, MessageSquare, ChevronDown, Euro, Brush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { addArtist } from '@/lib/database';

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

const RegisterArtistPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('identity');
  const [formData, setFormData] = useState({
    name: '',
    commune: '',
    contact: '',
    craft: '',
    description: '',
    category: '',
    techniques: [],
    priceRange: '',
    portraitPhoto: null,
    portfolioImages: [],
  });

  const handleSectionToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'portfolioImages') {
          setFormData(prev => ({ 
            ...prev, 
            portfolioImages: [...prev.portfolioImages, reader.result] 
          }));
        } else {
          setFormData(prev => ({ ...prev, [name]: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechniqueChange = (technique, checked) => {
    setFormData(prev => {
      const newTechniques = checked 
        ? [...prev.techniques, technique]
        : prev.techniques.filter(t => t !== technique);
      return { ...prev, techniques: newTechniques };
    });
  };

  const removePortfolioImage = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.portraitPhoto) {
      toast({ 
        variant: "destructive", 
        title: "Photo manquante", 
        description: "Veuillez télécharger une photo portrait." 
      });
      return;
    }

    const newArtist = addArtist(formData);

    toast({
      title: "🎨 Fiche Artiste Créée !",
      description: `Votre espace personnel: /espace/${newArtist.personalSpaceId}`,
    });
    
    // Rediriger vers l'espace personnel
    navigate(`/espace/${newArtist.personalSpaceId}`);
  };

  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="crystal-card rounded-2xl p-4 transition-all duration-300">
      <button type="button" onClick={() => handleSectionToggle(id)} className="w-full flex justify-between items-center text-left">
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-semibold font-['Dancing_Script'] aura-text">{title}</h2>
        </div>
        <ChevronDown className={cn("w-6 h-6 transition-transform", openSection === id && "rotate-180")} />
      </button>
      <AnimatePresence>
        {openSection === id && (
          <motion.div 
            initial={{ height: 0, opacity: 0, marginTop: 0 }} 
            animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }} 
            exit={{ height: 0, opacity: 0, marginTop: 0 }} 
            transition={{ duration: 0.3 }} 
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-primary/20 space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <title>Inscription Artiste - Terra Nova</title>
        <meta name="description" content="Créez votre fiche artiste et rejoignez notre communauté de créateurs en Guadeloupe." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Palette className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="aura-text font-['Dancing_Script']">Mon Art, Ma Signature</span>
            </h1>
            <p className="text-xl text-foreground/80 mt-4">(Créez votre fiche artiste)</p>
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
            className="space-y-8"
          >
            <Section id="identity" title="Identité & Contact" icon={UserCheck}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="font-semibold text-lg">Nom d'Artiste*</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="commune" className="font-semibold text-lg">Commune*</Label>
                  <Select onValueChange={(value) => handleSelectChange('commune', value)} value={formData.commune}>
                    <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                    <SelectContent>{guadeloupeCommunes.sort().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact" className="font-semibold text-lg">Contact*</Label>
                  <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="portraitPhoto" className="font-semibold text-lg">Photo portrait*</Label>
                  <Input id="portraitPhoto" name="portraitPhoto" type="file" accept="image/*" onChange={handleFileChange} required />
                  {formData.portraitPhoto && <img src={formData.portraitPhoto} alt="Aperçu" className="mt-2 rounded-lg w-32 h-32 object-cover"/>}
                </div>
              </div>
            </Section>

            <Section id="art" title="Mon Art & Ma Spécialité" icon={Palette}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="craft" className="font-semibold text-lg">Spécialité artistique*</Label>
                    <Input id="craft" name="craft" value={formData.craft} onChange={handleChange} placeholder="Ex: Peinture Vibratoire & Talismans" required />
                  </div>
                  <div>
                    <Label htmlFor="category" className="font-semibold text-lg">Catégorie*</Label>
                    <Select onValueChange={(value) => handleSelectChange('category', value)} value={formData.category}>
                      <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                      <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description" className="font-semibold text-lg">Description de mon art*</Label>
                  <p className="text-sm text-foreground/70 italic">Décrivez votre approche artistique et ce qui vous inspire.</p>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
                </div>

                <div>
                  <Label htmlFor="priceRange" className="font-semibold text-lg">Gamme de prix</Label>
                  <Input id="priceRange" name="priceRange" value={formData.priceRange} onChange={handleChange} placeholder="Ex: 50€ - 500€" />
                </div>

                {formData.category && commonTechniques[formData.category] && (
                  <div>
                    <Label className="font-semibold text-lg">Techniques maîtrisées</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {commonTechniques[formData.category].map(technique => (
                        <div key={technique} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`technique-${technique}`}
                            checked={formData.techniques.includes(technique)}
                            onCheckedChange={(checked) => handleTechniqueChange(technique, checked)}
                          />
                          <Label htmlFor={`technique-${technique}`} className="text-sm cursor-pointer">
                            {technique}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>

            <Section id="portfolio" title="Portfolio" icon={ImageIcon}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="portfolioImages" className="font-semibold text-lg">Images de vos créations</Label>
                  <p className="text-sm text-foreground/70 italic">Ajoutez jusqu'à 6 images de vos œuvres.</p>
                  <Input 
                    id="portfolioImages" 
                    name="portfolioImages" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    disabled={formData.portfolioImages.length >= 6}
                  />
                </div>
                
                {formData.portfolioImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.portfolioImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={image} 
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          onClick={() => removePortfolioImage(index)}
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 w-6 h-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Section>

            <div className="text-center pt-8 border-t border-primary/20">
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Palette className="w-5 h-5 mr-3" />
                Créer ma fiche artiste 🎨
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default RegisterArtistPage;