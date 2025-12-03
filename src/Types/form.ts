export interface CandidatFormData {
  // Étape 1 - Informations personnelles
  civilite: string;           // "M." ou "Mme"
  nom: string;
  prenom: string;
  email: string;
  typeJournaliste: string;
  telephone: string;
  dateNaissance: string;      // Format: "JJ/MM/AAAA"
  nationalite: string;
  linkedin: string;           // URL LinkedIn (optionnel)
  
  // Étape 2 - Soumission
  titreRealisation: string;
  categorie: string;
  descriptionGenerale: string;
  liensRealisation: LienRealisation[];

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

export interface LienRealisation {
  id: string;
  url: string;
  description: string;
}