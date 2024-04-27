import { formatDate } from '@angular/common';

export class Teachers {
  //img: string;
  ID: number;
  TeacherID_Number: number;
  Email_Address: string;
  First_Name: string;
  Middle_Name: string;
  Last_Name: string;
  DOB: string;
  Contact_Number: string;
  Gender: string;

  constructor(teachers: Teachers) {
    {
      this.ID = teachers.ID || this.getRandomID();
      //this.img = teachers.img || 'assets/images/user/user1.jpg';
      this.TeacherID_Number = typeof teachers.TeacherID_Number === 'number' ? teachers.TeacherID_Number : 0; // Default to 0 if not a number
      this.Email_Address = teachers.Email_Address || '';
      this.First_Name = teachers.First_Name || '';
      this.Middle_Name = teachers.Middle_Name || '';
      this.Last_Name = teachers.Last_Name || '';
      this.DOB = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.Contact_Number = teachers.Contact_Number || '';
      this.Gender = teachers.Gender || '';
    }
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
