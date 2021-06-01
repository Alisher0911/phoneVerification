export class IdCardBack{
    Id: string;
    IssuingAuthority: string;
    DateOfIssue: string;
    DateOfValidity: string;

    constructor(response:any){
        this.Id = response.Id;
        this.IssuingAuthority = response.IssuingAuthority;
        this.DateOfIssue = response.DateOfIssue;
        this.DateOfValidity = response.DateOfValidity;
    }
}
