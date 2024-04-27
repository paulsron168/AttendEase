import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllteachersComponent } from "./allteachers.component";
describe("AllemployeesComponent", () => {
  let component: AllteachersComponent;
  let fixture: ComponentFixture<AllteachersComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllteachersComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllteachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
