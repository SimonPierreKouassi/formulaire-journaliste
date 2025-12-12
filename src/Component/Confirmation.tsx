import React from 'react';
import { CheckCircle, Award, Mail, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icône de succès */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Félicitations !
          </h1>

          {/* Message principal */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Votre candidature au <strong>Prix d'Excellence</strong> a été 
            soumise avec succès. Nous vous remercions pour votre participation.
          </p>

          {/* Détails */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">Prochaines étapes</h3>
                  <p className="text-gray-600 text-sm">
                    Vous recevrez un email de confirmation dans les 24 heures
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">Suivi de candidature</h3>
                  <p className="text-gray-600 text-sm">
                    Le jury examinera toutes les candidatures dans les 2 semaines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </button>
            
            <button
              onClick={() => navigate('/candidater')}
              className="flex items-center gap-2 px-6 py-3 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              <Award className="w-5 h-5" />
              Déposer une autre candidature
            </button>
          </div>

          {/* Message de fin */}
          <p className="text-gray-500 text-sm mt-8">
            Pour toute question, contactez-nous à 
            <a href="mailto:contact@prix-excellence.com" className="text-orange-500 hover:underline ml-1">
              contact@prix-excellence.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;