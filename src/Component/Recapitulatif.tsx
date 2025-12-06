import React from 'react';
import type { CandidatFormData } from '../Types/form';
import { 
  CheckCircle, 
  User, 
  FileText, 
  ExternalLink,
  Calendar,
  Globe,
  BookOpen,
  Mail,
  Phone,
  Award,
  AlertCircle
} from 'lucide-react';

interface Props {
  donnees: CandidatFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChampChange: (nom: keyof CandidatFormData, valeur: any) => void;
}

const Recapitulatif: React.FC<Props> = ({ donnees, onChampChange }) => {
  // Simuler des œuvres pour le récapitulatif (dans un vrai cas, elles seraient dans donnees)
  // Ici, on utilise les liensRealisation comme œuvres
  const oeuvres = donnees.liensRealisation.map(lien => {
    // Dans l'implémentation réelle, vous auriez un objet Oeuvre complet
    // Pour l'exemple, on utilise les données disponibles
    return {
      titre: lien.description?.split('|')[0]?.trim() || "Titre non spécifié",
      datePublication: "Date non spécifiée",
      media: lien.description?.split('|')[2]?.trim() || "Média non spécifié",
      categorie: lien.description?.split('|')[1]?.trim() || "Catégorie non spécifiée",
      url: lien.url,
      resume: lien.description || "Résumé non fourni"
    };
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          Récapitulatif de votre candidature
        </h2>
        <p className="text-gray-600 mt-2">Vérifiez toutes vos informations avant la soumission finale</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section 1 : Informations Personnelles */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              1. Informations Personnelles
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Civilité</span>
                  <p className="font-medium text-gray-800 mt-1">{donnees.civilite || <span className="text-red-500">Non renseigné</span>}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Nom</span>
                  <p className="font-medium text-gray-800 mt-1">{donnees.nom || <span className="text-red-500">Non renseigné</span>}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Prénom</span>
                  <p className="font-medium text-gray-800 mt-1">{donnees.prenom || <span className="text-red-500">Non renseigné</span>}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Date de naissance</span>
                  <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {donnees.dateNaissance || <span className="text-red-500">Non renseignée</span>}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Nationalité</span>
                  <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {donnees.nationalite || <span className="text-red-500">Non renseignée</span>}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Email</span>
                  <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {donnees.email || <span className="text-red-500">Non renseigné</span>}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Téléphone</span>
                  <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    {donnees.telephone || <span className="text-red-500">Non renseigné</span>}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Catégorie de média</span>
                  <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                    <Award className="w-3 h-3" />
                    {donnees.typeJournaliste || <span className="text-red-500">Non renseignée</span>}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Numéro de carte professionnel</span>
                  <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                    <Award className="w-3 h-3" />
                    {donnees.carteProfessionnelle || <span className="text-red-500">Non renseignée</span>}
                  </p>
                </div>
                {donnees.linkedin && (
                  <div>
                    <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Profil LinkedIn</span>
                    <a 
                      href={donnees.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-2 mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {donnees.linkedin.substring(0, 40)}...
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 : Œuvres soumises */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              2. Vos Œuvres Journalistiques ({oeuvres.length}/3)
            </h3>
          </div>
          <div className="p-6">
            {oeuvres.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Aucune œuvre ajoutée</p>
                <p className="text-sm text-gray-400 mt-1">Vous devez ajouter au moins une œuvre pour soumettre votre candidature</p>
              </div>
            ) : (
              <div className="space-y-4">
                {oeuvres.map((oeuvre, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{index + 1}</span>
                        </div>
                        <h4 className="font-bold text-gray-800">
                          Œuvre {index + 1}: {oeuvre.titre}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Date de publication</span>
                        <p className="font-medium text-gray-800 mt-1 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {oeuvre.datePublication}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Média</span>
                        <p className="font-medium text-gray-800 mt-1">{oeuvre.media}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Catégorie</span>
                        <p className="font-medium text-gray-800 mt-1">{oeuvre.categorie}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">URL</span>
                        <a 
                          href={oeuvre.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-2 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {oeuvre.url.substring(0, 40)}...
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Résumé</span>
                      <p className="text-gray-700 mt-1 text-sm leading-relaxed">{oeuvre.resume}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Description générale */}
            {donnees.descriptionGenerale && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  Description générale de votre réalisation
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{donnees.descriptionGenerale}</p>
                </div>
              </div>
            )}

            {/* Bibliographie */}
            {donnees.titreRealisation && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  Bibliographie / Sources complémentaires
                </h4>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{donnees.titreRealisation}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3 : Déclarations */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-linear-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              3. Déclarations Obligatoires
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <label className="flex items-start gap-4 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={donnees.acceptationReglement}
                  onChange={(e) => onChampChange('acceptationReglement', e.target.checked)}
                  className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800 text-lg">
                      J'accepte le règlement du concours *
                    </span>
                    {!donnees.acceptationReglement && (
                      <span className="text-red-500 text-sm font-medium">(Requis)</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Je certifie avoir pris connaissance et accepté l'intégralité du règlement du Prix 
                    Alassane Ouattara Passeport-Compétences 2025-2026, et je m'engage à respecter 
                    toutes les conditions de participation.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={donnees.exactitudeInformations}
                  onChange={(e) => onChampChange('exactitudeInformations', e.target.checked)}
                  className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800 text-lg">
                      Exactitude des informations *
                    </span>
                    {!donnees.exactitudeInformations && (
                      <span className="text-red-500 text-sm font-medium">(Requis)</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Je certifie sur l'honneur l'exactitude et la véracité de toutes les informations 
                    fournies dans ce formulaire. Je confirme être l'auteur ou co-auteur des œuvres 
                    soumises et détenir les droits nécessaires pour leur participation à ce concours.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Résumé statistique */}
        <div className="bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Résumé de votre candidature</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{oeuvres.length}</div>
              <div className="text-sm text-gray-600">Œuvres soumises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {donnees.civilite && donnees.nom && donnees.prenom && donnees.email ? "✓" : "✗"}
              </div>
              <div className="text-sm text-gray-600">Infos personnelles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {oeuvres.length > 0 ? "✓" : "✗"}
              </div>
              <div className="text-sm text-gray-600">Œuvres ajoutées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {donnees.acceptationReglement && donnees.exactitudeInformations ? "✓" : "✗"}
              </div>
              <div className="text-sm text-gray-600">Déclarations</div>
            </div>
          </div>
        </div>

        {/* Message final */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Vérification finale
          </h4>
          <p className="text-gray-600">
            Vérifiez attentivement toutes les informations ci-dessus avant de soumettre votre candidature. 
            Une fois soumise, vous ne pourrez plus modifier votre dossier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recapitulatif;