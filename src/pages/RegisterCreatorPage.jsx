import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Palette, UserCheck, ChevronDown, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { addCreator } from '@/lib/creators';

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

const RegisterCreatorPage = () => {
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
    priceRange: '',
    image: '',
  });

  const handleSectionToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast({ 
        variant: "destructive", 
        title: "Image manquante", 
        description: "Veuillez ajouter une URL d'image." 
      });
      return;
    }

    const newCreator = addCreator(formData);

    toast({
      title: "🎨 Fiche Créateur Créée !",
      description: `Votre espace personnel: /espace/${newCreator.personalSpaceId}`,
    });
    
    navigate(`/espace/${newCreator.personalSpaceId}`);
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

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Inscription Créateur - Terra Nova</title>
        <meta name="description" content="Créez votre fiche créateur et rejoignez notre communauté d'artisans en Guadeloupe." />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Palette className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="aura-text font-['Dancing_Script']">Mon Art, Ma Signature</span>
            </h1>
            <p className="text-xl text-foreground/80 mt-4">(Créez votre fiche créateur)</p>
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
                  <Label htmlFor="name" className="font-semibold text-lg">Nom de Créateur*</Label>
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
                  <Label htmlFor="image" className="font-semibold text-lg">URL de l'image*</Label>
                  <Input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required />
                </div>
              </div>
            </Section>

            <Section id="art" title="Mon Art & Ma Spécialité" icon={Palette}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="craft" className="font-semibold text-lg">Spécialité créative*</Label>
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
              </div>
            </Section>

            <div className="text-center pt-8 border-t border-primary/20">
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Palette className="w-5 h-5 mr-3" />
                Créer ma fiche créateur 🎨
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default RegisterCreatorPage;