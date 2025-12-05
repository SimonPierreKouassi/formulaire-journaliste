import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  Lock, Eye, EyeOff, Shield, Users, CheckCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState<{nomComplet: string; role: string} | null>(null);
  
  const userRole = searchParams.get('role') as 'secretaire' | 'jury' | null;
  const userName = searchParams.get('user');

  useEffect(() => {
    // Vérifier si l'utilisateur vient de l'identification
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserInfo(parsedUser);
    } else if (userName) {
      // Fallback si venant directement de l'URL
      setUserInfo({
        nomComplet: decodeURIComponent(userName),
        role: userRole || 'unknown'
      });
    }
  }, [userRole, userName]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Récupérer l'utilisateur stocké
    const storedUser = localStorage.getItem('adminUser');
    if (!storedUser) {
      alert('Session invalide. Veuillez vous réidentifier.');
      navigate('/identification');
      return;
    }

    const userData = JSON.parse(storedUser);
    
    // Vérifier le mot de passe (en dur pour la démo)
    const validPasswords = {
      secretaire: ['secret123', 'secret456'],
      jury: ['jury123', 'jury456', 'jury789']
    };

    if (validPasswords[userData.role as keyof typeof validPasswords]?.includes(password)) {
      // Connexion réussie
      localStorage.setItem('user', JSON.stringify({
        ...userData,
        loggedIn: true,
        timestamp: new Date().toISOString()
      }));
      
      // Redirection
      if (userData.role === 'secretaire') {
        navigate('/secretaire/dashboard');
      } else {
        navigate('/jury/dashboard');
      }
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Session invalide</h1>
          <p className="text-gray-600">Veuillez d'abord vous identifier.</p>
          <button 
            onClick={() => navigate('/identification')}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Page d'identification
          </button>
        </div>
      </div>
    );
  }

  const roleConfig = {
    secretaire: {
      title: 'Espace Secrétaire Technique',
      description: 'Bienvenue dans votre espace de gestion',
      icon: Shield,
      color: 'blue'
    },
    jury: {
      title: 'Espace Membre du Jury', 
      description: 'Bienvenue dans votre espace d\'évaluation',
      icon: Users,
      color: 'purple'
    }
  };

  const config = roleConfig[userInfo.role as keyof typeof roleConfig] || roleConfig.jury;
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Afficher l'utilisateur identifié */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
            <div>
              <p className="font-medium text-green-800">Identifié(e) : {userInfo.nomComplet}</p>
              <p className="text-sm text-green-600">Rôle : {userInfo.role === 'secretaire' ? 'Secrétaire Technique' : 'Membre du Jury'}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconComponent className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {config.title}
          </h1>
          <p className="text-gray-600 text-sm">{config.description}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Mot de passe de session
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                placeholder="Votre mot de passe personnel"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Utilisez le mot de passe qui vous a été attribué
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
          >
            Ouvrir ma session
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('adminUser');
              navigate('/identification');
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Ce n'est pas vous ? Changer d'utilisateur
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;