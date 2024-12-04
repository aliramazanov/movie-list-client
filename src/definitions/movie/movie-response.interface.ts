export interface MovieResponse {
  id: string;
  title: string;
  year: number;
  poster?: string;
  userId: string;
  createdAt: Date;
}
