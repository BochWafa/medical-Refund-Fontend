export class HealthProfessional {

 centerName: string;
 address: string;
 type: string;
 active: boolean;
 specialite: string;


  constructor(centerName: string, address: string, type: string, active: boolean, specialite: string) {
    this.centerName = centerName;
    this.address = address;
    this.type = type;
    this.active = active;
    this.specialite = specialite;
  }
}
