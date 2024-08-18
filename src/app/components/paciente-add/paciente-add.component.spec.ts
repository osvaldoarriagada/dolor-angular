import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAddComponent } from './paciente-add.component';

describe('PacienteAddComponent', () => {
  let component: PacienteAddComponent;
  let fixture: ComponentFixture<PacienteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
