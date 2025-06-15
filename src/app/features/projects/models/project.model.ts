export interface ProjectModel {
  id?: number; // el backend lo asigna
  title: string;
  description: string;
  link: string;
  createdDate: string; // ISO date string
}
