import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoboRenderComponent } from './gobo-render.component';

describe('GoboRenderComponent', () => {
  let component: GoboRenderComponent;
  let fixture: ComponentFixture<GoboRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoboRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoboRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
