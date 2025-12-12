// src/components/securite-technique/modules/Parametres.tsx
import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Filter, Edit, Trash2, UserPlus,
  Mail, 
  Award, Briefcase, Globe,
  ChevronDown, Eye, UserCheck,
  Download, RefreshCw, Users, Star,
  FileText, Save, X
} from 'lucide-react';

type MembreJury = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  specialite: string;
  institution: string;
  pays: string;
  role: 'president' | 'membre' | 'evaluateur';
  dateInscription: Date;
  dernierAcces?: Date;
  categoriesAttribuees: string[];
  nbEvaluations: number;
  noteMoyenne?: number;
  photo?: string;
  biographie?: string;
};

type GroupeJury = {
  id: string;
  nom: string;
  categorie: string;
  membres: string[];
  dateCreation: Date;
  president: string;
};

// Formulaire initial pour l'ajout avec type correct
const initialFormData = {
  nom: '',
  email: '',
  telephone: '',
  specialite: '',
  institution: '',
  pays: 'Côte d\'Ivoire',
  role: 'membre' as 'president' | 'membre' | 'evaluateur',
  biographie: '',
  categoriesAttribuees: [] as string[],
  noteMoyenne: 0
};

const GestionJury: React.FC = () => {
  const [membres, setMembres] = useState<MembreJury[]>([
    {
      id: 'JURY-001',
      nom: 'Dr. Fatou Sow',
      email: 'fatou.sow@universite.sn',
      telephone: '+221 77 123 45 67',
      specialite: 'Journalisme d\'investigation',
      institution: 'Université Cheikh Anta Diop',
      pays: 'Sénégal',
      role: 'president',
      dateInscription: new Date('2024-01-15'),
      dernierAcces: new Date('2024-03-20'),
      categoriesAttribuees: ['presse-ecrite', 'digital'],
      nbEvaluations: 45,
      noteMoyenne: 4.2,
      biographie: 'Professeur de journalisme avec 20 ans d\'expérience...'
    },
    {
      id: 'JURY-002',
      nom: 'M. Jean Koffi',
      email: 'jean.koffi@medias.ci',
      telephone: '+225 07 89 01 23 45',
      specialite: 'Médias audiovisuels',
      institution: 'Haute Autorité de la Communication Audiovisuelle',
      pays: 'Côte d\'Ivoire',
      role: 'membre',
      dateInscription: new Date('2024-01-20'),
      dernierAcces: new Date('2024-03-18'),
      categoriesAttribuees: ['television', 'radio'],
      nbEvaluations: 32,
      noteMoyenne: 4.5
    },
    {
      id: 'JURY-003',
      nom: 'Mme Amina Diallo',
      email: 'amina.diallo@presse.ml',
      telephone: '+223 76 54 32 10',
      specialite: 'Presse écrite',
      institution: 'École Supérieure de Journalisme',
      pays: 'Mali',
      role: 'evaluateur',
      dateInscription: new Date('2024-02-10'),
      categoriesAttribuees: ['presse-ecrite'],
      nbEvaluations: 0
    },
    {
      id: 'JURY-004',
      nom: 'Prof. Kwame Nkrumah',
      email: 'k.nkrumah@uni.edu.gh',
      telephone: '+233 24 567 8901',
      specialite: 'Communication digitale',
      institution: 'Université du Ghana',
      pays: 'Ghana',
      role: 'membre',
      dateInscription: new Date('2024-01-25'),
      dernierAcces: new Date('2024-03-15'),
      categoriesAttribuees: ['digital', 'television'],
      nbEvaluations: 28,
      noteMoyenne: 3.9
    },
    {
      id: 'JURY-005',
      nom: 'M. Pierre Dubois',
      email: 'p.dubois@africa-media.org',
      telephone: '+33 6 12 34 56 78',
      specialite: 'Documentaire',
      institution: 'Fédération Africaine des Médias',
      pays: 'France',
      role: 'evaluateur',
      dateInscription: new Date('2024-02-05'),
      dernierAcces: new Date('2024-02-28'),
      categoriesAttribuees: ['television'],
      nbEvaluations: 12,
      noteMoyenne: 4.0
    }
  ]);

  const [groupes, setGroupes] = useState<GroupeJury[]>([
    {
      id: 'GRP-001',
      nom: 'Jury Presse Écrite 2025',
      categorie: 'presse-ecrite',
      membres: ['JURY-001', 'JURY-003'],
      dateCreation: new Date('2024-01-20'),
      president: 'JURY-001'
    },
    {
      id: 'GRP-002',
      nom: 'Jury Audiovisuel 2025',
      categorie: 'television',
      membres: ['JURY-002', 'JURY-004'],
      dateCreation: new Date('2024-01-22'),
      president: 'JURY-002'
    },
    {
      id: 'GRP-003',
      nom: 'Jury Digital 2025',
      categorie: 'digital',
      membres: ['JURY-001', 'JURY-004'],
      dateCreation: new Date('2024-01-25'),
      president: 'JURY-004'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'tous',
    specialite: 'toutes',
    pays: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMembre, setSelectedMembre] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'ajout' | 'edition' | 'affectation'>('ajout');
  const [selectedMembreForModal, setSelectedMembreForModal] = useState<MembreJury | null>(null);
  const [formData, setFormData] = useState<{
    nom: string;
    email: string;
    telephone: string;
    specialite: string;
    institution: string;
    pays: string;
    role: 'president' | 'membre' | 'evaluateur';
    biographie: string;
    categoriesAttribuees: string[];
    noteMoyenne: number;
  }>(initialFormData);

  useEffect(() => {
    console.log('Chargement des données du jury...');
  }, []);

  // Calcul des statistiques
  const stats = {
    total: membres.length,
    presidents: membres.filter(m => m.role === 'president').length,
    membres: membres.filter(m => m.role === 'membre').length,
    evaluateurs: membres.filter(m => m.role === 'evaluateur').length,
    evaluationsTotal: membres.reduce((acc, m) => acc + m.nbEvaluations, 0)
  };

  // Filtrer les membres
  const filteredMembres = membres.filter(membre => {
    const matchesSearch =
      membre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membre.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membre.specialite.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filters.role === 'tous' || membre.role === filters.role;
    const matchesSpecialite = filters.specialite === 'toutes' ||
      (filters.specialite && membre.specialite.toLowerCase().includes(filters.specialite.toLowerCase()));
    const matchesPays = !filters.pays ||
      (filters.pays && membre.pays.toLowerCase().includes(filters.pays.toLowerCase()));

    return matchesSearch && matchesRole && matchesSpecialite && matchesPays;
  });

  // CORRECTION : Fonction openModal corrigée
  const openModal = (type: 'ajout' | 'edition' | 'affectation', membreId?: string) => {
    setModalType(type);

    if (type === 'ajout') {
      setFormData(initialFormData);
    } else if ((type === 'edition' || type === 'affectation') && membreId) {
      const membre = membres.find(m => m.id === membreId);
      setSelectedMembreForModal(membre || null);
      
      // Pré-remplir le formulaire si c'est une édition
      if (membre && type === 'edition') {
        setFormData({
          nom: membre.nom,
          email: membre.email,
          telephone: membre.telephone,
          specialite: membre.specialite,
          institution: membre.institution,
          pays: membre.pays,
          role: membre.role,
          biographie: membre.biographie || '',
          categoriesAttribuees: membre.categoriesAttribuees,
          noteMoyenne: membre.noteMoyenne || 0
        });
      }
      
      // Pré-remplir les catégories si c'est une affectation
      if (membre && type === 'affectation') {
        setFormData(prev => ({
          ...prev,
          categoriesAttribuees: membre.categoriesAttribuees
        }));
      }
    } else {
      setSelectedMembreForModal(null);
    }

    setShowModal(true);
  };

  // Créer un groupe
  const creerGroupe = () => {
    const nouveauGroupe: GroupeJury = {
      id: `GRP-${Date.now()}`,
      nom: `Nouveau Groupe ${new Date().toLocaleDateString()}`,
      categorie: 'presse-ecrite',
      membres: [],
      dateCreation: new Date(),
      president: ''
    };
    setGroupes(prev => [...prev, nouveauGroupe]);
    alert('Nouveau groupe créé');
  };

  // Mettre à jour le formulaire
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Gérer les catégories
  const handleCategoryToggle = (categorie: string) => {
    setFormData(prev => {
      const newCategories = prev.categoriesAttribuees.includes(categorie)
        ? prev.categoriesAttribuees.filter(c => c !== categorie)
        : [...prev.categoriesAttribuees, categorie];
      return { ...prev, categoriesAttribuees: newCategories };
    });
  };

  // Ajouter un nouveau membre
  const ajouterMembre = () => {
    if (!formData.nom.trim() || !formData.email.trim()) {
      alert('Le nom et l\'email sont obligatoires');
      return;
    }

    const nouvelId = `JURY-${String(membres.length + 1).padStart(3, '0')}`;
    
    const nouveauMembre: MembreJury = {
      id: nouvelId,
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      specialite: formData.specialite,
      institution: formData.institution,
      pays: formData.pays,
      role: formData.role,
      dateInscription: new Date(),
      dernierAcces: new Date(),
      categoriesAttribuees: formData.categoriesAttribuees,
      nbEvaluations: 0,
      noteMoyenne: formData.noteMoyenne || undefined,
      biographie: formData.biographie
    };

    setMembres(prev => [...prev, nouveauMembre]);
    setShowModal(false);
    setFormData(initialFormData);
    alert(`Membre "${formData.nom}" ajouté avec succès !`);
  };

  // Modifier un membre existant
  const modifierMembre = () => {
    if (!selectedMembreForModal || !formData.nom.trim() || !formData.email.trim()) {
      alert('Le nom et l\'email sont obligatoires');
      return;
    }

    setMembres(prev => prev.map(membre =>
      membre.id === selectedMembreForModal.id 
        ? { 
            ...membre,
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone,
            specialite: formData.specialite,
            institution: formData.institution,
            pays: formData.pays,
            role: formData.role,
            categoriesAttribuees: formData.categoriesAttribuees,
            noteMoyenne: formData.noteMoyenne || undefined,
            biographie: formData.biographie
          }
        : membre
    ));
    setShowModal(false);
    setFormData(initialFormData);
    alert(`Membre "${formData.nom}" modifié avec succès !`);
  };

  // Affecter des catégories à un membre
  const affecterCategories = () => {
    if (!selectedMembreForModal) {
      alert('Aucun membre sélectionné');
      return;
    }

    setMembres(prev => prev.map(membre =>
      membre.id === selectedMembreForModal.id 
        ? { ...membre, categoriesAttribuees: formData.categoriesAttribuees } 
        : membre
    ));
    setShowModal(false);
    setFormData(initialFormData);
    alert('Catégories affectées avec succès !');
  };

  // Gérer la soumission de la modal
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalType === 'ajout') {
      ajouterMembre();
    } else if (modalType === 'edition') {
      modifierMembre();
    } else if (modalType === 'affectation') {
      affecterCategories();
    }
  };

  // Supprimer un membre
  const supprimerMembre = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre du jury ?')) {
      setMembres(prev => prev.filter(membre => membre.id !== id));
      setGroupes(prev => prev.map(groupe => ({
        ...groupe,
        membres: groupe.membres.filter(membreId => membreId !== id),
        president: groupe.president === id ? '' : groupe.president
      })));
    }
  };

  // Exporter les données
  const exporterDonnees = () => {
    const data = {
      membres,
      groupes,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jury_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Réinitialiser les filtres
  const reinitialiserFiltres = () => {
    setSearchTerm('');
    setFilters({
      role: 'tous',
      specialite: 'toutes',
      pays: ''
    });
  };

  // Rafraîchir les données
  const rafraichirDonnees = () => {
    console.log('Rafraîchissement des données...');
    alert('Données rafraîchies');
  };

  // Obtenir le badge de rôle
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'president':
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            Président
          </span>
        );
      case 'membre':
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            Membre
          </span>
        );
      case 'evaluateur':
        return (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
            Évaluateur
          </span>
        );
      default:
        return null;
    }
  };

  // Formater la date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Obtenir les groupes d'un membre
  const getGroupesDuMembre = (membreId: string) => {
    return groupes.filter(groupe => groupe.membres.includes(membreId));
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des jurys</h1>
            <p className="text-gray-600">Gérez les membres du jury et leur affectation aux catégories</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exporterDonnees}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
            <button
              onClick={() => openModal('ajout')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter un membre
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total membres</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.presidents}</p>
                <p className="text-sm text-gray-600">Présidents</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.membres}</p>
                <p className="text-sm text-gray-600">Membres</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.evaluateurs}</p>
                <p className="text-sm text-gray-600">Évaluateurs</p>
              </div>
              <UserPlus className="h-8 w-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.evaluationsTotal}</p>
                <p className="text-sm text-gray-600">Évaluations</p>
              </div>
              <FileText className="h-8 w-8 text-indigo-500" />
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
                placeholder="Rechercher par nom, email, spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={rafraichirDonnees}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                title="Rafraîchir"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="tous">Tous les rôles</option>
                <option value="president">Président</option>
                <option value="membre">Membre</option>
                <option value="evaluateur">Évaluateur</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Plus de filtres
                {showFilters ? <ChevronDown className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900">Filtres avancés</h4>
                <button
                  onClick={reinitialiserFiltres}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Réinitialiser
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
                  <input
                    type="text"
                    placeholder="Ex: Journalisme, Communication..."
                    value={filters.specialite}
                    onChange={(e) => setFilters({ ...filters, specialite: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <input
                    type="text"
                    placeholder="Ex: Côte d'Ivoire, Sénégal..."
                    value={filters.pays}
                    onChange={(e) => setFilters({ ...filters, pays: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liste des membres du jury */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spécialité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembres.map((membre) => {
                const groupesDuMembre = getGroupesDuMembre(membre.id);

                return (
                  <tr key={membre.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <UserPlus className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{membre.nom}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {membre.email}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {membre.pays} • {membre.institution}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(membre.role)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{membre.specialite}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {membre.categoriesAttribuees.map((cat, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize">
                            {cat.replace('-', ' ')}
                          </span>
                        ))}
                        {groupesDuMembre.length > 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {groupesDuMembre.length} groupe(s)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>{membre.nbEvaluations} évaluations</span>
                        </div>
                        {membre.noteMoyenne && (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>Note moyenne: {membre.noteMoyenne}/5</span>
                          </div>
                        )}
                        {membre.dernierAcces && (
                          <div className="text-xs text-gray-500">
                            Dernier accès: {formatDate(membre.dernierAcces)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMembre(membre.id)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openModal('edition', membre.id)}
                          className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => openModal('affectation', membre.id)}
                          className="p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors"
                          title="Affecter des catégories"
                        >
                          <Award className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => supprimerMembre(membre.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredMembres.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun membre trouvé</h3>
            <p className="text-gray-600">Aucun membre ne correspond à vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Panneau des groupes de jury */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Groupes de jury</h2>
            <p className="text-gray-600">Affectation des membres aux catégories d'évaluation</p>
          </div>
          <button
            onClick={creerGroupe}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Créer un groupe
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupes.map((groupe) => {
            const president = membres.find(m => m.id === groupe.president);
            const membresDuGroupe = membres.filter(m => groupe.membres.includes(m.id));

            return (
              <div key={groupe.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{groupe.nom}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize">
                      {groupe.categorie.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                    Actif
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Président</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-linear-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">{president?.nom || 'Non désigné'}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Membres ({membresDuGroupe.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {membresDuGroupe.map((membre) => (
                        <div key={membre.id} className="flex items-center gap-1">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <UserPlus className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-xs text-gray-700">{membre.nom.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Créé le {formatDate(groupe.dateCreation)}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Supprimer ce groupe ?')) {
                              setGroupes(prev => prev.filter(g => g.id !== groupe.id));
                            }
                          }}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Détails d'un membre */}
      {selectedMembre && (() => {
        const membre = membres.find(m => m.id === selectedMembre);
        if (!membre) return null;
        const groupesDuMembre = getGroupesDuMembre(membre.id);

        return (
          <div className="bg-white shadow-lg rounded-xl border p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Détails du membre du jury</h2>
                <p className="text-gray-600">ID: {membre.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal('edition', membre.id)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => setSelectedMembre(null)}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informations personnelles */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Informations personnelles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Nom complet</label>
                      <p className="font-medium text-lg">{membre.nom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Rôle</label>
                      <div className="flex items-center gap-2">
                        {getRoleBadge(membre.role)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Contact</label>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{membre.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span>{membre.telephone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Institution</label>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span>{membre.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span>{membre.pays}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spécialités et affectations */}
                <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Compétences et affectations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-3">Spécialité principale</label>
                      <div className="px-4 py-3 bg-white rounded-lg border">
                        <p className="font-medium">{membre.specialite}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-3">Catégories attribuées</label>
                      <div className="flex flex-wrap gap-2">
                        {membre.categoriesAttribuees.map((cat, index) => (
                          <span key={index} className="px-3 py-2 bg-green-100 text-green-800 rounded-lg font-medium capitalize">
                            {cat.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groupes d'appartenance */}
                {groupesDuMembre.length > 0 && (
                  <div className="bg-linear-to-r from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
                    <h3 className="font-bold text-purple-900 mb-4">Groupes d'appartenance</h3>
                    <div className="space-y-3">
                      {groupesDuMembre.map((groupe) => {
                        const isPresident = groupe.president === membre.id;
                        return (
                          <div key={groupe.id} className="p-4 bg-white rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">{groupe.nom}</div>
                              {isPresident && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                  Président
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              Catégorie: <span className="capitalize">{groupe.categorie.replace('-', ' ')}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Colonne droite : Statistiques et actions */}
              <div className="space-y-6">
                {/* Statistiques d'activité */}
                <div className="bg-white border rounded-lg p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Activité et performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Évaluations effectuées</p>
                        <p className="text-2xl font-bold">{membre.nbEvaluations}</p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-500" />
                    </div>

                    {membre.noteMoyenne && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Note moyenne</p>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">{membre.noteMoyenne.toFixed(1)}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(membre.noteMoyenne!)
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <Star className="w-8 h-8 text-yellow-500" />
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>Inscrit depuis</span>
                          <span className="font-medium">{formatDate(membre.dateInscription)}</span>
                        </div>
                        {membre.dernierAcces && (
                          <div className="flex justify-between">
                            <span>Dernier accès</span>
                            <span className="font-medium">{formatDate(membre.dernierAcces)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-5 border">
                  <h3 className="font-medium text-gray-900 mb-4">Actions rapides</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => openModal('affectation', membre.id)}
                      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      Affecter des catégories
                    </button>
                    <button className="w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      Voir les évaluations
                    </button>
                    <button 
                      onClick={() => supprimerMembre(membre.id)}
                      className="w-full px-4 py-2.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer le membre
                    </button>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="border rounded-lg p-5 bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-blue-700">Membre actif</div>
                      <p className="text-sm text-blue-600">
                        Le membre a accès à la plateforme et peut participer aux évaluations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal d'ajout/édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {modalType === 'ajout' && 'Ajouter un nouveau membre du jury'}
                  {modalType === 'edition' && `Modifier ${selectedMembreForModal?.nom}`}
                  {modalType === 'affectation' && `Affecter des catégories à ${selectedMembreForModal?.nom}`}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormData(initialFormData);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleModalSubmit}>
                {modalType === 'ajout' || modalType === 'edition' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Dr. Fatou Sow"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="exemple@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+225 00 00 00 00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Spécialité
                        </label>
                        <input
                          type="text"
                          name="specialite"
                          value={formData.specialite}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Journalisme d'investigation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Université Cheikh Anta Diop"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pays
                        </label>
                        <select
                          name="pays"
                          value={formData.pays}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                          <option value="Sénégal">Sénégal</option>
                          <option value="Mali">Mali</option>
                          <option value="Ghana">Ghana</option>
                          <option value="France">France</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rôle
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="membre">Membre</option>
                          <option value="president">Président</option>
                          <option value="evaluateur">Évaluateur</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Note moyenne (sur 5)
                        </label>
                        <input
                          type="number"
                          name="noteMoyenne"
                          value={formData.noteMoyenne}
                          onChange={handleFormChange}
                          min="0"
                          max="5"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="4.2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catégories attribuées
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['presse-ecrite', 'television', 'radio', 'digital'].map((categorie) => (
                          <button
                            key={categorie}
                            type="button"
                            onClick={() => handleCategoryToggle(categorie)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${formData.categoriesAttribuees.includes(categorie)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {categorie.replace('-', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Biographie
                      </label>
                      <textarea
                        name="biographie"
                        value={formData.biographie}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description du parcours professionnel..."
                      />
                    </div>
                  </div>
                ) : modalType === 'affectation' && selectedMembreForModal ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Sélectionnez les catégories pour <strong>{selectedMembreForModal.nom}</strong>
                    </p>
                    <div className="space-y-2">
                      {['presse-ecrite', 'television', 'radio', 'digital'].map((categorie) => (
                        <label key={categorie} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={formData.categoriesAttribuees.includes(categorie)}
                            onChange={() => handleCategoryToggle(categorie)}
                            className="rounded" 
                          />
                          <span className="capitalize">{categorie.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setFormData(initialFormData);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {modalType === 'ajout' ? 'Ajouter' : modalType === 'edition' ? 'Modifier' : 'Affecter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionJury;