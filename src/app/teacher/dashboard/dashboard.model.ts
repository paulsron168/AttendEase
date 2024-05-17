export class Allclass {
     
  /*class_Day: string;*/
  subject_name: string;
  class_start	: string;
  class_end: string;
  section: string;
  class_days: string;
  subject_type: string
 
  constructor(allclass: Allclass) {
    {
      this.subject_name = allclass.subject_name || '';
      this.class_start = allclass.class_start   || '';
      this.class_end = allclass.class_end   || '';
      this.section = allclass.section   || '';
      this.class_days = allclass.class_days || '';
      this.subject_type = allclass.subject_type || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}