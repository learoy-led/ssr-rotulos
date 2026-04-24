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
  {
name: 'acero sin pintar',
  hex: '#5a5a5a',
  uses: ['letra']
}, 
  {
name: 'dorado',
  hex: '#ba8e05',
  uses: ['letra'],
    materials: ['aluminio']
}, 
  {
name: 'oro rosa',
  hex: '#DEA193',
  uses: ['letra'],
      materials: ['aluminio']
}, 
  {
name: 'plateado',
  hex: '#848688',
  uses: ['letra'],
      materials: ['aluminio']
}, 

  {
name: 'rojo',
  hex: '#ed1c24',
  uses: ['metacrilato'],
      materials: ['aluminio']
}, 
  {
name: 'naranja',
  hex: '#f26322',
  uses: ['metacrilato'],
      materials: ['aluminio']
}, 
{
name: 'amarillo',
  hex: '#ffdd00',
  uses: ['metacrilato'],
      materials: ['aluminio']
}, 
  {
name: 'verde',
  hex: '#059448',
  uses: ['metacrilato'],
      materials: ['aluminio']
}, 
  {
name: 'azul',
  hex: '#003e69',
  uses: ['metacrilato'],
      materials: ['aluminio']
}, 
  {
    name: 'blanco',
    hex: '#ffffff',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'aluminio', 'mini']
    },
  {
    name: 'negro',
    hex: '#000000',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'aluminio', 'mini']
    },
      {
    name: 'rojo',
    hex: '#f80000',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'aluminio', 'mini']
    },
       {
    name: 'naranja',
    hex: '#f88d00',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'mini']
    },
      {
    name: 'amarillo',
    hex: '#ffff00',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'aluminio', 'mini']
    },
         {
    name: 'verde claro',
    hex: '#00bb2d',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'aluminio', 'mini']
    },
         {
    name: 'verde oscuro',
    hex: '#038622',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'mini']
    },
    {
    name: 'azul claro',
    hex: '#3b83bd',
    uses: ['letra', 'vinilo', 'aluminio', 'mini'],
    materials: ['acero', 'hierro']
    },
   {
    name: 'azul oscuro',
    'hex': '#1e2460',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'mini']
    },
   {
    name: 'rosa',
    hex: '#cf3476',
    uses: ['letra', 'vinilo'],
    materials: ['acero', 'hierro', 'mini']
    },
    {
    name: 'RAL3020',
    hex: '#CC0605',
    uses: ['base'],
      materials: ['acero', 'hierro', 'aluminio', 'mini']
  
  },
   {
    name: 'RAL3004',
    hex:'#6D1A21',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
 {
    name: 'RAL2004',
    hex: '#F44611',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
   {
    name: 'RAL1023',
    hex: '#F7B500',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
     {
    name: 'RAL6024',
    hex: '#308446',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
     {
    name: 'RAL6005',
    hex: '#0F4336',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
     {
    name: 'RAL5002',
    hex: '#00387B',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
     {
    name: 'RAL5022',
    hex: '#1A2B44',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
     {
    name: 'RAL9006',
    hex: '#A5A5A5',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
       {
    name: 'RAL7042',
    hex: '#8D948D',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
        {
    name: 'RAL7016',
    hex: '#383E42',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
          {
    name: 'RAL9005',
    hex: '#0A0A0A',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
          {
    name: 'RAL9016',
    hex: '#F6F6F6',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
          {
    name: 'RAL1015',
    hex: '#E6D2B5',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini']
  },
   {
    name: 'amarillo',
    hex: '#ffd500',
     uses: ['letra'],
        materials: ['neon'],
  },
   {
    name: 'rojo',
    hex: '#ef4444',
         uses: ['letra'],
        materials: ['neon']
  },
  {
    name: 'naranja',
    hex: '#ff791a',
         uses: ['letra'],
        materials: ['neon']
  },
    {
    name: 'verde',
    hex: '#00e600',
         uses: ['letra'],
        materials: ['neon']
  },
      {
    name: 'azul claro',
    hex: '#00ffff',
         uses: ['letra'],
        materials: ['neon']
  },
     {
    name: 'azul oscuro',
    hex: '#2323FF',
         uses: ['letra'],
        materials: ['neon']
  },
      {
    name: 'rosa',
    hex: '#ff3399',
         uses: ['letra'],
        materials: ['neon']
  },
        {
    name: 'morado',
    hex: '#bb33ff',
         uses: ['letra'],
        materials: ['neon']
  },
          {
    name: 'blanco frío',
    hex: '#ffffff',
         uses: ['letra'],
        materials: ['neon']
  },
            {
    name: 'blanco cálido',
    hex: '#FFDFAF',
         uses: ['letra'],
        materials: ['neon']
  },   

]

const baseColors = [
  {
    name: 'RAL3020',
    hex: '#CC0605'
  },
   {
    name: 'RAL3004',
    hex:'#6D1A21'
  },
 {
    name: 'RAL2004',
    hex: '#F44611'
  },
   {
    name: 'RAL1023',
    hex: '#F7B500'
  },
     {
    name: 'RAL6024',
    hex: '#308446'
  },
     {
    name: 'RAL6005',
    hex: '#0F4336'
  },
     {
    name: 'RAL5002',
    hex: '#00387B'
  },
     {
    name: 'RAL5022',
    hex: '#1A2B44'
  },
     {
    name: 'RAL9006',
    hex: '#A5A5A5'
  },
       {
    name: 'RAL7042',
    hex: '#8D948D'
  },
        {
    name: 'RAL7016',
    hex: '#383E42'
  },
          {
    name: 'RAL9005',
    hex: '#0A0A0A'
  },
          {
    name: 'RAL9016',
    hex: '#F6F6F6'
  },
          {
    name: 'RAL1015',
    hex: '#E6D2B5'
  } 
  ]

export const materials: Material[] = [
    {
        name: "acero",
colors: colors.filter(color => color.materials?.includes('acero')), 
  fonts: fonts,
backgrounds: backgrounds,
grosor: [2,3,5,6,8]
    },
 {
        name: "hierro",
colors: colors.filter( color => color.materials?.includes('hierro')), 
  fonts: fonts,
backgrounds: backgrounds,
grosor: [2,4,6,8,10,13]
    },

 {
        name: "neon",
colors: colors.filter(color => color.materials?.includes('neon')), 
  fonts: fonts,
backgrounds: backgrounds,
    },
    {
        name: "pvc",
colors: colors.filter(color => color.materials?.includes('pvc')), 
  fonts: fonts,
backgrounds: backgrounds
    },
      {
        name: "aluminio",      
colors: colors.filter( color => color.materials?.includes('aluminio')), 
  fonts: fonts,
backgrounds: backgrounds,
grosor: [4,6,8,10,13]
    },
    {
      name: "mini",
 colors: colors.filter((color)=> color.materials?.includes('mini')), 
   fonts: fonts,
backgrounds: backgrounds,
maxHeight: 49
}
    
]

