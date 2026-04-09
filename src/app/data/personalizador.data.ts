import { Material } from "../models/data.models";

export const materials: Material[] = [
 {
        name: "neon",
        light: true,
colors: [
    '#ffd500',
    '#ef4444', 
    '#ff791a',
    '#00e600',
    '#00ffff',
    '#2323FF',
    '#ff3399',
    '#bb33ff',
    '#ffffff',
    '#FFDFAF'
  ], 
  fonts: [
    'Yellowtail',
    'Audiowide',
    'Comfortaa',
    'Great Vibes',
    'Kaushan Script',
    'Orbitron',
    'Pacifico',
    'Quicksand',
    'Sacramento',
    'Satisfy'
],

backgrounds: [
    '/ladrillo.webp',
    '/madera.webp',
    '/negro.webp',
]
    },
    {
        name: "pvc",
        light: false,
colors: [
     '#ffffff',
     '#0a0a0a',
     '#f80000',
     '#ffff00',
     '#00bb2d',
    '#3b83bd',
    '#1e2460',
'#cf3476'
  ], 
  fonts: [
    'Open Sans',
    'Bebas Neue'
],

backgrounds: [
    '/ladrillo.webp',
    '/madera.webp',
    '/negro.webp',
]
    }
    
]

