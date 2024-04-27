export class Today {
  id: number;
  img: string;
  name: string;
  time_in: string;
  subject: string;
  date: string;
  status: string;
  

  constructor(today: Today) {
    {
      this.id = today.id || this.getRandomID();
      this.img = today.img || 'assets/images/user/usrbig1.jpg';
      this.name = today.name || '';
      this.time_in = today.time_in || '';
      this.subject = today.subject || '';
      this.date = today.date || '';
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
