import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PacienteEditComponent implements OnInit {
  paciente: any = {
    rol: '',
    nombre: '',
    edad: 0,
    rut: '',
    prevision: '',
    cama_hospitalizacion: '',
    diagnostico: '',
    cirujano: '',
    cirugia: ''
  };
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPaciente();
  }

  async getPaciente(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const response = await firstValueFrom(this.pacienteService.getPaciente(id));
      this.paciente = response;
    } catch (error) {
      this.error = 'Paciente no encontrado';
    }
  }

  async updatePaciente(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      await firstValueFrom(this.pacienteService.updatePaciente(id, this.paciente));
      this.router.navigate(['/pacientes']);
    } catch (error) {
      this.error = 'Error actualizando el paciente';
    }
  }
}