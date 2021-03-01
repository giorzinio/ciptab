import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'cuotas',
    loadChildren: () => import('./cuotas/cuotas.module').then( m => m.CuotasPageModule)
  },
  {
    path: 'eventdet',
    loadChildren: () => import('./eventdet/eventdet.module').then( m => m.EventdetPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'loginop',
    loadChildren: () => import('./loginop/loginop.module').then( m => m.LoginopPageModule)
  },
  {
    path: 'loginvf',
    loadChildren: () => import('./loginvf/loginvf.module').then( m => m.LoginvfPageModule)
  },
  {
    path: 'visa',
    loadChildren: () => import('./visa/visa.module').then( m => m.VisaPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'personales',
    loadChildren: () => import('./personales/personales.module').then( m => m.PersonalesPageModule)
  },
  {
    path: 'datoscip',
    loadChildren: () => import('./datoscip/datoscip.module').then( m => m.DatoscipPageModule)
  },
  {
    path: 'estudios',
    loadChildren: () => import('./estudios/estudios.module').then( m => m.EstudiosPageModule)
  },
  {
    path: 'trabajo',
    loadChildren: () => import('./trabajo/trabajo.module').then( m => m.TrabajoPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
