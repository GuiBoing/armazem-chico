import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listagem', component: ListagemComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'formulario/:codigo', component: FormularioComponent },
  { path: 'info', component: InfoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
