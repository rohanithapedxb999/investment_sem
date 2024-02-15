import {CountryMasterOutput} from './AdminModuleTypes'
import {APIStatusType} from './OtherTypes'

export interface ITMasterInput {
  resourceName: string
  description: string
  cost: string
  resourceType: string
  componentName: string
}

export interface ITMasterOutput extends APIStatusType {
  data: {
    cost: number
    description: string
    id: string
    name: string
    type: string
    component: string
    country: CountryMasterOutput['data'][number]
  }[]
}
export interface ReimbursementMasterInput {
  country: string
  Cost: string
  reimbursementType: string
}

export interface ReimbursementMasterOutput extends APIStatusType {
  data: {
    country: CountryMasterOutput['data'][number]
    id: string
    cost: number
    reimbursement: string
    type: string
  }[]
}

export interface ConnectivityMasterInput {
  serviceName: string
  cost: string
  costType: string
}

export interface ConnectivityMasterOutput {
  id: string
  cost: number
  name: string
  type: string
}
