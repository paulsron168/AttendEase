export class Settings {
  id: number;
  img: string;
  name: string;
  email: string;
  role: string;
  mobile: string;
  department: string;
  project: string;
  constructor(settings: Settings) {
    {
      this.id = settings.id || this.getRandomID();
      this.img = settings.img || 'assets/images/user/user1.jpg';
      this.name = settings.name || '';
      this.email = settings.email || '';
      this.role = settings.role || '';
      this.mobile =settings.mobile || '';
      this.department = settings.department || '';
      this.project = settings.project || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
