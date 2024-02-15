import validator from 'validator'
import {Message, clearInputError} from '../../../../_metronic/helpers'
import {getRoles, getUsersById} from '../../../../api/AdminAPI'
import {TECHNICAL_ROLES} from '../../../../contants'
import {UserMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {
  RoleMasterOutput,
  UserMasterInput,
  UserMasterOutput,
  UserMasterRoleData,
} from '../../../../types/AdminModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'
import {getCityDataByState, getStateDataByCountry} from '../../../CommonFunctions'

//to get user data by id and set that data to user form
export const getUserByID = (
  id: string,
  formField: UserMasterInput,
  setFormField: Function,
  setEditId: Function,
  setShowForm: Function,
  setInputError: Function,
  setSecondaryRole: Function,
  setState: Function,
  setCity: Function
) => {
  getUsersById(id).then((res) => {
    if (res) {
      setShowForm(true)
      let primaryRoles: UserMasterOutput['data'][number]['roles'][number] = res?.roles?.filter(
        (role: {type: string}) => role.type === 'primary'
      )[0]
      let secondaryRoles: UserMasterInput['secondaryRole'] = []
      res?.country?.id && getStateDataByCountry(res?.country?.id ?? '', setState)
      res?.state?.id && getCityDataByState(res?.state?.id, setCity)
      res?.roles
        ?.filter(
          (role: UserMasterOutput['data'][number]['roles'][number]) => role.type === 'secondary'
        )
        .map((obj: UserMasterOutput['data'][number]['roles'][number]) => {
          secondaryRoles.push({
            value: obj.role.id,
            module: obj.role?.module !== null ? obj.role?.module.name : '-',
          })
        })

      setRoleDataOnRoleChange(primaryRoles.role?.module?.name, setSecondaryRole)
      setFormField({
        ...formField,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        secondaryRole: secondaryRoles,
        contactNo: res?.mobileNo ?? '',
        alternateMobileNo: res?.alternateMobileNo ?? '',
        addressLine1: res?.addressLine1 ?? '',
        addressLine2: res?.addressLine2 ?? '',
        pin: res?.pin ?? '',
        city: res?.city?.id ?? '',
        state: res?.state?.id ?? '',
        country: res?.country?.id ?? '',
        nationality: res?.nationality ?? '',
        teamLeader: res?.teamLead?.id ?? '',
        gender: res?.gender ?? '',
        dob: res?.dob ?? '',
        age: res?.age ?? '',
        maritalStatus: res?.maritalStatus ?? '',
        primaryRole: {
          value: primaryRoles.role.id,
          module: primaryRoles.role?.module !== null ? primaryRoles.role?.module.name : '-',
        },
      })
      setEditId(id)
      setInputError({})
      window.scrollTo(0, 0)
    } else {
      Message(res.message, 'error')
    }
  })
}

//to reset user form and its error message
export const cancelSubmit = (
  setFormField: Function,
  setEditId: Function,
  setShowForm: Function,
  setInputError: Function
) => {
  setEditId(null)
  setShowForm(false)
  setFormField(UserMasterInitialInput)
  setInputError({})
}

//to validate user form
export const validateForm = (formField: UserMasterInput) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let alphaRegex = /^[a-z][a-z .']*[a-z]*$/i
  let addressRegex = /^[a-zA-Z0-9][\w\W]*[a-zA-Z0-9)]+$/
  let addressInvalidCharacters = /[<>:"\\|?*\x00-\x1F~`!@#^+=;'[\]{}%_&$]/
  let emailRegex = /^[a-z0-9]+(?!.*(?:\+{1,}|\-{1,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*$/
  if (!formField.firstName.trim()) {
    cnt = cnt + 1
    error.firstName = 'First Name is Required'
  } else {
    if (!alphaRegex.test(formField.firstName.trim())) {
      cnt = cnt + 1
      error.firstName =
        "Only letters (a-z,A-Z) and single space , . , 'between two characters are allowed and last or first character of the First Name must be letter (a-z,A-Z)"
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.firstName.trim())) {
      cnt = cnt + 1
      error.firstName =
        "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the First Name must be letter (a-z,A-Z)"
    } else {
      if (formField.firstName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.firstName = 'First Name should not be greater than 50 characters'
      }
    }
  }

  if (!formField.contactNo.toString()) {
    cnt = cnt + 1
    error.contactNo = 'Contact No. is Required'
  } else {
    if (formField.contactNo.toString().includes('.')) {
      cnt = cnt + 1
      error.contactNo = 'Decimal is not allowed in contact no.'
    } else if (formField.contactNo.toString().replaceAll('.', '').length !== 10) {
      cnt = cnt + 1
      error.contactNo = 'Contact No. should be 10 digits'
    }
  }

  if (!formField.dob) {
    cnt = cnt + 1
    error.dob = 'Date of birth should not be blank/invalid'
  } else if (formField.dob) {
    let newDate = formField.dob.split('-')
    if (newDate[0].length > 4) {
      cnt = cnt + 1
      error.dob = 'Year is invalid'
    }
  }

  if (!formField.addressLine1.toString()) {
    cnt = cnt + 1
    error.addressLine1 = 'Address No. is Required'
  } else {
    if (formField.addressLine1.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.addressLine1 = 'Address Line 1 must be greater than 2 characters'
    } else {
      if (!addressRegex.test(formField.addressLine1.trim())) {
        cnt = cnt + 1
        error.addressLine1 =
          'Address Line 1 must start with letter or number and end with letter, numbers or )'
      } else {
        if (addressInvalidCharacters.test(formField.addressLine1.trim())) {
          cnt = cnt + 1
          error.addressLine1 = 'Only ( ) , . - / this Special Characters allowed '
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.addressLine1.trim())) {
          cnt = cnt + 1
          error.addressLine1 = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.addressLine1.replaceAll(' ', '').length > 50) {
            cnt = cnt + 1
            error.addressLine1 = 'Address Line 1 should not be greater than 50 characters'
          }
        }
      }
    }
  }

  if (formField.addressLine2) {
    if (formField.addressLine2.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.addressLine2 = 'Address Line 2 must be greater than 2 characters'
    } else {
      if (!addressRegex.test(formField.addressLine2.trim())) {
        cnt = cnt + 1
        error.addressLine2 =
          'Address Line 2 must start with letter or number and end with letter, numbers or )'
      } else {
        if (addressInvalidCharacters.test(formField.addressLine2.trim())) {
          cnt = cnt + 1
          error.addressLine2 = 'Only ( ) , . - / this Special Characters allowed '
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.addressLine2.trim())) {
          cnt = cnt + 1
          error.addressLine2 = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.addressLine2.replaceAll(' ', '').length > 50) {
            cnt = cnt + 1
            error.addressLine2 = 'Address Line 2 should not be greater than 50 characters'
          }
        }
      }
    }
  }

  if (!formField.country) {
    error.country = 'Country is Required'
    cnt = cnt + 1
  }

  if (!formField.maritalStatus) {
    error.maritalStatus = 'Marital Status is Required'
    cnt = cnt + 1
  }

  if (!formField.city) {
    error.city = 'City is Required'
    cnt = cnt + 1
  }

  if (!formField.state) {
    error.state = 'State is Required'
    cnt = cnt + 1
  }

  if (!formField.nationality) {
    error.nationality = 'Nationality is Required'
    cnt = cnt + 1
  }

  if (!formField.gender) {
    error.gender = 'Gender is Required'
    cnt = cnt + 1
  }

  if (!formField.maritalStatus) {
    error.maritalStatus = 'Marital Status is Required'
    cnt = cnt + 1
  }

  if (!formField.primaryRole.value) {
    cnt = cnt + 1
    error.primaryRole = 'Primary Role is Required'
  }
  if (
    formField.primaryRole.module === 'ADVISOR' ||
    formField.secondaryRole.some((obj: UserMasterInput['secondaryRole'][number]) =>
      obj.module === 'ADVISOR' ? true : false
    )
  ) {
    if (!formField.teamLeader) {
      cnt = cnt + 1
      error.teamLeader = 'Team Leader is Required'
    }
  }

  if (!formField.lastName.trim()) {
    cnt = cnt + 1
    error.lastName = 'Last Name is Required'
  } else {
    if (!alphaRegex.test(formField.lastName.trim())) {
      cnt = cnt + 1
      error.lastName =
        "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Last Name must be letter (a-z,A-Z)"
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.lastName.trim())) {
      cnt = cnt + 1
      error.lastName =
        "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Last Name must be letter (a-z,A-Z)"
    } else {
      if (formField.lastName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.lastName = 'Last Name should not be greater than 50 characters'
      }
    }
  }

  if (formField.alternateMobileNo) {
    if (formField.alternateMobileNo.toString().includes('.')) {
      cnt = cnt + 1
      error.alternateMobileNo = 'Decimal is not allowed in Alternate Contact No.'
    } else if (formField.alternateMobileNo.toString().replaceAll('.', '').length !== 10) {
      cnt = cnt + 1
      error.alternateMobileNo = 'Alternate Contact No. should be 10 digits'
    } else if (formField.alternateMobileNo === formField.contactNo) {
      cnt = cnt + 1
      error.alternateMobileNo = 'Alternate Contact No. should not be same as Contact No.'
    }
  }

  if (!formField.email.toString()) {
    cnt = cnt + 1
    error.email = 'Email is Required'
  } else if (!validator.isEmail(formField.email)) {
    cnt = cnt + 1
    error.email = 'Please enter valid email'
  }

  if (!formField.pin) {
    cnt = cnt + 1
    error.pin = 'Pin is Required'
  } else {
    if (formField.pin.toString().includes('.')) {
      cnt = cnt + 1
      error.pin = 'Decimal is not allowed in pin code.'
    } else if (formField.pin.toString().replaceAll('.', '').length !== 6) {
      cnt = cnt + 1
      error.pin = 'Pin Code should be 6 digits'
    }
  }
  console.log(error)
  return {error, cnt}
}

