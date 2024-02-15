import {toast} from 'react-toastify'
import Swal, {SweetAlertResult} from 'sweetalert2'
import {Message, clearInputError, edate, getDate} from '../../../../_metronic/helpers'
import {getProducts} from '../../../../api/AdminAPI'
import {
  getSalesProspectsById,
  sendFormToClient,
  updateProspectsStatusById,
} from '../../../../api/InvestmentAPI'
import {AlertProps} from '../../../../data/AlertDefaults'
import {ProspectInitialInput, SalesInitialInput} from '../../../../data/InvestmentModuleDefaultData'
import {ProductMasterOutput} from '../../../../types/AdminModuleTypes'
import {ProspectInputType, SalestInputType} from '../../../../types/InvestmentModuleTypes'
import {
  APIResponse,
  InputErrorType,
  SelectValueType,
  SubmitAPIStatusType,
} from '../../../../types/OtherTypes'
import {
  getCityDataByCountry,
  getCityDataByState,
  getRecords,
  getStateDataByCountry,
} from '../../../CommonFunctions'
import {calculateAge, validateProspectForm} from '../prospect/ProspectFunction'

export const Q1 = 'Which of the following best describes your current stage of life?'
export const Q1A1 =
  'Single with few financial burdens. Ready to accumulate wealth for future short-term and long-term goals.'
export const Q1A2 =
  'A couple without children. Preparing for the future by establishing a home. Expecting to have or already have a high purchase rate of household and consumer items.'
export const Q1A3 =
  'Young family with a home. You have a mortgage and childcare costs and maintain only small cash balances.'
export const Q1A4 =
  'Mature family. You are in your peak earning year and your mortgage, is under control. you both work and you may or may not have children that are growing up or have left home. you are ready to start thinking about your retirement years.'
export const Q1A5 =
  'Preparing for retirement. You own your home and have few financial burdens; you want to ensure you can afford a comfortable retirement.'
export const Q1A6 =
  'Retired. You rely on existing funds and investments to maintain your lifestyle in retirement. You may already be received a Government pension and/or Superannuation pension.'
export const Q2 = 'How familiar are you with investment matters?'
export const Q2A1 =
  'Not familiar at all with  investments and feel uncomfortable with the complexity'
export const Q2A2 = 'Not very familiar when it comes to investments.'
export const Q2A3 = `Somewhat familiar. I don't fully understand investments, including the share market.`
export const Q2A4 =
  'Fairly familiar. I understand the various factors which influence investment performance.'
export const Q2A5 =
  'Very familiar. I use research and other investment information to make investment decisions. I understand the various factors which influence investment performance.'
export const Q3 =
  'How long have you been investing, not counting your own home or bank-type deposits?'
export const Q3A1 = '3 years or more'
export const Q3A2 = 'Up to 3 years.'
export const Q3A3 = 'This is my / our first investment'
export const Q4 =
  'How long would you invest the majority of your money before you think you would need access to it? (Assuming you already have plans in place to meet short-term cashflow and/or emergencies.)'
export const Q4A1 = 'In 2 years or less.'
export const Q4A2 = 'Within 3-5 years'
export const Q4A3 = 'Within 6-10 years'
export const Q4A4 = 'Over 10 years'
export const Q5 =
  'Assume you had an investment portfolio worth Rs. 20,00,000. If, due to market conditions, your portfolio fell to Rs.16,00,000 within a short period, say a month, would you:(if your portfolio has experienced a drop like this, choose the answer that corresponds to your action)'
export const Q5A1 = 'Sell all of the investments. You do not intend to take risks'
export const Q5A2 =
  'Sell a portion of your portfolio to cut your losses and reinvest into more secure investment sectors.'
export const Q5A3 = 'Hold the investment and sell nothing, expecting performance to improve.'
export const Q5A4 = 'Invest more funds to lower your average investment price.'
export const Q6 =
  'How secure is your current & future income from sources such as salary? pensions or other investments?'
export const Q6A1 = 'Not secure'
export const Q6A2 = 'Somewhat secure'
export const Q6A3 = 'fairly secure'
export const Q6A4 = 'Very secure.'
export const Q7 = 'How would you describe your savings status?'
export const Q7A1 = 'Just about managed to make ends meet; no monthly savings'
export const Q7A2 = 'My PF and other employment benefits are my only source of savings'
export const Q7A3 = 'I put aside up to 25% of my monthly income as savings'
export const Q7A4 = 'I put aside over 25% of my monthly income as savings.'
export const Q7A5 =
  'My savings are high; income from my wealth itself adequately provides for my cost of living'
export const Q8 = 'Apart from your home, have you ever borrowed money to make an investment?'
export const Q8A1 =
  'I believe in investments only from my surpluses and savings. I do not believe in borrowing money to make an investment, apart from a home.'
export const Q8A2 =
  'If the investment seems much more rewarding than the cost of borrowing and is very safe. I can consider borrowing up to 15% of my total assets.'
export const Q8A3 =
  'If the investment seems much more rewarding than cost of borrowing. I can consider borrowing up to 25% of my total assets even at the risk of minor loss or principal.'
export const Q8A4 =
  'I am a high-risk seeker. I can leverage reasonably high to make big returns in a quick time. I am fine risking the principal value of my investment for the same.'

export const documentTypeData = [
  {label: 'GSTIN', value: 'GSTIN'},
  {label: 'Other', value: 'Other'},
]

export const sections = {
  personal: [
    'gender',
    'status',
    'operationalStatus',
    'assignedBy',
    'nationality',
    'occupationDesc',
    'occupation',
    'firstName',
    'lastName',
    'contactNo',
    'email',
    'referal',
    'addressLine1',
    'probability',
    'addressLine2',
    'country',
    'state',
    'city',
    'dob',
    'maritalStatus',
    'politicalExposure',
    'riskAppetite',
    'pin',
    'alternateMobileNo',
    'tentativeAmount',
    'tentativeFollowUpDate',
    'referalType',
    'statusName',
    'middleName',
    'fatherName',
    'motherName',
    'maidenName',
    'cityOfBirth',
    'countryOfBirth',
    'isNRI',
    'sourceName',
  ],
  kyc: [
    'taxIdentificationDoc',
    'addressProofDoc',
    'cancelledCheque',
    'photo',
    'birthCertificate',
    'overseasAddressProof',
    'passport',
    'visa',
    'immigration',
    'pioCard',
    'aadharNo',
    'panNo',
    'aadharDocument',
    'panDocument',
  ],
  nri: ['isTaxResidencyOtherThanIndia', 'taxResidencyCountry', 'taxIdentificationNo'],
  investment: [
    'investmentGoal',
    'investmentHorizon',
    'annualIncome',
    'currentWorth',
    'currentHoldinginEquity',
    'currentHoldinginDebt',
    'immediateFinanceNeeds',
    'sourceOfIncome',
  ],
  riskProfile: ['riskQ1', 'riskQ2', 'riskQ3', 'riskQ4', 'riskQ5', 'riskQ6', 'riskQ7', 'riskQ8'],
}
export const handleDocumentsChange = (
  value: string | null | File,
  inputName: string,
  index: number,
  setFormField: Function,
  documents: SalestInputType['documents'],
  inputError: InputErrorType,
  setInputError: Function
) => {
  let data: SalestInputType['documents'] = [...documents]
  if (inputName === 'documentType') {
    data[index] = {
      ...data[index],
      documentType: value?.toString() ?? '',
      otherDocumentType: '',
    }
  } else {
    data[index] = {
      ...data[index],
      [inputName as keyof SalestInputType['documents'][number]]: value ?? '',
    }
  }
  setFormField((formField: SalestInputType) => ({
    ...formField,
    documents: [...data],
  }))
  clearInputError(`${inputName}${index}`, inputError, setInputError)
}

export const handleNominationsChange = (
  value: string | null | File | boolean,
  inputName: string,
  index: number,
  setFormField: Function,
  nominations: SalestInputType['nominations'],
  inputError: InputErrorType,
  setInputError: Function,
  address?: string
) => {
  let data: SalestInputType['nominations'] = [...nominations]
  if (inputName === 'dob' && Math.abs(Number(calculateAge(value?.toString() ?? ''))) > 18) {
    data[index] = {
      ...data[index],
      dob: value?.toString() ?? '',
      guardianAddress: '',
      guardianContactNo: '',
      guardianFirstName: '',
      guardianLastName: '',
      nomineePanCard: null,
    }
  } else if (inputName === 'isAddressSame') {
    clearInputError(`address${index}`, inputError, setInputError)
    data[index] = {
      ...data[index],
      isAddressSame: value === true ? true : false,
      address: value === true ? address ?? '' : '',
    }
  } else {
    data[index] = {
      ...data[index],
      [inputName as keyof SalestInputType['nominations'][number]]: value ?? '',
    }
  }
  setFormField((formField: SalestInputType) => ({
    ...formField,
    nominations: [...data],
  }))
  if (inputName === 'percentage') {
    clearInputError(`percentage`, inputError, setInputError)
  }
  clearInputError(`${inputName}${index}`, inputError, setInputError)
}

