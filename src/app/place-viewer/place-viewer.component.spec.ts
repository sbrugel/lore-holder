import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceViewerComponent } from './place-viewer.component';

describe('PlaceViewerComponent', () => {
  let component: PlaceViewerComponent;
  let fixture: ComponentFixture<PlaceViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