//to get roles data for dropdown
export const getAllRoleData = (setPrimaryRole: Function, setSecondaryRole: Function) => {
  getRoles().then((res: APIResponse) => {
    let Roles: UserMasterRoleData[] = []
    if (res.statusCode === 200) {
      res?.data.map((obj: RoleMasterOutput['data'][number]) => {
        Roles?.push({
          label: obj?.name ?? '-',
          value: obj?.id ?? '-',
          module: obj?.features?.length > 0 ? obj?.features[0]?.module?.name ?? '-' : '-',
        })
      })
      setPrimaryRole(Roles)
      setSecondaryRole(Roles)
    } else {
      setPrimaryRole(Roles)
      setSecondaryRole(Roles)
    }
  })
}

//to handle secondary role change
export const handlelSecondaryRoleChange = (
  value: string[] | null,
  formField: UserMasterInput,
  setFormField: Function,
  secondaryRole: UserMasterRoleData[]
) => {
  if (value !== null) {
    let roleModules = secondaryRole.filter((role) => value.includes(role.value))
    setFormField({
      ...formField,
      secondaryRole: roleModules,
      teamLeader: roleModules.some((item) => item.module !== 'ADVISOR') ? '' : formField.teamLeader,
    })
  }
}

//to handle primary role change
export const handlelPrimaryRoleChange = (
  value: string | null,
  formField: UserMasterInput,
  setFormField: Function,
  setInputError: Function,
  setSecondaryRole: Function,
  primaryRole: UserMasterRoleData[],
  inputError: InputErrorType
) => {
  let roleModule = primaryRole.filter((role) => role.value === value)[0].module
  clearInputError(`primaryRole`, inputError, setInputError)
  if (value !== null) {
    setFormField({
      ...formField,
      primaryRole: {value, module: roleModule},
      secondaryRole: [],
      clusterHeadsCluster: '',
      teamLeader: roleModule !== 'ADVISOR' ? '' : formField.teamLeader,
    })
  }
  setRoleDataOnRoleChange(roleModule, setSecondaryRole)
}

