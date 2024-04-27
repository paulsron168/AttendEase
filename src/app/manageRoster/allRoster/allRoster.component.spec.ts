import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AllRosterComponent } from "./allRoster.component";
describe("FormControlsComponent", () => {
  let component: AllRosterComponent;
  let fixture: ComponentFixture<AllRosterComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AllRosterComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AllRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
