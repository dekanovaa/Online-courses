export interface Course {
    id: number;
    title: string;
    author: string;
    price: number;
    rating: number;
    description: string;
    fullDescription?: string;
  }
  
  export interface User {
    email: string;
    password: string;
  }