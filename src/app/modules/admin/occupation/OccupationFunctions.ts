import {Message} from '../../../../_metronic/helpers'
import {getOccupationsById} from '../../../../api/AdminAPI'
import {OccupationMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'

export const getOccupationsByID = (
  id: string,
  formField: OccupationMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function
) => {
  getOccupationsById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        occupationName: res?.data?.name ?? '',
      })
      setEditId(id)
      setInputError({})
      document.getElementById('occupationName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: OccupationMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^[a-zA-Z][\w\W]*[a-zA-Z0-9]+$/
  let invalidCharacters = /[<>:"/\\|?*\x00-\x1F~`!@#^+=;'[\]{}%$]/
  if (!formField.occupationName) {
    cnt = cnt + 1
    error.occupationName = 'Occupation Name is required'
  } else {
    if (formField.occupationName.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.occupationName = 'Occupation Name must be greater than 2 characters'
    } else {
      if (!alphaRegex.test(formField.occupationName.trim())) {
        cnt = cnt + 1
        error.occupationName =
          'Occupation Name must start with a letter and end with a letter or number.'
      } else {
        if (invalidCharacters.test(formField.occupationName.trim())) {
          cnt = cnt + 1
          error.occupationName = 'Special Characters [round brackets(), Comma(,), dot(.), hyphen(-), and forward slash(/) ] are allowed.'
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.occupationName.trim())) {
          cnt = cnt + 1
          error.occupationName = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.occupationName.replaceAll(' ', '').length > 250) {
            cnt = cnt + 1
            error.occupationName = 'Occupation Name should not be greater than 250 characters'
          }
        }
      }
    }
  }
  return {error, cnt}
}

export const occupationTableHeaderData: TableHeaderDataType[] = [
  {
    th: {id: 'name', style: {minWidth: '80%', width: '80%'}},
    text: 'Occupation Name',
  },
  {
    th: {
      id: 'action',
      style: {width: '20%', minWidth: '20%'},
    },
    text: 'Actions',
    justifyContent: 'end',
    isSortable: false,
  },
]