export const handleProductChange = (
  value: string | null | File | boolean,
  inputName: string,
  index: number,
  setFormField: Function,
  products: SalestInputType['products'],
  productdata: any,
  mainProductsIndex: number,
  inputError: InputErrorType,
  setInputError: Function
) => {
  let data: SalestInputType['products'] = [...products]
  let error: InputErrorType = {...inputError}
  data[mainProductsIndex].product[index] = {
    ...data[mainProductsIndex].product[index],
    [inputName as keyof SalestInputType['products'][number]['product']]: value ?? '',
  }
  if (
    (index === 0 || data[mainProductsIndex].product[index].type !== 'Addon') &&
    inputName === 'startDate'
  ) {
    data[mainProductsIndex].product[index] = {
      ...data[mainProductsIndex].product[index],
      [inputName as keyof SalestInputType['products'][number]['product']]: value ?? '',
      endDate: edate(value, 12),
    }
  } else if (inputName === 'status' && value !== '16') {
    if (`${mainProductsIndex}profitPercent${index}` in inputError)
      delete error[`${mainProductsIndex}profitPercent${index}`]
    if (`${mainProductsIndex}profitPlan${index}` in inputError)
      delete error[`${mainProductsIndex}profitPlan${index}`]
    if (`${mainProductsIndex}companyFee${index}` in inputError)
      delete error[`${mainProductsIndex}companyFee${index}`]
    if (inputError[`${mainProductsIndex}startDate${index}`] === 'Start Date is required') {
      if (`${mainProductsIndex}startDate${index}` in inputError)
        delete error[`${mainProductsIndex}startDate${index}`]
    }
    if (inputError[`${mainProductsIndex}endDate${index}`] === 'End Date is required') {
      if (`${mainProductsIndex}endDate${index}` in inputError)
        delete error[`${mainProductsIndex}endDate${index}`]
    }
    if (inputError[`${mainProductsIndex}amount${index}`] === 'Amount is required') {
      if (`${mainProductsIndex}amount${index}` in inputError)
        delete error[`${mainProductsIndex}amount${index}`]
    }
    data[mainProductsIndex].product[index] = {
      ...data[mainProductsIndex].product[index],
      [inputName as keyof SalestInputType['products'][number]['product']]: value ?? '',
      companyFee: '',
      profitPercent: productdata.profitPercent,
      profitPlan: productdata.profitPlan,
    }
  }
  setFormField((formField: SalestInputType) => ({
    ...formField,
    products: [...data],
  }))
  if (`${mainProductsIndex}${inputName}${index}` in inputError)
    delete error[`${mainProductsIndex}${inputName}${index}`]
  setInputError(error)
  // clearInputError(`${mainProductsIndex}${inputName}${index}`, inputError, setInputError)
}

export const handleProductRenewalChange = (
  value: string | null | File | boolean,
  inputName: string,
  index: number,
  subIndex: number,
  setFormField: Function,
  products: SalestInputType['products'],
  mainProductsIndex: number
) => {
  let data: SalestInputType['products'] = [...products]
  data[mainProductsIndex].product[index].renewalData[subIndex] = {
    ...data[mainProductsIndex].product[index].renewalData[subIndex],
    [inputName as keyof SalestInputType['products'][number]['product'][number]['renewalData'][number]]:
      value ?? '',
  }
  setFormField((formField: SalestInputType) => ({
    ...formField,
    products: [...data],
  }))
}

