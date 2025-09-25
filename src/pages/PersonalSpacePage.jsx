import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { User, FileEdit as Edit, Save, Image as ImageIcon, Palette, Heart, Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getTherapistBySpaceId, getArtistBySpaceId, updateTherapist, updateArtist } from '@/lib/database';

const PersonalSpacePage = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [person, setPerson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Chercher d'abord dans les thérapeutes
    let foundPerson = getTherapistBySpaceId(spaceId);
    if (!foundPerson) {
      // Puis dans les artistes
      foundPerson = getArtistBySpaceId(spaceId);
    }

    if (foundPerson) {
      setPerson(foundPerson);
      setFormData(foundPerson);
    } else {
      toast({
        variant: "destructive",
        title: "Espace non trouvé",
        description: "Cet espace personnel n'existe pas."
      });
      navigate('/');
    }
  }, [spaceId, navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      if (person.type === 'therapist') {
        const updated = updateTherapist(person.id, formData);
        setPerson(updated);
      } else if (person.type === 'artist') {
        const updated = updateArtist(person.id, formData);
        setPerson(updated);
      }
      
      setIsEditing(false);
      toast({
        title: "✨ Profil mis à jour !",
        description: "Vos modifications ont été sauvegardées."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde."
      });
    }
  };

  const handleCancel = () => {
    setFormData(person);
    setIsEditing(false);
  };

  if (!person) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p>Chargement de votre espace...</p>
      </div>
    );
  }

  const isTherapist = person.type === 'therapist';

  return (
    <div className="pt-16 min-h-screen">
      <Helmet>
        <title>Espace Personnel - {person.name}</title>
        <meta name="description" content={`Espace personnel de ${person.name} sur Terra Nova`} />
      </Helmet>

      <section className="py-16 mystical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              {isTherapist ? <Heart className="w-10 h-10 text-white" /> : <Palette className="w-10 h-10 text-white" />}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="aura-text font-['Dancing_Script']">
                Mon Espace Personnel
              </span>
            </h1>
            <p className="text-xl text-foreground/80">
              Bienvenue dans votre sanctuaire numérique, {person.name}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="crystal-card rounded-3xl p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold aura-text font-['Dancing_Script']">
                Ma Fiche {isTherapist ? 'Thérapeute' : 'Artiste'}
              </h2>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate(isTherapist ? `/therapeute/${person.id}` : `/artiste/${person.id}`)}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir ma fiche publique
                </Button>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="bg-primary">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Annuler
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                {isEditing && (
                  <div className="mt-4">
                    <Label htmlFor="image">URL de l'image</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                )}
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-semibold">Nom</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="text-lg"
                    />
                  ) : (
                    <p className="text-2xl font-bold aura-text font-['Dancing_Script']">{person.name}</p>
                  )}
                </div>

                {isTherapist ? (
                  <div>
                    <Label htmlFor="vibrationalPhrase" className="text-lg font-semibold">Phrase vibratoire</Label>
                    {isEditing ? (
                      <Textarea
                        id="vibrationalPhrase"
                        name="vibrationalPhrase"
                        value={formData.vibrationalPhrase || ''}
                        onChange={handleChange}
                        rows={2}
                      />
                    ) : (
                      <p className="text-lg italic text-foreground/80">"{person.vibrationalPhrase}"</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="craft" className="text-lg font-semibold">Spécialité artistique</Label>
                    {isEditing ? (
                      <Input
                        id="craft"
                        name="craft"
                        value={formData.craft || ''}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-lg text-primary font-semibold">{person.craft}</p>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="commune" className="text-lg font-semibold">Commune</Label>
                  {isEditing ? (
                    <Input
                      id="commune"
                      name="commune"
                      value={formData.commune || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-lg">{person.commune}</p>
                  )}
                </div>

                {isTherapist ? (
                  <>
                    <div>
                      <Label htmlFor="mission" className="text-lg font-semibold">Mission</Label>
                      {isEditing ? (
                        <Textarea
                          id="mission"
                          name="mission"
                          value={formData.mission || ''}
                          onChange={handleChange}
                          rows={3}
                        />
                      ) : (
                        <p className="text-foreground/80">{person.mission}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="approach" className="text-lg font-semibold">Approche</Label>
                      {isEditing ? (
                        <Textarea
                          id="approach"
                          name="approach"
                          value={formData.approach || ''}
                          onChange={handleChange}
                          rows={3}
                        />
                      ) : (
                        <p className="text-foreground/80">{person.approach}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
                      {isEditing ? (
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description || ''}
                          onChange={handleChange}
                          rows={3}
                        />
                      ) : (
                        <p className="text-foreground/80">{person.description}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="priceRange" className="text-lg font-semibold">Gamme de prix</Label>
                      {isEditing ? (
                        <Input
                          id="priceRange"
                          name="priceRange"
                          value={formData.priceRange || ''}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-foreground/80">{person.priceRange}</p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="contact" className="text-lg font-semibold">Contact</Label>
                  {isEditing ? (
                    <Input
                      id="contact"
                      name={isTherapist ? "relianceDirecte" : "contact"}
                      value={formData[isTherapist ? "relianceDirecte" : "contact"] || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-foreground/80">{isTherapist ? person.relianceDirecte : person.contact}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-foreground/60 mb-4">
              Votre espace personnel : {person.personalSpaceId}
            </p>
            <p className="text-sm text-foreground/60">
              Partagez ce lien pour que vos clients accèdent directement à votre espace
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalSpacePage;