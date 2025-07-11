export interface ContactDetails {
  url: string;
  longName: string;
  shortName: string;
  address1: string;
  address2: string;
  phone: string;
  email: string;
  open: string;
  cif: string;
}

export interface CategoryDescription {
application: string, 
products: string,
custom: string,   
cost: string,
metaDescription: string
}


export interface Category {
  type: string,
  name: string;
  slug: string;
  description: CategoryDescription;
  products: Product[]
  }

export interface Product {
  type: string,
  name: string,
  slug: string,
  images: string[],
  description: string;
material: string,
design: string,
installation: string,
application: string,
metaDescription: string
}


export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AdminFormData {
   email: string;
  password: string;
}

export interface AdminStored {
  userDB: userDB;
 token: string;
}

interface userDB {
  token: string,
  email: string,
  password: string,
  _id: string;
}

export interface AboutParagraph {
  title: string;
  text: string[];
  image: string
}

export interface LetterImage {
  name: string;
  url: string;
}