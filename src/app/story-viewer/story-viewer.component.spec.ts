import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryViewerComponent } from './story-viewer.component';

describe('StoryViewerComponent', () => {
  let component: StoryViewerComponent;
  let fixture: ComponentFixture<StoryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
