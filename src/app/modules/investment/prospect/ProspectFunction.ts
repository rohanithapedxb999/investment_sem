import {toast} from 'react-toastify'
import validator from 'validator'
import {Message, clearInputError, getDate} from '../../../../_metronic/helpers'
import {getCitiesById, getStatesById} from '../../../../api/AdminAPI'
import {getProspectsById, updateProspectsStatusById} from '../../../../api/InvestmentAPI'
import API from '../../../../api/apiUrl'
import {UserMasterInput} from '../../../../types/AdminModuleTypes'
import {ProspectInputType} from '../../../../types/InvestmentModuleTypes'
import {APIResponse, InputErrorType, TableHeaderDataType} from '../../../../types/OtherTypes'
import {
  getCityDataByCountry,
  getCityDataByState,
  getRecords,
  getStateDataByCountry,
} from '../../../CommonFunctions'

export const handleStateChange = async (
  value: string | null,
  formField: ProspectInputType | UserMasterInput,
  setCity: Function,
  setFormField: Function,
  InputError: InputErrorType,
  setInputError: Function
) => {
  let country = formField.country
  clearInputError('state', InputError, setInputError)
  if (formField.country == '') {
    await getStatesById(value ?? '').then((res: APIResponse) => {
      if (res.statusCode === 200) {
        country = res?.data?.country?.id ?? ''
      }
    })
  }
  getCityDataByState(value, setCity)
  setFormField((formField: ProspectInputType) => ({
    ...formField,
    state: value,
    country: country,
    city: '',
  }))
}

export const handleCityChange = async (
  value: string | null,
  formField: ProspectInputType | UserMasterInput,
  setFormField: Function,
  InputError: InputErrorType,
  setInputError: Function,
  setState: Function,
  setCity: Function
) => {
  let country = formField.country
  let state = formField.state
  clearInputError('city', InputError, setInputError)
  if (formField.country === '') {
    await getCitiesById(value ?? '').then((res: APIResponse) => {
      if (res.statusCode === 200) {
        country = res?.data?.state?.country?.id ?? ''
        state = res?.data?.state?.id ?? ''
        getStateDataByCountry(country ?? '', setState)
        getCityDataByState(state, setCity)
      }
    })
  }
  setFormField((formField: ProspectInputType) => ({
    ...formField,
    city: value,
    country: country,
    state: state,
  }))
}

export const handleCityOfBirthChange = async (
  value: string | null,
  formField: ProspectInputType,
  setFormField: Function,
  InputError: InputErrorType,
  setInputError: Function,
  setCity: Function
) => {
  let country = formField.countryOfBirth
  clearInputError('cityOfBirth', InputError, setInputError)
  if (formField.country === '') {
    await getCitiesById(value ?? '').then((res: APIResponse) => {
      if (res.statusCode === 200) {
        country = res?.data?.state?.country?.id ?? ''
        getCityDataByCountry(country ?? '', setCity)
      }
    })
  }
  setFormField((formField: ProspectInputType) => ({
    ...formField,
    cityOfBirth: value,
    countryOfBirth: country,
  }))
}

