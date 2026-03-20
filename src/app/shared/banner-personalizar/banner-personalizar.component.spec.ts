import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPersonalizarComponent } from './banner-personalizar.component';

describe('BannerPersonalizarComponent', () => {
  let component: BannerPersonalizarComponent;
  let fixture: ComponentFixture<BannerPersonalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerPersonalizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerPersonalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
