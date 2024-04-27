export class ClassSchedule {
  ID: number;
  class_ID: number;
  class_Day: string;
  class_Start: string; // Assuming time in Philippines time format (e.g., "07:00 AM")
  class_End: string;   // Assuming time in Philippines time format (e.g., "08:00 AM")
  class_Section: string;
  room: string;
 
 
 

  constructor(classSchedule: ClassSchedule) {
    this.ID = classSchedule.ID || this.getRandomID();
    this.class_ID = typeof classSchedule.class_ID === 'number' ? classSchedule.class_ID : 0;
    this.class_Day = classSchedule.class_Day || '';
    this.class_Start = classSchedule.class_Start || '';
    this.class_End = classSchedule.class_End || '';
    this.class_Section = classSchedule.class_Section || '';
    this.room = classSchedule.room || '';
 
   
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }  
}
