import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Asegúrate de que FormsModule esté incluido
})
export class PacienteListComponent implements OnInit {
  pacientes: any[] = [];
  pacientesActivos: any[] = [];
  pacientesInactivos: any[] = [];
  filteredPacientes: any[] = [];
  searchTerm: string = '';
  selectedField: string = 'nombre';  // Campo seleccionado para la búsqueda
  showActivos: boolean = true;  // Controla si se muestran los activos o inactivos
  searchSubject: Subject<string> = new Subject();

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.getPacientes();
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchText) => {
      this.filterPacientes(searchText);
    });
  }

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.separarPacientes();
      this.updateFilteredPacientes(); // Actualiza la lista filtrada basada en la vista actual
    });
  }

  separarPacientes(): void {
    this.pacientesActivos = this.pacientes.filter(paciente => paciente.activo);
    this.pacientesInactivos = this.pacientes.filter(paciente => !paciente.activo);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  filterPacientes(searchText: string): void {
    const term = searchText.toLowerCase();
    const pacientes = this.showActivos ? this.pacientesActivos : this.pacientesInactivos;

    this.filteredPacientes = pacientes.filter(paciente => {
      const value = paciente[this.selectedField];
      return value != null && value.toString().toLowerCase().includes(term);
    });
  }

  onFieldChange(newField: string): void {
    this.selectedField = newField;
    this.filterPacientes(this.searchTerm);  // Refiltra con el nuevo campo seleccionado
  }

  toggleView(showActivos: boolean): void {
    this.showActivos = showActivos;
    this.updateFilteredPacientes(); // Actualiza la lista filtrada basada en la vista actual
  }

  updateFilteredPacientes(): void {
    const pacientes = this.showActivos ? this.pacientesActivos : this.pacientesInactivos;
    this.filteredPacientes = pacientes.filter(paciente => {
      const value = paciente[this.selectedField];
      return value != null && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}