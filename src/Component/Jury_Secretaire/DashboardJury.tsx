import React, { useState, useEffect } from 'react'; // CORRECTION: Ajouter useEffect ici
import { useNavigate } from 'react-router-dom'; // RETIRER type NavigateFunction
import {
  Star, Eye, CheckCircle, Clock, Award, FileText,
  LogOut, Filter, Search, BarChart, ThumbsUp,
  MessageSquare, PlayCircle, Download, Calendar
} from 'lucide-react';

const DashboardJury: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState<string>('toutes');
  
  // AJOUTER CETTE VÉRIFICATION AU DÉBUT
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // VÉRIFICATION D'AUTHENTIFICATION
  useEffect(() => {
    const user = localStorage.getItem('user');
    const adminUser = localStorage.getItem('adminUser');
    
    if (!user || !adminUser) {
      navigate('/identification');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'jury') {
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

  // AJOUTER UN LOADER PENDANT LA VÉRIFICATION
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de votre session...</p>
        </div>
      </div>
    );
  }


  const stats = {
    aEvaluer: 24,
    evaluees: 45,
    moyenne: 78,
    enCours: 3,
    finalistes: 12
  };

  // Œuvres anonymisées à évaluer
  const oeuvres = [
    {
      id: 'PE-023',
      titre: "L'impact de la formation professionnelle dans la société moderne",
      categorie: 'Reportage',
      date: '12/01/2024',
      noteJury: 0,
      evaluations: 0,
      temps: '15 min',
      media: 'article',
      description: 'Une enquête approfondie sur les effets de la formation continue dans différents secteurs professionnels...',
      urls: ['https://exemple.com/article1', 'https://exemple.com/video1']
    },
    {
      id: 'PE-045',
      titre: 'Innovation technologique en milieu rural : défis et opportunités',
      categorie: 'Documentaire',
      date: '10/01/2024',
      noteJury: 0,
      evaluations: 1,
      temps: '25 min',
      media: 'video',
      description: 'Documentaire sur l\'adoption des technologies dans les zones rurales et son impact sur le développement économique...',
      urls: ['https://exemple.com/video2']
    },
    {
      id: 'PE-067',
      titre: 'Le journalisme d\'investigation à l\'ère du numérique',
      categorie: 'Enquête',
      date: '08/01/2024',
      noteJury: 82,
      evaluations: 2,
      temps: '20 min',
      media: 'article',
      description: 'Analyse des nouvelles méthodes d\'investigation journalistique avec l\'avènement des outils numériques...',
      urls: ['https://exemple.com/article3', 'https://exemple.com/audio3']
    },
    {
      id: 'PE-089',
      titre: 'Portrait d\'une communauté à travers l\'objectif',
      categorie: 'Portfolio Photo',
      date: '05/01/2024',
      noteJury: 76,
      evaluations: 2,
      temps: '12 min',
      media: 'photo',
      description: 'Série photographique capturant la vie quotidienne et les traditions d\'une communauté isolée...',
      urls: ['https://exemple.com/portfolio4']
    },
    {
      id: 'PE-101',
      titre: 'Le podcast comme outil de sensibilisation sociale',
      categorie: 'Podcast',
      date: '03/01/2024',
      noteJury: 91,
      evaluations: 2,
      temps: '30 min',
      media: 'audio',
      description: 'Série de podcasts explorant des questions sociales complexes à travers des témoignages et analyses...',
      urls: ['https://exemple.com/podcast5']
    }
  ];

  const categories = ['Toutes', 'Reportage', 'Documentaire', 'Enquête', 'Portfolio Photo', 'Podcast', 'Interview'];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  const getMediaIcon = (media: string) => {
    switch(media) {
      case 'video': return <PlayCircle className="w-4 h-4 text-red-500" />;
      case 'audio': return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'photo': return <Eye className="w-4 h-4 text-blue-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNoteBadge = (note: number) => {
    if (note === 0) return null;
    if (note >= 80) return <span className="badge badge-success">{note}/100</span>;
    if (note >= 70) return <span className="badge badge-warning">{note}/100</span>;
    return <span className="badge badge-error">{note}/100</span>;
  };

  const filteredOeuvres = oeuvres.filter(oeuvre => {
    const matchesSearch = 
      oeuvre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oeuvre.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFiltre = 
      filtreCategorie === 'toutes' || 
      oeuvre.categorie.toLowerCase() === filtreCategorie.toLowerCase();
    
    return matchesSearch && matchesFiltre;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Espace Membre du Jury
                </h1>
                <p className="text-sm text-gray-600">Évaluation des candidatures anonymisées</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Dr. Fatou Ndiaye</p>
                <p className="text-xs text-gray-600">Membre du Jury - Catégorie Reportage</p>
              </div>
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
        {/* Cartes de progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">À évaluer</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.aEvaluer}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Évaluées</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.evaluees}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Moyenne</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.moyenne}/100</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.enCours}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Finalistes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.finalistes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900">
                Œuvres à Évaluer (Anonymisées)
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une œuvre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64"
                  />
                </div>
                <select 
                  value={filtreCategorie}
                  onChange={(e) => setFiltreCategorie(e.target.value)}
                  className="select select-bordered"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat === 'toutes' ? 'Toutes catégories' : cat}
                    </option>
                  ))}
                </select>
                <button className="btn btn-ghost">
                  <Filter className="w-4 h-4" />
                  Plus de filtres
                </button>
              </div>
            </div>
          </div>

          {/* Liste des œuvres */}
          <div className="divide-y divide-gray-200">
            {filteredOeuvres.map((oeuvre) => (
              <div key={oeuvre.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getMediaIcon(oeuvre.media)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {oeuvre.id} - {oeuvre.titre}
                          </h3>
                          {getNoteBadge(oeuvre.noteJury)}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {oeuvre.date}
                          </span>
                          <span className="badge badge-outline">{oeuvre.categorie}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {oeuvre.temps} de lecture
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {oeuvre.evaluations}/2 évaluations
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3 line-clamp-2">
                          {oeuvre.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {oeuvre.urls.map((url, index) => (
                            <a
                              key={index}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              Lien {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-end">
                    {oeuvre.noteJury === 0 ? (
                      <button 
                        onClick={() => navigate(`/jury/evaluation/${oeuvre.id}`)}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Évaluer cette œuvre
                      </button>
                    ) : (
                      <button className="btn btn-outline flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Voir mon évaluation
                      </button>
                    )}
                    
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-sm">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grille d'évaluation et statistiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grille d'évaluation */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Ma Grille d'Évaluation
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Originalité / Innovation (0-25 pts)
                </label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="25" value="18" className="range range-sm range-primary flex-1" />
                  <span className="text-sm font-medium">18/25</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualité de la recherche (0-25 pts)
                </label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="25" value="22" className="range range-sm range-primary flex-1" />
                  <span className="text-sm font-medium">22/25</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact social (0-20 pts)
                </label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="20" value="15" className="range range-sm range-primary flex-1" />
                  <span className="text-sm font-medium">15/20</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualité de présentation (0-15 pts)
                </label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="15" value="12" className="range range-sm range-primary flex-1" />
                  <span className="text-sm font-medium">12/15</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Respect des règles (0-15 pts)
                </label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="15" value="15" className="range range-sm range-primary flex-1" />
                  <span className="text-sm font-medium">15/15</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-primary">82/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mes évaluations récentes */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Mes Évaluations Récentes
            </h3>
            <div className="space-y-3">
              {[
                { id: 'PE-067', note: 82, date: 'Aujourd\'hui', statut: 'Finaliste' },
                { id: 'PE-089', note: 76, date: 'Hier', statut: 'En attente' },
                { id: 'PE-101', note: 91, date: '15/01', statut: 'Finaliste' }
              ].map((evalItem) => (
                <div key={evalItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">{evalItem.id}</p>
                    <p className="text-sm text-gray-600">{evalItem.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      evalItem.note >= 80 ? 'text-green-600' : 
                      evalItem.note >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {evalItem.note}/100
                    </p>
                    <span className={`text-xs ${
                      evalItem.statut === 'Finaliste' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {evalItem.statut}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn btn-outline">
              Voir toutes mes évaluations
            </button>
          </div>

          {/* Actions rapides */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Actions Rapides
            </h3>
            <div className="space-y-3">
              <button className="w-full btn btn-outline justify-start">
                <BarChart className="w-4 h-4 mr-2" />
                Voir les statistiques globales
              </button>
              <button className="w-full btn btn-outline justify-start">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Proposer un finaliste
              </button>
              <button className="w-full btn btn-outline justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Soumettre un commentaire général
              </button>
              <button className="w-full btn btn-outline justify-start">
                <Download className="w-4 h-4 mr-2" />
                Télécharger ma grille d'évaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJury;