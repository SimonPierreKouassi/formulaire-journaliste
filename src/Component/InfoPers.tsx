import React from 'react';
import type { CandidatFormData } from '../Types/form';
import { User, Mail, Phone } from 'lucide-react';

interface Props {
  donnees: CandidatFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChampChange: (nom: keyof CandidatFormData, valeur: any) => void;
}

const InformationsPersonnelles: React.FC<Props> = ({ donnees, onChampChange }) => {
  const typesJournaliste = [
    'Journaliste Radio',
    'Journaliste Télévision',
    'Journaliste Presse Écrite',
    'Journaliste Web',
    'Photojournaliste',
    'Reporter',
    'Rédacteur en Chef',
    'Autre'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <User className="w-8 h-8 text-orange-500" />
          Informations Personnelles
        </h2>
        <p className="text-gray-600 mt-2">Renseignez vos coordonnées et votre profil professionnel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          <input
            type="text"
            value={donnees.nom}
            onChange={(e) => onChampChange('nom', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Votre nom"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Votre prénom"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Adresse e-mail *
          </label>
          <input
            type="email"
            value={donnees.email}
            onChange={(e) => onChampChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Téléphone
          </label>
          <input
            type="tel"
            value={donnees.telephone}
            onChange={(e) => onChampChange('telephone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="+33 1 23 45 67 89"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de journaliste *
          </label>
          <select
            value={donnees.typeJournaliste}
            onChange={(e) => onChampChange('typeJournaliste', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          >
            <option value="">Sélectionnez votre profil</option>
            {typesJournaliste.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InformationsPersonnelles;