export const getSalesProspectByID = (
  id: string,
  formField: SalestInputType,
  setFormField: Function,
  prospectFormField: ProspectInputType,
  setProspectFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setShowForm: Function,
  setState: Function,
  setCity: Function,
  setCityOfBirth: Function,
  setSelectedProducts: Function
) => {
  const {currentDate} = getDate()
  getSalesProspectsById(id).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      res?.data?.country?.id && getStateDataByCountry(res?.data?.country?.id ?? '', setState)
      res?.data?.state?.id && getCityDataByState(res?.data?.state?.id, setCity)
      res?.data?.birthCountry?.id &&
        getCityDataByCountry(res?.data?.birthCountry?.id ?? '', setCityOfBirth)
      let documents: SalestInputType['documents'] = []
      let nominations: SalestInputType['nominations'] = []
      let aadharDocument: File | null = null
      let panDocument: File | null = null
      let photo: File | null = null
      let addressProofDoc: File | null = null
      let cancelledCheque: File | null = null
      let overseasAddressProof: File | null = null
      let passport: File | null = null
      let visa: File | null = null
      let immigration: File | null = null
      let pioCard: File | null = null
      let taxIdentificationDoc: File | null = null
      let birthCertificate: File | null = null

      res?.data?.document?.map(
        (doc: {
          id: string
          documentType: string
          fileName: string
          fileData: {data: Buffer; type: string}
          remark: string
        }) => {
          const uint8Array = new Uint8Array(doc.fileData.data)
          const blob = new Blob([uint8Array], {type: 'image/png'}) // Set the appropriate MIME type
          const file = new File([blob], doc.fileName, {type: 'image/png'})
          if (doc.documentType === 'Aadhar') {
            aadharDocument = file
          } else if (doc.documentType === 'Pan') {
            panDocument = file
          } else if (doc.documentType === 'Address Proof') {
            addressProofDoc = file
          } else if (doc.documentType === 'Photo') {
            photo = file
          } else if (doc.documentType === 'Cancelled Cheque') {
            cancelledCheque = file
          } else if (doc.documentType === 'Overseas Address Proof') {
            overseasAddressProof = file
          } else if (doc.documentType === 'Passport') {
            passport = file
          } else if (doc.documentType === 'Visa') {
            visa = file
          } else if (doc.documentType === 'Immigration') {
            immigration = file
          } else if (doc.documentType === 'PIO & OCI Card') {
            pioCard = file
          } else if (doc.documentType === 'Tax Identification Document') {
            taxIdentificationDoc = file
          } else if (doc.documentType === 'Birth Certificate') {
            birthCertificate = file
          } else {
            documents.push({
              documentType:
                documentTypeData.filter((document) => document.value === doc.documentType).length >
                0
                  ? doc.documentType
                  : 'Other',
              fileName: file,
              remark: doc.remark,
              otherDocumentType:
                documentTypeData.filter((document) => document.value === doc.documentType).length >
                0
                  ? ''
                  : doc.documentType,
              id: doc.id,
            })
          }
        }
      )
      res?.data?.nomination?.map(
        (nomination: {
          dob: string
          firstName: string
          gaurdianAddress: string
          gaurdianContact: string
          gaurdianFirstName: string
          gaurdianLastName: string
          id: string
          isMinor: boolean
          lastName: string
          percentage: string
          relation: string
          gaurdianRelation: string
          address: string
          isAddressSame: boolean
          panCard: {fileName: string; fileData: {data: Buffer; type: string}}
        }) => {
          let panCard: File | null = null
          if (nomination.panCard !== null) {
            const uint8Array = new Uint8Array(nomination.panCard?.fileData.data)
            const blob = new Blob([uint8Array], {type: 'image/png'}) // Set the appropriate MIME type
            panCard = new File([blob], nomination.panCard?.fileName, {type: 'image/png'})
          }
          nominations.push({
            id: nomination?.id,
            firstName: nomination?.firstName ?? '',
            lastName: nomination?.lastName ?? '',
            relation: nomination?.relation ?? '',
            guardianContactNo: nomination?.gaurdianContact ?? '',
            dob: nomination?.dob ?? '',
            guardianFirstName: nomination?.gaurdianFirstName ?? '',
            guardianLastName: nomination?.gaurdianLastName ?? '',
            guardianAddress: nomination?.gaurdianAddress ?? '',
            percentage: nomination?.percentage ?? '',
            guardianRelation: nomination?.gaurdianRelation ?? '',
            address: nomination?.address?.trim(),
            nomineePanCard: panCard,
            isAddressSame: nomination.isAddressSame,
          })
        }
      )
      interface ClientProducts {
        endDate: string
        amount: string
        id: string
        product: {id: string}
        startDate: string
        status: {code: string}
        subCategory: string
        profitPercent: string
        companyFee: string
        type: string
        parentId: {id: string} | null
        profitPlan: string
        clientProductRenewal: {
          renewalDate: string
          status: {code: string}
          renewalBalance: string
          profitPercent: string
          id: string | null
        }[]
      }
      let products: SalestInputType['products'] = []
      let selectedProducts: string[] = []
      res?.data?.clientProduct?.map((product: ClientProducts) => {
        if (!selectedProducts.includes(product.product.id))
          selectedProducts.push(product.product.id)
      })
      selectedProducts.map((item) => {
        let product = res?.data?.clientProduct?.filter(
          (prd: ClientProducts) => prd.product.id === item
        )
        let formProducts: SalestInputType['products'][number]['product'] = []
        product.map((prd: ClientProducts) => {
          console.log(prd, 'product in get by id')
          formProducts.push({
            id: prd.id,
            status: prd.status.code,
            amount: prd.amount,
            startDate: prd.startDate,
            isDisable:
              prd.status.code === '16' ||
              (prd.type === 'Pipeline' && prd.startDate > currentDate && prd.parentId !== null) ||
              prd.status.code === '21'
                ? true
                : false,
            isStatusDisable:
              prd.clientProductRenewal.some((item) => item.status.code === '20') ||
              (prd.status.code === '16' && prd.clientProductRenewal.length === 0) ||
              (prd.type === 'Pipeline' && prd.startDate > currentDate && prd.parentId !== null) ||
              prd.status.code === '21'
                ? true
                : false,
            isNew: prd.status.code === '16' ? false : true,
            endDate: prd.endDate,
            parentId: prd?.parentId?.id ?? null,
            type: prd.type,
            subCategory: prd.subCategory,
            companyFee: prd.companyFee,
            profitPercent: prd.profitPercent,
            profitPlan: prd.profitPlan,
            renewalData: prd.clientProductRenewal.map((renewaldata) => {
              return {
                id: renewaldata.id,
                profitPercent: renewaldata.profitPercent,
                renewalBalance: renewaldata.renewalBalance,
                renewalDate: renewaldata.renewalDate,
                status: renewaldata.status.code,
                isDisabled: renewaldata.status.code === '20' ? true : false,
              }
            }),
          })
        })
        products.push({
          product: formProducts,
          productId: item,
        })
      })
      setSelectedProducts(selectedProducts)
      setFormField({
        ...formField,
        nominations: nominations.length > 0 ? nominations : SalesInitialInput.nominations,
        aadharDocument: aadharDocument,
        panDocument: panDocument,
        aadharNo: res.data?.aadharNo,
        photo: photo,
        cancelledCheque: cancelledCheque,
        addressProofDoc: addressProofDoc,
        overseasAddressProof: overseasAddressProof,
        passport: passport,
        visa: visa,
        immigration: immigration,
        pioCard: pioCard,
        birthCertificate: birthCertificate,
        taxIdentificationDoc: taxIdentificationDoc,
        panNo: res.data?.panNo,
        documents: documents.length > 0 ? documents : SalesInitialInput.documents,
        investmentGoal: res?.data?.interest?.invenstmentGoal ?? '',
        investmentHorizon: res?.data?.interest?.investmentHorizon ?? '',
        annualIncome: res?.data?.interest?.annualIncome ?? '',
        currentWorth: res?.data?.interest?.currentWorth ?? '',
        currentHoldinginEquity: res?.data?.interest?.currentHoldingsInEquity ?? '',
        currentHoldinginDebt: res?.data?.interest?.currentHoldingsInDebt ?? '',
        sourceOfIncome: res?.data?.interest?.sourceOfIncome ?? '',
        immediateFinanceNeeds: res?.data?.interest?.immediateFinanceNeeds ?? '',
        status: res?.data?.status ?? '',
        riskQ1: res?.data?.riskProfile[0]?.answer ?? '',
        riskQ2: res?.data?.riskProfile[1]?.answer ?? '',
        riskQ3: res?.data?.riskProfile[2]?.answer ?? '',
        riskQ4: res?.data?.riskProfile[3]?.answer ?? '',
        riskQ5: res?.data?.riskProfile[4]?.answer ?? '',
        riskQ6: res?.data?.riskProfile[5]?.answer ?? '',
        riskQ7: res?.data?.riskProfile[6]?.answer ?? '',
        riskQ8: res?.data?.riskProfile[7]?.answer ?? '',
        isTaxResidencyOtherThanIndia: res?.data?.isTaxResidencyOtherThanIndia ?? '',
        taxResidencyCountry: res?.data?.taxResidencyCountry?.id ?? '',
        taxIdentificationNo: res?.data?.taxIdentificationNo ?? '',
        products,
      })
      setProspectFormField({
        ...prospectFormField,
        firstName: res?.data?.firstName ?? '',
        lastName: res?.data?.lastName ?? '',
        middleName: res?.data?.middleName ?? '',
        fatherName: res?.data?.fatherName ?? '',
        motherName: res?.data?.motherName ?? '',
        maidenName: res?.data?.maidenName ?? '',
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
        statusName: res?.data?.operationalStatus?.name ?? res?.data?.status?.name ?? '',
        cityOfBirth: res?.data?.birthCity?.id ?? '',
        countryOfBirth: res?.data?.birthCountry?.id ?? '',
        isNRI: res?.data?.isNri ?? '',
      })
      setEditId(id)
      setShowForm(true)
      setInputError({})
    } else {
      setShowForm(false)
      Message(res.message, 'error')
    }
  })
}

export const AddDocuments = (setFormField: Function) => {
  let newfield: SalestInputType['documents'][number] = {...SalesInitialInput.documents[0]}
  setFormField((formField: SalestInputType) => ({
    ...formField,
    documents: [...formField.documents, newfield],
  }))
}

export const addProduct = (
  setFormField: Function,
  parentId: string | null,
  products: SalestInputType['products'],
  mainProductsIndex: number
) => {
  let data: SalestInputType['products'] = [...products]
  let existingProduct = data[mainProductsIndex].product.filter((item) => item.id === parentId)[0]
  data[mainProductsIndex].product = [
    ...data[mainProductsIndex].product,
    {
      id: null,
      startDate: '',
      status: '17',
      amount: '',
      isDisable: false,
      isNew: true,
      endDate: existingProduct.endDate,
      subCategory: existingProduct.subCategory,
      profitPercent: existingProduct.profitPercent,
      companyFee: '',
      profitPlan: existingProduct.profitPlan,
      parentId: parentId,
      type: 'Addon',
      isStatusDisable: false,
      renewalData: [],
    },
  ]

  setFormField((formField: SalestInputType) => ({
    ...formField,
    products: [...data],
  }))
}

export const AddNominations = (setFormField: Function) => {
  let newfield: SalestInputType['nominations'][number] = {...SalesInitialInput.nominations[0]}
  setFormField((formField: SalestInputType) => ({
    ...formField,
    nominations: [...formField.nominations, newfield],
  }))
}

export const RemoveNominations = (
  index: number,
  setFormField: Function,
  formField: SalestInputType,
  inputError: InputErrorType,
  setInputError: Function
) => {
  let data: SalestInputType['nominations'] = [...formField.nominations]
  let error: InputErrorType = {...inputError}
  data.map((_, index) => {
    if (`firstName${index}` in inputError) delete error[`firstName${index}`]
    if (`lastName${index}` in inputError) delete error[`lastName${index}`]
    if (`dob${index}` in inputError) delete error[`dob${index}`]
    if (`relation${index}` in inputError) delete error[`relation${index}`]
    if (`guardianFirstName${index}` in inputError) delete error[`guardianFirstName${index}`]
    if (`guardianLastName${index}` in inputError) delete error[`guardianLastName${index}`]
    if (`guardianContactNo${index}` in inputError) delete error[`guardianContactNo${index}`]
    if (`guadrianAddress${index}` in inputError) delete error[`guadrianAddress${index}`]
  })
  data.splice(index, 1)
  setFormField({
    ...formField,
    nominations: data,
  })
  setInputError(error)
}

