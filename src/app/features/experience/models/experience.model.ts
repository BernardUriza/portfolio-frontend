export interface Experience {
  id: number;
  company: string;
  role: string;
  start: string; // ISO date o año/mes
  end: string;   // "actual" o fecha
  description: string;
  stack: string[];
}
