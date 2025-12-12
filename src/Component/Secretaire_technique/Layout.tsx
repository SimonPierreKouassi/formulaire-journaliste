// src/Component/Secretaire_technique/Layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  User,
  HelpCircle
} from 'lucide-react';

const SecuriteTechniqueLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userInfo, setUserInfo] = useState<{ nom: string; role: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserInfo({
          nom: userData.nom || 'Secrétaire Technique',
          role: userData.role || 'secretaire'
        });
      } catch (error) {
        console.error('Erreur de parsing user:', error);
        navigate('/identification');
      }
    } else {
      navigate('/identification');
    }
  }, [navigate]);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Tableau de bord', 
      icon: LayoutDashboard, 
      path: '/secretaire',
      description: 'Vue d\'ensemble des activités'
    },
    { 
      id: 'verification', 
      label: 'Vérification des dossiers', 
      icon: FileCheck, 
      path: '/secretaire/verification',
      description: 'Vérifier l\'éligibilité des candidatures',
      badge: '3'
    },
    { 
      id: 'jury', 
      label: 'Gestion du jury', 
      icon: Users, 
      path: '/secretaire/jury',
      description: 'Assigner et suivre les jurés'
    },
    { 
      id: 'rapports', 
      label: 'Rapports & Statistiques', 
      icon: BarChart3, 
      path: '/secretaire/rapports',
      description: 'Analyser les données du concours'
    },
    { 
      id: 'parametres', 
      label: 'Paramètres', 
      icon: Settings, 
      path: '/secretaire/parametres',
      description: 'Configurer le système'
    },
  ];

  // CORRECTION : Vérification exacte du chemin
  const isItemActive = (itemPath: string) => {
    // Pour la route dashboard (/secretaire), on veut une correspondance exacte
    if (itemPath === '/secretaire') {
      return location.pathname === '/secretaire';
    }
    // Pour les autres routes, on vérifie si le chemin commence par le path
    // mais pas exactement égal à '/secretaire'
    return location.pathname.startsWith(itemPath) && location.pathname !== '/secretaire';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
    navigate('/identification');
  };

  const currentMenuItem = menuItems.find(item => isItemActive(item.path)) || menuItems[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar pour desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo et titre */}
          <div className="flex items-center shrink-0 px-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">Secrétariat Technique</h1>
              <p className="text-xs text-gray-500">Prix Passeport-Compétences</p>
            </div>
          </div>

          {/* Navigation */} 
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="relative">
                    <Icon className={`mr-3 h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    {item.badge && (
                      <span className="absolute mr-1 -top-3 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {active && (
                      <p className="text-xs text-blue-600 mt-0.5">{item.description}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* User info et logout */}
          <div className="shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {userInfo?.nom || 'Chargement...'}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userInfo?.role}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate('/secretaire/parametres')}
                className="flex-1 btn btn-sm btn-outline"
              >
                <Settings className="w-3 h-3 mr-1" />
                Profil
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 btn btn-sm btn-outline btn-error"
              >
                <LogOut className="w-3 h-3 mr-1" />
                Quitter
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Header mobile et desktop */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Bouton menu mobile et titre */}
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                >
                  {sidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
                
                <div className="ml-4 lg:ml-0">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentMenuItem.label}
                  </h2>
                  <p className="text-sm text-gray-600 hidden sm:block">
                    {currentMenuItem.description}
                  </p>
                </div>
              </div>

              {/* Actions header */}
              <div className="flex items-center gap-4">
                <button 
                  className="relative p-2"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>
                
                <button className="btn btn-ghost btn-circle">
                  <HelpCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar mobile */}
        {sidebarOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40 flex">
              <div 
                className="fixed inset-0 bg-gray-600 bg-opacity-75" 
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="absolute top-0 right-0 -mr-12 pt-4">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-gray-800"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="px-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-3">
                        <h1 className="text-lg font-bold text-gray-900">Secrétariat Technique</h1>
                        <p className="text-xs text-gray-500">Prix Passeport-Compétences</p>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="px-2 space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const active = isItemActive(item.path);
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigate(item.path);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center px-3 py-3 text-base font-medium rounded-lg ${
                            active
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="mr-3 h-6 w-6" />
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {active && (
                              <p className="text-xs text-blue-600 mt-1">{item.description}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="shrink-0 border-t border-gray-200 p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
              <div className="mb-2 sm:mb-0">
                © 2025 Prix Alassane Ouattara Passeport-Compétences
              </div>
              <div className="flex gap-4">
                <span>Version 1.0.0</span>
                <span>•</span>
                <span>AGEFOP</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SecuriteTechniqueLayout;