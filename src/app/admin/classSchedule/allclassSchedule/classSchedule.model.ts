export class ClassSchedule {
  id: number;
  class_days: string;
  class_start: string; // Assuming time in Philippines time format (e.g., "07:00 AM")
  class_end: string;   // Assuming time in Philippines time format (e.g., "08:00 AM")
  class_room: string;
  class_subject: string;
  class_section: string;
 
 
 

  constructor(classSchedule: ClassSchedule) {
    this.id = classSchedule.id;
    this.class_days = classSchedule.class_days || '';
    this.class_start = classSchedule.class_start || '';
    this.class_end = classSchedule.class_end || '';
    this.class_subject = classSchedule.class_subject || '';
    this.class_section = classSchedule.class_section || '';
    this.class_room = classSchedule.class_room || '';
 
   
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }  
}
