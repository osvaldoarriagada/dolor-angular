import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PacienteDetailComponent implements OnInit {
  paciente: any = null;
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
      this.paciente = await firstValueFrom(this.pacienteService.getPaciente(id));
    } catch (error) {
      this.error = 'Paciente no encontrado';
    }
  }

  async deletePaciente(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      await firstValueFrom(this.pacienteService.deletePaciente(id));
      this.router.navigate(['/pacientes']);
    } catch (error) {
      this.error = 'Error eliminando el paciente';
    }
  }

  async terminarTratamiento(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.paciente = await firstValueFrom(this.pacienteService.terminarTratamiento(id));
    } catch (error) {
      this.error = 'Error terminando el tratamiento';
    }
  }
}