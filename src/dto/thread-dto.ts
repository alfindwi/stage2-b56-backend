export interface ThreadDTO {
    id: number;
    content: string;
    image?: string | null; 
    likes: number;
    userId: number;
    createdAt: Date;
}
  