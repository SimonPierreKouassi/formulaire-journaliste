import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, Eye, CheckCircle, Clock, Award, FileText,
  LogOut, Search, 
  MessageSquare, PlayCircle, Download, Calendar,
  Percent
} from 'lucide-react';

const DashboardJury: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState<string>('toutes');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // VÉRIFICATION D'AUTHENTIFICATION
  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (!user) {
      navigate('/identification');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'jury') {
        navigate('/identification');
        return;
      }
      
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

  // Statistiques
  const stats = {
    aEvaluer: 1,
    evaluees: 0,
    moyenne: 70,
    enCours: 0,
    finalistes: 0
  };

  // UNE SEULE ŒUVRE À ÉVALUER (exemple réaliste)
  const oeuvreAEvaluer = {
    id: 'PAPC-2026-023',
    titre: "Formation en intelligence artificielle : nouveau passeport pour l'emploi des jeunes",
    categorie: 'Reportage',
    date: '12/01/2025',
    datePublication: '15/10/2025',
    noteJury: 0,
    evaluations: 0,
    temps: '12 min',
    media: 'video',
    typeMedia: 'Télévision',
    description: 'Un reportage qui suit le parcours de jeunes ivoiriens formés en IA à l\'Institut de Technologie d\'Abidjan, et comment ces compétences leur ont ouvert des portes vers l\'emploi durable et la mobilité internationale.',
    urls: ['https://www.youtube.com/watch?v=54dsTrISBQE'],
    format: 'MP4',
    langue: 'Français',
    duree: '12 minutes',
    mediaSource: 'RTI 1',
    theme: 'Formation professionnelle & Emploi',
    motsCles: ['IA', 'jeunes', 'formation', 'emploi', 'mobilité', 'compétences']
  };

  const categories = ['Toutes', 'Reportage', 'Documentaire', 'Enquête', 'Portfolio Photo', 'Podcast', 'Interview'];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getMediaIcon = (media: string) => {
    switch(media) {
      case 'video': return <PlayCircle className="w-5 h-5 text-red-500" />;
      case 'audio': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'photo': return <Eye className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

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
                <p className="text-sm text-gray-600">Prix Alassane Ouattara Passeport-Compétences 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Dr. Fatou Ndiaye</p>
                <p className="text-xs text-gray-600">Membre du Jury - Collège Médias</p>
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
                <p className="text-sm font-medium text-gray-600">Moyenne générale</p>
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
                Œuvre à Évaluer (Anonymisée)
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
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
              </div>
            </div>
          </div>

          {/* Détails de l'œuvre */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getMediaIcon(oeuvreAEvaluer.media)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {oeuvreAEvaluer.id} - {oeuvreAEvaluer.titre}
                      </h3>
                      <span className="badge badge-info">Nouveau</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Publié le {oeuvreAEvaluer.datePublication}
                      </span>
                      <span className="badge badge-outline">{oeuvreAEvaluer.categorie}</span>
                      <span className="badge badge-outline">{oeuvreAEvaluer.typeMedia}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {oeuvreAEvaluer.duree}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">Description :</h4>
                      <p className="text-gray-700">{oeuvreAEvaluer.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Informations techniques :</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Format : {oeuvreAEvaluer.format}</li>
                          <li>• Langue : {oeuvreAEvaluer.langue}</li>
                          <li>• Source : {oeuvreAEvaluer.mediaSource}</li>
                          <li>• Thème : {oeuvreAEvaluer.theme}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Mots-clés :</h4>
                        <div className="flex flex-wrap gap-2">
                          {oeuvreAEvaluer.motsCles.map((mot, index) => (
                            <span key={index} className="badge badge-ghost">
                              {mot}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Accès à l'œuvre :</h4>
                      <div className="flex flex-wrap gap-3">
                        {oeuvreAEvaluer.urls.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            {index === 0 ? 'Visionner le reportage' : `Lien ${index + 1}`}
                          </a>
                        ))}
                        <button className="btn btn-ghost btn-sm flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Télécharger
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-80">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-900 mb-3">Statut de l'évaluation</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Note actuelle :</span>
                      <span className="font-bold">Non évaluée</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Évaluations reçues :</span>
                      <span>{oeuvreAEvaluer.evaluations}/2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dernier accès :</span>
                      <span>Aujourd'hui</span>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <button 
                        onClick={() => navigate(`/jury/evaluation/${oeuvreAEvaluer.id}`)}
                        className="w-full btn btn-primary flex items-center justify-center gap-2"
                      >
                        <Star className="w-5 h-5" />
                        Commencer l'évaluation
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Vous serez redirigé vers la grille d'évaluation officielle
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations sur le processus */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Instructions pour l'évaluation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Critères d'évaluation
              </h4>
              <p className="text-sm text-blue-700">
                Vous évaluerez selon 5 critères officiels avec une grille détaillée. Chaque critère a des sous-critères spécifiques.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <Percent className="w-5 h-5" />
                Système de notation
              </h4>
              <p className="text-sm text-green-700">
                Notation sur 100 points. Le seuil de qualification est de 70/100. Les notes sont sauvegardées automatiquement.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Confidentialité
              </h4>
              <p className="text-sm text-purple-700">
                L'œuvre est anonymisée. Vos évaluations sont confidentielles et ne seront partagées qu'avec le secrétariat du Prix.
              </p>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        
       
      </div>
    </div>
  );
};

export default DashboardJury;