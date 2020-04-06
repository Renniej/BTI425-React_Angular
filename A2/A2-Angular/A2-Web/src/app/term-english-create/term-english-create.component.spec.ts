import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermEnglishCreateComponent } from './term-english-create.component';

describe('TermEnglishCreateComponent', () => {
  let component: TermEnglishCreateComponent;
  let fixture: ComponentFixture<TermEnglishCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermEnglishCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermEnglishCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
