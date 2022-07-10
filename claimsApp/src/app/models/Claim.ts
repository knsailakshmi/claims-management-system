import {Policy} from "./Policy";

export  interface Claim{
  claimId:number
  description:string
  claimRaisedDate:Date
  claimSettledDate:Date|null
  claimAmount:number
  claimStatus:string
  remarks:string
  policy:Policy
}
