export class Today {
  id: number;
  img: string;
  name: string;
  Time_in: string;
  subjectCode: string;
  class_Section:string;
  status: string;

  constructor(today: Today) {
    {
      this.id = today.id || this.getRandomID();
      this.img = today.img || 'assets/images/user/usrbig1.jpg';
      this.name = today.name || '';
      this.Time_in = today.Time_in || '';
      this.class_Section = today.class_Section || '';
      this.subjectCode = today.subjectCode || '';
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
