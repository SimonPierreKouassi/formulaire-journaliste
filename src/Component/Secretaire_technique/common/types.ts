// src/components/securite-technique/common/types.ts

export type RoleUtilisateur = 'secretaire' | 'jury' | 'admin' | 'candidat';

export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  role: RoleUtilisateur;
  telephone?: string;
  dateCreation: Date;
  dernierAcces?: Date;
}

export interface Candidature {
  respecteCriteres: string;
  id: string;
  candidat: {
    id: string;
    nom: string;
    email: string;
    telephone: string;
    cartePresse: string;
    media: string;
    dateDeNaissance: string
    pays: string;
  };
  oeuvre: {
    titre: string;
    categorie: 'presse-ecrite' | 'radio' | 'television' | 'digital';
    typeMedia: string;
    datePublication: Date;
    format: string;
    duree: string;
    langue: string;
    url: string;
    description: string;
  };
  piecesJointes: PieceJointe[];
  statut: 'en-attente' | 'eligible' | 'non-eligible' | 'a-corriger' | 'anonymise' | 'evalue';
  dateSoumission: Date;
  dateVerification?: Date;
  verificateur?: string;
  motifsRejet?: string[];
  checklist: {
    cartePresse: boolean;
    periodePublication: boolean;
    formatCorrect: boolean;
    langueFrancais: boolean;
    originalite: boolean;
    droitsAuteur: boolean;
  };
  notesJury?: NoteJury[];
}

export interface PieceJointe {
  id: string;
  nom: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'autre';
  taille: string;
  url: string;
  dateUpload: Date;
}

export interface NoteJury {
  idJury: string;
  nomJury: string;
  dateEvaluation: Date;
  note: number;
  commentaires: string;
  criteres: {
    impact: number;
    qualite: number;
    portee: number;
    innovation: number;
    inclusion: number;
  };
}

export interface ModeleCommunication {
  id: string;
  nom: string;
  sujet: string;
  contenu: string;
  variables: string[];
  typeDestinataire: 'candidats' | 'jury' | 'tous' | 'personnalise';
  createdBy: string;
  dateCreation: Date;
}

export interface Jury {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  specialite: string;
  institution: string;
  role: 'president' | 'membre' | 'expert';
  statut: 'actif' | 'inactif' | 'suspendu';
  dateInscription: Date;
  oeuvresAssignees: string[];
  evaluationsTerminees: number;
  moyenneNotes: number;
}

export interface Statistiques {
  totalCandidatures: number;
  parStatut: Record<string, number>;
  parCategorie: Record<string, number>;
  parMois: Record<string, number>;
  tauxEligibilite: number;
  tempsMoyenVerification: string;
  activiteRecent: Array<{
    action: string;
    utilisateur: string;
    date: Date;
    details?: string;
  }>;
}