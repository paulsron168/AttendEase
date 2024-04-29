import { formatDate } from '@angular/common';

export class Students {
  //img: string;
  id: number;
  id_number: number;
  email_address: string;
  firstname: string;
  middlename: string;
  lastname: string;
  date_of_birth: string;
  contact_number: string;
  gender: string;
  student_class_section: string;
  student_class_section_display: string;

  constructor(students: Students) {
    {
      this.id = students.id || this.getRandomID();
      //this.img = students.img || 'assets/images/user/user1.jpg';
      this.id_number = typeof students.id_number === 'number' ? students.id_number : 0; // Default to 0 if not a number
      this.email_address = students.email_address || '';
      this.firstname = students.firstname || '';
      this.middlename = students.middlename || '';
      this.lastname = students.lastname || '';
      this.date_of_birth = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.contact_number = students.contact_number || '';
      this.gender = students.gender || '';
      this.student_class_section = students.student_class_section || '';
      this.student_class_section_display = students.student_class_section || '';
    }
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
