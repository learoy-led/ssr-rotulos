import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImagenesComponent } from './admin-imagenes.component';

describe('AdminImagenesComponent', () => {
  let component: AdminImagenesComponent;
  let fixture: ComponentFixture<AdminImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminImagenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