//to set new data for secondary role dropdown when primary role changes
export const setRoleDataOnRoleChange = (roleModule: string | null, setSecondaryRole: Function) => {
  getRoles().then((res: APIResponse) => {
    let Roles: UserMasterRoleData[] = []
    if (res.statusCode === 200) {
      let TechnicalRoles: Array<string> = [...TECHNICAL_ROLES]
      TechnicalRoles.push(roleModule ?? '')
      res?.data
        ?.filter(
          (item: RoleMasterOutput['data'][number]) =>
            !TechnicalRoles.includes(
              item?.features?.length > 0 ? item?.features[0]?.module?.name ?? '-' : '-'
            )
        )
        .map((obj: RoleMasterOutput['data'][number]) => {
          Roles?.push({
            label: obj?.name ?? '-',
            value: obj?.id ?? '-',
            module: obj?.features?.length > 0 ? obj?.features[0]?.module?.name ?? '-' : '-',
          })
        })
      setSecondaryRole(Roles)
    } else {
      setSecondaryRole(Roles)
    }
  })
}

export const userTableHeaderData: TableHeaderDataType[] = [
  {
    th: {
      id: 'name',
      style: {
        minWidth: '90px',
        width: '200px',
      },
    },
    text: 'Name',
  },
  {
    th: {
      id: 'address',
      style: {
        minWidth: '90px',
        width: '200px',
      },
    },
    // isSortable: false,
    text: 'Address',
  },
  {
    th: {
      id: 'dob',
      style: {
        minWidth: '90px',
        width: '50px',
      },
    },
    text: 'Date of Birth',
  },
  {
    th: {
      id: 'gender',
      style: {
        minWidth: '90px',
        width: '50px',
      },
    },
    text: 'Gender',
  },
  {
    th: {
      id: 'roles',
      style: {
        minWidth: '120px',
        width: '140px',
      },
    },
    text: 'Role',
  },
  {
    th: {
      id: 'teamLead',
      style: {
        minWidth: '120px',
        width: '140px',
      },
    },
    text: 'Team Leader',
  },
  {
    th: {
      id: 'actions',
      style: {
        width: '50px',
        minWidth: '50px',
      },
    },
    text: 'Actions',
    justifyContent: 'end',
    isSortable: false,
  },
]
