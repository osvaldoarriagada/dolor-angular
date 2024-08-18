import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl: string = 'http://localhost/api/pacientes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map(response => response.data || []),  // Extraer el array de la clave 'data'
        catchError(this.handleError<any[]>('getPacientes', []))
      );
  }

  addPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, paciente, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addPaciente'))
      );
  }

  getPaciente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  // Asegúrate de usar comillas inversas (`) aquí
    return this.http.get<any>(url)
      .pipe(
        map(response => response.data),  // Extraer la clave 'data'
        catchError(this.handleError<any>('getPaciente id=${id}'))
      );
  }

  updatePaciente(id: number, paciente: any): Observable<any> {
    const url: string = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, paciente, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updatePaciente'))
      );
  }

  deletePaciente(id: number): Observable<any> {
    const url: string = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deletePaciente'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(result as T);
    };
  }
}
