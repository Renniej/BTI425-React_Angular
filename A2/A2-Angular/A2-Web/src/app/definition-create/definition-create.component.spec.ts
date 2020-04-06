import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionCreateComponent } from './definition-create.component';

describe('DefinitionCreateComponent', () => {
  let component: DefinitionCreateComponent;
  let fixture: ComponentFixture<DefinitionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinitionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
