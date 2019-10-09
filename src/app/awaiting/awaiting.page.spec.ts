import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingPage } from './awaiting.page';

describe('AwaitingPage', () => {
  let component: AwaitingPage;
  let fixture: ComponentFixture<AwaitingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