export const getProspectByID = (
  id: string,
  formField: ProspectInputType,
  setFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setShowForm: Function,
  setState: Function,
  setCity: Function,
  setCityOfBirth: Function
) => {
  getProspectsById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      res?.data?.country?.id && getStateDataByCountry(res?.data?.country?.id ?? '', setState)
      res?.data?.birthCountry?.id &&
        getCityDataByCountry(res?.data?.birthCountry?.id ?? '', setCityOfBirth)
      res?.data?.state?.id && getCityDataByState(res?.data?.state?.id, setCity)
      setFormField({
        ...formField,
        firstName: res?.data?.firstName ?? '',
        lastName: res?.data?.lastName ?? '',
        contactNo: res?.data?.mobileNo ?? '',
        alternateMobileNo: res?.data?.alternateMobileNo ?? '',
        email: res?.data?.email ?? '',
        addressLine1: res?.data?.addressLine1 ?? '',
        addressLine2: res?.data?.addressLine2 ?? '',
        pin: res?.data?.pin ?? '',
        city: res?.data?.city?.id ?? '',
        state: res?.data?.state?.id ?? '',
        sourceName: res?.data?.source?.id ?? '',
        country: res?.data?.country?.id ?? '',
        nationality: res?.data?.nationality ?? '',
        gender: res?.data?.gender ?? '',
        dob: res?.data?.dob ?? '',
        age: res?.data?.age ?? '',
        occupation: res?.data?.occupation?.id ?? '',
        occupationDesc: res?.data?.occupationDesc ?? '',
        maritalStatus: res?.data?.maritalStatus ?? '',
        politicalExposure: res?.data?.politicalExposure ?? '',
        referal: res?.data?.newReferal?.firstName
          ? res?.data?.newReferal?.id
          : res?.data?.existingReferal?.id,
        probability: res?.data?.probability ?? '',
        referalType: res?.data?.newReferal?.firstName ? 'new' : 'existing',
        riskAppetite: res?.data?.riskAppetite ?? '',
        tentativeFollowUpDate: res?.data?.tentativeFollowUpDate ?? '',
        existingFollowUpDate: res?.data?.tentativeFollowUpDate ?? '',
        tentativeAmount: res?.data?.tentativeAmount ?? '',
        status: res?.data?.status?.code ?? '',
        operationalStatus: res?.data?.operationalStatus?.code ?? '',
        assignedBy: res?.data?.assignedBy?.id ?? '',
        cityOfBirth: res?.data?.birthCity?.id ?? '',
        countryOfBirth: res?.data?.birthCountry?.id ?? '',
        middleName: res?.data?.middleName ?? '',
        fatherName: res?.data?.fatherName ?? '',
        motherName: res?.data?.motherName ?? '',
        maidenName: res?.data?.maidenName ?? '',
        isNRI: res?.data?.isNri ?? '',
      })
      setEditId(id)
      setShowForm(true)
      setInputError({})
    } else {
      Message(res.message, 'error')
    }
  })
}

