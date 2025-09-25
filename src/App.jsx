import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import QuizPage from '@/pages/QuizPage';
import TherapistsDirectoryPage from '@/pages/TherapistsDirectoryPage';
import CreatorsDirectoryPage from '@/pages/CreatorsDirectoryPage';
import CreatorProfilePage from '@/pages/CreatorProfilePage';
import RegisterCreatorPage from '@/pages/RegisterCreatorPage';
import EditCreatorProfilePage from '@/pages/EditCreatorProfilePage';
import AdminPage from '@/pages/AdminPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import PersonalSpacePage from '@/pages/PersonalSpacePage';
import ElinePage from '@/pages/ElinePage';
import TherapistProfile from '@/pages/TherapistProfile';
import RegisterTherapistPage from '@/pages/RegisterTherapistPage';
import BlogListPage from '@/pages/BlogListPage';
import BlogPostPage from '@/pages/BlogPostPage';
import DirectoryGatePage from '@/pages/DirectoryGatePage';
import EditTherapistProfilePage from '@/pages/EditTherapistProfilePage';
import MyInnerJourneyPage from '@/pages/MyInnerJourneyPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import RituelDomeEauTerrePage from '@/pages/RituelDomeEauTerrePage';
import TerrePage from '@/pages/TerrePage';
import EauPage from '@/pages/EauPage';
import FeuPage from '@/pages/FeuPage';
import AirPage from '@/pages/AirPage';
import EtherPage from '@/pages/EtherPage';
import TherapistCharterPage from '@/pages/TherapistCharterPage';
import ContactPage from '@/pages/ContactPage';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen sacred-geometry">
      <Helmet>
        <title>Terra Nova — Mon Voyage Intérieur</title>
        <meta name="description" content="Terra Nova : Plateforme holistique interactive pour composer votre journée bien-être sur mesure en Guadeloupe. Connectez-vous aux thérapeutes, artistes et lieux sacrés." />
      </Helmet>
      
      <ScrollToTop />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/directory" element={<TherapistsDirectoryPage />} />
        <Route path="/artistes" element={<CreatorsDirectoryPage />} />
        <Route path="/artiste/:id" element={<CreatorProfilePage />} />
        <Route path="/register-creator" element={<RegisterCreatorPage />} />
        <Route path="/edit-creator-profile" element={<EditCreatorProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/espace/:spaceId" element={<PersonalSpacePage />} />
        <Route path="/directory-gate" element={<DirectoryGatePage />} />
        <Route path="/eline-dracon" element={<ElinePage />} />
        <Route path="/soin/rituel-dome-eau-terre" element={<RituelDomeEauTerrePage />} />
        <Route path="/soin/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/therapeute/:id" element={<TherapistProfile />} />
        <Route path="/therapist-charter" element={<TherapistCharterPage />} />
        <Route path="/register-therapist" element={<RegisterTherapistPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/edit-therapist-profile" element={<EditTherapistProfilePage />} />
        <Route path="/mon-voyage-interieur" element={<MyInnerJourneyPage />} />
        <Route path="/porte/terre" element={<TerrePage />} />
        <Route path="/porte/eau" element={<EauPage />} />
        <Route path="/porte/feu" element={<FeuPage />} />
        <Route path="/porte/air" element={<AirPage />} />
        <Route path="/porte/ether" element={<EtherPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;