import React from 'react';
import type { CandidatFormData, LienRealisation } from '../Types/form';
import { Link, FileText, Video, Plus, Trash2 } from 'lucide-react';

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

  const ajouterLien = () => {
    const nouveauLien: LienRealisation = {
      id: Date.now().toString(),
      url: '',
      description: ''
    };
    onChampChange('liensRealisation', [...donnees.liensRealisation, nouveauLien]);
  };

  const supprimerLien = (id: string) => {
    const nouveauxLiens = donnees.liensRealisation.filter(lien => lien.id !== id);
    onChampChange('liensRealisation', nouveauxLiens);
  };

  const modifierLien = (id: string, champ: keyof LienRealisation, valeur: string) => {
    const nouveauxLiens = donnees.liensRealisation.map(lien =>
      lien.id === id ? { ...lien, [champ]: valeur } : lien
    );
    onChampChange('liensRealisation', nouveauxLiens);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FileText className="w-8 h-8 text-orange-500" />
          Votre Réalisation
        </h2>
        <p className="text-gray-600 mt-2">
          Partagez vos œuvres journalistiques - Vous pouvez ajouter plusieurs liens
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Informations générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Description générale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description générale de votre réalisation
          </label>
          <textarea
            value={donnees.descriptionGenerale}
            onChange={(e) => onChampChange('descriptionGenerale', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Décrivez le contexte global, l'objectif et l'impact de votre travail..."
          />
        </div>

        {/* Liens des réalisations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              <Link className="w-4 h-4 inline mr-2" />
              Liens vers vos réalisations *
            </label>
            <button
              type="button"
              onClick={ajouterLien}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Ajouter un lien
            </button>
          </div>

          {donnees.liensRealisation.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Link className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucun lien ajouté</p>
              <p className="text-sm text-gray-400 mt-1">
                Cliquez sur "Ajouter un lien" pour commencer
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {donnees.liensRealisation.map((lien, index) => (
                <div key={lien.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2">
                      <Video className="w-4 h-4 text-orange-500" />
                      Lien {index + 1}
                    </h4>
                    {donnees.liensRealisation.length > 1 && (
                      <button
                        type="button"
                        onClick={() => supprimerLien(lien.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        URL *
                      </label>
                      <input
                        type="url"
                        value={lien.url}
                        onChange={(e) => modifierLien(lien.id, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                        placeholder="https://example.com/votre-article"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Description de ce lien
                      </label>
                      <textarea
                        value={lien.description}
                        onChange={(e) => modifierLien(lien.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                        placeholder="Décrivez ce contenu spécifique (ex: interview principale, reportage complémentaire...)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Information sur les formats */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Video className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800">Formats acceptés</h4>
              <p className="text-green-700 text-sm mt-1">
                Articles web, vidéos YouTube/Vimeo, podcasts, portfolios photo, 
                documents PDF. Vous pouvez ajouter plusieurs liens pour montrer 
                l'étendue de votre travail (ex: article principal + interview + portfolio photo).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoumissionRealisation;