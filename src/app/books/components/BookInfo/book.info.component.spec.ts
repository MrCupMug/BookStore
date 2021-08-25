import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWindowsComponent } from './book.info.component';

describe('DialogWindowsComponent', () => {
  let component: DialogWindowsComponent;
  let fixture: ComponentFixture<DialogWindowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
