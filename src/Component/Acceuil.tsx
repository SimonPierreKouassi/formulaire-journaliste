import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Shield, Trophy } from 'lucide-react';

const Accueil: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 to-green-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    {/* En-tête avec étapes */}
                    <div className="flex justify-center items-center gap-8 mb-12">
                        {[1, 2, 3].map((step, index) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {step}
                                </div>
                                <span className="text-sm font-medium text-gray-700 mt-2 max-w-24 text-center">
                                    {index === 0 && 'Informations'}
                                    {index === 1 && 'Soumission'}
                                    {index === 2 && 'Confirmation'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <h1 className="text-5xl font-bold text-gray-800">
                        Prix Alassane Ouattara Passeport-Compétences
                        <span className="text-orange-500 pl-3">2025</span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        "Chaque grande réalisation commence par le courage de participer.
                        En soumettant votre candidature, vous faites le premier pas vers
                        la reconnaissance de votre travail exceptionnel."
                    </p>

                    {/* Bouton Candidater */}
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => navigate('/candidater')}
                            className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white
                             font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300
                              transform hover:scale-105 shadow-lg flex items-center gap-3"
                        >
                            <Trophy className="w-5 h-5" />
                            Candidater Maintenant
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
                        <div className="text-center p-6">
                            <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Processus Simple</h3>
                            <p className="text-gray-600">
                                3 étapes simples pour soumettre votre candidature en moins de 10 minutes
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Évaluation Équitable</h3>
                            <p className="text-gray-600">
                                Jury indépendant et processus d'évaluation transparent
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Communauté</h3>
                            <p className="text-gray-600">
                                Rejoignez une communauté de talents et d'innovateurs
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;