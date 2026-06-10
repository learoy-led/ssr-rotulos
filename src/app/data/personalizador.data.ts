import { Material, Font } from "../models/data.models";

export const neonFonts : Font[] = [
     {
    name: 'Handelson Three',
    url: 'handelson',
    minHeight: 18,
     opentypeUrl: '/fonts/Handelson Three.otf',
    },
      {
    name: 'MV Boli',
    url: 'boli',
    minHeight: 10,
      opentypeUrl: '/fonts/mvboli.ttf',
    },
     {
    name: 'Comic Sans MS',
    url: 'comic',
    minHeight: 10,
    opentypeUrl: '/fonts/comic.ttf',
    },
    {
    name: 'Amsterdan_CN',
    url: 'amsterdan',
    minHeight: 18,
    opentypeUrl: '/fonts/Amsterdan_CN.ttf',
    },
       {
    name: 'Beachfront_CN',
    url: 'beachfront',
    minHeight: 18,
    opentypeUrl: '/fonts/Beachfront_CN.ttf',
    },
         {
    name: 'Monaco_CN',
    url: 'monaco',
    minHeight: 18,
    opentypeUrl: '/fonts/Monaco_CN.ttf',
    },
            {
    name: 'NeoTokyo_CN Regular',
    url: 'neotokyo',
    minHeight: 18,
    opentypeUrl: '/fonts/NeoTokyo_CN Regular.ttf',
    },
  {
    name: 'Freestyle Script',
    url: 'freestyle',
    minHeight: 18,
          opentypeUrl: '/fonts/FREESCPT.TTF',
    },
  ]

export const fonts: Font[] = [
    {
    name: 'Agency FB',
    url: 'agency',
    minHeight: 10,
    opentypeUrl: '/fonts/AGENCYR.TTF',
    },
      {
    name: 'Arial',
    url: 'arial',
    minHeight: 10,
    opentypeUrl: '/fonts/arial.ttf',
    },
    {
    name: 'BankGothic Md BT',
    url: 'bankgothic',
    minHeight: 10,
    opentypeUrl: '/fonts/bgothm.ttf',
    },
    {
    name: 'Berlin Sans FB Demi',
    url: 'berlin',
    minHeight: 10,
    opentypeUrl: '/fonts/BRLNSDB.TTF',
    },
{
    name: 'ChunkFive',
    url: 'chunkfive',
    minHeight: 10,
opentypeUrl: '/fonts/ChunkFive.ttf',
    },
     {
    name: 'Comic Sans MS',
    url: 'comic',
    minHeight: 10,
    opentypeUrl: '/fonts/comic.ttf',
    },
       {
    name: 'Forte',
    url: 'forte',
    minHeight: 10,
     opentypeUrl: '/fonts/FORTE.TTF',
    },
     {
    name: 'Futura Now Headline ExtraBlack',
    url: 'futura',
    minHeight: 10,
        opentypeUrl: '/fonts/FuturaNowHeadlineExtraBlack.ttf',
    },    
        {
    name: 'Geometr415 Blk BT',
    url: 'geometric',
    minHeight: 10,
          opentypeUrl: '/fonts/Geometr415 Blk BT Black.ttf',
    },
       {
    name: 'Gobold Bold',
    url: 'gobold',
    minHeight: 10,
     opentypeUrl: '/fonts/Gobold Bold.otf',
    },
         {
    name: 'Hakgyoansim Dunggeunmiso OTF B',
    url: 'hakgyo',
    minHeight: 10,
         opentypeUrl: '/fonts/Hakgyoansim Dunggeunmiso OTF B.otf',
    },
      {
    name: 'MV Boli',
    url: 'boli',
    minHeight: 10,
      opentypeUrl: '/fonts/mvboli.ttf',
    },
       {
    name: 'Freehand521 BT',
    url: 'freehand',
    minHeight: 18,
    opentypeUrl: '/fonts/Freehand521 BT.ttf',
    },
       {
    name: 'Freestyle Script',
    url: 'freestyle',
    minHeight: 18,
          opentypeUrl: '/fonts/FREESCPT.TTF',
    },
       {
    name: 'Handelson Three',
    url: 'handelson',
    minHeight: 18,
     opentypeUrl: '/fonts/Handelson Three.otf',
    },
      {
    name: 'Perpetua',
    url: 'perpetua',
    minHeight: 18,
         opentypeUrl: '/fonts/PER_____.TTF',
    },
       {
    name: 'Questrial',
    url: 'questrial',
    minHeight: 18,
    opentypeUrl: '/fonts/Questrial-Regular.ttf',
    },

]

const backgrounds = [
      '/blanco.webp',
        '/ladrillo.webp',
    '/madera.webp',
]

