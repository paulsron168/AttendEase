import { formatDate } from '@angular/common';

export class ManageRoster {
  //img: string;
  rosterID: number;
  classRoster_ID: number;
  major: string;
  year_level: string;
  subjectCode: string;
  TeacherID_Number: string;
  class_Start: string;
  class_End: string;
  class_Day: string;
  class_Section: any;
  
  constructor(manageRoster: ManageRoster) {
    {
      this.rosterID = manageRoster.rosterID || this.getRandomID();
      //this.img = students.img || 'assets/images/user/user1.jpg';
      this.classRoster_ID = typeof manageRoster.classRoster_ID  === 'number' ?manageRoster.classRoster_ID : 0; // Default to 0 if not a number
      this.major = manageRoster.major || '';
      this.year_level = manageRoster.year_level || '';
      this.subjectCode = manageRoster.subjectCode || '';
      this.TeacherID_Number = manageRoster.TeacherID_Number || '';
      this.class_Start =  manageRoster.class_Start || '';
      this. class_End = manageRoster. class_End || '';
      this.class_Day = manageRoster.class_Day || '';
     
    }
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
