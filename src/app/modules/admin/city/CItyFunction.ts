import {Message} from '../../../../_metronic/helpers'
import {getCitiesById} from '../../../../api/AdminAPI'
import {CityMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'
import {getStateDataByCountry} from '../../../CommonFunctions'

export const getCityByID = (
  id: string,
  formField: CityMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setState: Function
) => {
  getCitiesById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      getStateDataByCountry(res?.data?.state?.country?.id ?? '', setState)
      setFormField({
        ...formField,
        cityName: res?.data?.name ?? '',
        country: res?.data?.state?.country?.id ?? '',
        state: res?.data?.state?.id ?? '',
      })
      setEditId(id)
      setInputError({})
      document.getElementById('cityName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: CityMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^([a-z]+(\s{1})?)+[a-z]*$/i
  if (!formField.country) {
    cnt = cnt + 1
    error.country = 'Country is required'
  }

  if (!formField.state) {
    cnt = cnt + 1
    error.state = 'State is required'
  }
  if (!formField.cityName.trim()) {
    error.cityName = 'City Name is required'
    cnt = cnt + 1
  } else {
    if (formField.cityName.replaceAll(' ', '').length <= 1) {
      cnt = cnt + 1
      error.cityName = 'City Name must be greater than 1 characters'
    } else {
      if (!alphaRegex.test(formField.cityName.trim())) {
        cnt = cnt + 1
        error.cityName = 'Only letters (a-z,A-Z) and a single space are allowed.'
      }
    }
  }

  return {error, cnt}
}

export const cityTableHeaderData: TableHeaderDataType[] = [
  {
    th: {
      id: 'country',
      style: {
        minWidth: '100px',
        width: '110px',
      },
    },
    text: 'Country',
  },
  {
    th: {
      id: 'state',
      style: {
        minWidth: '100px',
        width: '110px',
      },
    },
    text: 'State',
  },
  {
    th: {
      id: 'name',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'City',
  },
  {
    th: {
      id: 'actions',
      style: {
        width: '100px',
        minWidth: '70px',
      },
    },
    text: 'Actions',
    justifyContent: 'end',
    isSortable: false,
  },
]
