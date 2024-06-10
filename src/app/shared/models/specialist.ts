export interface Schedule {
  week: string;
  month: string;
  hours: string[];
}

export interface Specialist {
  id: number;
  image: string;
  name: string;
  crp: string;
  uf: string;
  rating: number;
  title: string;
  languages: string[];
  specialties: string[];
  value: number;
  description: string;
  schedule: Schedule[];
}