export const removeProducts = (
  index: number,
  mainProductsIndex: number,
  setFormField: Function,
  formField: SalestInputType,
  inputError: InputErrorType,
  setInputError: Function
) => {
  let data: SalestInputType['products'] = [...formField.products]
  let error: InputErrorType = {...inputError}

  data[mainProductsIndex].product.map((_, index) => {
    if (`${mainProductsIndex}startDate${index}` in inputError)
      delete error[`${mainProductsIndex}startDate${index}`]
    if (`${mainProductsIndex}endDate${index}` in inputError)
      delete error[`${mainProductsIndex}endDate${index}`]
    if (`${mainProductsIndex}amount${index}` in inputError)
      delete error[`${mainProductsIndex}amount${index}`]
    if (`${mainProductsIndex}status${index}` in inputError)
      delete error[`${mainProductsIndex}status${index}`]
    if (`${mainProductsIndex}profitPercent${index}` in inputError)
      delete error[`${mainProductsIndex}profitPercent${index}`]
    if (`${mainProductsIndex}profitPlan${index}` in inputError)
      delete error[`${mainProductsIndex}profitPlan${index}`]
  })
  data[mainProductsIndex].product.splice(index, 1)
  setFormField({
    ...formField,
    products: data,
  })
  setInputError(error)
}

export const RemoveDocuments = (
  index: number,
  setFormField: Function,
  formField: SalestInputType,
  inputError: InputErrorType,
  setInputError: Function
) => {
  let data: SalestInputType['documents'] = [...formField.documents]
  let error: InputErrorType = {...inputError}
  data.map((_, index) => {
    if (`documentType${index}` in inputError) delete error[`documentType${index}`]
    if (`fileName${index}` in inputError) delete error[`fileName${index}`]
  })
  data.splice(index, 1)
  setFormField({
    ...formField,
    documents: data,
  })
  setInputError(error)
}

