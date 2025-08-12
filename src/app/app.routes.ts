import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { categoryResolver } from './core/resolvers/category.resolver';
import { productResolver } from './core/resolvers/product.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Rótulos Learoy · Carteles y letreros personalizados para tiendas',
    data: {
      description:
        'Todo tipo de rótulación y cartelería para tiendas, hoteles, oficinas, etc. Pide tu letrero luminoso o sin luz para interior o exterior.',
      image:
        'https://res.cloudinary.com/dxuseyfxa/image/upload/v1742550802/rotulo-luminoso-learoy_dgqanb.webp',
    },
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/categorias/categorias.component').then(
        (c) => c.CategoriasComponent
      ),
    title: 'Rótulos Learoy · Catálogo de modelos de rotulación',
    data: {
      description:
        'Modelos de rótulación y cartelería para tiendas, hoteles, oficinas, etc. Encuentra el modelo de letrero que más se adapte a tus necesidades.',
      image:
        'https://res.cloudinary.com/dxuseyfxa/image/upload//v1738661134/cartel-con-luz-led-para-pared-pvc-rotulos-learoy_lrunve.webp',
    },
  },
  {
    path: 'rotulos-encontrados',
    loadComponent: () =>
      import('./pages/search-results/search-results.component').then(
        (c) => c.SearchResultsComponent
      ),
    title: 'Rótulos Learoy · Resultados de búsqueda',
  },
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./pages/nosotros/nosotros.component').then(
        (c) => c.NosotrosComponent
      ),
    title: 'Rótulos Learoy · Proveedor de rotulación',
    data: {
      description:
        'Soluciones de señalización para comercios, edificios y eventos de todo tipo, así como letras corpóreas y materiales para rótulos. Conócenos.',
      image:
        'https://res.cloudinary.com/dxuseyfxa/image/upload/f_auto/v1736523883/image_20250110164118_e4c5e4.webp',
    },
  },
  {
    path: 'casos-de-exito',
    loadComponent: () =>
      import('./pages/casos/casos.component').then((c) => c.CasosComponent),
    title: 'Casos de éxito de Rótulos Learoy',
    data: {
      description:
        'Ejemplos de rótulos llamativos. Ideas para letreros para fachadas o interior. Pide presupuesto a medida y con entrega rápida.',
      image:
        'https://res.cloudinary.com/dxuseyfxa/image/upload/v1742571010/led-neon-personalizado-centros-comerciales-rotulos-learoy_qd2rlf.webp',
    },
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(
        (c) => c.ContactoComponent
      ),
    title: 'Contacto Rótulos Learoy',
    data: {
      description:
        'Contacto Rótulos Learoy, proveedor de rotulación de confianza. Si buscas un letrero o cartel de cualquier tipo, haz tu consulta.',
      image:
        'https://res.cloudinary.com/dxuseyfxa/image/upload/v1742550802/rotulo-luminoso-learoy_dgqanb.webp',
    },
  },
  {
    path: 'politica-de-cookies',
    loadComponent: () =>
      import('./pages/politica-cookies/politica-cookies.component').then(
        (c) => c.PoliticaCookiesComponent
      ),
    title: 'Política de cookies | Rótulos Learoy',
  },
  {
    path: 'politica-de-privacidad',
    loadComponent: () =>
      import(
        './pages/politica-de-privacidad/politica-de-privacidad.component'
      ).then((c) => c.PoliticaDePrivacidadComponent),
    title: 'Política de privacidad | Rótulos Learoy',
  },
  {
    path: 'aviso-legal',
    loadComponent: () =>
      import('./pages/aviso-legal/aviso-legal.component').then(
        (c) => c.AvisoLegalComponent
      ),

    title: 'Aviso legal | Rótulos Learoy',
  },
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./pages/admin-login/admin-login.component').then(
        (c) => c.AdminLoginComponent
      ),
    title: 'Panel administración | Rótulos Learoy',
  },
  {
    path: 'admin-panel',
    loadComponent: () =>
      import('./pages/admin-panel/admin-panel.component').then(
        (c) => c.AdminPanelComponent
      ),
    canActivate: [authGuard],
    title: 'Panel administración | Rótulos Learoy',
  },
  {
    path: 'pagina-no-encontrada',
    loadComponent: () =>
      import(
        './pages/pagina-no-encontrada/pagina-no-encontrada.component'
      ).then((c) => c.PaginaNoEncontradaComponent),
    title: 'Página no encontrada | Rótulos Learoy',
  },
  {
    path: ':category',
    loadComponent: () =>
      import('./pages/detalle-categoria/detalle-categoria.component').then(
        (c) => c.DetalleCategoriaComponent
      ),
    resolve: {
  category: categoryResolver
}  
    },
  {
    path: ':category/:product',
    loadComponent: () =>
      import('./pages/detalle-producto/detalle-producto.component').then(
        (c) => c.DetalleProductoComponent
      ),
      resolve: {
  product: productResolver
}  
  },
];
