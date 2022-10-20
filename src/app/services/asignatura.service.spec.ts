import { TestBed } from '@angular/core/testing';

import { AsignaturasService } from '../services/asignatura.service';

describe('AsignaturaService', () => {
  let service: AsignaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
