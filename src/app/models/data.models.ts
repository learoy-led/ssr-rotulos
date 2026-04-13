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
  tiktok: string;
  instagram: string;
}

export interface CategoryDescription {
  application: string;
  products: string;
  custom: string;
  cost: string;
  metaDescription: string;
}

export interface Category {
  type: string;
  name: string;
  slug: string;
  order?: number;
  description: CategoryDescription;
  image: string;
  _id?: string;
}

export interface Product {
  type: string;
  name: string;
  slug: string;
  order?: number;
  images: string[];
  description: string;
  material: string;
  design: string;
  installation: string;
  application: string;
  light: boolean;
  metaDescription: string;
  categories: Category[];
  renderKey?: string;
  variants?: Variant[];
  _id?: string;
}

export interface ProductPurchased {
  id: string ;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface Variant {
  size: string,
  price: number
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CheckOutFormData {
  name: string;
  email: string;
  phone: string;
  empresa: string;
  address: string,
    cp: string,
     ciudad: string,
     provincia: string
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
  token: string;
  email: string;
  password: string;
  _id: string;
}

export interface AboutParagraph {
  title: string;
  text: string[];
  image: string;
}

export interface LetterImage {
  name: string;
  url: string;
}

export interface Preview {
  text: string;
  color: string;
  material: string;
  font: string;
  background: string
}

export interface Material {
  name: string;
  light: boolean;
  colors: string[];
  fonts: string[];
  backgrounds: string[]
}

