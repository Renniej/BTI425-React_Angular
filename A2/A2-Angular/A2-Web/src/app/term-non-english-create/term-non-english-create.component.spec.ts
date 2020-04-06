import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermNonEnglishCreateComponent } from './term-non-english-create.component';

describe('TermNonEnglishCreateComponent', () => {
  let component: TermNonEnglishCreateComponent;
  let fixture: ComponentFixture<TermNonEnglishCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermNonEnglishCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermNonEnglishCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
