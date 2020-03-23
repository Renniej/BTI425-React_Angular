import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefinitionsComponent } from './list-definitions.component';

describe('ListDefinitionsComponent', () => {
  let component: ListDefinitionsComponent;
  let fixture: ComponentFixture<ListDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
