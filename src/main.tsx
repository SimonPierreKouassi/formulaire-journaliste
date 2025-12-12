import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from './Component/Acceuil';
import Candidature from './Component/Candidature';
import Confirmation from './Component/Confirmation';
import './index.css';
import AdminLogin from './Component/Jury/AdminLogin';
import Identification from './Component/Jury/Identification';
import DashboardJury from './Component/Jury/DashboardJury';
import ReglementConcours from './Component/ReglementConcours';
import EvaluationPage from './Component/Jury/EvaluationPage';
import SecretaireTechniqueLayout from './Component/Secretaire_technique/Layout';
import DashboardSecretaire from './Component/Secretaire_technique/DashboardSecretaire';
import VerificationDossiers from './Component/Secretaire_technique/Modules/VerificationDossiers';
import GestionJury from './Component/Secretaire_technique/Modules/GestionJury';
import RapportsStats from './Component/Secretaire_technique/Modules/RapportsStats';
import Parametres from './Component/Secretaire_technique/Modules/Parametres';

// Import des nouveaux composants du secrétariat technique


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil publique */}
        <Route path="/" element={<Accueil />} />
        <Route path="/reglement" element={<ReglementConcours />} />
        
        {/* Nouvelle page d'identification */}
        <Route path="/identification" element={<Identification />} />
        
        {/* Login admin après identification */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Espace Candidat */}
        <Route path="/candidater" element={<Candidature />} />
        <Route path="/confirmation" element={<Confirmation />} />
        
        {/* Espace Jury */}
        <Route path="/jury" element={<DashboardJury />} />
        <Route path="/jury/evaluation/:id" element={<EvaluationPage />} />
        
        {/* Espace Secrétariat Technique avec layout */}
        <Route path="/secretaire" element={<SecretaireTechniqueLayout />}>
          <Route index element={<DashboardSecretaire />} />
          <Route path="verification" element={<VerificationDossiers />} />
          <Route path="jury" element={<GestionJury />} />
          <Route path="rapports" element={<RapportsStats />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>
        
        {/* Redirections automatiques */}
        <Route path="/secretaire/*" element={<Navigate to="/secretaire" replace />} />
        <Route path="/jury/*" element={<Navigate to="/jury" replace />} />
        
        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);