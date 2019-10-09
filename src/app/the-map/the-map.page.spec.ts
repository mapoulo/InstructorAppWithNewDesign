import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMapPage } from './the-map.page';

describe('TheMapPage', () => {
  let component: TheMapPage;
  let fixture: ComponentFixture<TheMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
