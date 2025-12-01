import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, FileCheck, Download, 
  Search, Eye, CheckCircle, XCircle, UserCheck,
  LogOut, Bell, Settings, RefreshCw, Printer
} from 'lucide-react';



const DashboardSecretaire: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');
  
  // AJOUTER CETTE LIGNE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [stats,] = useState({
    total: 156,
    enAttente: 42,
    eligibles: 89,
    nonEligibles: 25,
    anonymises: 67
  });

  // AJOUTER CE useEffect POUR LA VÉRIFICATION
  useEffect(() => {
    const user = localStorage.getItem('user');
    const adminUser = localStorage.getItem('adminUser');
    
    if (!user || !adminUser) {
      navigate('/identification');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'secretaire') {
        navigate('/identification');
        return;
      }
      
      // Si tout est bon
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    } catch {
      navigate('/identification');
    }
  }, [navigate]);

  // AJOUTER CE LOADER PENDANT LA VÉRIFICATION
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de votre session...</p>
        </div>
      </div>
    );
  }

  // Données de démonstration
  const candidatures = [
    {
      id: 'PASS-2024-001',
      nom: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      categorie: 'Reportage',
      date: '15/01/2024',
      statut: 'en-attente',
      pieces: 3,
      estAnonyme: false
    },
    {
      id: 'PASS-2024-002',
      nom: 'Marie Martin',
      email: 'marie.martin@email.com',
      categorie: 'Documentaire',
      date: '14/01/2024',
      statut: 'eligible',
      pieces: 5,
      estAnonyme: true
    },
    {
      id: 'PASS-2024-003',
      nom: 'Paul Koné',
      email: 'paul.kone@email.com',
      categorie: 'Interview',
      date: '13/01/2024',
      statut: 'non-eligible',
      pieces: 2,
      estAnonyme: false
    },
    {
      id: 'PASS-2024-004',
      nom: 'Fatou Ndiaye',
      email: 'fatou.ndiaye@email.com',
      categorie: 'Podcast',
      date: '12/01/2024',
      statut: 'en-attente',
      pieces: 4,
      estAnonyme: false
    },
    {
      id: 'PASS-2024-005',
      nom: 'Ahmed Diop',
      email: 'ahmed.diop@email.com',
      categorie: 'Portfolio Photo',
      date: '11/01/2024',
      statut: 'eligible',
      pieces: 6,
      estAnonyme: true
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'eligible': return <span className="badge badge-success">Éligible</span>;
      case 'non-eligible': return <span className="badge badge-error">Non éligible</span>;
      case 'en-attente': return <span className="badge badge-warning">En attente</span>;
      default: return <span className="badge badge-info">{statut}</span>;
    }
  };

  const filteredCandidatures = candidatures.filter(candidature => {
    const matchesSearch = 
      candidature.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidature.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFiltre = filtreStatut === 'tous' || candidature.statut === filtreStatut;
    
    return matchesSearch && matchesFiltre;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Espace Secrétaire Technique
                </h1>
                <p className="text-sm text-gray-600">Gestion des candidatures</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn btn-ghost btn-sm">
                <Bell className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-sm">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="btn btn-outline btn-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <FileCheck className="h-8 w-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.enAttente}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Éligibles</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.eligibles}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Non Éligibles</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.nonEligibles}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Anonymisés</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.anonymises}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barre d'actions */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900">
                Liste des Candidatures
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher candidature..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64"
                  />
                </div>
                <select 
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                  className="select select-bordered"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en-attente">En attente</option>
                  <option value="eligible">Éligible</option>
                  <option value="non-eligible">Non éligible</option>
                </select>
                <div className="flex gap-2">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Exporter
                  </button>
                  <button className="btn btn-ghost">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tableau des candidatures */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Candidature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Soumission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidatures.map((candidature) => (
                  <tr key={candidature.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {candidature.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        {candidature.pieces} pièce(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {candidature.nom}
                      </div>
                      <div className="text-xs text-gray-500">
                        {candidature.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidature.categorie}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidature.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatutBadge(candidature.statut)}
                      {candidature.estAnonyme && (
                        <span className="ml-2 badge badge-info badge-xs">Anonyme</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Voir
                        </button>
                        {candidature.statut === 'en-attente' && (
                          <>
                            <button className="btn btn-sm btn-success">
                              <CheckCircle className="w-3 h-3" />
                            </button>
                            <button className="btn btn-sm btn-error">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </>
                        )}
                        {candidature.statut === 'eligible' && !candidature.estAnonyme && (
                          <button className="btn btn-sm btn-warning">
                            Anonymiser
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur <span className="font-medium">156</span> candidatures
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-ghost">Précédent</button>
                <button className="btn btn-sm btn-primary">1</button>
                <button className="btn btn-sm btn-ghost">2</button>
                <button className="btn btn-sm btn-ghost">3</button>
                <button className="btn btn-sm btn-ghost">Suivant</button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <button className="w-full btn btn-outline justify-start">
                <UserCheck className="w-4 h-4 mr-2" />
                Gérer les comptes Jury
              </button>
              <button className="w-full btn btn-outline justify-start">
                <Printer className="w-4 h-4 mr-2" />
                Générer rapports
              </button>
              <button className="w-full btn btn-outline justify-start">
                <Download className="w-4 h-4 mr-2" />
                Exporter toutes les données
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Dernières activités
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    Candidature <strong>PASS-2024-002</strong> marquée comme éligible
                  </p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    Candidature <strong>PASS-2024-004</strong> anonymisée
                  </p>
                  <p className="text-xs text-gray-500">Il y a 4 heures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSecretaire;