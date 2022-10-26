import { TestBed } from '@angular/core/testing';

import { NoingresadoGuard } from './noingresado.guard';

describe('NoingresadoGuard', () => {
  let guard: NoingresadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoingresadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
