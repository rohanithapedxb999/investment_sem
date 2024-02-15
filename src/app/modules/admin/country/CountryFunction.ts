import {Message} from '../../../../_metronic/helpers'
import {getCountryById} from '../../../../api/AdminAPI'
import {CountryMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'

export const getCountriesByID = (
  id: string,
  formField: CountryMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function
) => {
  getCountryById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        countryName: res?.data?.name ?? '',
        isPopular: res?.data?.isPopular ?? '',
      })
      setEditId(id)
      setInputError({})
      document.getElementById('countryName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: CountryMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^([a-z]+(\s{1})?)+[a-z]+$/i
  if (!formField.countryName.trim()) {
    error.countryName = 'Country Name is required'
    cnt = cnt + 1
  } else {
    if (formField.countryName.replaceAll(' ', '').length <= 1) {
      cnt = cnt + 1
      error.countryName = 'Country Name must be greater than 1 characters'
    } else {
      if (!alphaRegex.test(formField.countryName.trim())) {
        cnt = cnt + 1
        error.countryName = 'Only letters (a-z,A-Z) and a single space are allowed.'
      } else {
        if (formField.countryName.replaceAll(' ', '').length > 60) {
          cnt = cnt + 1
          error.countryName = 'Country Name should not be greater than 60 characters'
        }
      }
    }
  }

  return {error, cnt}
}

export const countryTableHeaderData: TableHeaderDataType[] = [
  {
    th: {
      id: 'name',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Country',
  },

  {
    th: {
      id: 'isPopular',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Popular',
  },
  {
    th: {
      id: 'actions',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Actions',
    justifyContent: 'end',
    isSortable: false,
  },
]
