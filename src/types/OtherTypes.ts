import {ThHTMLAttributes} from 'react'

export interface SelectValueType {
  value: string
  label: string
  disabled?: boolean
  group?: string
}

export interface APIStatusType {
  loading: boolean
  error: null | string
  queryData: QueryParams | null
}

export interface SubmitAPIStatusType {
  loading: boolean
}

export interface InputErrorType {
  [key: string]: string
}

export interface MasterDashboardDataType extends APIStatusType {
  data: {
    [key: string]: string | Array<string>
  }
}

export interface RoleContextValue {
  state: string
  module: string[]
  features: string[]
  updateState: (state: string, modules: string[], features: string[]) => void
}

export interface APIResponse {
  data:
    | any
    | {
        page: number
        result: any
        sort: string
        sortBy: string
        take: string
        total: string
      }
  message: string
  statusCode: number
}

export interface ActivityAPIOutput extends APIStatusType {
  data: {
    content: string
    created_at: string
    created_by: string
    fte: null
    id: string
    master: null
    module: string
    opportunity: string
  }[]
}

export interface TableHeaderDataType {
  th: ThHTMLAttributes<HTMLTableCellElement>
  text: string
  isSortable?: boolean
  justifyContent?: string
}

export interface QueryParams {
  page: number
  sort: string
  sortBy: string
  take: string
  total: string
  search: string
}

export interface CommonApiDataType extends APIStatusType {
  data: ({result: any} & QueryParams) | null
}

export interface C4CDataType {
  code: string
  createdAt: string
  field: string
  id: string
  name: string
  updatedAt: string
}
