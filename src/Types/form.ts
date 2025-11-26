export interface CandidatFormData {
  // Étape 1 - Informations personnelles
  nom: string;
  prenom: string;
  email: string;
  typeJournaliste: string;
  telephone: string;
  
  // Étape 2 - Soumission
  titreRealisation: string;
  lienRealisation: string;
  description: string;
  categorie: string;
  
  // Étape 3 - Déclarations
  acceptationReglement: boolean;
  exactitudeInformations: boolean;
}

export interface EtapeFormulaire {
  id: number;
  titre: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icone: React.ComponentType<any>;
  description: string;
}