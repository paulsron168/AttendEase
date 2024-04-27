export class Allsubjects {
  subjectID: number;
  subjectCode: string;
  subject: string;
  description: string;
  units: string;
  major: string;
  year_level: string;
  type: string;
  ID: any;
  
  constructor(allsubjects: Allsubjects) {
    {
      this.subjectID = allsubjects.subjectID || this.getRandomID();
      this.subjectCode = allsubjects.subjectCode || '';
      this.subject = allsubjects.subject || '';
      this.description = allsubjects.description || '';
      this.major = allsubjects.major || '';
      this.units = allsubjects.units || '';
      this.year_level = allsubjects.year_level || '';
      this.type = allsubjects.type || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
