import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Shield, Users, ArrowRight } from 'lucide-react';

const Accueil: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Logo/Titre */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Prix Alassane Ouattara
            </h1>
            <h2 className="text-3xl font-semibold text-orange-500">
              Passeport-Compétences 2024
            </h2>
          </div>

          {/* Étapes de candidature */}
          <div className="flex justify-center items-center gap-8 mb-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step}
                </div>
                <span className="text-sm font-medium text-gray-700 mt-2 max-w-24 text-center">
                  {step === 1 && 'Informations'}
                  {step === 2 && 'Soumission'}
                  {step === 3 && 'Confirmation'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            "Chaque grande réalisation commence par le courage de participer. 
            En soumettant votre candidature, vous faites le premier pas vers 
            la reconnaissance de votre travail exceptionnel."
          </p>

          {/* Bouton Principal - Candidater */}
          <div className="pt-8">
            <button
              onClick={() => navigate('/candidater')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
            >
              <Award className="w-6 h-6" />
              Candidater Maintenant
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bouton Secondaire - Accès Admin */}
          

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Excellence</h3>
              <p className="text-gray-600">
                Reconnaissance des talents journalistiques d'exception
              </p>
            </div>

            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Équité</h3>
              <p className="text-gray-600">
                Processus d'évaluation anonyme et impartial
              </p>
            </div>

            <div className="text-center p-6">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Prestige</h3>
              <p className="text-gray-600">
                Rejoignez le cercle des lauréats du Prix
              </p>
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick={() => navigate('/identification')}
              className="text-gray-600 bg-green-400 hover:bg-green-800 font-medium py-2 px-4 rounded-lg transition-all flex items-center gap-2 mx-auto hover:text-green-100"
            >
              <Shield className="w-4 h-4" />
              Vous êtes Jury ou Secrétaire Technique ?
            </button>
            <p className="text-sm text-gray-500 mt-1">
              Cliquez ici pour accéder à votre espace dédié
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;