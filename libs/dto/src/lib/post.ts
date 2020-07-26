export interface PostDto {
  text: string;
  image?: string;
  likes: any[];
  comments: any[];
  postedBy: any[];
  createdAt: Date;
}
