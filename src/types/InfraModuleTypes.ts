import {CityMasterOutput, CountryMasterOutput, LocationMasterOutput} from './AdminModuleTypes'

export interface SeatMasterInput {
  seats: string
  country: string
  location: string
  city: string
  cost: string
  active: string
}

export interface SeatMasterOutput {
  data: {
    active: boolean
    city: CityMasterOutput['data'][number]
    cost: number
    country: CountryMasterOutput['data'][number]
    id: string
    location: LocationMasterOutput['data'][number]
    seat: number
  }[]
}

export interface TransportMasterInput {
  country: string
  city: string
  cost: string
}

export interface TransportMasterOutput {
  data: {
    city: CityMasterOutput['data'][number]
    cost: number
    country: CountryMasterOutput['data'][number]
    id: string
  }[]
}
