export interface ProjectModel {
  id?: number; // Assigned by backend
  title: string;
  description: string;
  link: string;
  createdDate: string; 
  githubRepo: string;
  stack: string;
  imageUrl?: string;
}
