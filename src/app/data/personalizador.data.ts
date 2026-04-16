import { Material } from "../models/data.models";

const fonts = [
    {
    name: 'Agency FB',
    url: 'agency'
    },
      {
    name: 'Arial',
    url: 'arial'
    },
    {
    name: 'BankGothic Md BT',
    url: 'bankgothic'
    },
    {
    name: 'Berlin Sans FB Demi',
    url: 'berlin'
    },
{
    name: 'ChunkFive Print',
    url: 'chunkfive'
    },
     {
    name: 'Comic Sans MS',
    url: 'comic'
    },
       {
    name: 'Forte',
    url: 'forte'
    },
     {
    name: 'Futura Now Headline ExtraBlack',
    url: 'futura'
    },    
        {
    name: 'Geometr415 Blk BT',
    url: 'geometric'
    },
       {
    name: 'Gobold Bold',
    url: 'gobold'
    },
         {
    name: 'Hakgyoansim Dunggeunmiso OTF B',
    url: 'hakgyo'
    },

     //desde 18 cm
       {
    name: 'Freehand521 BT',
    url: 'freehand'
    },
       {
    name: 'Freestyle Script',
    url: 'freestyle'
    },
       {
    name: 'Handelson Three',
    url: 'handelson'
    },
     {
    name: 'MV Boli',
    url: 'boli'
    },
      {
    name: 'Perpetua',
    url: 'perpetua'
    },
       {
    name: 'Questrial',
    url: 'questrial'
    },

]

const backgrounds = [
        '/ladrillo.webp',
    '/madera.webp',
    '/negro.webp',
      '/blanco.webp',
]

export const materials: Material[] = [
 {
        name: "neon",
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
  fonts: fonts,
backgrounds: backgrounds
    },
    {
        name: "pvc",
        
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
  fonts: fonts,
backgrounds: backgrounds
    },
    {
        name: "acero",
colors: [
     '#5a5a5a',
  ], 
  fonts: fonts,
backgrounds: backgrounds
    }
    
]