export const validateProspectForm = (formField: ProspectInputType) => {
  let cnt: number = 0
  const error: InputErrorType = {}
  let addressRegex = /^[a-zA-Z0-9][\w\W]*[a-zA-Z0-9)]+$/
  let addressInvalidCharacters = /[<>:"\\|?*\x00-\x1F~`!@#^+=;'[\]{}%_&$]/
  let alphaRegex = /^[a-z][a-z .']*[a-z]*$/i
  let invalidCharactersDescription = /[<>"/\\|?*\x00-\x1F~`!@#^+=;'[\]{}$&_]/
  const {currentDate} = getDate()
  const isFormMandatory = Number(formField.operationalStatus) > 2 || Number(formField.status) === 5
  if (!formField.firstName.trim()) {
    cnt = cnt + 1
    error.firstName = 'First Name is required..'
  } else {
    if (!alphaRegex.test(formField.firstName.trim())) {
      cnt = cnt + 1
      error.firstName =
        ' First Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the First Name must be a letter (a-z, A-Z).'
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.firstName.trim())) {
      cnt = cnt + 1
      error.firstName =
        ' First Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the First Name must be a letter (a-z, A-Z).'
    } else {
      if (formField.firstName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.firstName = 'First Name should not be greater than 50 characters'
      }
    }
  }

  if (!formField.lastName.trim()) {
    cnt = cnt + 1
    error.lastName = 'Last Name is required..'
  } else {
    if (!alphaRegex.test(formField.lastName.trim())) {
      cnt = cnt + 1
      error.lastName =
        ' Last Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Last Name must be a letter (a-z, A-Z).'
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.lastName.trim())) {
      cnt = cnt + 1
      error.lastName =
        ' Last Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Last Name must be a letter (a-z, A-Z). '
    } else {
      if (formField.lastName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.lastName = 'Last Name should not be greater than 50 characters'
      }
    }
  }

  if (!formField.contactNo.toString()) {
    cnt = cnt + 1
    error.contactNo = 'Contact No. is required'
  } else {
    if (formField.contactNo.toString().includes('.')) {
      cnt = cnt + 1
      error.contactNo = 'Decimal value is not allowed in Contact No.'
    } else if (formField.contactNo.toString().replaceAll('.', '').length !== 10) {
      cnt = cnt + 1
      error.contactNo = 'Contact No. should be 10 digits'
    }
  }

  if (!formField.fatherName.trim() && isFormMandatory) {
    cnt = cnt + 1
    error.fatherName = 'Father Name is required..'
  } else if (formField.fatherName) {
    if (!alphaRegex.test(formField.fatherName.trim())) {
      cnt = cnt + 1
      error.fatherName =
        "Father's Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Father's Name must be a letter (a-z, A-Z)."
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.fatherName.trim())) {
      cnt = cnt + 1
      error.fatherName =
        "Father's Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Father"
    } else {
      if (formField.fatherName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.fatherName = 'Father Name should not be greater than 50 characters'
      }
    }
  }

  if (!formField.motherName.trim() && isFormMandatory) {
    cnt = cnt + 1
    error.motherName = 'Mother Name is required.'
  } else if (formField.motherName) {
    if (!alphaRegex.test(formField.motherName.trim())) {
      cnt = cnt + 1
      error.motherName =
        "Mother's Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Mother's Name must be a letter (a-z, A-Z)."
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.motherName.trim())) {
      cnt = cnt + 1
      error.motherName =
        "Mother's Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Mother's Name must be a letter (a-z, A-Z)."
    } else {
      if (formField.motherName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.motherName = 'Mother Name should not be greater than 50 characters'
      }
    }
  }

  if (formField.middleName) {
    if (!alphaRegex.test(formField.middleName.trim())) {
      cnt = cnt + 1
      error.middleName =
        'Middle Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Middle Name must be a letter (a-z, A-Z).'
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.middleName.trim())) {
      cnt = cnt + 1
      error.middleName =
        'Middle Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Middle Name must be a letter (a-z, A-Z).'
    } else {
      if (formField.middleName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.middleName = 'Middle Name should not be greater than 50 characters'
      }
    }
  }

  if (formField.maidenName) {
    if (!alphaRegex.test(formField.maidenName.trim())) {
      cnt = cnt + 1
      error.maidenName =
        'Maiden Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Maiden Name must be a letter (a-z, A-Z).'
    } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.maidenName.trim())) {
      cnt = cnt + 1
      error.maidenName =
        'Maiden Name should be only letters (a-z, A-Z). Single space and a single dot is allowed between two characters. The first and or last character of the Maiden Name must be a letter (a-z, A-Z).'
    } else {
      if (formField.maidenName.replaceAll(' ', '').length > 50) {
        cnt = cnt + 1
        error.maidenName = 'Maiden Name should not be greater than 50 characters'
      }
    }
  }

  if (!formField.email.toString()) {
    cnt = cnt + 1
    error.email = 'Email is required.'
  } else if (!validator.isEmail(formField.email)) {
    cnt = cnt + 1
    error.email = 'Please enter a valid Email'
  }

  if (!formField.pin && isFormMandatory) {
    cnt = cnt + 1
    error.pin = 'Pin Code is required'
  } else if (formField.pin.trim()) {
    if (formField.pin.toString().includes('.')) {
      cnt = cnt + 1
      error.pin = 'Decimal is not allowed in pin code.'
    } else if (formField.pin.toString().replaceAll('.', '').length !== 6) {
      cnt = cnt + 1
      error.pin = 'Pin Code should be 6 digits'
    }
  }

  if (formField.alternateMobileNo) {
    if (formField.alternateMobileNo.toString().includes('.')) {
      cnt = cnt + 1
      error.alternateMobileNo = 'Decimal value is not allowed in Alternate Contact No.'
    } else if (formField.alternateMobileNo.toString().replaceAll('.', '').length !== 10) {
      cnt = cnt + 1
      error.alternateMobileNo = 'Alternate Contact No. should be 10 digits'
    } else if (formField.alternateMobileNo === formField.contactNo) {
      cnt = cnt + 1
      error.alternateMobileNo = 'Alternate Contact No. should not be same as Contact No.'
    }
  }

  if (formField.tentativeAmount) {
    if (Number(formField.tentativeAmount) <= 0) {
      cnt = cnt + 1
      error.tentativeAmount = 'Amount should be greater than zero'
    }
    if (formField.tentativeAmount.toString().replaceAll('.', '').length > 10) {
      cnt = cnt + 1
      error.tentativeAmount = 'Amount should not be greater than 10 digits'
    }
  }

  if (!formField.occupationDesc.trim() && isFormMandatory) {
    cnt = cnt + 1
    error.occupationDesc = 'Occupation Description is required.'
  } else if (formField.occupationDesc.trim()) {
    if (formField.occupationDesc.replaceAll(' ', '').length <= 2) {
      cnt = cnt + 1
      error.occupationDesc = 'Occupation Description must be greater than 2 characters'
    } else {
      if (!addressRegex.test(formField.occupationDesc.trim())) {
        cnt = cnt + 1
        error.occupationDesc =
          'Occupation Description must start with letters or numbers and end with letters, numbers or )'
      } else if (invalidCharactersDescription.test(formField.occupationDesc.trim())) {
        cnt = cnt + 1
        error.occupationDesc = 'Only ( ) , . - : % this Special Characters allowed '
      } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.occupationDesc.trim())) {
        cnt = cnt + 1
        error.occupationDesc = 'Recurring Special Characters are not allowed'
      } else {
        if (formField.occupationDesc.replaceAll(' ', '').length > 250) {
          cnt = cnt + 1
          error.occupationDesc = 'Occupation Description should not be greater than 250 characters'
        }
      }
    }
  }

  if (!formField.referal) {
    error.referal = 'Referral is required.'
    cnt = cnt + 1
  }

  if (!formField.occupation && isFormMandatory) {
    error.occupation = 'Occupation is required.'
    cnt = cnt + 1
  }

  if (!formField.addressLine1 && isFormMandatory) {
    cnt = cnt + 1
    error.addressLine1 = 'Address is required'
  } else if (formField.addressLine1.trim()) {
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
          error.addressLine1 =
            'Special Characters [round brackets(), Comma(,), dot(.), hyphen(-), and forward slash(/) ] are allowed.'
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

  if (formField.addressLine2.trim()) {
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
          error.addressLine2 =
            'Special Characters [round brackets(), Comma(,), dot(.), hyphen(-), and forward slash(/) ] are allowed.'
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.addressLine2.trim())) {
          cnt = cnt + 1
          error.addressLine2 = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.addressLine2.replaceAll(' ', '').length > 50) {
            cnt = cnt + 1
            error.addressLine2 = 'Address Line 2  should not be greater than 50 characters'
          }
        }
      }
    }
  }
  let invalidCharacters = /[<>"\\|?*\x00-\x1F~`!@^+='[\]{}#$]/
  if (
    !formField.comment &&
    formField.tentativeFollowUpDate !== formField.existingFollowUpDate &&
    formField.existingFollowUpDate
  ) {
    cnt = cnt + 1
    error.comment = 'Comment should not be blank'
  } else if (invalidCharacters.test(formField?.comment?.trim() ?? '')) {
    cnt = cnt + 1
    error.comment = 'Only ( ) , . - / % : ; _ & this Special Characters allowed'
  }
  if (!formField.tentativeFollowUpDate) {
    cnt = cnt + 1
    error.tentativeFollowUpDate = 'Follow up date should not be blank/invalid'
  } else {
    let newDate = formField?.tentativeFollowUpDate?.split('-')
    console.log(newDate)
    if (newDate[0].length > 4) {
      cnt = cnt + 1
      error.tentativeFollowUpDate = 'Year is invalid'
    } else if (formField.tentativeFollowUpDate < currentDate) {
      if (Number(formField.status) <= 5 && formField.operationalStatus !== null) {
        if (formField.tentativeFollowUpDate !== formField.existingFollowUpDate) {
          cnt = cnt + 1
          error.tentativeFollowUpDate = 'Follow up date should be greater than current date'
        }
        // cnt = cnt + 1
        // error.tentativeFollowUpDate = 'Follow up date should be greater than current date'
      }
    }
  }

  if (!formField.country && isFormMandatory) {
    cnt = cnt + 1
    error.country = 'Please select Country'
  }

  if (!formField.nationality && isFormMandatory) {
    cnt = cnt + 1
    error.nationality = 'Please select Nationality'
  }

  if (
    !formField.sourceName &&
    ((formField.operationalStatus && Number(formField?.operationalStatus) !== 3) ||
      window.location.pathname.includes('team-leader/sales' || 'advisor/sales'))
  ) {
    cnt = cnt + 1
    error.sourceName = 'Please select Source'
  }

  if (!formField.city && isFormMandatory) {
    cnt = cnt + 1
    error.city = 'Please select City'
  }
  if (!formField.state && isFormMandatory) {
    cnt = cnt + 1
    error.state = 'Please select State'
  }
  if (!formField.cityOfBirth && isFormMandatory) {
    cnt = cnt + 1
    error.cityOfBirth = 'Please select City of Birth'
  }
  if (!formField.countryOfBirth && isFormMandatory) {
    cnt = cnt + 1
    error.countryOfBirth = 'Please select Country of Birth'
  }

  if (!formField.maritalStatus && isFormMandatory) {
    cnt = cnt + 1
    error.maritalStatus = 'Please select Marital Status'
  }

  if (!formField.gender && isFormMandatory) {
    cnt = cnt + 1
    error.gender = 'Please select Gender'
  }

  if (!formField.isNRI && isFormMandatory) {
    cnt = cnt + 1
    error.isNRI = 'Please select Residential Status'
  }

  if (!formField.dob && isFormMandatory) {
    cnt = cnt + 1
    error.dob = 'Date of Birth should not be blank/invalid'
  } else if (formField.dob) {
    let newDate = formField.dob.split('-')
    if (newDate[0].length > 4) {
      cnt = cnt + 1
      error.dob = 'Year is invalid'
    } else if (formField.dob > currentDate) {
      cnt = cnt + 1
      error.dob = 'Date of Birth should be less than current date'
    }
  }
  console.log(error)
  return {error, cnt}
}

