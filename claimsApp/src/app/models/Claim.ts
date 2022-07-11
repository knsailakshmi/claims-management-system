import {Policy} from "./Policy";

export  interface Claim{
  claimId:number
  description:string
  claimRaisedDate:string
  claimSettledDate:string|null
  claimAmount:number
  claimStatus:string
  remarks:string
  policy:Policy
  memberId:number
}
