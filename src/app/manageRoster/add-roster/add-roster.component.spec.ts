import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddRosterComponent } from "./add-roster.component";
describe("AddRosterComponent", () => {
  let component: AddRosterComponent;
  let fixture: ComponentFixture<AddRosterComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AddRosterComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
