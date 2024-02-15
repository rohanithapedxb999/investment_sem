import {APIStatusType} from './OtherTypes'

export interface ProspectInputType {
  gender: string
  status: string | null
  operationalStatus: string | null
  assignedBy: string | null
  nationality: string | null | undefined
  occupationDesc: string
  occupation: string
  firstName: string
  lastName: string
  contactNo: string
  email: string
  referal: string
  addressLine1: string
  probability: string
  addressLine2: string
  country: string
  state: string
  city: string
  dob: string
  maritalStatus: string
  politicalExposure: string
  riskAppetite: string
  pin: string
  alternateMobileNo: string
  tentativeAmount: string
  tentativeFollowUpDate: string
  existingFollowUpDate: string | null
  referalType: string
  statusName: string | null
  middleName: string
  fatherName: string
  motherName: string
  maidenName: string
  cityOfBirth: string
  countryOfBirth: string
  isNRI: string
  comment: string | null
  sourceName: string
  currentUserId: string | null
}

export interface ProspectOutput extends APIStatusType {
  data: {
    clientProduct: {
      product: {
        endDate: string
        amount: string
        id: string
        product: {id: string}
        startDate: string
        status: {name: string; code: string}
        subCategory: string
        profitPercent: string
        companyFee: string
        profitAmount: string
        type: string
        parentId: {id: string} | null
        profitPlan: string
        clientProductRenewal: {
          renewalDate: string
          status: {name: string; code: string}
          renewalBalance: string
          profitPercent: string
          id: string | null
        }[]
      }[]
      productDetails: {
        productName: string
        category: string
        subCategory: string
        ticketSize: string
        totalTicketSize: string
        profitPlan: string
        profitPercent: string
        productsTicketSize: {
          subCategory: string
          ticketSize: string
          serial: number
        }[]
      }
    }[]
    addressLine1: string
    addressLine2: string
    age: string
    alternateMobileNo: string
    city: {name: string}
    country: {name: string}
    dob: string
    email: string
    existingReferal: {firstName: string | null; lastName: string | null; mobileNo: string | null}
    firstName: string
    gender: string
    id: string
    lastName: string
    maritalStatus: string
    mobileNo: string
    nationality: string
    newReferal: {firstName: string | null; lastName: string | null; mobileNo: string | null}
    occupation: {name: string}
    occupationDesc: string
    pin: string
    politicalExposure: string
    probability: string
    riskAppetite: string
    state: {name: string}
    tentativeAmount: string
    tentativeFollowUpDate: string
    assignedBy: {firstName: string; lastName: string}
    status: string
    operationalStatus: string
    comments: []
  }[]
}
export interface SalestInputType {
  documents: {
    id: string | null
    documentType: string
    fileName: File | null
    otherDocumentType: string
    remark: string
  }[]
  nominations: {
    id: string | null
    percentage: string
    firstName: string
    lastName: string
    guardianRelation: string
    address: string
    relation: string
    isAddressSame: boolean
    guardianContactNo: string
    dob: string
    nomineePanCard: File | null
    guardianFirstName: string
    guardianLastName: string
    guardianAddress: string
  }[]
  aadharNo: string
  panNo: string
  aadharDocument: File | null
  panDocument: File | null
  investmentGoal: string
  investmentHorizon: string
  annualIncome: string
  currentWorth: string
  currentHoldinginEquity: string
  currentHoldinginDebt: string
  immediateFinanceNeeds: string
  products: {
    product: {
      id: string | null
      startDate: string
      endDate: string
      status: string
      amount: string
      isDisable: boolean
      isStatusDisable: boolean
      subCategory: string
      profitPercent: string
      companyFee: string
      profitPlan: string
      isNew: boolean
      type: string
      parentId: string | null
      renewalData: {
        renewalDate: string
        status: string
        renewalBalance: string
        profitPercent: string
        id: string | null
        isDisabled: boolean
      }[]
    }[]
    productId: string
  }[]
  riskQ1: string
  riskQ2: string
  riskQ3: string
  riskQ4: string
  riskQ5: string
  riskQ6: string
  riskQ7: string
  riskQ8: string
  isTaxResidencyOtherThanIndia: string
  taxResidencyCountry: string
  taxIdentificationNo: string
  taxIdentificationDoc: File | null
  addressProofDoc: File | null
  cancelledCheque: File | null
  photo: File | null
  birthCertificate: File | null
  overseasAddressProof: File | null
  passport: File | null
  visa: File | null
  immigration: File | null
  pioCard: File | null
  sourceOfIncome: string
}
