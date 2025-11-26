import React from 'react';
import type { CandidatFormData } from '../Types/form';
import { CheckCircle, User, FileText, Link, ExternalLink } from 'lucide-react';

interface Props {
  donnees: CandidatFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChampChange: (nom: keyof CandidatFormData, valeur: any) => void;
}

const Recapitulatif: React.FC<Props> = ({ donnees, onChampChange }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          Récapitulatif
        </h2>
        <p className="text-gray-600 mt-2">Vérifiez vos informations avant soumission</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Informations Personnelles */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-orange-500" />
            Informations Personnelles
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Nom:</span>
              <p className="font-medium">{donnees.nom || <span className="text-red-500">Non renseigné</span>}</p>
            </div>
            <div>
              <span className="text-gray-600">Prénom:</span>
              <p className="font-medium">{donnees.prenom || <span className="text-red-500">Non renseigné</span>}</p>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="font-medium">{donnees.email || <span className="text-red-500">Non renseigné</span>}</p>
            </div>
            <div>
              <span className="text-gray-600">Type de journaliste:</span>
              <p className="font-medium">{donnees.typeJournaliste || <span className="text-red-500">Non renseigné</span>}</p>
            </div>
            {donnees.telephone && (
              <div>
                <span className="text-gray-600">Téléphone:</span>
                <p className="font-medium">{donnees.telephone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Réalisation */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-orange-500" />
            Votre Réalisation
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-600">Titre:</span>
              <p className="font-medium">{donnees.titreRealisation || <span className="text-red-500">Non renseigné</span>}</p>
            </div>
            
            {donnees.categorie && (
              <div>
                <span className="text-gray-600">Catégorie:</span>
                <p className="font-medium">{donnees.categorie}</p>
              </div>
            )}

            {donnees.descriptionGenerale && (
              <div>
                <span className="text-gray-600">Description générale:</span>
                <p className="font-medium">{donnees.descriptionGenerale}</p>
              </div>
            )}

            {/* Liens des réalisations */}
            <div>
              <span className="text-gray-600 block mb-3">Liens vers vos réalisations:</span>
              {donnees.liensRealisation.length === 0 ? (
                <p className="text-red-500">Aucun lien ajouté</p>
              ) : (
                <div className="space-y-3">
                  {donnees.liensRealisation.map((lien, index) => (
                    <div key={lien.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Link className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-700">Lien {index + 1}</span>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-gray-600 text-xs block mb-1">URL:</span>
                        <a 
                          href={lien.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {lien.url}
                        </a>
                      </div>

                      {lien.description && (
                        <div>
                          <span className="text-gray-600 text-xs block mb-1">Description:</span>
                          <p className="text-gray-700">{lien.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Déclarations */}
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800 mb-4">
            Déclarations Obligatoires
          </h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={donnees.acceptationReglement}
                onChange={(e) => onChampChange('acceptationReglement', e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <div>
                <span className="font-medium text-orange-800">
                  J'accepte le règlement du concours *
                </span>
                <p className="text-orange-700 text-sm mt-1">
                  Je certifie avoir pris connaissance et accepté les conditions de participation.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={donnees.exactitudeInformations}
                onChange={(e) => onChampChange('exactitudeInformations', e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <div>
                <span className="font-medium text-orange-800">
                  Exactitude des informations *
                </span>
                <p className="text-orange-700 text-sm mt-1">
                  Je certifie sur l'honneur l'exactitude des informations fournies.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recapitulatif;