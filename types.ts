
export interface RSVPData {
  name: string;
  attendance: 'yes' | 'no' | 'maybe';
  guests: number;
  dietaryNotes: string;
  message: string;
}

export interface Suggestion {
  category: 'gift' | 'attire' | 'message' | 'activity';
  title: string;
  content: string;
}

export enum PartyTheme {
  PERANAKAN = 'Peranakan Tea Party',
  KEBAYA_CHIC = 'Kebaya Chic & Batik',
  INDOROYALTY = 'Indo Royalty Night',
  CASUAL_TRADITION = 'Casual Tradition',
  MODERN_ETHNIC = 'Modern Ethnic'
}

export interface ThemeDetails {
  description: string;
  vibe: string;
  dressCode: string;
}
