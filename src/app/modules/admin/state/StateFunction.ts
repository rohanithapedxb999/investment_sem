import {Message} from '../../../../_metronic/helpers'
import {getStatesById} from '../../../../api/AdminAPI'
import {StateMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'

export const getStateByID = (
  id: string,
  formField: StateMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function
) => {
  getStatesById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        stateName: res?.data?.name ?? '',
        country: res?.data?.country?.id ?? '',
      })
      setEditId(id)
      setInputError({})
      document.getElementById('stateName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: StateMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^([a-z]+(\s{1})?)+[a-z]*$/i
  if (!formField.country) {
    cnt = cnt + 1
    error.country = 'Country is required'
  }
  if (!formField.stateName.trim()) {
    error.stateName = 'State Name is required'
    cnt = cnt + 1
  } else {
    if (formField.stateName.replaceAll(' ', '').length <= 1) {
      cnt = cnt + 1
      error.stateName = 'State Name must be greater than 1 characters'
    } else {
      if (!alphaRegex.test(formField.stateName.trim())) {
        cnt = cnt + 1
        error.stateName = 'Only letters (a-z,A-Z) and a single space are allowed.'
      }
    }
  }

  return {error, cnt}
}

export const stateTableHeaderData: TableHeaderDataType[] = [
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
      id: 'name',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'State',
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
