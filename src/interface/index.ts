/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Iproduct {
  id: number;
  attributes: IAttributes;
  // documentId: string;
  // qwt?: number;
}

export interface IAttributes {
  title: string;
  descrption: string;
  price: number;
  stock: number;
  category: Icategory;
  thumbnail: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // qwt?:number
}

export interface Icategory {
  data: {
    id: number;
    attributes: {
      title: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface Icart {
  isLoading: boolean;
  CartItems: Iproduct[];
}

export interface ILoginData {
  jwt: string;
  user: {
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    documentId: string;
    email: string;
    id: number;
    locale: null;
    provider: string;
    publishedAt: string;
    updatedAt: string;
    username: string;
  };
}

export interface ICategoryResponse {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