export const validateForm = (
  formField: SalestInputType,
  prospectFormField: ProspectInputType,
  products: {
    label: string
    value: string
    category: string
    subCategory: string
    name: string
    totalTicketSize: string
    disabled: boolean
    profitPercent: string
    profitPlan: string
    productsTicketSize: ProductMasterOutput['data'][number]['productsTicketSize']
  }[]
) => {
  let invalidCharacters = /[<>"\\|?*\x00-\x1F~`!@^+='[\]{}#$]/
  let salesErrorCnt: number = 0
  const salesError: InputErrorType = {}
  let {error, cnt} = validateProspectForm(prospectFormField)
  let addressRegex = /^[a-zA-Z0-9][\w\W]*[a-zA-Z0-9)]+$/
  let addressInvalidCharacters = /[<>:"\\|?*\x00-\x1F~`!@#^+=;'[\]{}%_&$]/
  let alphaRegex = /^[a-z][a-z .']*[a-z]*$/i
  let fileregex = /^.+\.(png|jpg|jpeg|pdf)$/i
  const isFormMandatory =
    Number(prospectFormField.operationalStatus) > 2 || Number(prospectFormField.status) === 5
  const {currentDate} = getDate()
  const prospectError: InputErrorType = error
  if (!formField.riskQ1 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ1 = 'Please select at least one option'
  }
  if (!formField.riskQ2 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    console.log('formField.riskQ2:', formField.riskQ2)
    console.log(
      'Number(prospectFormField?.operationalStatus):',
      Number(prospectFormField?.operationalStatus)
    )

    salesError.riskQ2 = 'Please select at least one option'
  }
  if (!formField.riskQ3 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ3 = 'Please select at least one option'
  }
  if (!formField.riskQ4 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ4 = 'Please select at least one option'
  }
  if (!formField.riskQ5 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ5 = 'Please select at least one option'
  }
  if (!formField.riskQ6 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ6 = 'Please select at least one option'
  }
  if (!formField.riskQ7 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ7 = 'Please select at least one option'
  }
  if (!formField.riskQ8 && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.riskQ8 = 'Please select at least one option'
  }
  if (!formField.investmentGoal && isFormMandatory) {
    salesError.investmentGoal = 'Investment Goal is required.'
    salesErrorCnt = salesErrorCnt + 1
  }
  if (!formField.investmentHorizon && isFormMandatory) {
    salesError.investmentHorizon = 'Investment Horizon is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.investmentHorizon) {
    if (Number(formField.investmentHorizon) <= 0) {
      cnt = cnt + 1
      salesError.investmentHorizon = 'Investment Horizon should be greater than zero'
    }
    if (formField.investmentHorizon.toString().replaceAll('.', '').length > 10) {
      cnt = cnt + 1
      salesError.investmentHorizon = 'Investment Horizon should not be greater than 10 digits'
    }
  }
  if (!formField.annualIncome && isFormMandatory) {
    salesError.annualIncome = 'Annual Income is required.'
    salesErrorCnt = salesErrorCnt + 1
  }

  if (!formField.aadharNo && Number(prospectFormField.status) === 5) {
    salesError.aadharNo = 'Aadhar No is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.aadharNo) {
    if (formField.aadharNo.toString().replaceAll('.', '').length != 12) {
      cnt = cnt + 1
      salesError.aadharNo = 'Aadhar No should be 12 digits'
    }
  }

  if (!formField.panNo && Number(prospectFormField.status) === 5) {
    salesError.panNo = 'PAN No is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.panNo) {
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(formField.panNo.toUpperCase())) {
      cnt = cnt + 1
      salesError.panNo = 'PAN No should be in the format ABCDE1234F'
    }
  }

  if (!formField.currentWorth && isFormMandatory) {
    salesError.currentWorth = 'Current Worth is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.currentWorth) {
    if (Number(formField.currentWorth) <= 0) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.currentWorth = 'Current Worth should be greater than zero'
    }
    if (formField.currentWorth.toString().replaceAll('.', '').length > 10) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.currentWorth = 'Current Worth should not be greater than 10 digits'
    }
  }

  if (!formField.currentHoldinginDebt && isFormMandatory) {
    salesError.currentHoldinginDebt = 'Current Holding in Debt is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.currentHoldinginDebt) {
    if (Number(formField.currentHoldinginDebt) <= 0) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.currentHoldinginDebt = 'Current Holding in Debt should be greater than zero'
    }
    if (formField.currentHoldinginDebt.toString().replaceAll('.', '').length > 10) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.currentHoldinginDebt =
        'Current Holding in Debt should not be greater than 10 digits'
    }
  }

  if (!formField.immediateFinanceNeeds && isFormMandatory) {
    salesError.immediateFinanceNeeds = 'Immediate Finance is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.immediateFinanceNeeds) {
    if (Number(formField.immediateFinanceNeeds) <= 0) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.immediateFinanceNeeds = 'Immediate Finance should be greater than zero'
    }
    if (formField.immediateFinanceNeeds.toString().replaceAll('.', '').length > 10) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.immediateFinanceNeeds = 'Immediate Finance should not be greater than 10 digits'
    }
  }

  if (!formField.currentHoldinginEquity && isFormMandatory) {
    salesError.currentHoldinginEquity = 'Current Holding in Equity is required.'
    salesErrorCnt = salesErrorCnt + 1
  } else if (formField.currentHoldinginEquity) {
    if (Number(formField.currentHoldinginEquity) <= 0) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.currentHoldinginEquity = 'Current Holding in Equity should be greater than zero'
    }
    if (formField.currentHoldinginEquity.toString().replaceAll('.', '').length > 10) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.currentHoldinginEquity =
        'Current Holding in Equity should not be greater than 10 digits'
    }
  }

  formField.documents.map((doc, index) => {
    if (doc.documentType === 'Other') {
      if (!doc.otherDocumentType.trim()) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`otherDocumentType${index}`] = 'Document Type is required.'
      } else {
        if (!alphaRegex.test(doc.otherDocumentType.trim())) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`otherDocumentType${index}`] =
            "Only letters (a-z,A-Z) and single space , . , 'between two characters are allowed and last or first character of the Document Type must be letter (a-z,A-Z)"
        } else if (/(?=([^\w\d]))\1{2,}/g.test(doc.otherDocumentType.trim())) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`otherDocumentType${index}`] =
            "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Document Type must be letter (a-z,A-Z)"
        } else {
          if (doc.otherDocumentType.replaceAll(' ', '').length > 50) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`otherDocumentType${index}`] =
              'Document Type should not be greater than 50 characters'
          }
        }
      }
    }

    if (doc.documentType && !doc.fileName) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`fileName${index}`] = 'File is required.'
    } else if (doc.fileName) {
      if (!fileregex.test(doc.fileName.name)) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`fileName${index}`] = 'File type is not allowed'
      }
    }

    if (doc.remark) {
      if (invalidCharacters.test(doc.remark.trim())) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`remark${index}`] = 'Only ( ) , . - / % : ; _ & this Special Characters allowed'
      }
    }
  })

  if (
    !formField.birthCertificate &&
    Number(prospectFormField.status) === 5 &&
    Math.abs(Number(calculateAge(prospectFormField.dob))) < 18
  ) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.birthCertificate = 'Birth Certificate is required.'
  } else if (formField.birthCertificate) {
    if (!fileregex.test(formField.birthCertificate?.name ?? '')) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.birthCertificate = 'File type is not allowed'
    }
  }

  if (!formField.aadharDocument && Number(prospectFormField.status) === 5) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.aadharDocument = 'Aadhar card is required.'
  } else if (formField.aadharDocument) {
    if (!fileregex.test(formField.aadharDocument?.name ?? '')) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.aadharDocument = 'File type is not allowed'
    }
  }

  if (!formField.panDocument && Number(prospectFormField.status) === 5) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.panDocument = 'Pan card is required.'
  } else if (formField.panDocument) {
    if (!fileregex.test(formField.panDocument?.name ?? '')) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.panDocument = 'File type is not allowed'
    }
  }

  if (!formField.cancelledCheque && Number(prospectFormField.status) === 5) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.cancelledCheque = 'Cancelled Cheque is required.'
  } else if (formField.cancelledCheque) {
    if (!fileregex.test(formField.cancelledCheque?.name ?? '')) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.cancelledCheque = 'File type is not allowed'
    }
  }

  if (!formField.photo && Number(prospectFormField.status) === 5) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.photo = 'Cancelled Cheque is required.'
  } else if (formField.photo) {
    if (!fileregex.test(formField.photo?.name ?? '')) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.photo = 'File type is not allowed'
    }
  }

  if (!formField.addressProofDoc && Number(prospectFormField.status) === 5) {
    salesErrorCnt = salesErrorCnt + 1
    salesError.addressProofDoc = 'Address Proof Doc is required.'
  } else if (formField.addressProofDoc) {
    if (!fileregex.test(formField.addressProofDoc?.name ?? '')) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.addressProofDoc = 'File type is not allowed'
    }
  }

  if (prospectFormField.isNRI === 'NRI') {
    if (!formField.overseasAddressProof && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.overseasAddressProof = 'Overseas Address Document is required.'
    } else if (formField.overseasAddressProof) {
      if (!fileregex.test(formField.overseasAddressProof?.name ?? '')) {
        salesErrorCnt = salesErrorCnt + 1
        salesError.overseasAddressProof = 'File type is not allowed'
      }
    }
    if (!formField.passport && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.passport = 'Passport is required.'
    } else if (formField.passport) {
      if (!fileregex.test(formField.passport?.name ?? '')) {
        salesErrorCnt = salesErrorCnt + 1
        salesError.passport = 'File type is not allowed'
      }
    }
    if (!formField.visa && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.visa = 'Visa is required.'
    } else if (formField.visa) {
      if (!fileregex.test(formField.visa?.name ?? '')) {
        salesErrorCnt = salesErrorCnt + 1
        salesError.visa = 'File type is not allowed'
      }
    }
    if (!formField.immigration && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.immigration = 'Immigration is required.'
    } else if (formField.immigration) {
      if (!fileregex.test(formField.immigration?.name ?? '')) {
        salesErrorCnt = salesErrorCnt + 1
        salesError.immigration = 'File type is not allowed'
      }
    }
    if (!formField.pioCard && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError.pioCard = 'Pio & IOC Card is required.'
    } else if (formField.pioCard) {
      if (!fileregex.test(formField.pioCard?.name ?? '')) {
        salesErrorCnt = salesErrorCnt + 1
        salesError.pioCard = 'File type is not allowed'
      }
    }
    if (
      !formField.isTaxResidencyOtherThanIndia &&
      Number(prospectFormField?.operationalStatus) > 2
    ) {
      salesError.isTaxResidencyOtherThanIndia = 'Tax Residency other than India or not is required.'
      salesErrorCnt = salesErrorCnt + 1
    } else {
      if (formField.isTaxResidencyOtherThanIndia === 'Yes') {
        if (!formField.taxResidencyCountry && Number(prospectFormField.status) === 5) {
          salesError.taxResidencyCountry = 'Country of tax residency is required.'
          salesErrorCnt = salesErrorCnt + 1
        }

        if (!formField.taxIdentificationNo && Number(prospectFormField.status) === 5) {
          salesError.taxIdentificationNo = 'Tax payer identification No is required.'
          salesErrorCnt = salesErrorCnt + 1
        }
        if (!formField.taxIdentificationDoc && Number(prospectFormField.status) === 5) {
          salesErrorCnt = salesErrorCnt + 1
          salesError.taxIdentificationDoc = 'Tax Identification Document is required.'
        } else if (formField.taxIdentificationDoc) {
          if (!fileregex.test(formField.taxIdentificationDoc?.name ?? '')) {
            salesErrorCnt = salesErrorCnt + 1
            salesError.taxIdentificationDoc = 'File type is not allowed'
          }
        }
      }
    }
  }
  if (!formField.sourceOfIncome.trim() && isFormMandatory) {
    salesErrorCnt = salesErrorCnt + 1
    salesError[`sourceOfIncome`] = 'Source Of Income is required.'
  } else if (formField.sourceOfIncome) {
    if (formField.sourceOfIncome.replaceAll(' ', '').length <= 2) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`sourceOfIncome`] = 'Source Of Income must be greater than 2 characters'
    } else {
      if (!addressRegex.test(formField.sourceOfIncome.trim())) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`sourceOfIncome`] =
          'Source Of Income must start with letter or number and end with letter, numbers or )'
      } else {
        if (addressInvalidCharacters.test(formField.sourceOfIncome.trim())) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`sourceOfIncome`] = 'Only ( ) , . - / this Special Characters allowed '
        } else if (/(?=([^\w\d]))\1{2,}/g.test(formField.sourceOfIncome.trim())) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`sourceOfIncome`] = 'Recurring Special Characters are not allowed'
        } else {
          if (formField.sourceOfIncome.replaceAll(' ', '').length > 50) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`sourceOfIncome`] =
              'Source Of Income should not be greater than 50 characters'
          }
        }
      }
    }
  }
  let percentage = 0
  formField.nominations.map((nomination, index) => {
    if (!nomination.dob && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`dob${index}`] = 'Date of birth should not be blank/invalid'
    } else if (nomination.dob) {
      let newDate = nomination.dob.split('-')
      if (newDate[0].length > 4) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`dob${index}`] = 'Year is invalid'
      } else if (nomination.dob > currentDate) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`dob${index}`] = 'Date of birth should be less than current date'
      } else if (Math.abs(Number(calculateAge(nomination.dob))) < 18) {
        if (!nomination.guardianFirstName.trim() && Number(prospectFormField.status) === 5) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`guardianFirstName${index}`] = 'Guardian First Name is required.'
        } else if (nomination.guardianFirstName) {
          if (!alphaRegex.test(nomination.guardianFirstName.trim())) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianFirstName${index}`] =
              "Only letters (a-z,A-Z) and single space , . , 'between two characters are allowed and last or first character of the First Name must be letter (a-z,A-Z)"
          } else if (/(?=([^\w\d]))\1{2,}/g.test(nomination.guardianFirstName.trim())) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianFirstName${index}`] =
              "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the First Name must be letter (a-z,A-Z)"
          } else {
            if (nomination.guardianFirstName.replaceAll(' ', '').length > 50) {
              salesErrorCnt = salesErrorCnt + 1
              salesError[`guardianFirstName${index}`] =
                'Guardian First Name should not be greater than 50 characters'
            }
          }
        }

        if (!nomination.guardianLastName.trim() && Number(prospectFormField.status) === 5) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`guardianLastName${index}`] = 'Guardian Last Name is required.'
        } else if (nomination.guardianLastName) {
          if (!alphaRegex.test(nomination.guardianLastName.trim())) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianLastName${index}`] =
              "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Last Name must be letter (a-z,A-Z)"
          } else if (/(?=([^\w\d]))\1{2,}/g.test(nomination.guardianLastName.trim())) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianLastName${index}`] =
              "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Last Name must be letter (a-z,A-Z)"
          } else {
            if (nomination.guardianLastName.replaceAll(' ', '').length > 50) {
              salesErrorCnt = salesErrorCnt + 1
              salesError[`guardianLastName${index}`] =
                'Guardian Last Name should not be greater than 50 characters'
            }
          }
        }

        if (!nomination.guardianContactNo.toString() && Number(prospectFormField.status) === 5) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`guardianContactNo${index}`] = 'Contact No. is required.'
        } else if (nomination.guardianContactNo) {
          if (nomination.guardianContactNo.toString().includes('.')) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianContactNo${index}`] = 'Decimal is not allowed in contact no.'
          } else if (nomination.guardianContactNo.toString().replaceAll('.', '').length !== 10) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianContactNo${index}`] = 'Contact No. should be 10 digits'
          }
        }

        if (!nomination.guardianRelation && Number(prospectFormField.status) === 5) {
          salesError[`guardianRelation${index}`] = 'Guardian Relation is required.'
          salesErrorCnt = salesErrorCnt + 1
        }

        if (nomination.guardianAddress.trim() && Number(prospectFormField.status) === 5) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`guardianAddress${index}`] = 'Guardian Address is required.'
        } else if (nomination.guardianAddress) {
          if (nomination.guardianAddress.replaceAll(' ', '').length <= 2) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`guardianAddress${index}`] =
              'Guardian Address must be greater than 2 characters'
          } else {
            if (!addressRegex.test(nomination.guardianAddress.trim())) {
              salesErrorCnt = salesErrorCnt + 1
              salesError[`guardianAddress${index}`] =
                'Guardian Address must start with letter or number and end with letter, numbers or )'
            } else {
              if (addressInvalidCharacters.test(nomination.guardianAddress.trim())) {
                salesErrorCnt = salesErrorCnt + 1
                salesError[`guardianAddress${index}`] =
                  'Only ( ) , . - / this Special Characters allowed '
              } else if (/(?=([^\w\d]))\1{2,}/g.test(nomination.guardianAddress.trim())) {
                salesErrorCnt = salesErrorCnt + 1
                salesError[`guardianAddress${index}`] =
                  'Recurring Special Characters are not allowed'
              } else {
                if (nomination.guardianAddress.replaceAll(' ', '').length > 250) {
                  salesErrorCnt = salesErrorCnt + 1
                  salesError[`guardianAddress${index}`] =
                    'Guardian Address should not be greater than 250 characters'
                }
              }
            }
          }
        }
      }
    }
    if (!nomination?.address?.trim() && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`address${index}`] = 'Address is required.'
    } else if (nomination.address) {
      if (nomination.address.replaceAll(' ', '').length <= 2) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`address${index}`] = 'Address must be greater than 2 characters'
      } else {
        if (!addressRegex.test(nomination.address.trim())) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`address${index}`] =
            'Address must start with letter or number and end with letter, numbers or )'
        } else {
          if (addressInvalidCharacters.test(nomination.address.trim())) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`address${index}`] = 'Only ( ) , . - / this Special Characters allowed '
          } else if (/(?=([^\w\d]))\1{2,}/g.test(nomination.address.trim())) {
            salesErrorCnt = salesErrorCnt + 1
            salesError[`address${index}`] = 'Recurring Special Characters are not allowed'
          } else {
            if (nomination.address.replaceAll(' ', '').length > 250) {
              salesErrorCnt = salesErrorCnt + 1
              salesError[`address${index}`] = 'Address should not be greater than 250 characters'
            }
          }
        }
      }
    }
    if (!nomination?.percentage && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`percentage${index}`] = 'Percentage is required.'
    } else if (nomination.percentage) {
      let value: string = nomination.percentage
      percentage = percentage + Number(nomination.percentage)
      if (Number(nomination.percentage.toString()) < 1) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`percentage${index}`] = 'Percentage should be between 1 to 100.'
      }
      if (Number(nomination.percentage) > 100) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`percentage${index}`] = 'Percentage should be between 1 to 100.'
      }
      if (Number(nomination.percentage) == 100) {
        value = nomination.percentage.split('.')[0]
      }
      if (value.toString().replaceAll('.', '').length > 4) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`percentage${index}`] = 'Percentage should not be greater than 4 digits'
      }
    }
    if (!nomination.firstName.trim() && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`firstName${index}`] = 'First Name is required.'
    } else if (nomination.firstName) {
      if (!alphaRegex.test(nomination.firstName.trim())) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`firstName${index}`] =
          "Only letters (a-z,A-Z) and single space , . , 'between two characters are allowed and last or first character of the First Name must be letter (a-z,A-Z)"
      } else if (/(?=([^\w\d]))\1{2,}/g.test(nomination.firstName.trim())) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`firstName${index}`] =
          "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the First Name must be letter (a-z,A-Z)"
      } else {
        if (nomination.firstName.replaceAll(' ', '').length > 50) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`firstName${index}`] = 'First Name should not be greater than 50 characters'
        }
      }
    }

    if (!nomination.lastName.trim() && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`lastName${index}`] = 'Last Name is required.'
    } else if (nomination.lastName) {
      if (!alphaRegex.test(nomination.lastName.trim())) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`lastName${index}`] =
          "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Last Name must be letter (a-z,A-Z)"
      } else if (/(?=([^\w\d]))\1{2,}/g.test(nomination.lastName.trim())) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`lastName${index}`] =
          "Only letters (a-z,A-Z) and single space , . , ' between two characters are allowed and last or first character of the Last Name must be letter (a-z,A-Z)"
      } else {
        if (nomination.lastName.replaceAll(' ', '').length > 50) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`lastName${index}`] = 'Last Name should not be greater than 50 characters'
        }
      }
    }

    if (!nomination.relation && Number(prospectFormField.status) === 5) {
      salesError[`relation${index}`] = 'Please select Relation.'
      salesErrorCnt = salesErrorCnt + 1
    }

    if (!nomination.nomineePanCard && Number(prospectFormField.status) === 5) {
      salesErrorCnt = salesErrorCnt + 1
      salesError[`nomineePanCard${index}`] = `Nominee's PAN Card is required.`
    } else if (nomination.nomineePanCard) {
      if (!fileregex.test(nomination.nomineePanCard?.name ?? '')) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`nomineePanCard${index}`] = 'File type is not allowed'
      }
    }
  })
  if (percentage !== 100 && percentage !== 0) {
    salesError.percentage = 'Total percentage should be equal to 100'
    salesErrorCnt = salesErrorCnt + 1
  }

  formField.products.map((prd, mainIndex) => {
    let productData = products.filter((product) => product.value === prd.productId)[0]
    prd.product.map((product, index) => {
      if (!product.startDate && Number(product.status) === 16) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`${mainIndex}startDate${index}`] = 'Start Date is required'
      }
      if (product.startDate) {
        let newDate = product.startDate.split('-')
        if (newDate[0].length > 4) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}startDate${index}`] = 'Year is invalid'
        } else if (product.parentId) {
          let existingProduct = prd.product.filter((item) => item.id === product.parentId)[0]
          if (product.type === 'Pipeline') {
            console.log('In pipeline:', existingProduct)
            if (product.startDate < existingProduct.endDate) {
              salesErrorCnt = salesErrorCnt + 1
              salesError[
                `${mainIndex}startDate${index}`
              ] = `Start Date should be greater than ${existingProduct.endDate}`
            }
          } else if (product.type === 'Addon') {
            if (product.startDate < existingProduct.startDate) {
              salesErrorCnt = salesErrorCnt + 1
              salesError[
                `${mainIndex}startDate${index}`
              ] = `Start Date should be greater than or equal to ${existingProduct.startDate}`
            }
          }
        }
      }
      if (!product.endDate && Number(product.status) === 16) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`${mainIndex}endDate${index}`] = 'End Date is required'
      } else if (product.endDate) {
        let newDate = product.endDate.split('-')
        if (newDate[0].length > 4) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}endDate${index}`] = 'Year is invalid'
        } else if (product.startDate && product.endDate < product.startDate) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}endDate${index}`] = 'End Date should be greater than start date'
        }
      }
      // if (!product.status) {
      //   salesError[`${mainIndex}status${index}`] = 'Status is required.'
      //   salesErrorCnt = salesErrorCnt + 1
      // }
      let amount = 0
      if (!product.profitPlan && Number(product.status) === 16) {
        salesError[`${mainIndex}.profitPlan${index}`] = 'Project Plan is required.'
        salesErrorCnt = salesErrorCnt + 1
      }

      if (!product.subCategory && productData?.productsTicketSize.length > 1) {
        salesError[`${mainIndex}subCategory${index}`] = 'Sub Category is required.'
        salesErrorCnt = salesErrorCnt + 1
      } else {
        if (productData?.productsTicketSize.length > 1) {
          productData?.productsTicketSize?.map((productTicketSize) => {
            if (productTicketSize?.subCategory === product.subCategory) {
              amount = Number(productTicketSize?.ticketSize)
            }
          })
        } else {
          amount = Number(productData?.productsTicketSize[0]?.ticketSize)
        }
      }

      if (!product.amount && Number(product.status) === 16) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`${mainIndex}amount${index}`] = 'Amount is required'
      } else if (product.amount) {
        if (Number(product.amount) <= 0) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}amount${index}`] = 'Amount should be greater than zero'
        }
        if (Number(product.amount) < amount) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[
            `${mainIndex}amount${index}`
          ] = `Amount should be greater than or equal to ${amount}`
        } else if (product.amount.toString().replaceAll('.', '').length > 10) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}amount${index}`] = 'Amount should not be greater than 10 digits'
        }
      }

      if (product.companyFee) {
        if (product.companyFee.toString().replaceAll('.', '').length > 10) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}companyFee${index}`] = 'Fee should not be greater than 10 digits'
        }
      }

      if (!product.profitPercent && Number(product.status) === 16) {
        salesErrorCnt = salesErrorCnt + 1
        salesError[`${mainIndex}profitPercent${index}`] = 'Profit % is required'
      } else if (product.profitPercent) {
        if (Number(product.profitPercent) > Number(productData.profitPercent)) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[
            `${mainIndex}profitPercent${index}`
          ] = `Profit % should not be greater than ${productData.profitPercent}`
        } else if (product.profitPercent.toString().replaceAll('.', '').length > 10) {
          salesErrorCnt = salesErrorCnt + 1
          salesError[`${mainIndex}profitPercent${index}`] =
            'Profit % should not be greater than 10 digits'
        }
      }
    })
  })

  cnt = cnt + salesErrorCnt
  return {salesError, cnt, prospectError}
}

