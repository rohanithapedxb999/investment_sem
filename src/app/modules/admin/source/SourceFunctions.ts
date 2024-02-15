import {Message} from '../../../../_metronic/helpers'
import { getSourcesById} from '../../../../api/AdminAPI'
import { SourceMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'

export const getSourcesByID = (
  id: string,
  formField: SourceMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function
) => {
  getSourcesById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        sourceName: res?.data?.name ?? '',
      })
      setEditId(id)
      setInputError({})
      document.getElementById('sourceName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: SourceMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^[a-zA-Z][\w\W]*[a-zA-Z0-9]+$/
  let invalidCharacters = /[<>:"/\\|?*\x00-\x1F~`!@#^+=;'[\]{}%$]/
  if (!formField.sourceName) {
    cnt = cnt + 1
    error.sourceName = 'Source Name is Required'
  } else {
    if (formField.sourceName.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.sourceName = 'Source Name must be greater than 2 characters'
    } else {
      if (!alphaRegex.test(formField.sourceName.trim())) {
        cnt = cnt + 1
        error.sourceName =
          'Source Name must start with letter and end with letter or numbers.'
      } else {
        if (invalidCharacters.test(formField.sourceName.trim())) {
          cnt = cnt + 1
          error.sourceName = 'Only ( ) , . - & _ this Special Characters allowed '
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.sourceName.trim())) {
          cnt = cnt + 1
          error.sourceName = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.sourceName.replaceAll(' ', '').length > 250) {
            cnt = cnt + 1
            error.sourceName = 'Source Name should not be greater than 250 characters'
          }
        }
      }
    }
  }
  return {error, cnt}
}
export const sourceTableHeaderData: TableHeaderDataType[] = [
  {
    th: {id: 'name', style: {minWidth: '80%', width: '80%'}},
    text: 'Source Name',
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
