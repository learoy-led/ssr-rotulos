import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNosotrosComponent } from './admin-nosotros.component';

describe('AdminNosotrosComponent', () => {
  let component: AdminNosotrosComponent;
  let fixture: ComponentFixture<AdminNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
