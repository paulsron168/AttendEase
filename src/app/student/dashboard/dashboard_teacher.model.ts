export class Allteachers {
     
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    uploadimage: Blob;
    color: string;
    
     
  
    constructor(allteachers: Allteachers) {
      {
     
        this.First_Name = allteachers.First_Name  || '';
        this.Middle_Name = allteachers.Middle_Name  || '';
        this.Last_Name = allteachers.Last_Name || '';
        this.uploadimage = allteachers.uploadimage || '';
        this.color = allteachers.color || '';
     
     
        
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }