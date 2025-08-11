import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCatalogueComponent } from './download-catalogue.component';

describe('DownloadCatalogueComponent', () => {
  let component: DownloadCatalogueComponent;
  let fixture: ComponentFixture<DownloadCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
