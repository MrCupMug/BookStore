import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoPageComponent } from './book-info-page.component';

describe('BookInfoPageComponent', () => {
  let component: BookInfoPageComponent;
  let fixture: ComponentFixture<BookInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
