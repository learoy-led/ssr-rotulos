import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsBannerComponent } from './icons-banner.component';

describe('IconsBannerComponent', () => {
  let component: IconsBannerComponent;
  let fixture: ComponentFixture<IconsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
