import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedVerticalCarouselComponent } from './animated-vertical-carouesel.component';

describe('AnimatedVerticalCaroueselComponent', () => {
  let component: AnimatedVerticalCarouselComponent;
  let fixture: ComponentFixture<AnimatedVerticalCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedVerticalCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedVerticalCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
