import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // AJOUTER CET IMPORT
import { 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Calendar, 
  FileText, 
  Users, 
  Globe, 
  Target, 
  BookOpen, 
  Upload, 
  Clock,
  Star,
  Trophy,
  AlertCircle,
  CheckCircle,
  UserCheck,
  FileCheck,
  ShieldCheck,
  ArrowRight // AJOUTER CET IMPORT
} from 'lucide-react';

const ReglementConcours: React.FC = () => {
  const navigate = useNavigate(); // AJOUTER CE HOOK
  const [sectionsOuvertes, setSectionsOuvertes] = useState<Record<string, boolean>>({
    objectif: true,
    prix: false,
    conditions: false,
    soumission: false,
    calendrier: false,
    criteres: false
  });

  const toggleSection = (section: string) => {
    setSectionsOuvertes(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="mb-8 sm:mb-10 mx-32 my-10">
      <div className="bg-linear-to-r from-white to-amber-100 border-2 border-orange-200 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
        
        {/* En-tête */}
        <div className="bg-linear-to-r from-orange-500 to-amber-600 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Règlement du Concours
            </h1>
          </div>
          <p className="text-orange-100 text-sm sm:text-lg">
            Prix Alassane Ouattara Passeport-Compétences 2025-2026
          </p>
        </div>

        {/* Contenu */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Section 1 : Objectif */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('objectif')}
              className="w-full p-3 sm:p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded flex sm:rounded-lg items-center justify-center shrink-0">
                  <Target className="w-3 h-3 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Objectif du Prix</h2>
              </div>
              {sectionsOuvertes.objectif ? 
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              }
            </button>
            {sectionsOuvertes.objectif && (
              <div className="p-4 sm:p-6">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Le Prix vise à récompenser les meilleures productions journalistiques qui illustrent de manière exemplaire 
                  comment l'acquisition de compétences constitue un véritable « passeport » pour l'insertion professionnelle 
                  durable, l'autonomie financière et la mobilité internationale régulière.
                </p>
              </div>
            )}
          </div>

          {/* Section 2 : Prix et Dotations */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('prix')}
              className="w-full p-3 sm:p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded flex sm:rounded-lg items-center justify-center shrink-0">
                  <Trophy className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Prix et Dotations</h2>
              </div>
              {sectionsOuvertes.prix ? 
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              }
            </button>
            {sectionsOuvertes.prix && (
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-linear-to-r from-amber-50 to-yellow-50 p-4 sm:p-5 rounded-lg border border-amber-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800">Grand Prix "Alassane Ouattara Passeport Compétences"</h3>
                        <p className="text-amber-700 font-bold text-xl sm:text-2xl mt-1">1 500 000 FCFA</p>
                      </div>
                      <div className="text-amber-600 text-xs sm:text-sm bg-amber-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        + Trophée + Ordinateur portable
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-lg border border-blue-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800">Distinction</h3>
                        <p className="text-blue-700 font-bold text-xl sm:text-2xl mt-1">500 000 FCFA</p>
                      </div>
                      <div className="text-blue-600 text-xs sm:text-sm bg-blue-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        + Trophée
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-emerald-50 to-teal-50 p-4 sm:p-5 rounded-lg border border-emerald-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800">Prix Spécial Espoir Jeune</h3>
                        <p className="text-emerald-700 font-bold text-xl sm:text-2xl mt-1">300 000 FCFA</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Pour les journalistes de moins de 35 ans OU ayant moins de 3 ans d'expérience
                        </p>
                      </div>
                      <div className="text-emerald-600 text-xs sm:text-sm bg-emerald-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full mt-2 sm:mt-0">
                        + Trophée
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                    <p>Des mentions spéciales non dotées peuvent être décernées à la discrétion du jury.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3 : Conditions d'éligibilité */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('conditions')}
              className="w-full p-3 sm:p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded flex sm:rounded-lg items-center justify-center shrink-0">
                  <FileCheck className="w-3 h-3 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Conditions d'éligibilité</h2>
              </div>
              {sectionsOuvertes.conditions ? 
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              }
            </button>
            {sectionsOuvertes.conditions && (
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        Période de publication
                      </h4>
                      <p className="text-gray-700 text-xs sm:text-sm">1er janvier 2025 au 31 décembre 2025</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                        <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                        Auteur
                      </h4>
                      <p className="text-gray-700 text-xs sm:text-sm">Journaliste professionnel avec carte en cours de validité</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                        Territoire
                      </h4>
                      <p className="text-gray-700 text-xs sm:text-sm">Média opérant en Côte d'Ivoire ou traitant de la formation en Côte d'Ivoire</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                        Genres acceptés
                      </h4>
                      <p className="text-gray-700 text-xs sm:text-sm">Reportage, Enquête, Dossier</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-bold text-xs sm:text-sm text-amber-800 mb-2 flex items-center gap-1 sm:gap-2">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Restrictions importantes
                    </h4>
                    <ul className="list-disc pl-4 sm:pl-5 text-gray-700 text-xs sm:text-sm space-y-1">
                      <li>Œuvres originales (pas de publirédactionnel)</li>
                      <li>Maximum 3 œuvres par candidat</li>
                      <li>Langue de soumission : Français</li>
                      <li>Transcription obligatoire pour audio et sous-titres pour vidéo</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4 : Modalités de soumission */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('soumission')}
              className="w-full p-3 sm:p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded flex sm:rounded-lg items-center justify-center shrink-0">
                  <Upload className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Modalités de soumission</h2>
              </div>
              {sectionsOuvertes.soumission ? 
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              }
            </button>
            {sectionsOuvertes.soumission && (
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-bold text-xs sm:text-sm text-blue-800 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Soumission exclusivement en ligne
                    </h4>
                    <p className="text-gray-700 text-xs sm:text-sm">Aucun dossier physique accepté</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3">Format des œuvres</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <FileText className="w-3 h-3 text-gray-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-xs sm:text-sm">Presse écrite</span>
                            <p className="text-xs text-gray-600">600+ mots (max 2 pages)</p>
                          </div>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <Users className="w-3 h-3 text-gray-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-xs sm:text-sm">Radio</span>
                            <p className="text-xs text-gray-600">5 à 15 minutes</p>
                          </div>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <Award className="w-3 h-3 text-gray-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-xs sm:text-sm">Télévision</span>
                            <p className="text-xs text-gray-600">3 à 13 minutes</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3">Pièces à fournir</h4>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                          <span>Formulaire de candidature rempli</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                          <span>Carte de journaliste professionnel</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                          <span>Œuvre candidate (PDF, MP3, MP4, URL)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                          <span>Preuve de publication/diffusion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 shrink-0"></div>
                          <span>Note de présentation (300-500 mots)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 5 : Calendrier */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('calendrier')}
              className="w-full p-3 sm:p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded flex sm:rounded-lg items-center justify-center shrink-0">
                  <Clock className="w-3 h-3 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Calendrier 2026</h2>
              </div>
              {sectionsOuvertes.calendrier ? 
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              }
            </button>
            {sectionsOuvertes.calendrier && (
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-linear-to-r from-orange-50 to-amber-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800">Clôture des soumissions</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">15 janvier 2026 à 23h59 GMT</p>
                    </div>
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                      ⏰ URGENT
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-800">Cérémonie de remise des Prix</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">15 février 2026 (lors du FIMEC 2026)</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                      FINALE
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 6 : Critères d'évaluation */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('criteres')}
              className="w-full p-3 sm:p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded flex sm:rounded-lg items-center justify-center shrink-0">
                  <Star className="w-3 h-3 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Critères d'évaluation</h2>
              </div>
              {sectionsOuvertes.criteres ? 
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> : 
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              }
            </button>
            {sectionsOuvertes.criteres && (
              <div className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <p className="text-gray-700 text-xs sm:text-sm mb-2">
                    Les œuvres sont évaluées sur une grille de <strong>100 points</strong> avec un seuil de présélection à <strong>70/100</strong>
                  </p>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { critere: "Impact « Passeport-Compétences »", points: "30 pts", desc: "Lien entre compétences, emploi, autonomie et mobilité", icon: Target },
                    { critere: "Qualité Journalistique", points: "25 pts", desc: "Rigueur, sources, narration", icon: FileText },
                    { critere: "Portée et Audience", points: "20 pts", desc: "Diffusion, engagement, impact social", icon: Users },
                    { critere: "Innovation et Créativité", points: "15 pts", desc: "Angle, format, storytelling, data/visuels", icon: Award },
                    { critere: "Inclusion Sociale", points: "10 pts", desc: "Genre, territoires, vulnérabilités", icon: ShieldCheck }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded flex items-center justify-center shrink-0">
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs sm:text-sm text-gray-800 truncate">{item.critere}</h4>
                            <p className="text-xs text-gray-600 truncate">{item.desc}</p>
                          </div>
                        </div>
                        <div className="bg-indigo-100 text-indigo-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-xs sm:text-sm shrink-0 ml-2">
                          {item.points}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* NOUVEAU : Section du bouton Candidater maintenant */}
        <div className="bg-linear-to-r from-green-50 to-emerald-50 p-6 border-t border-green-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Prêt à soumettre votre candidature ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              En cliquant sur le bouton ci-dessous, vous confirmez avoir lu et compris
              l'ensemble du règlement du concours.
            </p>
            
            <button
              onClick={() => navigate('/candidater')}
              className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
            >
              <Award className="w-6 h-6" />
              Candidater maintenant
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer avec informations importantes */}
        <div className="bg-gray-50 p-4 sm:p-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <div className="text-center flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <p className="text-xs text-gray-600 mt-1">Originalité</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <p className="text-xs text-gray-600 mt-1">3 œuvres max</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <p className="text-xs text-gray-600 mt-1">5 ans de droits</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <p className="text-xs text-gray-600 mt-1">Janv. 2026</p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs sm:text-sm mt-4">
            * Les lauréats autorisent l'AGEFOP à diffuser leurs œuvres à des fins non commerciales pendant 5 ans
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReglementConcours;