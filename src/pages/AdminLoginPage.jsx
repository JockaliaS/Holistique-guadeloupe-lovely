import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getAdminUser, setCurrentUser } from '@/lib/database';

const AdminLoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'une vérification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.username === 'admin' && formData.password === 'TerraNova2025!') {
      const adminUser = getAdminUser();
      setCurrentUser(adminUser);
      
      toast({
        title: "🌟 Connexion réussie !",
        description: "Bienvenue dans l'espace d'administration Terra Nova."
      });
      
      navigate('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: "Nom d'utilisateur ou mot de passe incorrect."
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center mystical-gradient">
      <Helmet>
        <title>Administration - Connexion Terra Nova</title>
        <meta name="description" content="Interface de connexion pour l'administration de Terra Nova." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="crystal-card rounded-3xl p-8 md:p-12 max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold aura-text font-['Dancing_Script']">
            Administration
          </h1>
          <p className="text-foreground/80 mt-2">
            Accès réservé aux administrateurs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="admin"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Connexion...
              </div>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Se connecter
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-foreground/60">
          <p>Identifiants par défaut :</p>
          <p>Utilisateur: <code className="bg-background/50 px-1 rounded">admin</code></p>
          <p>Mot de passe: <code className="bg-background/50 px-1 rounded">TerraNova2025!</code></p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;