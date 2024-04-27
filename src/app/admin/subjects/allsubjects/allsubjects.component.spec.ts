import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsubjectsComponent } from './allsubjects.component';

describe('AllsubjectComponent', () => {
  let component: AllsubjectsComponent;
  let fixture: ComponentFixture<AllsubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AllsubjectsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(AllsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
