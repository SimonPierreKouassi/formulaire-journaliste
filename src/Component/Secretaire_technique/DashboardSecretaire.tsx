// src/components/securite-technique/DashboardSecretaire.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Users, FileCheck, Download, 
  Search, Eye, CheckCircle, 
  RefreshCw, Printer, Mail,
   TrendingUp, AlertCircle, ArrowUpRight,
  Calendar, Filter,
  User,
  CircleOff
} from 'lucide-react';
import type { Candidature } from './common/types';

const DashboardSecretaire: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalCandidatures: 0,
    enAttenteVerification: 0,
    eligibles: 0,
    nonEligibles: 0,
    evaluees: 0,
    tauxEligibilite: 0
  });

  

  const [dernieresCandidatures, setDernieresCandidatures] = useState<Candidature[]>([]);

  useEffect(() => {
    // Simuler le chargement des données
    const loadDashboardData = async () => {
      // Données de démonstration
      setStats({
        totalCandidatures: 3,
        enAttenteVerification: 1,
        eligibles: 1,
        nonEligibles: 1,
        evaluees: 2,
        tauxEligibilite: 72
      });

     

      // Dernières candidatures
      setDernieresCandidatures([
        {
            id: 'PAPC-2025-156',
            candidat: {
                id: 'CAND-001',
                nom: 'Ahmed Touré',
                email: 'ahmed.toure@fratmat.ci',
                telephone: '+225 07 89 12 34 56',
                cartePresse: 'JOU-2024-01234',
                media: 'Fraternité Matin',
                dateDeNaissance: '11/12/1991',
                pays: 'Côte d\'Ivoire'
            },
            oeuvre: {
                titre: 'Les métiers du numérique en plein essor',
                categorie: 'presse-ecrite',
                typeMedia: 'Article',
                datePublication: new Date('2025-11-20'),
                format: 'PDF',
                duree: '8 min',
                langue: 'Français',
                url: 'https://exemple.com/article',
                description: 'Reportage sur les formations en numérique'
            },
            piecesJointes: [],
            statut: 'en-attente',
            dateSoumission: new Date('2024-01-20'),
            checklist: {
                cartePresse: true,
                periodePublication: true,
                formatCorrect: true,
                langueFrancais: true,
                originalite: true,
                droitsAuteur: true
            },
            respecteCriteres: ''
        }
      ]);
    };

    loadDashboardData();
  }, []);

  const statsCards = [
    {
      title: 'Total candidatures',
      value: stats.totalCandidatures,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      trend: '+12%',
      description: 'Depuis le mois dernier'
    },
    {
      title: 'À vérifier',
      value: stats.enAttenteVerification,
      icon: FileCheck,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      trend: 'Urgent',
      description: 'Délai : 48h restantes',
      alert: true
    },
    {
      title: 'Éligibles',
      value: stats.eligibles,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      trend: `${stats.tauxEligibilite}%`,
      description: 'Taux d\'éligibilité'
    },
    {
      title: 'Non-Éligible',
      value: stats.nonEligibles,
      icon: CircleOff,
      color: 'text-red-500',
      bgColor: 'bg-red-200',
      trend: `${Math.round((stats.nonEligibles / stats.eligibles) * 100)}%`,
      description: 'Des éligibles'
    }
  ];

  const quickActions = [
    {
      label: 'Vérifier les dossiers',
      icon: FileCheck,
      color: 'bg-blue-100 text-blue-700',
      path: '/secretaire/verification',
      count: stats.enAttenteVerification
    },
    {
      label: 'Assigner au jury',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      path: '/secretaire/jury',
      count: stats.eligibles - stats.nonEligibles
    },
    {
      label: 'Générer rapport',
      icon: Printer,
      color: 'bg-orange-100 text-orange-700',
      path: '/secretaire/rapports',
      description: 'Mensuel'
    }
  ];

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'eligible': 
        return <span className="badge badge-success">Éligible</span>;
      case 'non-eligible': 
        return <span className="badge badge-error">Non éligible</span>;
      case 'en-attente': 
        return <span className="badge badge-warning">En attente</span>;
      
      case 'evalue': 
        return <span className="badge badge-success">Évalué</span>;
      default: 
        return <span className="badge badge-outline">{statut}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble des activités du secrétariat technique</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                {card.alert ? (
                  <span className="badge badge-warning animate-pulse">{card.trend}</span>
                ) : (
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {card.trend}
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-sm font-medium text-gray-700 mb-1">{card.title}</p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Actions rapides  */}
      <div className="">
        {/* Actions rapides */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{action.label}</p>
                        {action.description && (
                          <p className="text-xs text-gray-500">{action.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
       
      </div>

      {/* Dernières candidatures */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-900">Dernières candidatures</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full lg:w-64"
                />
              </div>
              <button className="btn btn-sm btn-outline">
                <Filter className="w-4 h-4" />
                Filtres
              </button>
            </div>
          </div>
        </div>
        
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
                  Date
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
              {dernieresCandidatures.map((candidature) => (
                <tr key={candidature.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{candidature.candidat.nom}</div>
                        <div className="text-xs text-gray-500">{candidature.candidat.media}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="font-medium text-gray-900 truncate">{candidature.oeuvre.titre}</div>
                      <div className="text-xs text-gray-500 capitalize">{candidature.oeuvre.categorie}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {candidature.dateSoumission.toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatutBadge(candidature.statut)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/secretaire/verification?candidature=${candidature.id}`)}
                        className="btn btn-xs btn-outline"
                      >
                        <Eye className="w-3 h-3" />
                        Vérifier
                      </button>
                      <button className="btn btn-xs btn-ghost">
                        <Mail className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t">
          <button 
            onClick={() => navigate('/secretaire/verification')}
            className="btn btn-outline w-full"
          >
            Voir toutes les candidatures ({stats.totalCandidatures})
          </button>
        </div>
      </div>

      {/* Alertes et indicateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <h3 className="font-bold text-yellow-900">Alertes importantes</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span><strong>{stats.enAttenteVerification} dossiers</strong> en attente de vérification</span>
            </li>
           
            <li className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span><strong>3 jurés</strong> n'ont pas encore commencé leurs évaluations</span>
            </li>
          </ul>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h3 className="font-bold text-blue-900">Indicateurs clés</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-blue-900">{stats.tauxEligibilite}%</p>
              <p className="text-sm text-blue-700">Taux d'éligibilité</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">4.2h</p>
              <p className="text-sm text-blue-700">Temps moyen vérification</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">92%</p>
              <p className="text-sm text-blue-700">Taux de respect du reglement</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">24h</p>
              <p className="text-sm text-blue-700">Délai traitement moyen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSecretaire;