export class Allsubjects {
     
    subject: string;
    description: string;
     
  
    constructor(allsubjects: Allsubjects) {
      {
     
        this.subject = allsubjects.subject || '';
        this.description = allsubjects.description || '';
        
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }