import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGenreFormComponent } from './custom-genre-form.component';

describe('CustomGenreFormComponent', () => {
  let component: CustomGenreFormComponent;
  let fixture: ComponentFixture<CustomGenreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomGenreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
