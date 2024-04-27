import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddsubjectsComponent } from "./add-subject.component";
describe("BookprojectsComponent", () => {
  let component: AddsubjectsComponent;
  let fixture: ComponentFixture<AddsubjectsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    imports: [AddsubjectsComponent],
}).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