const colors = [
//    {
//  name: 'incoloro',
//   hex: 'transparent',
//   uses: ['luz', 'base'],
//    materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
//    },
  {
name: 'acero',
  hex: '#5a5a5a',
  uses: ['letra'],
   materials: ['acero', 'hierro'],
  //  dark: true
}, 
  {
name: 'plateado',
  hex: '#848688',
  uses: ['letra'],
      materials: ['aluminio']
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
    name: 'blanco frío',
    hex: '#ffffff',
         uses: ['luz'],
        materials: ['acero', 'hierro', 'aluminio', 'mini',  'pvc', '3d']
  },
            {
    name: 'blanco cálido',
    hex: '#FFDFAF',
         uses: ['luz'],
        materials: ['acero', 'hierro', 'aluminio', 'mini',  'pvc', '3d']
  },    
     {
    name: 'blanco',
    hex: '#ffffff',
         uses: ['letra'],
        materials: ['acero', 'hierro', 'aluminio', 'mini',  'pvc', '3d']
  },
  {
    name: 'negro',
    hex: '#000000',
    uses: ['letra'],
    materials: ['hierro', 'aluminio', 'mini',  'pvc', '3d'],
    dark: true
    },
      {
    name: 'rojo',
    hex: '#f80000',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'aluminio', 'mini', 'pvc', '3d']
    },
       {
    name: 'naranja',
    hex: '#f88d00',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'mini', 'pvc', '3d']
    },
      {
    name: 'amarillo',
    hex: '#ffff00',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'aluminio', 'mini', 'pvc', '3d']
    },
         {
    name: 'verde claro',
    hex: '#00bb2d',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'aluminio', 'mini', 'pvc', '3d']
    },
         {
    name: 'verde oscuro',
    hex: '#038622',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'mini',  'pvc', '3d']
    },
    {
    name: 'azul claro',
    hex: '#3b83bd',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'aluminio', 'mini', 'pvc', '3d']
    },
   {
    name: 'azul oscuro',
    'hex': '#1e2460',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'mini', 'pvc','3d'],
    dark: true
    },
   {
    name: 'rosa',
    hex: '#cf3476',
    uses: ['letra', 'luz'],
    materials: ['hierro', 'acero', 'mini', 'pvc', '3d']
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
      materials: ['aluminio'],
      dark: true
}, 
          {
    name: 'RAL9016',
    hex: '#F6F6F6',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },
          {
    name: 'RAL9005',
    hex: '#0A0A0A',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },


    {
    name: 'RAL3020',
    hex: '#CC0605',
    uses: ['base'],
      materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  
  },
   {
    name: 'RAL3004',
    hex:'#6D1A21',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },
 {
    name: 'RAL2004',
    hex: '#F44611',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },
   {
    name: 'RAL1023',
    hex: '#F7B500',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },
     {
    name: 'RAL6024',
    hex: '#308446',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },
     {
    name: 'RAL6005',
    hex: '#0F4336',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc','3d']
  },
     {
    name: 'RAL5002',
    hex: '#00387B',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc','3d']
  },
     {
    name: 'RAL5022',
    hex: '#1A2B44',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc','3d']
  },
     {
    name: 'RAL9006',
    hex: '#A5A5A5',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc','3d']
  },
       {
    name: 'RAL7042',
    hex: '#8D948D',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },
        {
    name: 'RAL7016',
    hex: '#383E42',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
  },


          {
    name: 'RAL1015',
    hex: '#E6D2B5',
        uses: ['base'],
          materials: ['acero', 'hierro', 'aluminio', 'mini', 'pvc', '3d']
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
    name: 'amarillo',
    hex: '#ffd500',
     uses: ['letra'],
        materials: ['neon'],
  },
    {
    name: 'verde',
    hex: '#00e600',
         uses: ['luz'],
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
    name: 'rojo',
    hex: '#e50015',
         uses: ['letra'],
        materials: ['acero']
  },   
    {
    name: 'naranja',
    hex: '#ec6c00',
         uses: ['letra'],
        materials: ['acero']
  },  
    {
    name: 'amarillo',
    hex: '#fdf105',
         uses: ['letra'],
        materials: ['acero']
  },  
  {
    name: 'verde',
    hex: '#6fb930',
         uses: ['letra'],
        materials: ['acero']
  },  
    {
    name: 'azul',
    hex: '#029fe4',
         uses: ['letra'],
        materials: ['acero']
  }, 
   {
    name: 'añil',
    hex: '#1d2087',
         uses: ['letra'],
        materials: ['acero'],
        dark: true
  },   
  {
    name: 'rosa',
    hex: '#c7007e',
         uses: ['letra'],
        materials: ['acero']
  },   

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
  fonts: neonFonts,
backgrounds: backgrounds,
maxHeight: 150
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
},
  {
      name: "3d",
 colors: colors.filter((color)=> color.materials?.includes('3d')), 
   fonts: fonts,
backgrounds: backgrounds,
}
    
]