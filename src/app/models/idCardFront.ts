export class IdCardFront{
  Surname: string;
  Name: string;
  Fathername: string;
  Birthdate: string;
  Iin: string;

  constructor(response:any){
      this.Surname = response.Surname;
      this.Name = response.Name;
      this.Fathername = response.Fathername;
      this.Birthdate = response.Birthdate;
      this.Iin = response.Iin;
  }
}
