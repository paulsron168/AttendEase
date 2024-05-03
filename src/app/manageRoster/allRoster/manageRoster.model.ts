import { formatDate } from '@angular/common';

export class ManageRoster {
  //img: string;
  id: number;
  schedule_id: number;
  subject_name: string;
  subject_major: string;
  subject_type: string;
  class_days: string;
  class_start: string;
  class_end: string;
  teacher_id: number;
  teacher_name: string;
  section: string;
  
  constructor(manageRoster: ManageRoster) {
    {
      this.id = manageRoster.id;
      this.schedule_id = manageRoster.schedule_id;
      this.subject_name = manageRoster.subject_name;
      this.subject_major = manageRoster.subject_major;
      this.subject_type = manageRoster.subject_type;
      this.class_days = manageRoster.class_days;
      this.class_start = manageRoster.class_start;
      this.class_end = manageRoster.class_end;
      this.teacher_id = manageRoster.teacher_id;
      this.teacher_name = manageRoster.teacher_name;
      this.section = manageRoster.section;

    }
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