//to add/update record for a given master
export const handleSalesSubmit = (
  prospectFormField: ProspectInputType,
  formField: SalestInputType,
  setData: Function,
  setEditId: Function,
  setFormField: Function,
  setProspectFormField: Function,
  editId: string | null,
  setInputError: Function,
  setProspectInputError: Function,
  setSubmitAPIStatus: Function,
  addRecord: Function,
  formType: string,
  buttonType: string,
  setIsFormEditable: Function,
  userId: string | null,
  getUrl: string,
  setSelectedProducts: Function,
  products: {
    label: string
    value: string
    category: string
    subCategory: string
    name: string
    totalTicketSize: string
    disabled: boolean
    profitPercent: string
    profitPlan: string
    productsTicketSize: ProductMasterOutput['data'][number]['productsTicketSize']
  }[],
  setShowForm?: Function
) => {
  if (buttonType === 'verify') {
    prospectFormField.status = '5'
  }
  let {cnt, salesError, prospectError} = validateForm(formField, prospectFormField, products)
  setInputError(salesError)
  console.log(salesError, prospectError)
  setProspectInputError(prospectError)
  if (cnt === 0) {
    if (buttonType === 'Update') {
      setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
      if (!editId) {
        prospectFormField.status = '4'
        prospectFormField.operationalStatus = '1'
      } else {
        if (prospectFormField.operationalStatus === '1' && prospectFormField.status === '4') {
          prospectFormField.operationalStatus = '2'
        }
      }
      addRecord(prospectFormField, formField, editId).then((res: APIResponse) => {
        if (res.statusCode === 200) {
          if (formType === 'user') {
            getRecords(getUrl, setData)
            cancelSalesSubmit(
              setFormField,
              setProspectFormField,
              setEditId,
              setInputError,
              setProspectInputError,
              setSelectedProducts,
              userId,
              setShowForm
            )
            editId
              ? toast.success('Record updated successfully')
              : toast.success('Record created successfully')
          } else {
            toast.success('Saved successfully')
          }
        } else {
          Message(res.message, 'error')
        }
        setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
      })
    } else if (buttonType === 'verify') {
      addRecord(prospectFormField, formField, editId).then((res: APIResponse) => {
        if (res.statusCode === 200) {
          getRecords(getUrl, setData)
          cancelSalesSubmit(
            setFormField,
            setProspectFormField,
            setEditId,
            setInputError,
            setProspectInputError,
            setSelectedProducts,
            userId,
            setShowForm
          )
          toast.success('Sales verified successfully')
        } else {
          Message(res.message, 'error')
        }
        setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
      })
    } else {
      Swal.fire({
        ...AlertProps,
        icon: 'warning',
        title:
          'Changes are not permitted on the form once submitted. Are you sure you want to submit it?',
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
          addRecord(
            {...prospectFormField, operationalStatus: '5', status: '4'},
            formField,
            editId
          ).then((res: APIResponse) => {
            if (res.statusCode === 200) {
              setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
              setProspectFormField((prospectFormField: ProspectInputType) => ({
                ...prospectFormField,
                operationalStatus: res?.data?.operationalStatus?.code ?? '',
                statusName: res?.data?.operationalStatus?.name ?? res?.data?.status?.name ?? '',
                status: res?.data?.status?.code ?? '',
              }))
              toast.success('Form submitted successfully')
              setIsFormEditable(false)
            }
            setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
          })
        }
      })
    }
  }
}

