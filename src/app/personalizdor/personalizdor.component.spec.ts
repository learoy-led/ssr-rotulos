import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizdorComponent } from './personalizdor.component';

describe('PersonalizdorComponent', () => {
  let component: PersonalizdorComponent;
  let fixture: ComponentFixture<PersonalizdorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizdorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizdorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
