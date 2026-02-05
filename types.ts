
export interface Club {
  id: string;
  name: string;
  school: string;
  region: RegionType;
  description: string;
  isStandingDirector: boolean;
}

export interface Activity {
  id: string;
  year: number;
  title: string;
  content: string;
}

export interface MeetingMinute {
  id: string;
  date: string;
  title: string;
  summary: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  school?: string;
  term?: string;
}

export type RegionType = 
  | '경기북부' 
  | '경기남부' 
  | '경인' 
  | '충청' 
  | '호남' 
  | '영남' 
  | '강원' 
  | '제주';

export interface SocietyData {
  heroTitle: string;
  heroSubtitle: string;
  logoUrl: string;
  clubs: Club[];
  activities: Activity[];
  meetingMinutes: MeetingMinute[];
  supremeCouncil: Member[];
  pastPresidents: Member[];
}

export type View = 'HOME' | 'ADMIN_AUTH' | 'ADMIN_DASHBOARD';
