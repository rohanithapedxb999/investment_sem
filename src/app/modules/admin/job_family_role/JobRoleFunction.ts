import {Message} from '../../../../_metronic/helpers'
import {getParticularsById} from '../../../../api/AdminAPI'
import {JobFamilyRoleMasterInput} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'

export const getJobFamilyRoleByID = (
  id: string,
  formField: JobFamilyRoleMasterInput,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function
) => {
  getParticularsById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      setFormField({
        ...formField,
        jobFamilyRoleName: res?.data?.name ?? '',
        jobFamily: res?.data?.jobFamily?.id ?? '',
        band: res?.data?.band?.id ?? '',
      })
      setEditId(id)
      setInputError({})
      document.getElementById('jobFamilyRoleName')?.focus()
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateForm = (formField: JobFamilyRoleMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^[a-zA-Z.][\w\W]*[a-zA-Z0-9]+$/
  let invalidCharacters = /[<>:"/\\|?*\x00-\x1F~`!@#^+=;'[\]{}%$]/
  if (!formField.jobFamilyRoleName.trim()) {
    cnt = cnt + 1
    error.jobFamilyRoleName = 'Job Family Role Name is Required'
  } else {
    if (formField.jobFamilyRoleName.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.jobFamilyRoleName = 'Job Family Role Name must be greater than 2 characters'
    } else {
      if (!alphaRegex.test(formField.jobFamilyRoleName.trim())) {
        cnt = cnt + 1
        error.jobFamilyRoleName =
          'Job Family Role Name must start with letter or  "." and end with letter or numbers '
      } else {
        if (invalidCharacters.test(formField.jobFamilyRoleName.trim())) {
          cnt = cnt + 1
          error.jobFamilyRoleName = 'Only ( ) , . - & _ this Special Characters allowed '
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.jobFamilyRoleName.trim())) {
          cnt = cnt + 1
          error.jobFamilyRoleName = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.jobFamilyRoleName.replaceAll(' ', '').length > 250) {
            cnt = cnt + 1
            error.jobFamilyRoleName = 'Job Family Role should not be greater than 250 characters'
          }
        }
      }
    }
  }
  if (!formField.jobFamily) {
    cnt = cnt + 1
    error.jobFamily = 'Job Family is Required'
  }
  if (!formField.band) {
    cnt = cnt + 1
    error.band = 'Band is Required'
  }
  return {error, cnt}
}

export const jobFamilyRoleTableHeaderData: TableHeaderDataType[] = [
  {
    th: {
      id: 'name',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Job Family Role',
  },
  {
    th: {
      id: 'jobFamily',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Job Family',
  },
  {
    th: {
      id: 'band',
      style: {
        minWidth: '90px',
        width: '100px',
      },
    },
    text: 'Band',
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
