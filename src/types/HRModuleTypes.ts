import {CountryMasterOutput} from './AdminModuleTypes'
import {APIStatusType} from './OtherTypes'

export interface JobFamilyMasterInput {
  jobName: string
}

export interface JobFamilyMasterOuput extends APIStatusType {
  data: {id: string; name: string}[]
}

export interface BandMasterInput {
  bandName: string
}

export interface BandMasterOutput extends APIStatusType {
  data: {id: string; name: string}[]
}

export interface NSAMasterInput {
  country: string
  cost: string
}

export interface NSAMasterOutput extends APIStatusType {
  data: {id: string; monthly: number; country: CountryMasterOutput['data'][number]}[]
}
export interface SalaryMasterInput {
  Level: string
  JobFamily: string
  Country: string
  Hourly: string
  Monthly: string
  Yearly: string
  Fringe: string
  SalaryType: string
}

export interface SalaryMasterOutput {
  data: {
    band: BandMasterOutput['data'][number]
    country: CountryMasterOutput['data'][number]
    fringePercentage: number
    hourly: number
    id: string
    jobFamily: JobFamilyMasterOuput['data'][number]
    monthly: number
    yearly: number
  }[]
}
export interface CallAllowanceMasterInput {
  country: string
  cost: string
}

export interface CallAllowanceMasterOutput extends APIStatusType {
  data: {id: string; monthly: number; country: CountryMasterOutput['data'][number]}[]
}

export interface ShiftAllowanceMasterInput {
  country: string
  cost: string
}

export interface ShiftAllowanceMasterOutput extends APIStatusType {
  data: {id: string; monthly: number; country: CountryMasterOutput['data'][number]}[]
}

export interface OtherAllowanceMasterInput {
  country: string
  offRoleCost: string
  onRoleCost: string
  componentName: string
  frequency: string
}

export interface OtherAllowanceMasterOutput extends APIStatusType {
  data: {
    country: CountryMasterOutput
    fequency: string
    id: string
    name: string
    offRoll: number
    onRoll: number
  }[]
}

export interface ConfigurationsMasterInput {
  country: string
  value: string
  componentName: {value: string; unit: string; displayUnit: string}
}

export interface ConfigurationsMasterOutput extends APIStatusType {
  data: {
    country: CountryMasterOutput['data'][number]
    id: string
    option: string
    unit: string
    value: string
  }[]
}
