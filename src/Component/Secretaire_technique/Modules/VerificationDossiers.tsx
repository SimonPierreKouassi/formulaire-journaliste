// src/Component/Secretaire_technique/Modules/VerificationDossiers.tsx
import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Download, Eye, CheckCircle,
  XCircle, User, FileText, Calendar, AlertCircle,
  ChevronDown, ChevronUp, UserCheck, Clock,
  FileWarning, Shield, Edit,  Check, X,
  FolderOpen, RefreshCw, 
  ThumbsUp, ThumbsDown
} from 'lucide-react';
import type { Candidature } from '../common/types';

const VerificationDossiers: React.FC = () => {
  const [selectedDossier, setSelectedDossier] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    statut: 'tous',
    categorie: 'toutes',
    media: 'tous',
    dateDebut: '',
    dateFin: ''
  });
  const [dossiers, setDossiers] = useState<Candidature[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Charger les données de démonstration
    const loadDossiers = async () => {
      const mockDossiers: Candidature[] = [
        {
          id: 'PAPC-2025-001',
          candidat: {
            id: 'CAND-001',
            nom: 'Jean Dupont',
            email: 'jean.dupont@rti.ci',
            telephone: '+225 07 12 34 56 78',
            cartePresse: 'JOU-2023-04567',
            dateDeNaissance: '05/07/1986',
            media: 'RTI 1',
            pays: 'Côte d\'Ivoire'
          },
          oeuvre: {
            titre: "Formation en IA : nouveau passeport pour l'emploi",
            categorie: 'television',
            typeMedia: 'Reportage TV',
            datePublication: new Date('2025-10-15'),
            format: 'MP4',
            duree: '12 minutes',
            langue: 'Français',
            url: 'https://exemple.com/video1',
            description: 'Reportage sur la formation en intelligence artificielle'
          },
          piecesJointes: [
            { 
              id: '1', 
              nom: 'Vidéo complète', 
              type: 'video', 
              taille: '450MB',
              url: 'https://exemple.com/video',
              dateUpload: new Date()
            },
            { 
              id: '2', 
              nom: 'Transcription', 
              type: 'document', 
              taille: '2.1MB',
              url: 'https://exemple.com/transcript',
              dateUpload: new Date()
            },
            { 
              id: '3', 
              nom: 'Carte de presse', 
              type: 'image', 
              taille: '1.5MB',
              url: 'https://exemple.com/carte',
              dateUpload: new Date()
            }
          ],
          statut: 'en-attente',
          dateSoumission: new Date('2024-01-15'),
          respecteCriteres: 'en-attente', // Nouveau champ
          checklist: {
            cartePresse: true,
            periodePublication: true,
            formatCorrect: true,
            langueFrancais: true,
            originalite: false,
            droitsAuteur: true
          }
        },
        {
          id: 'PAPC-2025-002',
          candidat: {
            id: 'CAND-002',
            nom: 'Marie Koné',
            email: 'marie.kone@fratmat.ci',
            telephone: '+225 07 23 45 67 89',
            cartePresse: 'JOU-2024-01234',
            dateDeNaissance:'09/10/1980',
            media: 'Fraternité Matin',
            pays: 'Côte d\'Ivoire'
          },
          oeuvre: {
            titre: 'Les métiers verts : opportunités pour les jeunes',
            categorie: 'presse-ecrite',
            typeMedia: 'Article',
            datePublication: new Date('2025-11-20'),
            format: 'PDF',
            duree: '8 min',
            langue: 'Français',
            url: 'https://exemple.com/article',
            description: 'Enquête sur les formations aux métiers de l\'écologie'
          },
          piecesJointes: [],
          statut: 'eligible',
          respecteCriteres: 'respecte', // Nouveau champ
          dateSoumission: new Date('2024-01-14'),
          dateVerification: new Date('2024-01-15'),
          verificateur: 'Admin 1',
          checklist: {
            cartePresse: true,
            periodePublication: true,
            formatCorrect: true,
            langueFrancais: true,
            originalite: true,
            droitsAuteur: true
          }
        },
        {
          id: 'PAPC-2025-003',
          candidat: {
            id: 'CAND-003',
            nom: 'Ahmed Diop',
            email: 'ahmed.diop@radio-ci.ci',
            telephone: '+225 07 34 56 78 90',
            cartePresse: 'JOU-2023-08901',
            dateDeNaissance: '29/01/1999',
            media: 'Radio Côte d\'Ivoire',
            pays: 'Côte d\'Ivoire'
          },
          oeuvre: {
            titre: 'Podcast : Compétences digitales en milieu rural',
            categorie: 'radio',
            typeMedia: 'Podcast',
            datePublication: new Date('2025-09-10'),
            format: 'MP3',
            duree: '25 minutes',
            langue: 'Français',
            url: 'https://exemple.com/podcast',
            description: 'Série de podcasts sur l\'accès au numérique'
          },
          piecesJointes: [],
          statut: 'non-eligible',
          respecteCriteres: 'non-respecte', // Nouveau champ
          dateSoumission: new Date('2024-01-13'),
          dateVerification: new Date('2024-01-14'),
          verificateur: 'Admin 2',
          motifsRejet: ['Hors période de publication', 'Format non conforme'],
          checklist: {
            cartePresse: true,
            periodePublication: false,
            formatCorrect: false,
            langueFrancais: true,
            originalite: true,
            droitsAuteur: true
          }
        }
      ];
      
      setDossiers(mockDossiers);
    };

    loadDossiers();
  }, []);

  const stats = {
    total: dossiers.length,
    enAttente: dossiers.filter(d => d.statut === 'en-attente').length,
    eligibles: dossiers.filter(d => d.statut === 'eligible').length,
    nonEligibles: dossiers.filter(d => d.statut === 'non-eligible').length,
    aCorriger: dossiers.filter(d => d.statut === 'a-corriger').length
  };

  const filteredDossiers = dossiers.filter(dossier => {
    const matchesSearch = 
      dossier.candidat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dossier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dossier.oeuvre.titre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatut = filters.statut === 'tous' || dossier.statut === filters.statut;
    const matchesCategorie = filters.categorie === 'toutes' || dossier.oeuvre.categorie === filters.categorie;
    
    return matchesSearch && matchesStatut && matchesCategorie;
  });

  // Fonction pour basculer un critère du checklist
  const toggleCritere = (dossierId: string, critere: keyof typeof dossiers[0]['checklist']) => {
    setDossiers(prev => prev.map(dossier => {
      if (dossier.id === dossierId) {
        const updatedChecklist = {
          ...dossier.checklist,
          [critere]: !dossier.checklist[critere]
        };

        // Vérifier si tous les critères sont cochés
        const tousCriteresValides = Object.values(updatedChecklist).every(valeur => valeur === true);
        
        // Mettre à jour le respect des critères
        let nouveauRespecteCriteres = dossier.respecteCriteres;
        let nouveauStatut = dossier.statut;
        
        if (tousCriteresValides) {
          nouveauRespecteCriteres = 'respecte';
          nouveauStatut = 'eligible';
        } else {
          // Vérifier si au moins un critère est non respecté
          const auMoinsUnNonRespecte = Object.values(updatedChecklist).some(valeur => valeur === false);
          if (auMoinsUnNonRespecte) {
            nouveauRespecteCriteres = 'non-respecte';
            nouveauStatut = 'non-eligible';
          } else {
            nouveauRespecteCriteres = 'en-attente';
            nouveauStatut = 'en-attente';
          }
        }
        
        return {
          ...dossier,
          checklist: updatedChecklist,
          statut: nouveauStatut,
          respecteCriteres: nouveauRespecteCriteres,
          dateVerification: ['eligible', 'non-eligible'].includes(nouveauStatut) ? new Date() : undefined,
          verificateur: ['eligible', 'non-eligible'].includes(nouveauStatut) ? 'Utilisateur actuel' : undefined
        };
      }
      return dossier;
    }));
  };

  // Fonction pour réinitialiser tous les critères
  const resetChecklist = (dossierId: string) => {
    setDossiers(prev => prev.map(dossier => 
      dossier.id === dossierId 
        ? { 
            ...dossier, 
            checklist: {
              cartePresse: false,
              periodePublication: false,
              formatCorrect: false,
              langueFrancais: false,
              originalite: false,
              droitsAuteur: false
            },
            statut: 'en-attente',
            respecteCriteres: 'en-attente'
          }
        : dossier
    ));
  };

  // Fonction pour cocher tous les critères
  const checkAll = (dossierId: string) => {
    setDossiers(prev => prev.map(dossier => 
      dossier.id === dossierId 
        ? { 
            ...dossier, 
            checklist: {
              cartePresse: true,
              periodePublication: true,
              formatCorrect: true,
              langueFrancais: true,
              originalite: true,
              droitsAuteur: true
            },
            statut: 'eligible',
            respecteCriteres: 'respecte',
            dateVerification: new Date(),
            verificateur: 'Utilisateur actuel'
          }
        : dossier
    ));
  };

  // Fonction pour marquer comme non éligible
  const markAsNonEligible = (dossierId: string) => {
    setDossiers(prev => prev.map(dossier => 
      dossier.id === dossierId 
        ? { 
            ...dossier, 
            statut: 'non-eligible',
            respecteCriteres: 'non-respecte',
            dateVerification: new Date(),
            verificateur: 'Utilisateur actuel'
          }
        : dossier
    ));
  };

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'eligible': 
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">Éligible</span>;
      case 'non-eligible': 
        return <span className="px-6 py-1 rounded-xl text-xs font-semibold bg-red-100 text-red-800 border border-red-200">Non_Éligible</span>;
      case 'en-attente': 
        return <span className="px-6 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">En attente</span>;
    default: 
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">{statut}</span>;
    }
  };

  const getRespecteCriteresBadge = (respecteCriteres: string) => {
    switch(respecteCriteres) {
      case 'respecte': 
        return <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200 flex items-center gap-1 w-fit">
          <ThumbsUp className="w-3 h-3" />
          Respecte
        </span>;
      case 'non-respecte': 
        return <span className="px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-1 w-fit">
          <ThumbsDown className="w-3 h-3" />
          Non-respecte
        </span>;
      case 'en-attente': 
        return <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" />
          En attente
        </span>;
      default: 
        return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">{respecteCriteres}</span>;
    }
  };

  // Calcul du pourcentage de complétion
  const getCompletionPercentage = (checklist: Candidature['checklist']) => {
    const total = Object.keys(checklist).length;
    const completed = Object.values(checklist).filter(v => v).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vérification des dossiers</h1>
            <p className="text-gray-600">Cochez les critères d'éligibilité directement dans le tableau</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.enAttente}</p>
                <p className="text-sm text-gray-600">En attente</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.eligibles}</p>
                <p className="text-sm text-gray-600">Éligibles</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.nonEligibles}</p>
                <p className="text-sm text-gray-600">Non éligibles</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, ID, média, titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.statut}
                onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="tous">Tous les statuts</option>
                <option value="en-attente">En attente</option>
                <option value="eligible">Éligible</option>
                <option value="non-eligible">Non éligible</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={filters.categorie}
                    onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="toutes">Toutes catégories</option>
                    <option value="presse-ecrite">Presse écrite</option>
                    <option value="television">Télévision</option>
                    <option value="radio">Radio</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                  <input
                    type="date"
                    value={filters.dateDebut}
                    onChange={(e) => setFilters({ ...filters, dateDebut: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                  <input
                    type="date"
                    value={filters.dateFin}
                    onChange={(e) => setFilters({ ...filters, dateFin: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liste des dossiers */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Œuvre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Critères d'éligibilité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progression
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
              {filteredDossiers.map((dossier) => {
                const progression = getCompletionPercentage(dossier.checklist);
                
                return (
                  <tr key={dossier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{dossier.candidat.nom}</div>
                          <div className="text-sm text-gray-500">{dossier.candidat.media}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate" title={dossier.oeuvre.titre}>
                          {dossier.oeuvre.titre}
                        </div>
                        <div className="text-sm text-gray-500 capitalize flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {dossier.oeuvre.categorie}
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div>
                        {getRespecteCriteresBadge(dossier.respecteCriteres || 'en-attente')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2  rounded-full ${
                              progression === 100 ? 'bg-green-500' : 
                              progression > 50 ? 'bg-blue-500' : 
                              progression > 0 ? 'bg-yellow-500' : 
                              'bg-gray-300'
                            }`}
                            style={{ width: `${progression}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{progression}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatutBadge(dossier.statut)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedDossier(selectedDossier === dossier.id ? null : dossier.id)}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm"
                        >
                          <Eye className="w-3 h-3" />
                          Détails
                        </button>
                        {dossier.statut === 'en-attente' && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => checkAll(dossier.id)}
                              className="px-2 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              title="Cocher tous les critères"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => markAsNonEligible(dossier.id)}
                              className="px-2 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              title="Marquer comme non éligible"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredDossiers.length === 0 && (
          <div className="text-center py-12">
            <FileWarning className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun dossier trouvé</h3>
            <p className="text-gray-600">Aucun dossier ne correspond à vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Panneau de vérification détaillée */}
      {selectedDossier && (() => {
        const dossier = dossiers.find(d => d.id === selectedDossier);
        if (!dossier) return null;
        const progression = getCompletionPercentage(dossier.checklist);
        const tousCoches = progression === 100;

        return (
          <div className="bg-white shadow-lg rounded-xl border p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Vérification détaillée</h2>
                <p className="text-gray-600">ID: {dossier.id}</p>
              </div>
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne gauche : Informations */}
              <div className="lg:col-span-2 space-y-6">
                {/* En-tête avec statuts */}
                <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-5 border">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Statut</p>
                      {getStatutBadge(dossier.statut)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Critères d'éligibilité</p>
                      {getRespecteCriteresBadge(dossier.respecteCriteres || 'en-attente')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Progression</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{progression}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${progression === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${progression}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations candidat */}
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Informations du candidat
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-blue-700">Nom complet</label>
                      <p className="font-medium text-gray-900">{dossier.candidat.nom}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-blue-700">Date de Naissance</label>
                        <p className="font-medium text-gray-900">{dossier.candidat.dateDeNaissance}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-blue-700">Carte de presse</label>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <p className="font-medium text-gray-900">{dossier.candidat.cartePresse}</p>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Valide</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-blue-700">Média</label>
                      <p className="font-medium text-gray-900">{dossier.candidat.media}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-blue-700">Contact</label>
                      <p className="font-medium text-gray-900">{dossier.candidat.email}</p>
                      <p className="text-sm text-gray-600">{dossier.candidat.telephone}</p>
                    </div>
                  </div>
                </div>

                {/* Détails de l'œuvre */}
                <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Détails de l'œuvre
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-green-700">Titre</label>
                      <p className="font-medium text-gray-900 text-lg">{dossier.oeuvre.titre}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-green-700">Catégorie</label>
                        <span className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800 capitalize">{dossier.oeuvre.categorie}</span>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-green-700">Date publication</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">{dossier.oeuvre.datePublication.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-green-700">Format</label>
                        <p>{dossier.oeuvre.format} • {dossier.oeuvre.duree}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-green-700">Langue</label>
                        <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-800">{dossier.oeuvre.langue}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-green-700">Description</label>
                      <p className="text-gray-700">{dossier.oeuvre.description}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-green-700">URL de l'œuvre</label>
                      <a 
                        href={dossier.oeuvre.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        {dossier.oeuvre.url}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite : Vérification et actions */}
              <div className="space-y-6">
                {/* Checklist interactive */}
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Vérification des critères</h3>
                    <div className="flex gap-2">
                      
                      <button
                        onClick={() => resetChecklist(dossier.id)}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
                        title="Tout décocher"
                      >
                        <X className="w-3 h-3" />
                        Réinitialiser
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'cartePresse', label: 'Carte de presse valide et à jour' },
                      { key: 'periodePublication', label: 'Publié entre le 01/01/2025 et le 31/12/2025' },
                      { key: 'formatCorrect', label: 'Format correct selon la catégorie' },
                      { key: 'langueFrancais', label: 'Langue française (transcription/sous-titres si audio/vidéo)' },
                      { key: 'originalite', label: 'Originalité (non publirédactionnel)', warning: true },
                      { key: 'droitsAuteur', label: 'Droits d\'auteur détenus par le candidat' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <button
                          onClick={() => toggleCritere(dossier.id, item.key as keyof typeof dossier.checklist)}
                          className={`w-6 h-6 flex items-center justify-center rounded border ${
                            dossier.checklist[item.key as keyof typeof dossier.checklist] 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {dossier.checklist[item.key as keyof typeof dossier.checklist] && <Check className="w-3 h-3" />}
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            dossier.checklist[item.key as keyof typeof dossier.checklist] 
                              ? 'text-green-700' 
                              : item.warning ? 'text-yellow-700' : 'text-gray-700'
                          }`}>
                            {item.label}
                          </p>
                        </div>
                        {item.warning && !dossier.checklist[item.key as keyof typeof dossier.checklist] && (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions de décision */}
                <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-5 border">
                  <h3 className="font-medium text-gray-900 mb-4">Décision finale</h3>
                  
                  {/* Statut automatique */}
                  <div className={`mb-4 p-4 rounded-lg ${tousCoches ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <div className="flex items-center gap-3">
                      {tousCoches ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-green-500" />
                          <div>
                            <p className="font-bold text-green-700">Statut : Éligible</p>
                            <p className="text-sm text-green-600">
                              Tous les critères sont validés. La candidature est automatiquement marquée comme éligible.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                          <div>
                            <p className="font-bold text-yellow-700">Statut : En attente</p>
                            <p className="text-sm text-yellow-600">
                              Cochez tous les critères pour que la candidature soit automatiquement marquée comme éligible.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions manuelles */}
                  <div className="space-y-3">
                    <button
                      onClick={() => markAsNonEligible(dossier.id)}
                      className="w-full py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      Marquer comme non éligible
                    </button>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default VerificationDossiers;