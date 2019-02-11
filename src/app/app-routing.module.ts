import { LoginaccGuard } from './guard/loginacc.guard';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitucionComponent } from './component/vistas/institucion/institucion.component';
import { MisionComponent } from './component/vistas/mision/mision.component';
import { ReglamentosComponent } from './component/vistas/reglamentos/reglamentos.component';
import { EstudianteComponent } from './component/estudiante/estudiante.component';
import { ProfesorComponent } from './component/profesor/profesor.component';
import { Err404Component } from './component/err404/err404.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'vistas/institucion', component: InstitucionComponent},
  {path: 'vistas/mision', component: MisionComponent},
  {path: 'vistas/reglamentos', component: ReglamentosComponent},
  {path: 'admin', component: AdminComponent, canActivate: [LoginaccGuard]},
  {path: 'estudiante', component: EstudianteComponent, canActivate: [LoginaccGuard]},
  {path: 'profesor', component: ProfesorComponent, canActivate: [LoginaccGuard]},
  {path: '**', component: Err404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
