export class Today {
  id: number;
  img: string;
  name: string;
  time_in: string;
  status: string;
  student_id: string;
  code: string;
  email: string;
  

  constructor(today: Today) {
    {
      this.id = today.id || this.getRandomID();
      this.img = today.img || 'assets/images/user/usrbig1.jpg';
      this.name = today.name || '';
      this.student_id = today.student_id || '';
      this.time_in = today.time_in || '';
      this.code = today.code || '';
      this.email = today.email || '';
      this.status = today.status || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
