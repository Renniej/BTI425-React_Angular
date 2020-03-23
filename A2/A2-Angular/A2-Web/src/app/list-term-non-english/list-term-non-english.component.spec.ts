import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTermNonEnglishComponent } from './list-term-non-english.component';

describe('ListTermNonEnglishComponent', () => {
  let component: ListTermNonEnglishComponent;
  let fixture: ComponentFixture<ListTermNonEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTermNonEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTermNonEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
