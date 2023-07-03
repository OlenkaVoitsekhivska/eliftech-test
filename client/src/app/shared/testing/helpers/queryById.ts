import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const queryById = (fixture: ComponentFixture<any>, id: string) =>
  fixture.debugElement.query(By.css(`[data-testid="${id}"]`)).nativeElement;
