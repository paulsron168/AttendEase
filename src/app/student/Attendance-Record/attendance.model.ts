export class AllAttendance {
     
    /*class_Day: string;*/
    student_fname: string;
    student_lname: string;
    date: Date;
    status: string;
    

     
  
    constructor(allAttendance: AllAttendance) {
      {
     
        this.student_fname = allAttendance.student_fname   || '';
        this. student_lname = allAttendance.student_lname   || '';
        this.date = allAttendance.date  || '';
        this.status = allAttendance.status || '';
        
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }