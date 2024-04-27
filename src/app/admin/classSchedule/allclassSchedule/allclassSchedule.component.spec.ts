import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllclassScheduleComponent } from "./allclassSchedule.component";
describe("AllclassScheduleComponent", () => {
  let component: AllclassScheduleComponent;
  let fixture: ComponentFixture<AllclassScheduleComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllclassScheduleComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllclassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
