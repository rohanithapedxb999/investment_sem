import {BandMasterOutput} from './HRModuleTypes'
import {APIStatusType, SelectValueType} from './OtherTypes'

export interface CurrencyMasterInput {
  currencyName: string
  currencyCode: string
  conversationRate: string
}

export interface CurrencyMasterOutput extends APIStatusType {
  data: {code: string; exchangeRate: number; id: string; name: string}[]
}

export interface ClusterMasterOutput extends APIStatusType {
  data: {id: string; name: string; code: string}[]
}

export interface CountryMasterInput {
  countryName: string
  currency: string
  isPopular: boolean
}

export interface CountryMasterOutput extends APIStatusType {
  data: {
    id: string
    name: string
    currency: CurrencyMasterOutput['data'][number]
    isPopular: boolean
  }[]
}

export interface JobFamilyRoleMasterInput {
  jobFamilyRoleName: string
  band: string
  jobFamily: string
}

export interface JobFamilyRoleMasterOutput extends APIStatusType {
  data: {
    id: string
    name: string
    band: BandMasterOutput['data'][number]
    jobFamily: JobFamilyRoleMasterOutput['data'][number]
  }[]
}

export interface LocationMasterInput {
  locationName: string
  country: string
  city: string
}

export interface LocationMasterOutput extends APIStatusType {
  data: {city: CityMasterOutput['data'][number]; id: string; name: string}[]
}

export interface ProductMasterInput {
  category: string
  subCategory: string
  productName: string
  profitPlan: string
  profitPer: string
  productTicketSize: {subCategory: string; ticketSize: string,serial:number}[]
}

export interface OccupationMasterInput {
  occupationName: string
}

export interface OccupationMasterOuput extends APIStatusType {
  data: {id: string; name: string}[]
}

export interface SourceMasterInput {
  sourceName: string
}

export interface SourceMasterOuput extends APIStatusType {
  data: {id: string; name: string}[]
}


export interface ProductCategoryInput {
  name: string
  category: string | null
}

export interface ProductCategoryOutput extends APIStatusType {
  data: {id: string; name: string}[]
}

export interface ProductCategoryOutput extends APIStatusType {
  data: {id: string; name: string}[]
}
export interface ProductSubCategoryOutput extends APIStatusType {
  data: {id: string; name: string; parent: {id: string; name: string}}[]
}

export interface ProductMasterOutput extends APIStatusType {
  data: {
    id: string
    productName: string
    category: string
    createdAt: string
    updatedAt: string
    profitPlan: string
    profitPercent: string
    subCategory: string
    ticketSize: string
    totalTicketSize: string
    productsTicketSize: {
      id: string
      subCategory: string
      ticketSize: string
      serial: number
    }[]
  }[]
}

export interface TctsProductMasterOutput extends APIStatusType {
  data: {id: string; levelFirst: string; levelSecond: string; levelThird: string; code: string}[]
}

export interface CityMasterInput {
  cityName: string
  country: string
  state: string
}

export interface CityMasterOutput extends APIStatusType {
  data: {
    id: string
    name: string
    state: {name: string; country: CountryMasterOutput['data'][number]}
  }[]
}

export interface StateMasterInput {
  stateName: string
  country: string
}

export interface StateMasterOutput extends APIStatusType {
  data: {id: string; name: string; country: CountryMasterOutput['data'][number]}[]
}

export interface UserMasterInput {
  gender: string
  nationality: string
  contactNo: string
  addressLine1: string
  addressLine2: string
  country: string
  state: string
  city: string
  dob: string
  maritalStatus: string
  pin: string
  alternateMobileNo: string
  firstName: string
  lastName: string
  email: string
  teamLeader: string
  primaryRole: {value: string; module: string}
  secondaryRole: {value: string; module: string}[]
}

export interface CommentMasterInput {
  prospect: {id: string}
  startDate: string
  endDate: string
  comment: string
  user: {id: string}
  secondaryRole: {value: string; module: string}[]
}

export interface CommentMasterOutput extends APIStatusType {
  data: {
    id: string
    prospect: {id: string}
    startDate: string
    endDate: string
    comment: string
    user: {id: string}
    roles: {
      id: string
      type: string
      role: {
        id: string
        name: string
        module: ModuleOutput
      }
    }[]
  }[]
}

export interface UserMasterOutput extends APIStatusType {
  data: {
    createdAt: string
    hash: string
    department: {id: string; name: string}
    email: string
    firstName: string
    id: string
    lastName: string
    roles: {
      id: string
      type: string
      role: {
        id: string
        name: string
        features: {id: string; feature: string}[]
        module: ModuleOutput
      }
    }[]
    addressLine1: string
    addressLine2: string
    age: null | string
    alternateMobileNo: string
    city: {name: string}
    country: {name: string}
    dob: string
    gender: string
    maritalStatus: string
    mobileNo: string
    nationality: string
    occupationDesc: string
    pin: string
    occupation: {name: string}
    politicalExposure: string
    referral: string
    riskAppetite: string
    state: {name: string}
    teamLead: {firstName: string; lastName: string}
  }[]
}

export interface UserMasterRepeaterForm {
  cluster: string
  accountManager: string
  account: string
  country: string
}

export interface UserMasterSelectedDataType {
  country: SelectValueType[]
  accountManager: SelectValueType[]
  account: SelectValueType[]
}

export interface UserMasterRoleData {
  value: string
  module: string
  label: string
}
export interface RoleMasterInput {
  roleName: string
  module: string
}

export interface RoleMasterOutput extends APIStatusType {
  data: {
    id: string
    name: string
    features: {feature: string; name: string; module: ModuleOutput}[]
  }[]
}

export interface ModuleOutput {
  id: string
  name: string
  description: string
}

export interface AccountMasterOuput extends APIStatusType {
  data: {
    accountId: string
    accountOwner: AccountManagerMasterOuput
    cluster: ClusterMasterOutput['data'][number]
    country: CountryMasterOutput['data'][number]
    id: string
    accountCode: string
    name: string
  }[]
}

export interface AccountManagerMasterOuput {
  accountManager: {id: string; name: string}
  id: string
  name: string
  accountOwnerCode: string
}

export interface RoleMasterFeatureType {
  id: string
  feature: string
  name: string
}

export interface RoleMasterFeatureInputType {
  [key: string]: boolean
}
