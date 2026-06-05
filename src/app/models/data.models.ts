export interface ContactDetails {
  url: string;
  longName: string;
  shortName: string;
  address1: string;
  address2: string;
  phone: string;
  email: string;
  rgpdEmail: string;
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
  customDetails?: CustomDetails;
  variantName?: string;
}


export interface CustomDetails {
  text: string;
  font: string,
  color: string,
  frontColor?: string,
  baseColor?: string,
  size: number,
  lines?: string[],
  proportionalWidth?: number,
  frontCover?: boolean,
  base?: boolean,
  svgString?: string
}

export interface Variant {
  size: number,
  price: number,
  name?: string
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
  token: string;
  email: string;
  password: string;
  _id: string;
}

export interface AboutParagraph {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  _id: string;
}

export interface Image {
url: string;
caption?: string;
location: string;
order: number;
_id?: string;
}

export interface Preview {
  text: string;
  color: string;
  material: string;
  font: string;
  background: string
}

export interface Color {
  name: string;
  hex: string;
  uses?: string[];
  materials?: string[];
  dark?: boolean;
}

export interface Material {
  name: string;
  colors:  Color[];
  fonts: Font[];
  backgrounds: string[],
 minHeight?: number,
maxHeight?: number,
grosor?: number[]
}

export interface Font {
  name: string;
  url: string;
  minHeight: number
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

export interface PaymentData {
customer: CheckOutFormData,
items: ProductPurchased[]
}

export interface RedsysResponse {
signatureVersion: string;
  merchantParameters: string;
  signature: string;
  redirectUrl: string;
}

export interface Order {
    redsysOrderId: string,  
    total: number,
    status: string,
    items: ProductPurchased[],  
    emailSent: boolean,
    customer: CheckOutFormData
 }