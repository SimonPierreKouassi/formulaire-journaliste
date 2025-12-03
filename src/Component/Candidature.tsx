import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CandidatFormData, EtapeFormulaire } from '../Types/form';
import { User, Upload, FileCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import InformationsPersonnelles from './InfoPers';
import Recapitulatif from './Recapitulatif';
import SoumissionRealisation from './Soumission';

const FormulaireCandidat: React.FC = () => {
  const navigate = useNavigate();
  const [etapeActuelle, setEtapeActuelle] = useState<number>(1);
  const [donneesFormulaire, setDonneesFormulaire] = useState<CandidatFormData>({
    // Étape 1 - Informations personnelles
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    typeJournaliste: '',
    telephone: '',
    dateNaissance: '',      // Format: "JJ/MM/AAAA"
    nationalite: '',
    linkedin: '',
    
    // Étape 2 - Soumission
    titreRealisation: '',
    categorie: '',
    descriptionGenerale: '',
    liensRealisation: [],
    
    // Étape 3 - Déclarations
    acceptationReglement: false,
    exactitudeInformations: false
  });

  const etapes: EtapeFormulaire[] = [
    {
      id: 1,
      titre: 'Informations',
      icone: User,
      description: 'Coordonnées'
    },
    {
      id: 2,
      titre: 'Soumission',
      icone: Upload,
      description: 'Réalisation'
    },
    {
      id: 3,
      titre: 'Récapitulatif',
      icone: FileCheck,
      description: 'Validation'
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
        return !!donneesFormulaire.civilite && 
               !!donneesFormulaire.nom && 
               !!donneesFormulaire.prenom && 
               !!donneesFormulaire.email && 
               !!donneesFormulaire.typeJournaliste &&
               !!donneesFormulaire.telephone &&
               !!donneesFormulaire.dateNaissance &&
               !!donneesFormulaire.nationalite;
      case 2:
        // Validation pour plusieurs liens
        return !!donneesFormulaire.titreRealisation && 
               !!donneesFormulaire.categorie &&
               donneesFormulaire.liensRealisation.length > 0 &&
               donneesFormulaire.liensRealisation.every(lien => lien.url.trim() !== '');
      case 3:
        return donneesFormulaire.acceptationReglement && 
               donneesFormulaire.exactitudeInformations;
      default:
        return false;
    }
  };

  const soumettreCandidature = () => {
    console.log('Candidature soumise:', donneesFormulaire);
    navigate('/confirmation');
  };

  const renderEtape = () => {
    switch (etapeActuelle) {
      case 1:
        return (
          <InformationsPersonnelles 
            donnees={donneesFormulaire} 
            onChampChange={handleChampChange} 
          />
        );
      case 2:
        return (
          <SoumissionRealisation 
            donnees={donneesFormulaire} 
            onChampChange={handleChampChange} 
          />
        );
      case 3:
        return (
          <Recapitulatif 
            donnees={donneesFormulaire} 
            onChampChange={handleChampChange} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-green-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        
        {/* En-tête avec étapes - Version mobile compacte */}
        <div className="text-center space-y-6 mb-8 sm:mb-12">
          {/* Étapes pour mobile */}
          <div className="sm:hidden">
            <div className="flex justify-between items-center mb-4">
              {etapes.map((etape, index) => {
                const estComplete = index + 1 < etapeActuelle;
                const estActuelle = index + 1 === etapeActuelle;
                
                return (
                  <div key={etape.id} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${
                        estComplete
                          ? 'bg-green-500 border-green-500 text-white'
                          : estActuelle
                          ? 'border-orange-500 bg-white text-orange-500'
                          : 'border-gray-300 bg-white text-gray-400'
                      }`}
                    >
                      {estComplete ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <etape.icone className="w-4 h-4" />
                      )}
                    </div>
                    <span 
                      className={`text-xs mt-1 text-center max-w-16 font-medium ${
                        estActuelle ? 'text-gray-800 font-bold' : 'text-gray-500'
                      }`}
                    >
                      {etape.titre.substring(0, 4)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Étape {etapeActuelle} sur {etapes.length}: {etapes[etapeActuelle - 1].description}
              </span>
            </div>
          </div>

          {/* Étapes pour desktop */}
          <div className="hidden sm:block">
            <div className="flex justify-center items-center gap-4 sm:gap-8">
              {etapes.map((etape, index) => {
                const estComplete = index + 1 < etapeActuelle;
                const estActuelle = index + 1 === etapeActuelle;
                const Icone = etape.icone;

                return (
                  <div key={etape.id} className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        estComplete
                          ? 'bg-green-500 border-green-500 text-white'
                          : estActuelle
                          ? 'border-orange-500 bg-white text-orange-500'
                          : 'border-gray-300 bg-white text-gray-400'
                      }`}
                    >
                      {estComplete ? (
                        <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Icone className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <span 
                      className={`text-xs sm:text-sm mt-2 text-center max-w-20 sm:max-w-24 font-medium ${
                        estActuelle || estComplete ? 'text-gray-800' : 'text-gray-500'
                      }`}
                    >
                      {etape.titre}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 hidden sm:block">
                      {etape.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 px-2">
            Candidature au Prix Alassane Ouattara Passeport-Compétences
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            "Chaque grande réalisation commence par le courage de participer.
            En soumettant votre candidature, vous faites le premier pas vers
            la reconnaissance de votre travail exceptionnel."
          </p>

          {etapeActuelle === 1 && (
            <div className="bg-orange-50 border border-orange-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl max-w-2xl mx-auto">
              <p className="text-orange-800 font-semibold text-sm sm:text-base">
                💡 Conseil : Prenez le temps de bien préparer votre note de présentation,
                c'est l'élément clé qui permet au jury de comprendre votre démarche créative.
              </p>
            </div>
          )}
        </div>

        {/* Contenu de l'étape */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          {renderEtape()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              onClick={etapePrecedente}
              disabled={etapeActuelle === 1}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                etapeActuelle === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-500">
                Étape {etapeActuelle}/{etapes.length}
              </span>

              {etapeActuelle < etapes.length ? (
                <button
                  onClick={etapeSuivante}
                  disabled={!validerEtape()}
                  className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all text-sm sm:text-base ${
                    validerEtape()
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={soumettreCandidature}
                  disabled={!validerEtape()}
                  className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all text-sm sm:text-base ${
                    validerEtape()
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Soumettre</span>
                  <span className="sm:hidden">Envoyer</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Indicateur de progression pour mobile */}
        <div className="mt-4 sm:hidden">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(etapeActuelle / etapes.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-600">Début</span>
            <span className="text-xs text-gray-600">{Math.round((etapeActuelle / etapes.length) * 100)}%</span>
            <span className="text-xs text-gray-600">Terminé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireCandidat;