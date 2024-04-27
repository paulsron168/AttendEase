import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllstudentComponent } from "./all-students.component";
describe("AllstudentComponent", () => {
  let component: AllstudentComponent;
  let fixture: ComponentFixture<AllstudentComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllstudentComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
