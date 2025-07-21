import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsAnimationComponent } from './keywords-animation.component';

describe('KeywordsAnimationComponent', () => {
  let component: KeywordsAnimationComponent;
  let fixture: ComponentFixture<KeywordsAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordsAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordsAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
