import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';

import { MatSnackBarModule } from '@angular/material/snack-bar';

xdescribe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [ErrorInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
