import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastBPage } from './past-b.page';

describe('PastBPage', () => {
  let component: PastBPage;
  let fixture: ComponentFixture<PastBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastBPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
