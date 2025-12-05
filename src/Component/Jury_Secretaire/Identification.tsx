import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Users, ArrowLeft, Key } from 'lucide-react';

const Identification: React.FC = () => {
  const navigate = useNavigate();
  const [nomComplet, setNomComplet] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Base de données des utilisateurs autorisés (en dur pour le test)
  const utilisateursAutorises = [
    // Secrétaires Techniques
    { 
      nomComplet: 'Marie Dubois', 
      email: 'secretaire1@prix.com', 
      role: 'secretaire',
      password: 'secret123'
    },
    { 
      nomComplet: 'Jean Martin', 
      email: 'secretaire2@prix.com', 
      role: 'secretaire',
      password: 'secret456'
    },
    
    // Membres du Jury
    { 
      nomComplet: 'Prof. Ahmed Diop', 
      email: 'jury1@prix.com', 
      role: 'jury',
      password: 'jury123'
    },
    { 
      nomComplet: 'Dr. Fatou Ndiaye', 
      email: 'jury2@prix.com', 
      role: 'jury',
      password: 'jury456'
    },
    { 
      nomComplet: 'M. Paul Koné', 
      email: 'jury3@prix.com', 
      role: 'jury',
      password: 'jury789'
    }
  ];

  const handleIdentification = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Rechercher l'utilisateur
    const utilisateur = utilisateursAutorises.find(
      user => 
        user.nomComplet.toLowerCase() === nomComplet.toLowerCase().trim() &&
        user.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (utilisateur) {
      // Stocker les infos utilisateur (sans le mot de passe pour la sécurité)
      const userInfo = {
        nomComplet: utilisateur.nomComplet,
        email: utilisateur.email,
        role: utilisateur.role,
        authKey: btoa(`${utilisateur.email}:${Date.now()}`) // Clé temporaire
      };
      
      localStorage.setItem('adminUser', JSON.stringify(userInfo));
      
      // Rediriger vers le formulaire de connexion sécurisé
      if (utilisateur.role === 'secretaire') {
        navigate('/admin-login?role=secretaire&user=' + encodeURIComponent(utilisateur.nomComplet));
      } else {
        navigate('/admin-login?role=jury&user=' + encodeURIComponent(utilisateur.nomComplet));
      }
    } else {
      setError('Identifiants non reconnus. Vérifiez votre nom et email.');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header avec retour */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Identification
          </h1>
          <p className="text-gray-600">
            Veuillez vous identifier pour accéder à votre espace
          </p>
        </div>

        <form onSubmit={handleIdentification} className="space-y-6">
          {/* Nom Complet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nom et Prénom
            </label>
            <input
              type="text"
              value={nomComplet}
              onChange={(e) => setNomComplet(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Ex: Marie Dubois"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Adresse email professionnelle
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="votre@email.professionnel"
              required
            />
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Bouton de vérification */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Key className="w-5 h-5" />
            Vérifier mon identité
          </button>
        </form>

        {/* Informations pour le test */}
        <div className="mt-8">
          <details className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="p-4 bg-gray-50 cursor-pointer text-sm font-medium text-gray-700">
              📋 Identifiants de test (pour les démonstrations)
            </summary>
            <div className="p-4 bg-white">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 text-sm mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Secrétaires Techniques
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1 ml-6">
                    <li>• <strong>Marie Dubois</strong> - secretaire1@prix.com</li>
                    <li>• <strong>Jean Martin</strong> - secretaire2@prix.com</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 text-sm mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    Membres du Jury
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1 ml-6">
                    <li>• <strong>Prof. Ahmed Diop</strong> - jury1@prix.com</li>
                    <li>• <strong>Dr. Fatou Ndiaye</strong> - jury2@prix.com</li>
                    <li>• <strong>M. Paul Koné</strong> - jury3@prix.com</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                Ces identifiants sont valides pour la démonstration uniquement.
              </p>
            </div>
          </details>
        </div>

        {/* Message de sécurité */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-700 text-xs text-center">
            🔐 Cet accès est strictement réservé aux membres autorisés 
            du Prix Passeport-Compétences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Identification;