import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTermEnglishComponent } from './list-term-english.component';

describe('ListTermEnglishComponent', () => {
  let component: ListTermEnglishComponent;
  let fixture: ComponentFixture<ListTermEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTermEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTermEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
