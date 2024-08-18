import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PacienteListComponent implements OnInit {
  pacientes: any[] = [];

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes()
      .subscribe(pacientes => this.pacientes = pacientes);
  }
}