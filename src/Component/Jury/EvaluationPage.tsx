/* eslint-disable react-hooks/static-components */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Check, Star, X } from 'lucide-react';

// Définir le type pour les critères d'évaluation
type CritereType = {
  points: number;
  max: number;
  comment: string;
};

type EvaluationType = {
  // Critère 1: Impact Passeport-Compétences (30 points)
  messageCentral: CritereType;
  demonstration: CritereType;
  pertinence: CritereType;
  
  // Critère 2: Qualité Journalistique (25 points)
  rigueurSources: CritereType;
  qualiteNarrative: CritereType;
  profondeurAngle: CritereType;
  
  // Critère 3: Portée et Audience (20 points)
  qualiteDiffusion: CritereType;
  pertinenceEngagement: CritereType;
  
  // Critère 4: Innovation et Créativité (15 points)
  originaliteFormat: CritereType;
  qualiteEsthetique: CritereType;
  
  // Critère 5: Inclusion Sociale (10 points)
  diversiteEquilibre: CritereType;
  
  // Commentaire général
  commentaireGeneral: string;
  recommandation: 'finaliste' | 'non_retenu';
};

const EvaluationPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Critères d'évaluation basés sur le document
  const [evaluation, setEvaluation] = useState<EvaluationType>({
    // Critère 1: Impact Passeport-Compétences (30 points)
    messageCentral: { points: 0, max: 10, comment: '' },
    demonstration: { points: 0, max: 10, comment: '' },
    pertinence: { points: 0, max: 10, comment: '' },
    
    // Critère 2: Qualité Journalistique (25 points)
    rigueurSources: { points: 0, max: 10, comment: '' },
    qualiteNarrative: { points: 0, max: 10, comment: '' },
    profondeurAngle: { points: 0, max: 5, comment: '' },
    
    // Critère 3: Portée et Audience (20 points)
    qualiteDiffusion: { points: 0, max: 10, comment: '' },
    pertinenceEngagement: { points: 0, max: 10, comment: '' },
    
    // Critère 4: Innovation et Créativité (15 points)
    originaliteFormat: { points: 0, max: 8, comment: '' },
    qualiteEsthetique: { points: 0, max: 7, comment: '' },
    
    // Critère 5: Inclusion Sociale (10 points)
    diversiteEquilibre: { points: 0, max: 10, comment: '' },
    
    // Commentaire général
    commentaireGeneral: '',
    recommandation: 'non_retenu'
  });

  // Calcul du total
  const totalPoints = Object.keys(evaluation)
    .filter(key => key !== 'commentaireGeneral' && key !== 'recommandation')
    .reduce((total, key) => {
      const critere = evaluation[key as keyof Omit<EvaluationType, 'commentaireGeneral' | 'recommandation'>];
      return total + critere.points;
    }, 0);

  const totalMax = 100;
  const pourcentage = Math.round((totalPoints / totalMax) * 100);
  const estFinaliste = totalPoints >= 70;

  const handlePointsChange = (critere: keyof Omit<EvaluationType, 'commentaireGeneral' | 'recommandation'>, points: number) => {
    if (points < 0 || points > evaluation[critere].max) return;
    
    setEvaluation(prev => ({
      ...prev,
      [critere]: {
        ...prev[critere],
        points: points
      }
    }));
  };

  const handleCommentChange = (critere: keyof Omit<EvaluationType, 'commentaireGeneral' | 'recommandation'>, comment: string) => {
    setEvaluation(prev => ({
      ...prev,
      [critere]: {
        ...prev[critere],
        comment: comment
      }
    }));
  };

  const handleSubmit = () => {
    // Ici, on enverrait l'évaluation au backend
    console.log('Évaluation soumise:', {
      oeuvreId: id,
      evaluation,
      totalPoints,
      estFinaliste
    });
    
    alert('Évaluation enregistrée avec succès !');
    navigate('/jury');
  };

  interface InputPointsProps {
    critere: keyof Omit<EvaluationType, 'commentaireGeneral' | 'recommandation'>;
    label: string;
    points: number;
    max: number;
  }

  const InputPoints: React.FC<InputPointsProps> = ({ critere, label, points, max }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} (0-{max} points)
      </label>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min="0"
          max={max}
          value={points}
          onChange={(e) => handlePointsChange(critere, parseInt(e.target.value) || 0)}
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={max}
            value={points}
            onChange={(e) => handlePointsChange(critere, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <span className="font-bold min-w-12 text-right">{points}/{max}</span>
      </div>
      <textarea
        placeholder="Commentaire (optionnel)"
        value={evaluation[critere].comment}
        onChange={(e) => handleCommentChange(critere, e.target.value)}
        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        rows={2}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/jury')}
            className="btn btn-ghost mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </button>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Évaluation de l'œuvre : {id}
                </h1>
                <p className="text-gray-600">
                  Grille officielle du Prix Alassane Ouattara Passeport-Compétences 2026
                </p>
              </div>
              
              {/* Résumé des points */}
              <div className="bg-gray-50 rounded-lg p-4 min-w-48">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total des points :</span>
                  <span className={`text-2xl font-bold ${estFinaliste ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPoints}/{totalMax}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Pourcentage :</span>
                  <span className="font-bold">{pourcentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Statut :</span>
                  <span className={`font-bold ${estFinaliste ? 'text-green-600' : 'text-red-600'}`}>
                    {estFinaliste ? 'Éligible' : 'Non éligible'}
                  </span>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Seuil de qualification : 70 points minimum
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille d'évaluation */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Grille d'évaluation détaillée
          </h2>

          {/* CRITÈRE 1 */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              CRITÈRE 1 : IMPACT « PASSEPORT-COMPÉTENCES » (30 points)
            </h3>
            <InputPoints
              critere="messageCentral"
              label="Message central - Clarté du lien entre compétences, emploi et autonomie"
              points={evaluation.messageCentral.points}
              max={10}
            />
            <InputPoints
              critere="demonstration"
              label="Démonstration - Faits, données et témoignages vérifiables"
              points={evaluation.demonstration.points}
              max={10}
            />
            <InputPoints
              critere="pertinence"
              label="Pertinence - Utilité pour l'orientation des jeunes"
              points={evaluation.pertinence.points}
              max={10}
            />
          </div>

          {/* CRITÈRE 2 */}
          <div className="mb-8 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-bold text-green-900 mb-4">
              CRITÈRE 2 : QUALITÉ JOURNALISTIQUE (25 points)
            </h3>
            <InputPoints
              critere="rigueurSources"
              label="Rigueur & Sources - Multiplicité et vérification des sources"
              points={evaluation.rigueurSources.points}
              max={10}
            />
            <InputPoints
              critere="qualiteNarrative"
              label="Qualité Narrative - Narration captivante et structurée"
              points={evaluation.qualiteNarrative.points}
              max={10}
            />
            <InputPoints
              critere="profondeurAngle"
              label="Profondeur & Angle - Analyse approfondie et angle original"
              points={evaluation.profondeurAngle.points}
              max={5}
            />
          </div>

          {/* CRITÈRE 3 */}
          <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-900 mb-4">
              CRITÈRE 3 : PORTÉE ET AUDIENCE (20 points)
            </h3>
            <InputPoints
              critere="qualiteDiffusion"
              label="Qualité de Diffusion - Média d'envergure et large audience"
              points={evaluation.qualiteDiffusion.points}
              max={10}
            />
            <InputPoints
              critere="pertinenceEngagement"
              label="Pertinence & Engagement - Adaptation au public et engagement généré"
              points={evaluation.pertinenceEngagement.points}
              max={10}
            />
          </div>

          {/* CRITÈRE 4 */}
          <div className="mb-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-bold text-purple-900 mb-4">
              CRITÈRE 4 : INNOVATION ET CRÉATIVITÉ (15 points)
            </h3>
            <InputPoints
              critere="originaliteFormat"
              label="Originalité du Format & Storytelling"
              points={evaluation.originaliteFormat.points}
              max={8}
            />
            <InputPoints
              critere="qualiteEsthetique"
              label="Qualité Esthétique & Technique"
              points={evaluation.qualiteEsthetique.points}
              max={7}
            />
          </div>

          {/* CRITÈRE 5 */}
          <div className="mb-8 p-4 bg-pink-50 rounded-lg">
            <h3 className="text-lg font-bold text-pink-900 mb-4">
              CRITÈRE 5 : INCLUSION SOCIALE (10 points)
            </h3>
            <InputPoints
              critere="diversiteEquilibre"
              label="Diversité & Équilibre - Genre, territoires, profils divers"
              points={evaluation.diversiteEquilibre.points}
              max={10}
            />
          </div>

          {/* Commentaire général et recommandation */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Commentaire général et recommandation
            </h3>
            <textarea
              value={evaluation.commentaireGeneral}
              onChange={(e) => setEvaluation(prev => ({ ...prev, commentaireGeneral: e.target.value }))}
              placeholder="Résumez votre évaluation, points forts, points faibles, recommandations..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
              rows={4}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommandation finale
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommandation"
                    value="finaliste"
                    checked={evaluation.recommandation === 'finaliste'}
                    onChange={() => setEvaluation(prev => ({ ...prev, recommandation: 'finaliste' }))}
                    className="mr-2"
                  />
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Recommander comme finaliste (&ge; 70 points)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommandation"
                    value="non_retenu"
                    checked={evaluation.recommandation === 'non_retenu'}
                    onChange={() => setEvaluation(prev => ({ ...prev, recommandation: 'non_retenu' }))}
                    className="mr-2"
                  />
                  <span className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    Ne pas retenir (&lt; 70 points)
                  </span>
                </label>
              </div>
            </div>

            {/* Résumé final */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">Récapitulatif</h4>
                  <p className="text-gray-600">
                    Total: {totalPoints} points • Statut: {estFinaliste ? 'Éligible' : 'Non éligible'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-1">{totalPoints}/100</div>
                  <div className="text-sm text-gray-600">Note finale</div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => navigate('/jury')}
              className="btn btn-outline px-6"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                // Sauvegarde temporaire
                alert('Évaluation sauvegardée temporairement');
              }}
              className="btn btn-secondary px-6 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
            <button
              onClick={handleSubmit}
              className="btn btn-primary px-6 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Soumettre l'évaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;