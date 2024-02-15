import {Message} from '../../../../_metronic/helpers'
import {getLocationsById} from '../../../../api/AdminAPI'
import {LocationMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'
import {getCityDataByCountry} from '../../../CommonFunctions'

export const getLocationByID = (
  id: string,
  formField: LocationMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setCity: Function
) => {
  getLocationsById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        locationName: res?.data?.name ?? '-',
        country: res?.data?.city?.country?.id ?? '',
        city: res?.data?.city?.id ?? '',
      })
      setEditId(id)
      getCityDataByCountry(res.data.city.country.id, setCity)
      setInputError({})
      document.getElementById('locationName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: LocationMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^[a-zA-Z0-9][\w\W]*[a-zA-Z0-9)]+$/
  let invalidCharacters = /[<>:"\\|?*\x00-\x1F~`!@#^+=;'[\]{}%_&$]/
  if (!formField.city) {
    cnt = cnt + 1
    error.city = 'City is Required'
  }

  if (!formField.country) {
    error.country = 'Country is Required'
    cnt = cnt + 1
  }

  if (formField.locationName.trim() === '') {
    cnt = cnt + 1
    error.locationName = 'Location Name is Required'
  } else {
    if (formField.locationName.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.locationName = 'Location Name must be greater than 2 characters'
    } else {
      if (!alphaRegex.test(formField.locationName.trim())) {
        cnt = cnt + 1
        error.locationName =
          'Location name must start with letter or number and end with letter, numbers or )'
      } else {
        if (invalidCharacters.test(formField.locationName.trim())) {
          cnt = cnt + 1
          error.locationName = 'Only ( ) , . - / this Special Characters allowed '
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.locationName.trim())) {
          cnt = cnt + 1
          error.locationName = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.locationName.replaceAll(' ', '').length > 250) {
            cnt = cnt + 1
            error.locationName = 'Location Name should not be greater than 250 characters'
          }
        }
      }
    }
  }
  return {error, cnt}
}

export const locationTableHeaderData: TableHeaderDataType[] = [
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
      id: 'city',
      style: {
        minWidth: '100px',
        width: '110px',
      },
    },
    text: 'City',
  },
  {
    th: {
      id: 'name',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Location',
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
