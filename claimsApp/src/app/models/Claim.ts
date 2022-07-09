export  class Claim{
  claimId!:number;
  description!:string;
  claimRaisedDate!:Date;
  claimSettledDate!:Date|null;
  claimAmount!:number;
  claimStatus!:string;
  remarks!:string
}
