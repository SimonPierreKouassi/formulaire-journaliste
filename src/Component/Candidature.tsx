import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CandidatFormData, EtapeFormulaire } from '../Types/form';
import { User, Upload, FileCheck, Award } from 'lucide-react';
import InformationsPersonnelles from './InfoPers';
import Recapitulatif from './Recapitulatif';
import SoumissionRealisation from './Soumission';

const FormulaireCandidat: React.FC = () => {
  const navigate = useNavigate();
  const [etapeActuelle, setEtapeActuelle] = useState<number>(1);
  const [donneesFormulaire, setDonneesFormulaire] = useState<CandidatFormData>({
    nom: '',
    prenom: '',
    email: '',
    typeJournaliste: '',
    telephone: '',
    titreRealisation: '',
    lienRealisation: '',
    description: '',
    categorie: '',
    acceptationReglement: false,
    exactitudeInformations: false
  });

  const etapes: EtapeFormulaire[] = [
    {
      id: 1,
      titre: 'Informations Personnelles',
      icone: User,
      description: 'Vos coordonnées et profil'
    },
    {
      id: 2,
      titre: 'Soumission',
      icone: Upload,
      description: 'Votre réalisation'
    },
    {
      id: 3,
      titre: 'Récapitulatif',
      icone: FileCheck,
      description: 'Validation finale'
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChampChange = (nom: keyof CandidatFormData, valeur: any) => {
    setDonneesFormulaire(prev => ({
      ...prev,
      [nom]: valeur
    }));
  };

  const etapeSuivante = () => {
    if (etapeActuelle < etapes.length) {
      setEtapeActuelle(etapeActuelle + 1);
    }
  };

  const etapePrecedente = () => {
    if (etapeActuelle > 1) {
      setEtapeActuelle(etapeActuelle - 1);
    }
  };

  const validerEtape = (): boolean => {
    switch (etapeActuelle) {
      case 1:
        return !!donneesFormulaire.nom && !!donneesFormulaire.prenom &&
          !!donneesFormulaire.email && !!donneesFormulaire.typeJournaliste;
      case 2:
        return !!donneesFormulaire.titreRealisation && !!donneesFormulaire.lienRealisation;
      case 3:
        return donneesFormulaire.acceptationReglement && donneesFormulaire.exactitudeInformations;
      default:
        return false;
    }
  };

  const soumettreCandidature = () => {
    console.log('Candidature soumise:', donneesFormulaire);
    // Rediriger vers la page de confirmation au lieu d'afficher une alerte
    navigate('/confirmation');
  };

  const renderEtape = () => {
    switch (etapeActuelle) {
      case 1:
        return <InformationsPersonnelles donnees={donneesFormulaire} onChampChange={handleChampChange} />;
      case 2:
        return <SoumissionRealisation donnees={donneesFormulaire} onChampChange={handleChampChange} />;
      case 3:
        return <Recapitulatif donnees={donneesFormulaire} onChampChange={handleChampChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* En-tête avec étapes */}
        <div className="text-center space-y-8 mb-12">
          <div className="flex justify-center items-center gap-8">
            {etapes.map((etape, index) => {
              const estComplete = index + 1 < etapeActuelle;
              const estActuelle = index + 1 === etapeActuelle;
              const Icone = etape.icone;

              return (
                <div key={etape.id} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${estComplete
                      ? 'bg-green-500 border-green-500 text-white'
                      : estActuelle
                        ? 'border-orange-500 bg-white text-orange-500'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}>
                    {estComplete ? (
                      <Award className="w-6 h-6" />
                    ) : (
                      <Icone className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-sm mt-2 text-center max-w-24 font-medium ${estActuelle || estComplete ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                    {etape.titre}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">{etape.description}</span>
                </div>
              );
            })}
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Candidature au Prix Alassane Ouattara Passeport-Compétences
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            "Chaque grande réalisation commence par le courage de participer.
            En soumettant votre candidature, vous faites le premier pas vers
            la reconnaissance de votre travail exceptionnel."
          </p>

          {etapeActuelle === 1 && (
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl max-w-2xl mx-auto">
              <p className="text-orange-800 font-semibold">
                💡 Conseil : Prenez le temps de bien préparer votre note de présentation,
                c'est l'élément clé qui permet au jury de comprendre votre démarche créative.
              </p>
            </div>
          )}
        </div>

        {/* Contenu de l'étape */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderEtape()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={etapePrecedente}
              disabled={etapeActuelle === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${etapeActuelle === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              ← Retour
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Étape {etapeActuelle} sur {etapes.length}
              </span>

              {etapeActuelle < etapes.length ? (
                <button
                  onClick={etapeSuivante}
                  disabled={!validerEtape()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all ${validerEtape()
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={soumettreCandidature}
                  disabled={!validerEtape()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all ${validerEtape()
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  <Award className="w-5 h-5" />
                  Soumettre ma candidature
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireCandidat;