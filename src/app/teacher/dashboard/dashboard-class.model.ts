export class Allclass {
     
  class_Day: string;
  classStart_Time	: string;
  classEnd_Time: string;
  class_Section: string;
   

  constructor(allclass: Allclass) {
    {
   
      this.class_Day = allclass.class_Day   || '';
      this.classStart_Time = allclass.classStart_Time   || '';
      this.classEnd_Time = allclass.classEnd_Time   || '';
      this.class_Section = allclass.class_Section   || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}