import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastbookingsPage } from './pastbookings.page';

describe('PastbookingsPage', () => {
  let component: PastbookingsPage;
  let fixture: ComponentFixture<PastbookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastbookingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastbookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
