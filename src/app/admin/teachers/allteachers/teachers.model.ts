import { formatDate } from '@angular/common';

export class Teachers {
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

  constructor(teachers: Teachers) {
    {
      this.id = teachers.id || this.getRandomID();
      //this.img = teachers.img || 'assets/images/user/user1.jpg';
      this.id_number = typeof teachers.id_number === 'number' ? teachers.id_number : 0; // Default to 0 if not a number
      this.email_address = teachers.email_address || '';
      this.firstname = teachers.firstname || '';
      this.middlename = teachers.middlename || '';
      this.lastname = teachers.lastname || '';
      this.date_of_birth = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.contact_number = teachers.contact_number || '';
      this.gender = teachers.gender || '';
    }
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
