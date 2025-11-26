import React from 'react';
import type { CandidatFormData } from '../Types/form';
import { Link, FileText, Video } from 'lucide-react';

interface Props {
  donnees: CandidatFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChampChange: (nom: keyof CandidatFormData, valeur: any) => void;
}

const SoumissionRealisation: React.FC<Props> = ({ donnees, onChampChange }) => {
  const categories = [
    'Reportage',
    'Interview',
    'Documentaire',
    'Enquête',
    'Editorial',
    'Portfolio Photo',
    'Podcast',
    'Vidéo Reportage'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FileText className="w-8 h-8 text-orange-500" />
          Votre Réalisation
        </h2>
        <p className="text-gray-600 mt-2">Partagez le lien vers votre œuvre journalistique</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre de votre réalisation *
          </label>
          <input
            type="text"
            value={donnees.titreRealisation}
            onChange={(e) => onChampChange('titreRealisation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Ex: L'impact de la formation professionnelle dans la société"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Link className="w-4 h-4 inline mr-2" />
            Lien vers votre réalisation *
          </label>
          <input
            type="url"
            value={donnees.lienRealisation}
            onChange={(e) => onChampChange('lienRealisation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="https://example.com/votre-article"
          />
          <p className="text-sm text-gray-500 mt-1">
            Lien vers votre article, vidéo, podcast ou portfolio
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie *
          </label>
          <select
            value={donnees.categorie}
            onChange={(e) => onChampChange('categorie', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>{categorie}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description de votre réalisation
          </label>
          <textarea
            value={donnees.description}
            onChange={(e) => onChampChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Décrivez brièvement votre réalisation, son contexte et son impact..."
          />
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Video className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800">Formats acceptés</h4>
              <p className="text-green-700 text-sm mt-1">
                Articles web, vidéos YouTube/Vimeo, podcasts, portfolios photo, 
                documents PDF. Assurez-vous que le lien soit accessible au jury.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoumissionRealisation;