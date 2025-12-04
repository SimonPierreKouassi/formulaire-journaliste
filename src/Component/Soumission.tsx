import React, { useState } from 'react';
import type { CandidatFormData } from '../Types/form';
import {
  FileText,
  Plus,
  Trash2,
  Calendar,
  Link as LinkIcon,
  Globe,
  BookOpen,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Award
} from 'lucide-react';

interface Props {
  donnees: CandidatFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChampChange: (nom: keyof CandidatFormData, valeur: any) => void;
}

// Interface pour les œuvres
interface Oeuvre {
  id: string;
  titre: string;
  datePublication: string;
  media: string;
  categorie: string;
  url: string;
  resume: string;
}

const SoumissionRealisation: React.FC<Props> = ({ donnees, onChampChange }) => {
  const [oeuvres, setOeuvres] = useState<Oeuvre[]>([]);

  const categories = [
    'Reportage',
    'Enquête',
    'Dossier',
    'Interview',
    'Éditorial',
    'Chronique',
    'Portrait',
    'Documentaire',
    'Podcast',
    'Reportage photo'
  ];

  const medias = [
    'Presse écrite',
    'Radio',
    'Télévision',
    'Presse en ligne',
    'Blog professionnel',
    'Média social',
    'Plateforme vidéo',
    'Autre'
  ];

  // Fonction de validation d'une œuvre
  const validerOeuvre = (oeuvre: Oeuvre): boolean => {
    return (
      oeuvre.titre.trim() !== '' &&
      oeuvre.datePublication.trim() !== '' &&
      oeuvre.media.trim() !== '' &&
      oeuvre.categorie.trim() !== '' &&
      oeuvre.url.trim() !== '' &&
      oeuvre.resume.trim() !== ''
    );
  };

  const ajouterOeuvre = () => {
    if (oeuvres.length >= 3) {
      alert('Vous ne pouvez pas ajouter plus de 3 œuvres. La limite maximale est atteinte.');
      return;
    }

    const nouvelleOeuvre: Oeuvre = {
      id: Date.now().toString(),
      titre: '',
      datePublication: '',
      media: '',
      categorie: '',
      url: '',
      resume: ''
    };
    setOeuvres([...oeuvres, nouvelleOeuvre]);
  };

  const supprimerOeuvre = (id: string) => {
    setOeuvres(oeuvres.filter(oeuvre => oeuvre.id !== id));
  };

  const modifierOeuvre = (id: string, champ: keyof Oeuvre, valeur: string) => {
    const nouvellesOeuvres = oeuvres.map(oeuvre =>
      oeuvre.id === id ? { ...oeuvre, [champ]: valeur } : oeuvre
    );
    setOeuvres(nouvellesOeuvres);
  };

  const handleDateChange = (id: string, value: string) => {
    // Formatage automatique JJ/MM/AAAA
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length >= 2) {
      formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
    }
    if (formattedValue.length >= 5) {
      formattedValue = formattedValue.slice(0, 5) + '/' + formattedValue.slice(5, 9);
    }

    modifierOeuvre(id, 'datePublication', formattedValue);
  };

  // Mettre à jour les données du formulaire principal
  React.useEffect(() => {
    // Mettre à jour liensRealisation avec les œuvres
    onChampChange('liensRealisation', oeuvres.map(oeuvre => ({
      id: oeuvre.id,
      url: oeuvre.url,
      description: `${oeuvre.titre} | ${oeuvre.categorie} | ${oeuvre.media}`
    })));

    // S'assurer que descriptionGenerale est toujours définie
    if (donnees.descriptionGenerale === undefined) {
      onChampChange('descriptionGenerale', '');
    }
  }, [oeuvres, onChampChange, donnees.descriptionGenerale]);

  // Compter les œuvres complètes
  const oeuvresCompletes = oeuvres.filter(validerOeuvre).length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FileText className="w-8 h-8 text-orange-500" />
          Votre Réalisation
        </h2>
        <p className="text-gray-600 mt-2">
          Ajoutez vos œuvres journalistiques (maximum 3 œuvres)
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Information sur la limite */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">Instructions importantes</h4>
              <ul className="text-blue-700 text-sm mt-1 space-y-1 list-disc pl-5">
                <li>Vous pouvez soumettre jusqu'à 3 œuvres maximum</li>
                <li>Chaque œuvre doit avoir été publiée entre le 1er janvier 2025 et le 31 décembre 2025</li>
                <li>Tous les champs marqués d'un astérisque (*) sont obligatoires</li>
                <li>Assurez-vous que les liens URL sont actifs et accessibles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compteur d'œuvres avec statut */}
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Œuvres ajoutées :</span> {oeuvres.length}/3
            {oeuvres.length > 0 && (
              <span className={`ml-2 ${oeuvresCompletes === oeuvres.length ? 'text-green-600' : 'text-amber-600'}`}>
                ({oeuvresCompletes}/{oeuvres.length} complètes)
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={ajouterOeuvre}
            disabled={oeuvres.length >= 3}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${oeuvres.length >= 3
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
          >
            <Plus className="w-4 h-4" />
            Ajouter une œuvre
          </button>
        </div>

        {/* Message si limite atteinte */}
        {oeuvres.length >= 3 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 text-sm font-medium">
                Limite atteinte : Vous avez ajouté 3 œuvres. Vous ne pouvez pas en ajouter davantage.
              </p>
            </div>
          </div>
        )}

        {/* Liste des œuvres */}
        <div className="space-y-6">
          {oeuvres.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Aucune œuvre ajoutée
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Commencez par ajouter votre première œuvre journalistique en cliquant sur le bouton "Ajouter une œuvre"
              </p>
              <button
                type="button"
                onClick={ajouterOeuvre}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mx-auto"
              >
                <Plus className="w-5 h-5" />
                Ajouter votre première œuvre
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {oeuvres.map((oeuvre, index) => (
                <div key={oeuvre.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  {/* En-tête de l'œuvre */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${validerOeuvre(oeuvre) ? 'bg-green-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
                          <span className={`font-bold ${validerOeuvre(oeuvre) ? 'text-green-600' : 'text-orange-600'}`}>
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            Œuvre {index + 1} {oeuvre.titre && `: ${oeuvre.titre}`}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {validerOeuvre(oeuvre) ? (
                              <span className="flex items-center gap-1 text-xs text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Complète
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-amber-600">
                                <XCircle className="w-3 h-3" />
                                À compléter
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => supprimerOeuvre(oeuvre.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Supprimer cette œuvre"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Contenu de l'œuvre */}
                  <div className="p-4 md:p-6 space-y-4">
                    {/* Titre de l'œuvre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        1. Titre de l'œuvre *
                      </label>
                      <input
                        type="text"
                        value={oeuvre.titre}
                        onChange={(e) => modifierOeuvre(oeuvre.id, 'titre', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Ex: La formation professionnelle, clé de l'insertion des jeunes"
                        required
                      />
                    </div>

                    {/* Date et média sur la même ligne sur desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          Date de publication *
                        </label>
                        <input
                          type="text"
                          value={oeuvre.datePublication}
                          onChange={(e) => handleDateChange(oeuvre.id, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          placeholder="JJ/MM/AAAA"
                          maxLength={10}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Format : JJ/MM/AAAA</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          Média de publication *
                        </label>
                        <select
                          value={oeuvre.media}
                          onChange={(e) => modifierOeuvre(oeuvre.id, 'media', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          required
                        >
                          <option value="">Sélectionnez un média</option>
                          {medias.map((media) => (
                            <option key={media} value={media}>{media}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Catégorie et URL sur la même ligne sur desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catégorie *
                        </label>
                        <select
                          value={oeuvre.categorie}
                          onChange={(e) => modifierOeuvre(oeuvre.id, 'categorie', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          required
                        >
                          <option value="">Sélectionnez une catégorie</option>
                          {categories.map((categorie) => (
                            <option key={categorie} value={categorie}>{categorie}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-gray-500" />
                          Lien URL direct vers l'œuvre *
                        </label>
                        <input
                          type="url"
                          value={oeuvre.url}
                          onChange={(e) => modifierOeuvre(oeuvre.id, 'url', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          placeholder="https://example.com/votre-article"
                          required
                        />
                      </div>
                    </div>

                    {/* Résumé de l'œuvre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Résumé de l'œuvre *
                      </label>
                      <textarea
                        value={oeuvre.resume}
                        onChange={(e) => modifierOeuvre(oeuvre.id, 'resume', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Décrivez brièvement le contenu, l'angle abordé et les principaux éléments de votre œuvre..."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        200-300 mots recommandés
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section description générale (seulement si des œuvres sont ajoutées) */}
        {oeuvres.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Description générale de votre réalisation *
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Cette description permet de contextualiser l'ensemble de vos œuvres et de mettre en avant
                votre démarche journalistique globale. <span className="text-red-500 font-medium">Ce champ est obligatoire.</span>
              </p>
              <textarea
                value={donnees.descriptionGenerale || ''}
                onChange={(e) => onChampChange('descriptionGenerale', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Décrivez votre démarche journalistique globale, l'objectif commun de vos œuvres, leur cohérence thématique et l'impact recherché..."
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  300-500 mots recommandés
                </p>
                {(!donnees.descriptionGenerale || donnees.descriptionGenerale.trim() === '') && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Ce champ est obligatoire
                  </p>
                )}
              </div>
            </div>

            {/* Section bibliographie */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                Bibliographie / Sources complémentaires
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Si votre réalisation s'appuie sur des sources, études ou références spécifiques,
                vous pouvez les mentionner ici.
              </p>
              <textarea
                value={donnees.bibliographie || ''}
                onChange={(e) => onChampChange('bibliographie', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Listez ici vos principales sources, références bibliographiques, études ou personnes interviewées..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Ce champ est optionnel mais recommandé pour les travaux d'investigation
              </p>
            </div>

          </div>
        )}

        {/* Question pour le Prix Spécial Jeune Journaliste */}
        {oeuvres.length > 0 && (
          <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Prix Spécial Jeune Journaliste
            </h3>

            <div className="mb-4">
              <p className="text-amber-800 font-medium mb-2">
                Souhaitez-vous être également considéré(e) pour le Prix Spécial Jeune Journaliste ? *
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Ce prix est destiné aux journalistes de moins de 35 ans OU ayant moins de 3 ans d'expérience professionnelle.
                Dotation : <span className="font-bold text-green-600">300 000 FCFA + Trophée</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="prixJeune"
                  value="oui"
                  checked={donnees.categorie === 'oui_prix_jeune'}
                  onChange={() => onChampChange('categorie', 'oui_prix_jeune')}
                  className="hidden"
                />
                <div className={`p-4 rounded-lg border-2 transition-all ${donnees.categorie === 'oui_prix_jeune' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-amber-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${donnees.categorie === 'oui_prix_jeune' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {donnees.categorie === 'oui_prix_jeune' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Oui</span>
                      <p className="text-sm text-gray-600 mt-1">Je souhaite participer au Prix Jeune</p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="prixJeune"
                  value="non"
                  checked={donnees.categorie === 'non_prix_jeune' || !donnees.categorie.includes('prix_jeune')}
                  onChange={() => onChampChange('categorie', 'non_prix_jeune')}
                  className="hidden"
                />
                <div className={`p-4 rounded-lg border-2 transition-all ${donnees.categorie === 'non_prix_jeune' ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-amber-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${donnees.categorie === 'non_prix_jeune' ? 'bg-red-100' : 'bg-gray-100'}`}>
                      {donnees.categorie === 'non_prix_jeune' ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Non</span>
                      <p className="text-sm text-gray-600 mt-1">Je ne souhaite pas participer</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>



          </div>
        )}

        {/* Note finale */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Vérification avant soumission</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>✓ Vérifiez que tous les champs obligatoires sont remplis</li>
                <li>✓ Assurez-vous que les dates de publication sont comprises entre 01/01/2025 et 31/12/2025</li>
                <li>✓ Testez vos liens URL pour confirmer qu'ils sont accessibles</li>
                <li>✓ Relisez vos descriptions et résumés pour éviter les fautes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoumissionRealisation;