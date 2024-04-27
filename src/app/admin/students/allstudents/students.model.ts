import { formatDate } from '@angular/common';

export class Students {
  //img: string;
  ID: number;
  StudentID_Number: number;
  Email_Address: string;
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  DOB: string;
  Contact_Number: string;
  Gender: string;
  class_Section: string;

  constructor(students: Students) {
    {
      this.ID = students.ID || this.getRandomID();
      //this.img = students.img || 'assets/images/user/user1.jpg';
      this.StudentID_Number = typeof students.StudentID_Number === 'number' ? students.StudentID_Number : 0; // Default to 0 if not a number
      this.Email_Address = students.Email_Address || '';
      this.First_Name = students.First_Name || '';
      this.Middle_Name = students.Middle_Name || '';
      this.Last_Name = students.Last_Name || '';
      this.DOB = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.Contact_Number = students.Contact_Number || '';
      this.Gender = students.Gender || '';
      this.class_Section = students.class_Section || '';
    }
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