export const convertToSales = (
  id: string,
  setProspects: Function,
  setShow: Function,
  setInputError: Function,
  setCommentEditId: Function,
  setCommentFormField: Function,
  userId: string | null,
  role: string
) => {
  updateProspectsStatusById(id, '4', '1', userId).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      toast.success('Converted to Sales Successfully')
      setShow(false)
      setInputError({})
      setCommentEditId(null)
      setCommentFormField((commentFormField: {comment: string}) => ({
        ...commentFormField,
        comment: '',
      }))
      getRecords(`${API.PROSPECTS}/user/${userId}/${role}`, setProspects)
    } else {
      Message(res.message, 'error')
    }
  })
}

export const getProspectTableHeaderData = (isProductNeeded?: boolean, isActionNeeded?: boolean) => {
  const prospectTableHeaderData: TableHeaderDataType[] = [
    {
      th: {
        id: '',
        style: {
          minWidth: '10px',
          width: '10px',
        },
        // hidden: isProductNeeded ?? false,
      },
      text: '',
    },
    {
      th: {
        id: 'name',
        // style: {
        //   minWidth: '80px',
        //   width: '80px',
        // },
      },
      text: 'Name',
    },
    {
      th: {
        id: 'contact',
        // style: {
        //   minWidth: '90px',
        //   width: '90px',
        // },
      },
      text: 'Contact no',
    },
    {
      th: {
        id: 'email',
        // style: {
        //   minWidth: '50px',
        //   width: '50px',
        // },
      },
      text: 'Email Id',
    },
    {
      th: {
        id: 'address',
        // style: {
        //   minWidth: '180px',
        //   width: '180px',
        // },
      },
      text: 'Address',
    },
    {
      th: {
        id: 'referalName',
        // style: {
        //   minWidth: '50px',
        //   width: '50px',
        // },
      },
      text: 'Referral Name',
    },
    {
      th: {
        id: 'referalContact ',
        // style: {
        //   minWidth: '70px',
        //   width: '70px',
        // },
      },
      text: 'Referral Contact',
    },
    {
      th: {
        id: 'aasignedBy ',
        // style: {
        //   minWidth: '70px',
        //   width: '70px',
        // },
      },
      text: 'Assigned To',
    },
    {
      th: {
        id: 'probability ',
        // style: {
        //   minWidth: '70px',
        //   width: '70px',
        // },
      },
      text: 'Probability',
    },
    {
      th: {
        id: 'status',
        // style: {
        //   minWidth: '70px',
        //   width: '70px',
        // },
      },
      text: 'Status',
    },
    {
      th: {
        id: 'actions',
        // style: {
        //   width: '100px',
        //   minWidth: '70px',
        // },
        hidden: isActionNeeded ?? false,
      },
      text: 'Actions',
      justifyContent: 'end',
      isSortable: false,
    },
  ]
  return {prospectTableHeaderData}
}

export const calculateAge = (dob: string) => {
  let dateOfBirth = new Date(dob)
  //calculate month difference from current date in time
  var month_diff = Date.now() - dateOfBirth.getTime()

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff)

  //extract year from date
  var year = age_dt.getUTCFullYear()

  //now calculate the age of the user
  var age = Math.abs(year - 1970)

  return age
}
