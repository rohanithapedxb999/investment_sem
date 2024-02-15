import CryptoJS from 'crypto-js'
import moment from 'moment'
import Swal, {SweetAlertIcon} from 'sweetalert2'
import {UserModel} from '../../app/modules/auth'
import {
  COMMERCIAL_FINALIZED,
  INFORMATION_REQUESTED_STATUS,
  INDELIVERY_STATUS,
  IN_PROSPECT_STATUS,
  IN_REVIEWE_CM_STATUS,
  IN_REVIEWE_DM_STATUS,
  IN_SALES_STATUS,
  RESUBMIT_TO_SA_BYCM_STATUS,
  RESUBMIT_TO_SA_BYDM_STATUS,
  SIGNOFF_DELIVERY,
  TECHNICAL_ROLES,
  UN_ASSIGNED_STATUS,
} from '../../contants'

export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname

export function calculateDateDifference(date1: Date, Date2: string) {
  var date2 = new Date(Date2)
  var isDateNull = false
  // To calculate the time difference of two dates
  var diffTime = date2.getTime() - date1.getTime()

  // To calculate the no. of days between two dates
  let diffDays = Math.ceil(diffTime / (1000 * 3600 * 24))
  if (date1 === null || Date2 === null) {
    isDateNull = true
  }
  return diffDays
}

export function changeTextCapital(Text: string) {
  return Text.toUpperCase()
}

export function changeTextCamal(Text: string | undefined) {
  let words: any = ''

  words = Text?.split(' ')
  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i][0]?.toUpperCase() + words[i]?.toLowerCase().substr(1)
  }

  return words.join(' ')
}

export const Message = (
  Message: string,
  MessageType: SweetAlertIcon,
  showConfirmButton?: boolean
) => {
  Swal.fire({
    title: Message,
    icon: MessageType,
    heightAuto: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: showConfirmButton ? false : true,
  })
}

export function checkStatus(Text: string) {
  if (Text === IN_PROSPECT_STATUS) {
    return 'In Prospect'
  } else if (Text === INDELIVERY_STATUS) {
    return 'Ready For FTE Review'
  } else if (Text === IN_SALES_STATUS) {
    return 'In Sales'
  } else if (Text === IN_REVIEWE_CM_STATUS) {
    return 'In Commercial Review'
  } else if (Text === IN_REVIEWE_DM_STATUS) {
    return 'In FTE Review'
  } else if (Text === RESUBMIT_TO_SA_BYCM_STATUS) {
    return 'Revision Requested (CM)'
  } else if (Text === RESUBMIT_TO_SA_BYDM_STATUS) {
    return 'Revision Requested (DM)'
  } else if (Text === COMMERCIAL_FINALIZED) {
    return 'Commercials Approved'
  } else if (Text === SIGNOFF_DELIVERY) {
    return 'Accepted By DM'
  } else if (Text === UN_ASSIGNED_STATUS) {
    return 'Unassigned'
  } else if (Text === 'onetime') {
    return 'One Time'
  } else if (Text === 'ontime') {
    return 'One Time'
  } else if (Text === 'monthly') {
    return 'Monthly'
  } else if (Text === 'year') {
    return 'Yearly'
  } else if (Text === 'handset') {
    return 'Mobile Handset Reimbursement'
  } else if (Text === 'phone') {
    return 'Phone Reimbursement'
  } else if (Text === 'food_coupon') {
    return 'Food Coupon'
  } else if (Text === 'engagement_cost') {
    return 'Engagement Cost'
  } else if (Text === 'rewards_recognition') {
    return 'Rewards & Recognition'
  } else if (Text === 'employee_insurance') {
    return 'Employee Insurance'
  } else if (Text === 'learning_development') {
    return 'Learning & Development'
  } else if (Text === 'onboarding_cost') {
    return 'Onboarding Cost'
  } else if (Text === INFORMATION_REQUESTED_STATUS) {
    return 'Information Requested'
  } else if (Text === 'inflation') {
    return 'Inflation'
  } else if (Text === 'margin') {
    return 'Gross Margin'
  } else if (Text === 'contingency') {
    return 'Contingency'
  } else if (Text === 'working_days_in_month') {
    return 'Working Days In Month'
  } else if (Text === 'working_hours_in_day') {
    return 'Working Hours In Day'
  } else if (Text === 'attrition') {
    return 'Attrition'
  } else if (Text === 'external_hiring') {
    return 'External Hiring %'
  } else if (Text === 'external_hiring_fees') {
    return 'External Hiring Fees%'
  } else if (Text === '-') {
    return '-'
  } else if (Text === 'mrc') {
    return 'MRC'
  } else if (Text === 'nrc') {
    return 'NRC'
  } else if (Text === '24*7') {
    return '24x7'
  } else if (Text === '24*5') {
    return '24x5'
  } else if (Text === '16*7') {
    return '16x7'
  } else if (Text === '16*5') {
    return '16x5'
  } else if (Text === '8*5') {
    return '8x5'
  } else if (Text === 'minute-noc') {
    return 'In Minutes'
  } else if (Text === 'hour-noc') {
    return 'In Hours'
  } else if (Text === 'day-noc') {
    return 'In Days'
  } else if (Text === 'monthly-noc') {
    return 'Per Month'
  } else if (Text === 'GLOBAL_HEAD') {
    return 'GLOBAL HEAD'
  } else if (Text === 'CLUSTER_HEAD') {
    return 'CLUSTER HEAD'
  } else {
    return Text
  }
}

