import { TestBed, async, inject } from '@angular/core/testing';

import { LoginaccGuard } from './loginacc.guard';

describe('LoginaccGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginaccGuard]
    });
  });

  it('should ...', inject([LoginaccGuard], (guard: LoginaccGuard) => {
    expect(guard).toBeTruthy();
  }));
});
