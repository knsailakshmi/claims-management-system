export interface ClaimRequest{
  memberId:number;
  policyId:number;
  policyName:string;
  policyProvider:string;
  policyStartDate:Date;
  policyEndDate:Date;
  policyDescription:string;
  claimDescription:string;
  claimRaisedDate:string|null;
  claimSettledDate:string;
  claimAmount:number;
  claimStatus:string;
  remarks:string|null;
}