//to reset form and its error message
export const cancelSalesSubmit = (
  setFormField: Function,
  setProspectFormField: Function,
  setEditId: Function,
  setInputError: Function,
  setProspectInputError: Function,
  setSelectedProducts: Function,
  currentUserId: string | null,
  setShowForm?: Function
) => {
  setEditId(null)
  if (setShowForm) setShowForm(false)
  setFormField(SalesInitialInput)
  setProspectFormField({
    ...ProspectInitialInput,
    referalType: 'existing',
    assignedBy: currentUserId ?? '',
    currentUserId: currentUserId ?? '',
  })
  setProspectInputError({})
  setSelectedProducts([])
  setInputError({})
}

export const sendToClient = (
  setOpenModelSendToClient: Function,
  setSendEmailStatus: Function,
  editId: string | null,
  currentUserId: string,
  setProspectFormField: Function
) => {
  setSendEmailStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
  sendFormToClient(editId ?? '', currentUserId ?? '').then((res: APIResponse) => {
    if (res.statusCode === 200) {
      toast.success('Mail sent successfully')
      setProspectFormField((prospectFormField: ProspectInputType) => ({
        ...prospectFormField,
        operationalStatus: res?.data?.operationalStatus?.code ?? '',
        statusName: res?.data?.operationalStatus?.name ?? res?.data?.status?.name ?? '',
        status: res?.data?.status?.code ?? '',
      }))
      setOpenModelSendToClient(false)
    } else {
      Message(res.message, 'error')
    }
    setSendEmailStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
  })
}

export const revertMailFromClient = (
  setSendEmailStatus: Function,
  editId: string | null,
  setProspectFormField: Function,
  userId: string | null
) => {
  setSendEmailStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
  updateProspectsStatusById(editId ?? '', '4', '4', userId).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      toast.success('Action performed successfully')
      setProspectFormField((prospectFormField: ProspectInputType) => ({
        ...prospectFormField,
        operationalStatus: res?.data?.operationalStatus?.code ?? '',
        statusName: res?.data?.operationalStatus?.name ?? res?.data?.status?.name ?? '',
        status: res?.data?.status?.code ?? '',
      }))
    } else {
      Message(res.message, 'error')
    }
    setSendEmailStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
  })
}

export const verifySales = (
  editId: string | null,
  setSubmitAPIStatus: Function,
  setProspectFormField: Function
) => {
  setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: true}))
  updateProspectsStatusById(editId ?? '', '5', null, null).then((res: APIResponse) => {
    if (res.statusCode === 200) {
      toast.success('Sales verified successfully')
      setProspectFormField((prospectFormField: ProspectInputType) => ({
        ...prospectFormField,
        operationalStatus: res?.data?.operationalStatus?.code ?? '',
        statusName: res?.data?.operationalStatus?.name ?? res?.data?.status?.name ?? '',
        status: res?.data?.status?.code ?? '',
      }))
    } else {
      Message(res.message, 'error')
    }
    setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({...prev, loading: false}))
  })
}