export function numberFormat(number: string | number, type?: string) {
  var x: any = 0
  if (typeof number === 'string') {
    x = Number(number)
  } else {
    x = number
  }
  if (type === 'onedecimal') {
    x = Math.ceil(x * 10) / 10
  } else if (type === 'roundup') {
    x = x?.toFixed(0)
  } else if (type === 'no-roundup') {
    x = x
  } else if (type === 'twodecimal') {
    x = x?.toFixed(2)
  } else {
    x = x?.toFixed(2)
  }

  x = x?.toString()
  var afterPoint = ''
  if (x?.indexOf('.') > 0) afterPoint = x?.substring(x?.indexOf('.'), x.length)
  x = Math.floor(x)
  x = x?.toString()
  var lastThree = x?.substring(x.length - 3)
  var otherNumbers = x?.substring(0, x.length - 3)
  if (otherNumbers != '') lastThree = ',' + lastThree
  var res = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + lastThree + afterPoint
  return res
}

export const getDate = () => {
  const date = new Date()
  let day: any = date.getDate()
  let month: any = date.getMonth() + 1
  let year = date.getFullYear()

  if (day < 10) {
    day = `0${day}`
  }
  if (month < 10) {
    month = `0${month}`
  }
  const currentDate = `${year}-${month}-${day}`
  return {currentDate}
}
export const getCustomDate = (date: string | Date) => {
  const newDate: Date = new Date(date)
  var h = newDate.getHours()
  var m = newDate.getMinutes()
  var s = newDate.getSeconds()
  var day = newDate.getDate()
  var month = newDate.getMonth() + 1
  var year = newDate.getFullYear()
  let customDate =
    ('0' + month).slice(-2) +
    '-' +
    ('0' + day).slice(-2) +
    '-' +
    year +
    ' ' +
    ('0' + h).slice(-2) +
    ':' +
    ('0' + m).slice(-2) +
    ':' +
    ('0' + s).slice(-2)
  return customDate
}

export const getNumber = (number: string) => {
  let number1: string = number?.toString()
  if (number1?.charAt(0) === '.') {
    number1 = '0' + number1
  }
  return Number(number1)
}

