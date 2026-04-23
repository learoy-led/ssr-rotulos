import { Material } from "../models/data.models";

export const fonts = [
    {
    name: 'Agency FB',
    url: 'agency',
    minHeight: 10
    },
      {
    name: 'Arial',
    url: 'arial',
    minHeight: 10
    },
    {
    name: 'BankGothic Md BT',
    url: 'bankgothic',
    minHeight: 10
    },
    {
    name: 'Berlin Sans FB Demi',
    url: 'berlin',
    minHeight: 10
    },
{
    name: 'ChunkFive Print',
    url: 'chunkfive',
    minHeight: 10
    },
     {
    name: 'Comic Sans MS',
    url: 'comic',
    minHeight: 10
    },
       {
    name: 'Forte',
    url: 'forte',
    minHeight: 10
    },
     {
    name: 'Futura Now Headline ExtraBlack',
    url: 'futura',
    minHeight: 10
    },    
        {
    name: 'Geometr415 Blk BT',
    url: 'geometric',
    minHeight: 10
    },
       {
    name: 'Gobold Bold',
    url: 'gobold',
    minHeight: 10
    },
         {
    name: 'Hakgyoansim Dunggeunmiso OTF B',
    url: 'hakgyo',
    minHeight: 10
    },
      {
    name: 'MV Boli',
    url: 'boli',
    minHeight: 10
    },
       {
    name: 'Freehand521 BT',
    url: 'freehand',
    minHeight: 18
    },
       {
    name: 'Freestyle Script',
    url: 'freestyle',
    minHeight: 18
    },
       {
    name: 'Handelson Three',
    url: 'handelson',
    minHeight: 18
    },
      {
    name: 'Perpetua',
    url: 'perpetua',
    minHeight: 18
    },
       {
    name: 'Questrial',
    url: 'questrial',
    minHeight: 18
    },

]

const backgrounds = [
        '/ladrillo.webp',
    '/madera.webp',
    '/negro.webp',
      '/blanco.webp',
]

const colors = [
         '#ffffff',
     '#000000',
     '#f80000',
      '#f88d00',
     '#ffff00',
     '#00bb2d',
      '#038622',
    '#3b83bd',
    '#1e2460',
'#cf3476'    
]

export const materials: Material[] = [
    {
        name: "acero",
colors: ['#5a5a5a', ...colors ], 
  fonts: fonts,
backgrounds: backgrounds,
grosor: [2,3,5,6,8]
    },
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
backgrounds: backgrounds,
    },
    {
        name: "pvc",
        
colors: colors, 
  fonts: fonts,
backgrounds: backgrounds
    },
  
  {
        name: "hierro",
colors: colors, 
  fonts: fonts,
backgrounds: backgrounds,
grosor: [2,4,6,8,10,13]
    },
      {
        name: "aluminio",      
colors: [
    '#ffffff',
     '#000000',
  '#ed1c24',
  '#f26322',
  '#ffdd00',
  '#003e69',
  '#059448',
  '#ba8e05',
  //oro rosa
  '#DEA193',
  '#848688',
], 
  fonts: fonts,
backgrounds: backgrounds,
grosor: [4,6,8,10,13]
    },

    {
      name: "mini",
      colors: colors, 
   fonts: fonts,
backgrounds: backgrounds,
maxHeight: 49
}
    
]

