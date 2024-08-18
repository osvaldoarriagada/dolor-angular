import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paciente-add',
  templateUrl: './paciente-add.component.html',
  styleUrls: ['./paciente-add.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PacienteAddComponent {
  paciente = {
    rol: '',
    nombre: '',
    edad: 0,
    rut: '',
    prevision: '',
    cama_hospitalizacion: '',
    diagnostico: '',
    cirujano: '',
    cirugia: '',
    tratamiento_modalidad: '',
    tratamiento_medicamento: '',
    tipo_bloqueo: '',
    factores_riesgo: {
      DM: '',
      'Hiperglicemia >200ug/dL preoperatoria': '',
      'Uso corticoides crónico': '',
      Inmunodeprimido: '',
      'Hospitalización en UCI durante la hospitalización actual': ''
    }
  };
  
  error: string | null = null;

  // Opciones de medicamentos por modalidad
  medicamentos: { [key: string]: string[] } = {
    'PCA Endovenosa': [
      'Morfina 100mg/100cc (1cc=1mg)',
      'Metadona 100mg/100cc (1cc=1mg)',
      'Fentanilo 1000ug/250cc (5cc =20ug)',
      'otra'
    ],
    'PCA Peridural': [
      'Bupivacaina 0,1% + Fentanilo 500ug/250cc SF',
      'Bupivacaina 0.1%/250cc SF',
      'Bupivacaina 0.08%/300cc SF'
    ],
    'Bomba Elastomérica': [
      'Bupivacaina 0.08%/300cc SF',
      'Bupivacaina 0.1%/250cc SF',
      'otra'
    ],
    'Paciente Crónico': [
      'Parche transdérmico',
      'Otro'
    ]
  };

  medicamentosDisponibles: string[] = [];

  constructor(private pacienteService: PacienteService, private router: Router) {}

  onModalidadChange() {
    this.medicamentosDisponibles = this.medicamentos[this.paciente.tratamiento_modalidad] || [];
    this.paciente.tratamiento_medicamento = ''; // Limpiar la selección de medicamento cuando cambia la modalidad
  }

  async addPaciente(): Promise<void> {
    try {
      await firstValueFrom(this.pacienteService.addPaciente(this.paciente));
      this.router.navigate(['/pacientes']);
    } catch (error: any) {
      if (error instanceof Error) {
        this.error = `Error agregando el paciente: ${error.message}`;
      } else {
        this.error = `Error agregando el paciente: ${JSON.stringify(error)}`;
      }
    }
  }
}
