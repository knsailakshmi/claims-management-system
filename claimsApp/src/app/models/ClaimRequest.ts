export interface ClaimRequest{
  memberId:number;
  policyId:number;
  policyName:string;
  policyProvider:string;
  policyStartDate:string|null;
  policyEndDate:string|null;
  policyDescription:string;
  claimDescription:string;
  claimRaisedDate:string|null;
  claimSettledDate:string|null;
  claimAmount:number;
  claimStatus:string;
  remarks:string|null;
}
