export class Today {
  id: number;
  updated_by: string;
  updated_datetime: string;
  roster_id: string;
  roster_date: string;
  pin: string;
  

  constructor(today: Today) {
    {
      this.id = today.id;
      // this.updated_by = today.img || 'assets/images/user/usrbig1.jpg';
      this.updated_by = today.updated_by || '';
      this.updated_datetime = today.updated_datetime || '';
      this.roster_id = today.roster_id || '';
      this.roster_date = today.roster_date || '';
      this.pin = today.pin || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
