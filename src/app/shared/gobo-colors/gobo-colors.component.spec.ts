import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoboColorsComponent } from './gobo-colors.component';

describe('GoboColorsComponent', () => {
  let component: GoboColorsComponent;
  let fixture: ComponentFixture<GoboColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoboColorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoboColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
