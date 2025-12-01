import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './Component/Acceuil';
import Candidature from './Component/Candidature';
import Confirmation from './Component/Confirmation';
import './index.css';
import AdminLogin from './Component/Jury_Secretaire/AdminLogin';
import Identification from './Component/Jury_Secretaire/Identification';
import DashboardJury from './Component/Jury_Secretaire/DashboardJury';
import DashboardSecretaire from './Component/Jury_Secretaire/DashboardSecretaire';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil publique */}
        <Route path="/" element={<Accueil />} />
        
        {/* Nouvelle page d'identification */}
        <Route path="/identification" element={<Identification />} />
        
        {/* Login admin après identification */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Espace Candidat */}
        <Route path="/candidater" element={<Candidature />} />
        <Route path="/confirmation" element={<Confirmation />} />
        
        {/* Espaces Admin - ACCÈS DIRECT */}
        <Route path="/secretaire/*" element={<DashboardSecretaire />} />
        <Route path="/jury/*" element={<DashboardJury />} />
        
        {/* Route par défaut */}
        <Route path="*" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);