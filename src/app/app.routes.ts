import { Routes } from '@angular/router';
import { PacienteListComponent } from './components/paciente-list/paciente-list.component';
import { PacienteAddComponent } from './components/paciente-add/paciente-add.component';
import { PacienteDetailComponent } from './components/paciente-detail/paciente-detail.component';
import { PacienteEditComponent } from './components/paciente-edit/paciente-edit.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/pacientes', pathMatch: 'full' },
  { path: 'pacientes', component: PacienteListComponent },
  { path: 'paciente/add', component: PacienteAddComponent },
  { path: 'paciente/:id', component: PacienteDetailComponent},
  { path: 'paciente/edit/:id', component: PacienteEditComponent}

];