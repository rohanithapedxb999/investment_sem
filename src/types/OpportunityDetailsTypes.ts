import {APIStatusType, SelectValueType} from './OtherTypes'

export interface OpportunityDetails extends APIStatusType {
  data: {
    account: {id: string; name: string}
    accountOwner: {id: string; name: string}
    acv: string
    addonToExistingProcess: boolean
    opportunityPrice: string
    approval: string
    category: string
    cisReleaseDate: string
    commercialFinalizeDate: string
    commercialManager: {id: string; firstName: string; lastName: string}
    deliveryManager: {id: string; firstName: string; lastName: string}
    bidManager: {id: string; firstName: string; lastName: string}
    contractManager: {id: string; firstName: string; lastName: string}
    c4cStatus: string
    closedDate: string
    cluster: {id: string; name: string}
    clusterCode: string
    commercialRevenueModel: string
    competitorInfo: string
    country: {id: string; name: string}
    createdBy: string
    createdOn: string
    currency: {id: string; name: string; code: string; symbol: string; cost: string}
    daysInSalePhase: string
    dueDateCommercials: string
    enagagementModel: {id: string; name: string}
    expectedValue: number
    forecastCategory: string
    id: string
    isBidRequired: boolean
    isPhonixOpportunity: boolean
    source: string
    name: string
    noOfMonths: string
    opportunityClass: string
    opportunityCode: string
    opportunityType: string
    bidNotRequiredRemark: string
    bidSubmissionDate: string
    partnerCategory: string
    partnerRequired: boolean
    pricingModel: string
    partners: {id: string; name: string}[]
    primaryContact: string
    primarySolutionManager: {
      id: string
      firstName: string
      lastName: string
    }
    accountManager: {
      id: string
      firstName: string
      lastName: string
    }
    probabilty: number
    productId: string
    opportunityTctsProduct: {
      tctsProduct: {
        id: string

        levelFirst: string
        levelSecond: string
        levelThird: string
      }
      revenuePercentage: string
      id: string
    }[]
    progress: string
    publishToForecast: boolean
    reasonOfPartnerRejection: string
    territoryOwner: string
    requiredResources: Array<string>
    revenueEndDate: string
    revenueStartDate: string
    salePhase: string
    salesManager: {
      id: string
      firstName: string
      lastName: string
    }
    salesOrg: string
    secondarySolutionManager: {
      cluster: {id: string; name: string}
      id: string
      firstName: string
      lastName: string
    }[]
    specialApproval: string
    status: string
    scope: string
    tasks: Array<string>
    tcv: string
    unitOfMeasure: string
    winLossDropRemark: string
    winProbability: number
  }
}
export interface DashboardOpportunityDetails extends APIStatusType {
  data: {
    accountName: string
    accountOwnerName: string
    clusterName: string
    countryName: string
    closedDate: string
    id: string
    name: string
    opportunityCode: string
    opportunityUsers: {
      id: string
      ownership: string
      user: {id: string; firstName: string; lastName: string}
    }[]
    status: string
  }[]
}

export interface OpportunityInput {
  PartnerRequired: string
  dueDateCommercial: string
  AddonToExistingProcess: string
  PrimarySolutionManager: SelectValueType
  CommercialManager: SelectValueType
  DeliveryManager: SelectValueType
  opportunityClass: SelectValueType
  country: SelectValueType
  bidManager: SelectValueType
  contractManager: SelectValueType
  bidRequired: string
  bidSubmissionDate: string
  scope: string
  noOfMonths: string
}
