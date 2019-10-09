import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfPage } from './prof.page';

describe('ProfPage', () => {
  let component: ProfPage;
  let fixture: ComponentFixture<ProfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