export const getProductsData = (setProducts: Function, setProductName: Function) => {
  getProducts().then((res: APIResponse) => {
    if (res.statusCode === 200) {
      let products: {
        label: string
        value: string
        category: string
        subCategory: string
        name: string
        totalTicketSize: string
        disabled: boolean
        profitPercent: string
        profitPlan: string
        productsTicketSize: ProductMasterOutput['data'][number]['productsTicketSize']
      }[] = []
      let productNames: SelectValueType[] = []
      res?.data?.map((obj: ProductMasterOutput['data'][number]) => {
        products.push({
          label: obj.productName + ' - ' + obj.category + ' - ' + obj.subCategory,
          value: obj.id,
          ...obj,
          name: obj.productName,
          disabled: false,
        })
        if (!productNames.some((item) => item.label === obj.productName)) {
          productNames.push({
            label: obj.productName,
            value: obj.productName,
          })
        }
      })
      setProductName(productNames)
      setProducts(products)
    }
  })
}

export const handleProductSelectionChange = (
  value: string[],
  products: SalestInputType['products'],
  allProducts: {
    label: string
    value: string
    category: string
    subCategory: string
    name: string
    totalTicketSize: string
    disabled: boolean
    profitPercent: string
    profitPlan: string
    productsTicketSize: ProductMasterOutput['data'][number]['productsTicketSize']
  }[],
  setFormField: Function,
  selectedProducts: string[],
  setSelectedProducts: Function
) => {
  let productsData = [...products]
  let selectedProduct = allProducts.filter((product) => product.value === value[0])[0]
  let selectedProductsData = [...selectedProducts]
  value.forEach((item) => {
    const existsInObjectArray = productsData.some((products) => products.productId === item)
    if (!existsInObjectArray) {
      setSelectedProducts([...selectedProductsData, ...value])
      productsData.push({
        product: [
          {
            id: null,
            status: '17',
            amount: '',
            startDate: '',
            isDisable: false,
            isStatusDisable: false,
            isNew: true,
            endDate: '',
            subCategory:
              selectedProduct?.productsTicketSize.length > 1
                ? ''
                : selectedProduct?.productsTicketSize[0]?.subCategory,
            profitPercent: selectedProduct.profitPercent,
            companyFee: '',
            profitPlan: selectedProduct.profitPlan,
            renewalData: [],
            type: 'Pipeline',
            parentId: null,
          },
        ],
        productId: item,
      })
    }
  })
  setFormField((formField: SalestInputType) => ({...formField, products: productsData}))
}

export const removeMainProduct = (
  removeProductId: string,
  products: SalestInputType['products'],
  setFormField: Function,
  inputError: InputErrorType,
  setInputError: Function,
  selectedProducts: string[],
  setSelectedProducts: Function
) => {
  let productsData = [...products]
  let selectedProductsData = [...selectedProducts]
  // Remove elements from objectArray that are not in stringArray
  let error: InputErrorType = {...inputError}
  let mainProductIndex = 0
  let selectedProductIndex = 0
  productsData.map((products, mainProductsIndex) => {
    products.product.map((_, index) => {
      if (`${mainProductsIndex}startDate${index}` in inputError)
        delete error[`${mainProductsIndex}startDate${index}`]
      if (`${mainProductsIndex}endDate${index}` in inputError)
        delete error[`${mainProductsIndex}endDate${index}`]
      if (`${mainProductsIndex}amount${index}` in inputError)
        delete error[`${mainProductsIndex}amount${index}`]
      if (`${mainProductsIndex}status${index}` in inputError)
        delete error[`${mainProductsIndex}status${index}`]
      if (`${mainProductsIndex}profitPercent${index}` in inputError)
        delete error[`${mainProductsIndex}profitPercent${index}`]
      if (`${mainProductsIndex}profitPlan${index}` in inputError)
        delete error[`${mainProductsIndex}profitPlan${index}`]
    })
    if (removeProductId === products.productId) {
      mainProductIndex = mainProductsIndex
    }
  })

  selectedProductsData.map((id, index) => {
    if (id === removeProductId) {
      selectedProductIndex = index
    }
  })

  productsData.splice(mainProductIndex, 1)
  selectedProductsData.splice(selectedProductIndex, 1)
  setSelectedProducts([...selectedProductsData])
  setInputError(error)
  setFormField((formField: SalestInputType) => ({...formField, products: productsData}))
}

export const getProductFilterQuery = (productFilterField: {
  productName: string
  category: string
  subCategory: string
}) => {
  let searchQuery = ''
  if (
    productFilterField.productName &&
    productFilterField.category &&
    productFilterField.subCategory
  ) {
    searchQuery =
      productFilterField.productName +
      ' - ' +
      productFilterField.category +
      ' - ' +
      productFilterField.subCategory
  } else if (productFilterField.productName && productFilterField.category) {
    searchQuery = productFilterField.productName + ' - ' + productFilterField.category
  } else if (productFilterField.category && productFilterField.subCategory) {
    searchQuery = productFilterField.category + ' - ' + productFilterField.subCategory
  } else if (productFilterField.productName && productFilterField.subCategory) {
    searchQuery = productFilterField.productName + ' - ' + productFilterField.subCategory
  } else if (productFilterField.productName) {
    searchQuery = productFilterField.productName
  } else if (productFilterField.subCategory) {
    searchQuery = productFilterField.subCategory
  } else if (productFilterField.category) {
    searchQuery = productFilterField.category
  }
  document.getElementById('productsData')?.focus()
  return searchQuery
}

export const previewFile = (file: File | null, setPreview: Function, setOpenPreview: Function) => {
  if (file) {
    const reader = new FileReader()

    reader.onloadend = async () => {
      console.log(reader.result, 'url', file?.name?.split('.')?.pop()?.toLowerCase(), file.name)

      setPreview({
        uri: reader.result,
        fileType:
          file?.type?.includes('image') || file?.type?.includes('pdf')
            ? file.type
            : file?.name?.split('.')?.pop()?.toLowerCase(),
        fileName: file.name,
      })
    }

    reader.readAsDataURL(file)
  }
  setOpenPreview(true)
}

export const getPaidFees = (
  profitPlan: string,
  profitPercent: string,
  amount: string,
  startDate: Date,
  endDate: Date
) => {
  let profitPlanPercent = profitPlan?.split('-')[0]
  let duration =
    endDate?.getMonth() -
    startDate?.getMonth() +
    12 * (endDate?.getFullYear() - startDate?.getFullYear())
  console.log(profitPlanPercent, duration, 'in paid fees')
  let paidFees = Number(amount) * (Number(profitPercent) / 100)
  if (Number.isNaN(duration)) {
    paidFees = paidFees * (Number(profitPlanPercent) / 100)
  } else if (duration === 12) {
    paidFees = paidFees * (Number(profitPlanPercent) / 100)
  } else if (duration > 6) {
    duration = duration - 6
    paidFees = (paidFees / 12) * duration
  } else {
    paidFees = (paidFees / 12) * duration
  }
  return paidFees
}

export const getRenewalFees = (
  profitPlan: string,
  profitPercent: string,
  amount: string,
  startDate: Date,
  endDate: Date
) => {
  let profitPlanPercent = profitPlan.split('-')[1]
  let duration =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  console.log(profitPlanPercent, duration, 'in renewal fees')
  let paidFees = Number(amount) * (Number(profitPercent) / 100)
  if (Number.isNaN(duration)) {
    paidFees = paidFees * (Number(profitPlanPercent) / 100)
  } else if (duration === 12) {
    paidFees = paidFees * (Number(profitPlanPercent) / 100)
  } else if (duration > 6) {
    paidFees = (paidFees / 12) * 6
  } else {
    paidFees = 0
  }
  return paidFees
}

export const calculateAmountForPipeline = (
  products: SalestInputType['products'][number]['product'],
  id: string
) => {
  let amount = 0
  let productsData = products.filter((item) => item.id === id || item.parentId === id)
  productsData.map((prd) => {
    if (prd.status === '16') {
      let endDate = new Date(prd.endDate)
      let startDate = new Date(prd.startDate)
      let duration =
        endDate?.getMonth() -
        startDate?.getMonth() +
        12 * (endDate?.getFullYear() - startDate?.getFullYear())
      if (duration > 6) {
        prd.renewalData.map((renewalData) => {
          if (renewalData.status === '20') {
            amount = amount + Number(prd.amount)
          }
        })
      } else {
        amount = amount + Number(prd.amount)
      }
    }
  })
  return amount
}

export const checkArrayRenewalProduct = (element: number, setShowRenewalProduct: Function) => {
  setShowRenewalProduct((prevshowProduct: number[]) => {
    const isExists = prevshowProduct.includes(element)
    if (isExists) {
      return prevshowProduct.filter((row) => row !== element)
    } else {
      return [element]
    }
  })
}