export const convertCurrency = (
  conversionCost: number | string,
  primaryCurrency: {code: string; exchangeRate: number},
  secondaryCurrency: {code: string; exchangeRate: number}
) => {
  var conversionCostVar: any = 0
  if (typeof conversionCost === 'string') {
    conversionCostVar = Number(conversionCost)
  } else {
    conversionCostVar = conversionCost
  }
  var secondaryCost = 0
  if (primaryCurrency.code === 'USD') {
    secondaryCost = conversionCostVar * secondaryCurrency.exchangeRate
  } else {
    const convert = conversionCostVar / primaryCurrency.exchangeRate
    secondaryCost = convert * secondaryCurrency.exchangeRate
  }

  return secondaryCost
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export function convertBytes(x: string) {
  let l = 0,
    n = parseInt(x, 10) || 0

  while (n >= 1024 && ++l) {
    n = n / 1024
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}

export const clearInputError = (errorName: string, InputError: any, setInputError: Function) => {
  if (errorName in InputError) {
    let error = {...InputError}
    delete error[errorName]
    setInputError(error)
  }
}

export function checkCostComponent(Text: string) {
  if (Text === 'salaryCost') {
    return 'Salary Cost'
  } else if (Text === 'seatCost') {
    return 'Seat Cost'
  } else if (Text === 'shiftCost') {
    return 'Shift Allowance'
  } else if (Text === 'onCallCost') {
    return 'On Call Allowance'
  } else if (Text === 'nsaCost') {
    return 'Night Shift Allowance'
  } else if (Text === 'transportCost') {
    return 'Transportation Cost'
  } else if (Text === 'handsetReimbursementCost') {
    return 'Mobile Handset Reimbursement'
  } else if (Text === 'phoneReimbursementCost') {
    return 'Phone Reimbursement'
  } else if (Text === 'engagementCost') {
    return 'Engagement Cost'
  } else if (Text === 'rewardCost') {
    return 'Reward & Recognition'
  } else if (Text === 'insuranceCost') {
    return 'Employee Insurance'
  } else if (Text === 'developmentCost') {
    return 'Learning & Development'
  } else if (Text === 'onboardingCost') {
    return 'Onboarding Cost'
  } else if (Text === 'telephonyCost') {
    return 'Voice Telephony License'
  } else if (Text === 'desktopCost') {
    return 'Desktop'
  } else if (Text === 'laptopCost') {
    return 'Laptop'
  } else if (Text === 'mobileCost') {
    return 'Mobile Phone'
  } else if (Text === 'fringeCost') {
    return 'Fringe Cost'
  } else if (Text === 'recruitmentCost') {
    return 'Recruitment Cost'
  } else if (Text === 'relocationCost') {
    return 'Relocation Cost'
  } else if (Text === 'travelCost') {
    return 'Travelling Cost'
  } else if (Text === 'office365') {
    return 'Office 365 License'
  } else {
    return Text
  }
}

export const HandleSelectChange = (Data: {label: string; value: string}) => {}

export const checkRole = (
  Roles: any,
  features: any,
  currentUser?: UserModel,
  currentRole?: string
) => {
  if (TECHNICAL_ROLES.includes(currentRole)) {
    currentUser?.roles?.map((obj: any) => {
      if (obj.role.features.length > 0) {
        if (TECHNICAL_ROLES.includes(obj.role.module.name)) {
          if (currentRole === obj.role.module.name) {
            features = []
            obj.role.features.map((subObj: any) => {
              features.push(subObj.feature)
            })
          }
        }
      }
    })
  }

  for (let i = 0; i < features.length; i++) {
    for (let j = 0; j < Roles.length; j++) {
      if (features[i] === Roles[j]) {
        return true
      }
    }
  }
  return false
}

export const checkStatusExists = (status: any, statuses: any) => {
  for (let i = 0; i < statuses.length; i++) {
    for (let j = 0; j < status.length; j++) {
      if (statuses[i] === status[j]) {
        return true
      }
    }
  }
  return false
}

export const edate = (dateString: any, monthExtra: number) => {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const now = moment(dateString) // creates a Moment object representing the current date and time
  const dateObject = now.toDate() // converts the Moment object to a JavaScript Date object
  let day: any = dateObject.getDate()
  let year = dateObject.getFullYear()
  let month: any = dateObject.getMonth()

  let monthSum: any = month + monthExtra

  month = monthSum % 12
  if (month < 0) {
    month = 12 + month
  }

  year = year + Math.floor(monthSum / 12)
  if (day >= 29 && month === 1 && year % 4 === 0) {
    day = 29
  } else {
    day = Math.min(day, DAYS[month])
  }

  const newDate = moment(year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2)) // creates a Moment object representing the current date and time
  const newDateObject = newDate.toDate() // converts the Moment object to a JavaScript Date object

  if (
    dateObject.getDate() >= 30 &&
    dateObject.getMonth() === 0 &&
    month === 1 &&
    year % 4 === 0 &&
    monthExtra === 1
  ) {
    day = 29
  } else if (
    dateObject.getDate() >= 29 &&
    dateObject.getMonth() === 0 &&
    month === 1 &&
    year % 4 !== 0 &&
    monthExtra === 1
  ) {
    day = 28
  } else if (
    [2, 4, 7, 9].includes(dateObject.getMonth()) &&
    monthExtra === 1 &&
    dateObject.getDate() === 31
  ) {
  } else {
    newDateObject.setDate(newDateObject.getDate() - 1)
  }
  let newDay: any = newDateObject.getDate()
  let newYear = newDateObject.getFullYear()
  let newMonth: any = newDateObject.getMonth()

  return newYear + '-' + ('0' + (newMonth + 1)).slice(-2) + '-' + ('0' + newDay).slice(-2)
}

export function isTokenExpired(token: any) {
  if (!token) return true // if no token is provided, assume it's expired
  const tokenParts = token.split('.')
  if (tokenParts.length !== 3) return true // invalid token format

  const decodedToken = JSON.parse(atob(tokenParts[1]))
  const currentTime = Math.floor(Date.now() / 1000) // convert milliseconds to seconds

  return decodedToken.exp < currentTime
}

export function decryptData(text: any, key: string) {
  const [ivHex, encryptedText] = text.split(':')
  const iv = CryptoJS.enc.Hex.parse(ivHex)
  const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(key), {
    iv,
  }).toString(CryptoJS.enc.Utf8)
  // Handle the decrypted data as needed
  return decrypted
}
