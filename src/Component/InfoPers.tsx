import React from 'react';
import type { CandidatFormData } from '../Types/form';
import { User, Mail, Phone, Calendar, Globe, Linkedin } from 'lucide-react';

interface Props {
  donnees: CandidatFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChampChange: (nom: keyof CandidatFormData, valeur: any) => void;
}

const InformationsPersonnelles: React.FC<Props> = ({ donnees, onChampChange }) => {
  const typesJournaliste = [
    'Presse écrite',
    'Radio',
    'Télévision',
    'Presse Digital',
    'Autre'
  ];

  const pays = [
    'Côte d\'Ivoire',
    'France',
    'Sénégal',
    'Mali',
    'Burkina Faso',
    'Bénin',
    'Togo',
    'Ghana',
    'Guinée',
    'Niger',
    'Autre'
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Formatage automatique JJ/MM/AAAA
    let formattedValue = value.replace(/\D/g, '');
    
    if (formattedValue.length >= 2) {
      formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
    }
    if (formattedValue.length >= 5) {
      formattedValue = formattedValue.slice(0, 5) + '/' + formattedValue.slice(5, 9);
    }
    
    onChampChange('dateNaissance', formattedValue);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <User className="w-8 h-8 text-orange-500" />
          Informations Personnelles
        </h2>
        <p className="text-gray-600 mt-2">Renseignez vos coordonnées et votre profil professionnel</p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        
        {/* Section 1 : Civilité */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Civilité *</h3>
          </div>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="civilite"
                value="M."
                checked={donnees.civilite === 'M.'}
                onChange={(e) => onChampChange('civilite', e.target.value)}
                className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">M.</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="civilite"
                value="Mme"
                checked={donnees.civilite === 'Mme'}
                onChange={(e) => onChampChange('civilite', e.target.value)}
                className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">Mme</span>
            </label>
          </div>
        </div>

        {/* Section 2 : Nom et Prénom */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Nom et Prénom</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                value={donnees.nom}
                onChange={(e) => onChampChange('nom', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={donnees.prenom}
                onChange={(e) => onChampChange('prenom', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                placeholder="Votre prénom"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3 : Date de naissance et Nationalité */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Informations personnelles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Date de naissance *
              </label>
              <input
                type="text"
                value={donnees.dateNaissance || ''}
                onChange={handleDateChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                placeholder="JJ/MM/AAAA"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-1">Format: JJ/MM/AAAA</p>
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                Nationalité *
              </label>
              <select
                value={donnees.nationalite || ''}
                onChange={(e) => onChampChange('nationalite', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                required
              >
                <option value="">Sélectionnez votre nationalité</option>
                {pays.map((pays) => (
                  <option key={pays} value={pays}>{pays}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 4 : Coordonnées */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold">4</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Coordonnées</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                Téléphone (avec indicatif pays) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={donnees.telephone}
                  onChange={(e) => onChampChange('telephone', e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                  placeholder="Ex: +225 01 23 45 67 89"
                  required
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Adresse e-mail *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={donnees.email}
                  onChange={(e) => onChampChange('email', e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                  placeholder="Ex: votre@email.com"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-gray-500" />
                Lien vers votre profil LinkedIn (Recommandé)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={donnees.linkedin || ''}
                  onChange={(e) => onChampChange('linkedin', e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                  placeholder="https://linkedin.com/in/votre-profil"
                />
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ce champ est optionnel mais recommandé</p>
            </div>
          </div>
        </div>

        {/* Section 5 : Catégorie du journaliste */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <span className="text-amber-600 font-bold">5</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Profil professionnel</h3>
          </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie du média *
                  </label>
                  <select
                    value={donnees.typeJournaliste}
                    onChange={(e) => onChampChange('typeJournaliste', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                    required
                  >
                    <option value="">Sélectionnez votre catégorie</option>
                    {typesJournaliste.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de carte professionnelle *
                  </label>
                  <input
                    type="text"
                    value={donnees.carteProfessionnelle}
                    onChange={(e) => onChampChange('carteProfessionnelle', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all"
                    placeholder="Votre carte professionnelle"
                    required
                  />
              </div>
          </div>
          
        </div>

        {/* Informations de validation */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-blue-600 text-sm">ℹ️</span>
            </div>
            <div>
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> Les champs marqués d'un astérisque (*) sont obligatoires. 
                Votre adresse e-mail sera utilisée pour toutes les communications concernant votre candidature.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InformationsPersonnelles;