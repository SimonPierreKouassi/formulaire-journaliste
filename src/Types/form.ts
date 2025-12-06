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
  linkedin: string;
  carteProfessionnelle: string;      // URL LinkedIn (optionnel)
  
  // Étape 2 - Soumission
  titreRealisation: string;   // Ancien champ, gardé pour compatibilité
  bibliographie: string;      // Nouveau champ pour la bibliographie
  categorie: string;          // Ancien champ, gardé pour compatibilité
  descriptionGenerale: string;
  liensRealisation: LienRealisation[];
  participePrixJeune: boolean;

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