import {Button, FileInput, Flex, Modal, Tabs} from '@mantine/core'
import {useEffect, useMemo, useRef, useState} from 'react'
// @ts-ignore
import FileViewer from 'react-file-viewer-extended'
import {clearInputError, getDate, numberFormat} from '../../../../_metronic/helpers'
import {
  addProspects,
  addSalesDataInProspectByProspectId,
  updateProspectsById,
} from '../../../../api/InvestmentAPI'
import API from '../../../../api/apiUrl'
import {ProspectInitialInput} from '../../../../data/InvestmentModuleDefaultData'
import {SubmitAPIStatusData} from '../../../../data/OtherDefaultData'
import {ProductMasterOutput} from '../../../../types/AdminModuleTypes'
import {ProspectInputType, SalestInputType} from '../../../../types/InvestmentModuleTypes'
import {InputErrorType, SelectValueType, SubmitAPIStatusType} from '../../../../types/OtherTypes'
import {
  cancelSubmit,
  getCountryData,
  getRecords,
  getReferalData,
  handleInputChange,
  handleOtherInputChange,
  handleSubmit,
} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomCheckInput from '../../../components/CustomInput/CustomCheckInput'
import CustomMultiSelectInput from '../../../components/CustomInput/CustomMultiSelectInput'
import CustomNumberInput from '../../../components/CustomInput/CustomNumberInput'
import CustomRadioInput from '../../../components/CustomInput/CustomRadioInput'
import CustomSelectInput from '../../../components/CustomInput/CustomSelectInput'
import CustomTextInput from '../../../components/CustomInput/CustomTextInput'
import InputErrorBox from '../../../components/InputErrorBox'
import {KTSVG} from '../../../components/KTSVG'
import SubmitCancleButton from '../../../components/SubmitCancleButton'
import {useAuth} from '../../auth'
import ProspectForm from '../prospect/ProspectForm'
import {calculateAge, validateProspectForm} from '../prospect/ProspectFunction'
import {
  AddDocuments,
  AddNominations,
  Q1,
  Q1A1,
  Q1A2,
  Q1A3,
  Q1A4,
  Q1A5,
  Q1A6,
  Q2,
  Q2A1,
  Q2A2,
  Q2A3,
  Q2A4,
  Q2A5,
  Q3,
  Q3A1,
  Q3A2,
  Q3A3,
  Q4,
  Q4A1,
  Q4A2,
  Q4A3,
  Q4A4,
  Q5,
  Q5A1,
  Q5A2,
  Q5A3,
  Q5A4,
  Q6,
  Q6A1,
  Q6A2,
  Q6A3,
  Q6A4,
  Q7,
  Q7A1,
  Q7A2,
  Q7A3,
  Q7A4,
  Q7A5,
  Q8,
  Q8A1,
  Q8A2,
  Q8A3,
  Q8A4,
  RemoveDocuments,
  RemoveNominations,
  addProduct,
  cancelSalesSubmit,
  documentTypeData,
  getPaidFees,
  getProductFilterQuery,
  getProductsData,
  handleDocumentsChange,
  handleNominationsChange,
  handleProductChange,
  handleProductRenewalChange,
  handleProductSelectionChange,
  handleSalesSubmit,
  previewFile,
  removeMainProduct,
  removeProducts,
  revertMailFromClient,
  sections,
  sendToClient,
} from './SalesFunction'

const SalesForm = (props: {
  editId: string | null
  setEditId: Function
  setShowForm: Function
  inputError: InputErrorType
  setInputError: Function
  formField: SalestInputType
  setFormField: Function
  city: SelectValueType[]
  setCity: Function
  cityOfBirth: SelectValueType[]
  setCityOfBirth: Function
  state: SelectValueType[]
  setState: Function
  prospectFormField: ProspectInputType
  setProspectFormField: Function
  prospectInputError: InputErrorType
  setProspectInputError: Function
  setProspects: Function
  formType: string
  selectedProducts: string[]
  setSelectedProduct: Function
  backUrl: string
}) => {
  const {
    editId,
    setEditId,
    setShowForm,
    city,
    setCity,
    cityOfBirth,
    setCityOfBirth,
    state,
    setState,
    prospectFormField,
    setProspectFormField,
    formField,
    setFormField,
    setProspects,
    prospectInputError,
    setProspectInputError,
    formType,
    selectedProducts,
    setSelectedProduct,
    backUrl,
  } = props
  const {currentDate} = getDate()
  const {currentUser} = useAuth()
  const [openModel, setOpenModel] = useState<boolean>(false)
  const [openModalSendToClient, setOpenModelSendToClient] = useState<boolean>(false)
  const [referal, setReferal] = useState<{label: string; value: string}[]>([])
  const [newProspectState, setNewProspectState] = useState<SelectValueType[]>([])
  const [newProspectCity, setNewProspectCity] = useState<SelectValueType[]>([])
  const [newProspectCityOfBirth, setNewProspectCityOfBirth] = useState<SelectValueType[]>([])
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [isFormEditable, setIsFormEditable] = useState<boolean>(true)
  const [newProspectEditId, setNewProspectEditId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>('0')
  const [activeProductTab, setActiveProductTab] = useState<string | null>('Pipeline')
  const [newProspectInputError, setNewProspectInputError] = useState<InputErrorType>({})
  const [submitAPIStatus, setSubmitAPIStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [sendEmailStatus, setSendEmailStatus] = useState<SubmitAPIStatusType>(SubmitAPIStatusData)
  const [buttonType, setButtonType] = useState<string>('')
  const [newProspectformField, setNewProspectFormField] = useState<ProspectInputType>({
    ...ProspectInitialInput,
    referalType: 'new',
    assignedBy: currentUser?.id ?? '',
    currentUserId: currentUser?.id ?? '',
  })
  const [productFilterField, setProductFilterField] = useState({
    productName: '',
    category: '',
    subCategory: '',
  })

  const [country, setCountry] = useState<SelectValueType[]>([])
  const [productName, setProductName] = useState<SelectValueType[]>([])
  const [preview, setPreview] = useState<{fileType: string; uri: string; fileName: string}>({
    fileType: '',
    uri: '',
    fileName: '',
  })
  const [previwModel, setPreviwModel] = useState<boolean>(false)
  const [errorSection, setErrorSection] = useState({
    personal: false,
    nomination: false,
    nri: false,
    kyc: false,
    investment: false,
    riskprofile: false,
    product: false,
  })
  const [products, setProducts] = useState<
    {
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
  >([])

  let address = `${
    !prospectFormField.addressLine1 &&
    !prospectFormField?.addressLine2 &&
    !prospectFormField?.pin &&
    !city.filter((city) => city.value === prospectFormField.city)[0]?.label &&
    !state.filter((state) => state.value === prospectFormField.state)[0]?.label &&
    !country.filter((country) => country.value === prospectFormField.country)[0]?.label
      ? '-'
      : `${prospectFormField?.addressLine1 && prospectFormField?.addressLine1?.trim() + ','}${
          prospectFormField?.addressLine2 && prospectFormField?.addressLine2?.trim() + ','
        }${
          city.filter((city) => city.value === prospectFormField.city)[0]?.label &&
          city.filter((city) => city.value === prospectFormField.city)[0]?.label?.trim() + ','
        }${
          state.filter((state) => state.value === prospectFormField.state)[0]?.label &&
          state.filter((state) => state.value === prospectFormField.state)[0]?.label?.trim() + ','
        }${
          country.filter((country) => country.value === prospectFormField.country)[0]?.label &&
          country
            .filter((country) => country.value === prospectFormField.country)[0]
            ?.label?.trim() + ','
        }${prospectFormField?.pin && prospectFormField?.pin?.trim()}`
  }`.trim()

  const updateButtonType = (previousButtonType: string, newButtonType: string) => {
    if (previousButtonType === 'verify') {
      prospectFormField.status = '4'
      setInputError({})
      setProspectInputError({})
    }
    setButtonType(newButtonType)
  }
  const isFormMandatory =
    Number(prospectFormField.operationalStatus) > 2 || Number(prospectFormField.status) === 5
  const formEditable = useMemo(() => {
    if (
      (formType === 'client' && prospectFormField.operationalStatus !== '3') ||
      (formType === 'user' &&
        (prospectFormField.operationalStatus === '3' ||
          (prospectFormField.status === '5' && !prospectFormField.operationalStatus) ||
          Number(prospectFormField.status) > 5))
    ) {
      setIsFormEditable(false)
    } else {
      setIsFormEditable(true)
    }
  }, [prospectFormField.operationalStatus])

  const addressChange = useMemo(() => {
    let nominations = [...formField.nominations]
    nominations.map((nomination, index) => {
      if (nomination.isAddressSame) {
        clearInputError(`address${index}`, inputError, setInputError)

        nominations[index] = {
          ...nominations[index],
          address:
            address.charAt(address.length - 1) === ','
              ? address?.slice(0, address.length - 1)
              : address,
        }
      }
    })

    setFormField({...formField, nominations: nominations})
  }, [
    prospectFormField.country,
    prospectFormField.city,
    prospectFormField.addressLine1,
    prospectFormField.pin,
    prospectFormField.addressLine2,
    prospectFormField.state,
  ])

  const errorChange = useMemo(() => {
    let errorSections = {
      personal: false,
      nomination: false,
      nri: false,
      kyc: false,
      investment: false,
      riskprofile: false,
      product: false,
    }
    if (Object.keys(inputError).filter((item) => sections.riskProfile.includes(item)).length > 0) {
      errorSections.riskprofile = true
    } else {
      errorSections.riskprofile = false
    }
    if (Object.keys(inputError).filter((item) => sections.nri.includes(item)).length > 0) {
      errorSections.nri = true
    } else {
      errorSections.nri = false
    }
    if (Object.keys(inputError).filter((item) => sections.investment.includes(item)).length > 0) {
      errorSections.investment = true
    } else {
      errorSections.investment = false
    }
    if (
      Object.keys(inputError).filter(
        (item) =>
          sections.kyc.includes(item) ||
          Object.keys(formField.documents[0]).includes(item.split(/\d+/)[0])
      ).length > 0 ||
      Object.keys(inputError).filter((item) =>
        Object.keys(formField.documents[0]).includes(item.split(/\d+/)[1])
      ).length > 0
    ) {
      errorSections.kyc = true
    } else {
      errorSections.kyc = false
    }
    if (
      Object.keys(inputError).filter((item) =>
        Object.keys(formField.nominations[0]).includes(item.split(/\d+/)[0])
      ).length > 0
    ) {
      errorSections.nomination = true
    } else {
      errorSections.nomination = false
    }
    if (formField.products.length > 0) {
      if (
        Object.keys(inputError)?.filter((item) =>
          Object.keys(formField?.products[0]?.product[0]).includes(item.split(/\d+/)[1])
        ).length > 0
      ) {
        errorSections.product = true
      } else {
        errorSections.product = false
      }
    }
    if (
      Object.keys(prospectInputError).filter((item) => sections.personal.includes(item)).length > 0
    ) {
      errorSections.personal = true
    } else {
      errorSections.personal = false
    }
    setErrorSection(errorSections)
  }, [prospectInputError, inputError])
  const isNRIChange = useMemo(() => {
    if (prospectFormField.isNRI === 'India')
      setFormField({
        ...formField,
        overseasAddressProof: null,
        passport: null,
        visa: null,
        immigration: null,
        pioCard: null,
        isTaxResidencyOtherThanIndia: '',
        taxResidencyCountry: '',
        taxIdentificationNo: '',
        taxIdentificationDoc: null,
      })
  }, [prospectFormField.isNRI])

  const getReferals = useMemo(() => {
    getReferalData(setReferal)
  }, [openModel])

  const updateProducts = useMemo(() => {
    if (editId) {
      let selectedProductIds: String[] = []
      formField.products.map((prd) => {
        prd.product.map((prod) => {
          if (prod.status !== '17') {
            if (!selectedProductIds.includes(prd.productId)) selectedProductIds.push(prd.productId)
          }
        })
      })
      let productsData: {
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
      }[] = [...products]
      productsData.map((product, index) => {
        if (selectedProductIds.includes(product.value)) {
          productsData[index] = {
            ...productsData[index],
            disabled: true,
          }
        }
      })
      setProducts(productsData)
    }
  }, [editId])

  const filteredProducts = useMemo(() => {
    let searchQuery = getProductFilterQuery(productFilterField)
    if (!searchQuery) {
      return products
    } else {
      const filteredArray = products.filter((obj) => {
        // Add your filtering logic based on the three fields here
        const condition1 = obj.label.includes(searchQuery)
        // Return true only if all conditions are met
        return condition1
      })

      return !searchQuery ? products : filteredArray
    }
  }, [productFilterField, products])

  const handleOpenModel = () => {
    setOpenModel(true)
    setNewProspectFormField({
      ...newProspectformField,
      referal: currentUser?.id ?? '',
    })
  }

  const excelRef = useRef(null)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      const handleCellClick = (event: any) => {
        event.preventDefault()
      }

      const excelElement: any = excelRef.current
      if (excelElement) {
        excelElement.addEventListener('click', handleCellClick)
      }
      if (formType !== 'client') {
        getProductsData(setProducts, setProductName)
      }
      getCountryData(setCountry)
    }
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <style>
        {`
      .riskProfile .mantine-Group-root{
        flex-direction: column;
        align-items: flex-start;
      }
      `}
      </style>
      <div className='card '>
        <div className='card-header'>
          <Flex className='col-12' gap={'xs'} align={'center'} justify={'space-between'}>
            <h4 className='card-title'>{editId !== null ? 'Update' : 'Add'} Sales</h4>
            <div hidden={formType === 'client'}>
              <Button
                hidden={
                  !editId ||
                  prospectFormField.operationalStatus === '3' ||
                  Number(prospectFormField.status) > 4
                }
                type='button'
                className='btn btn-success btn-sm me-3'
                onClick={
                  () => setOpenModelSendToClient(true)
                  // Provide the appropriate function or action for sending to the client
                }
              >
                Send to Client
              </Button>
              <Button
                hidden={!(prospectFormField.operationalStatus == '3' && formType == 'user')}
                type='button'
                loading={sendEmailStatus.loading}
                className='btn btn-success btn-sm me-3'
                onClick={
                  () =>
                    revertMailFromClient(
                      setSendEmailStatus,
                      editId,
                      setProspectFormField,
                      currentUser?.id ?? ''
                    )
                  // Provide the appropriate function or action for sending to the client
                }
              >
                Revert
              </Button>
              <Button
                type='button'
                className='btn btn-primary btn-sm me-3 px-4'
                onClick={() => {
                  getRecords(backUrl, setProspects)
                  cancelSalesSubmit(
                    setFormField,
                    setProspectFormField,
                    setEditId,
                    setInputError,
                    setProspectInputError,
                    setSelectedProduct,
                    currentUser?.id ?? '',
                    setShowForm
                  )
                }}
              >
                <i className='fa-solid fa-arrow-left-long'></i>
              </Button>
            </div>
          </Flex>
        </div>

        <div className='card-body'>
          <h4 className='card-title' hidden={formType === 'client'}>
            Status :{' '}
            <span className='badge badge-light-warning fs-5'> {prospectFormField?.statusName}</span>{' '}
          </h4>
          <hr hidden={formType === 'client'} />
          <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_2_item_1'
              >
                <span className='accordion-icon'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                <h3
                  className={`fs-4 ${
                    errorSection.personal ? 'text-danger' : 'text-gray-800'
                  }  fw-bold mb-0 ms-4`}
                >
                  Personal Details
                </h3>
              </div>
              <div
                id='kt_accordion_2_item_1'
                className='fs-6 collapse show ps-10'
                data-bs-parent='#kt_accordion_2'
              >
                <hr />
                <ProspectForm
                  formField={prospectFormField}
                  handleOpenModel={handleOpenModel}
                  prospectType='old'
                  inputError={prospectInputError}
                  setFormField={setProspectFormField}
                  setInputError={setProspectInputError}
                  setCity={setCity}
                  setState={setState}
                  city={city}
                  cityOfBirth={cityOfBirth}
                  setCityOfBirth={setCityOfBirth}
                  state={state}
                  referal={referal}
                  isFormEditable={isFormEditable}
                  editId={editId}
                />
              </div>
            </div>
            <div className='mb-5' hidden={prospectFormField.isNRI !== 'NRI'}>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_2_item_7'
              >
                <span className='accordion-icon'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                <h3
                  className={`fs-4 ${
                    errorSection.nri ? 'text-danger' : 'text-gray-800'
                  }  fw-bold mb-0 ms-4`}
                >
                  NRI
                </h3>
              </div>
              <div
                id='kt_accordion_2_item_7'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_2'
              >
                <hr />
                <div className='row'>
                  <div className='col-md-3 mb-5'>
                    <CustomRadioInput
                      label='Tax residency other than India'
                      data={[
                        {
                          label: `Yes`,
                          value: 'Yes',
                          disabled: !isFormEditable,
                        },
                        {
                          label: `No`,
                          value: 'No',
                          disabled: !isFormEditable,
                        },
                      ]}
                      children={undefined}
                      value={formField.isTaxResidencyOtherThanIndia}
                      onChange={(value) => {
                        clearInputError('isTaxResidencyOtherThanIndia', inputError, setInputError)
                        if (value === 'No') {
                          setFormField({
                            ...formField,
                            isTaxResidencyOtherThanIndia: value,
                            taxResidencyCountry: '',
                            taxIdentificationNo: '',
                            taxIdentificationDoc: null,
                          })
                        } else {
                          setFormField({
                            ...formField,
                            isTaxResidencyOtherThanIndia: value,
                          })
                        }
                      }}
                      withAsterisk={Number(prospectFormField.status) === 5}
                      error={inputError.isTaxResidencyOtherThanIndia}
                    />
                  </div>
                  <div
                    className='mb-5 col-3'
                    hidden={formField.isTaxResidencyOtherThanIndia !== 'Yes'}
                  >
                    <CustomSelectInput
                      label='Country of tax Residency'
                      data={country.filter((country) => country.label !== 'India')}
                      value={formField.taxResidencyCountry}
                      disabled={!isFormEditable}
                      onChange={(value) => {
                        clearInputError('taxResidencyCountry', inputError, setInputError)
                        setFormField({...formField, taxResidencyCountry: value ?? ''})
                      }}
                      withAsterisk={Number(prospectFormField.status) === 5}
                      error={inputError.taxResidencyCountry}
                    />
                  </div>
                  <div
                    className='col-md-3 mb-5'
                    hidden={formField.isTaxResidencyOtherThanIndia !== 'Yes'}
                  >
                    <CustomTextInput
                      label='Tax pair Identification No'
                      name='taxIdentificationNo'
                      value={formField.taxIdentificationNo}
                      disabled={!isFormEditable}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      error={inputError.taxIdentificationNo}
                      withAsterisk={Number(prospectFormField.status) === 5}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_2_item_2'
              >
                <span className='accordion-icon'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                <h3
                  className={`fs-4 ${
                    errorSection.nomination ? 'text-danger' : 'text-gray-800'
                  }  fw-bold mb-0 ms-4`}
                >
                  Nomination Details
                </h3>
              </div>
              <div
                id='kt_accordion_2_item_2'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_2'
              >
                <hr />
                {formField.nominations.map((nomination, index) => {
                  return (
                    <>
                      <div className='row'>
                        <h4 className='fs-4 text-gray-800 fw-bold mb-5'>Nominee {index + 1}</h4>
                        <div className='col-md-2 mb-5'>
                          <CustomTextInput
                            label='First Name'
                            name='firstName'
                            value={nomination.firstName}
                            disabled={!isFormEditable}
                            onChange={(event) => {
                              handleNominationsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            error={inputError[`firstName${index}`]}
                          />
                        </div>
                        <div className='col-md-2 mb-5'>
                          <CustomTextInput
                            label='Last Name'
                            name='lastName'
                            value={nomination.lastName}
                            disabled={!isFormEditable}
                            onChange={(event) => {
                              handleNominationsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            error={inputError[`lastName${index}`]}
                          />
                        </div>
                        <div className='col-md-2 mb-5'>
                          <CustomSelectInput
                            label='Relation'
                            name='relation'
                            data={[
                              {label: 'Mother', value: 'mother'},
                              {label: 'Father', value: 'father'},
                              {label: 'Daugther', value: 'daugther'},
                              {label: 'Son', value: 'son'},
                            ]}
                            value={nomination.relation}
                            disabled={!isFormEditable}
                            onChange={(value) => {
                              handleNominationsChange(
                                value,
                                'relation',
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            error={inputError[`relation${index}`]}
                          />
                        </div>
                        <div className='col-md-2 mb-5'>
                          <CustomNumberInput
                            label='Percentage'
                            name='percentage'
                            value={nomination.percentage}
                            disabled={!isFormEditable}
                            onChange={(event) => {
                              handleNominationsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            error={inputError[`percentage${index}`]}
                          />
                        </div>
                        <div className='col-md-3 mb-5 pt-8'>
                          <CustomCheckInput
                            name='isAddressSame'
                            label='Address same as above'
                            onChange={(event) =>
                              handleNominationsChange(
                                event.target.checked,
                                event.target.name,
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError,
                                address.charAt(address.length - 1) === ','
                                  ? address?.slice(0, address.length - 1).trim()
                                  : address
                              )
                            }
                            checked={nomination.isAddressSame}
                          />
                        </div>
                        <div className='col-md-2 mb-5'>
                          <CustomTextInput
                            label='Address'
                            name='address'
                            value={nomination.address}
                            disabled={!isFormEditable || nomination.isAddressSame}
                            onChange={(event) => {
                              handleNominationsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            error={inputError[`address${index}`]}
                          />
                        </div>

                        <div className='col-md-2 mb-5'>
                          <CustomTextInput
                            label='Date of Birth'
                            name='dob'
                            type='date'
                            value={nomination.dob}
                            max={currentDate}
                            disabled={!isFormEditable}
                            onChange={(event) => {
                              handleNominationsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            error={inputError[`dob${index}`]}
                          />
                        </div>
                        <div
                          className='col-md-2 mb-5'
                          hidden={Math.abs(Number(calculateAge(nomination.dob))) < 18}
                        >
                          <FileInput
                            label="Nominee's PAN Card"
                            value={nomination.nomineePanCard}
                            disabled={!isFormEditable}
                            multiple={false}
                            placeholder='Choose File'
                            onChange={(value) => {
                              handleNominationsChange(
                                value,
                                'nomineePanCard',
                                index,
                                setFormField,
                                formField.nominations,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={Number(prospectFormField.status) === 5}
                            size='md'
                            error={inputError[`nomineePanCard${index}`]}
                          />
                          <ActionColumn
                            view={{
                              onClick: () => {
                                previewFile(nomination.nomineePanCard, setPreview, setPreviwModel)
                              },
                            }}
                          />
                        </div>
                        {Math.abs(Number(calculateAge(nomination.dob))) < 18 && (
                          <div className='row'>
                            <div className='col-md-2 mb-5'>
                              <CustomTextInput
                                label='Guardian First Name'
                                name='guardianFirstName'
                                value={nomination.guardianFirstName}
                                disabled={!isFormEditable}
                                onChange={(event) => {
                                  handleNominationsChange(
                                    event.target.value,
                                    event.target.name,
                                    index,
                                    setFormField,
                                    formField.nominations,
                                    inputError,
                                    setInputError
                                  )
                                }}
                                withAsterisk={Number(prospectFormField.status) === 5}
                                error={inputError[`guardianFirstName${index}`]}
                              />
                            </div>
                            <div className='col-md-2 mb-5'>
                              <CustomTextInput
                                label='Guardian Last Name'
                                name='guardianLastName'
                                value={nomination.guardianLastName}
                                disabled={!isFormEditable}
                                onChange={(event) => {
                                  handleNominationsChange(
                                    event.target.value,
                                    event.target.name,
                                    index,
                                    setFormField,
                                    formField.nominations,
                                    inputError,
                                    setInputError
                                  )
                                }}
                                withAsterisk={Number(prospectFormField.status) === 5}
                                error={inputError[`guardianLastName${index}`]}
                              />
                            </div>
                            <div className='col-md-2 mb-5'>
                              <CustomTextInput
                                label='Guardian Address'
                                name='guardianAddress'
                                value={nomination.guardianAddress}
                                disabled={!isFormEditable}
                                onChange={(event) => {
                                  handleNominationsChange(
                                    event.target.value,
                                    event.target.name,
                                    index,
                                    setFormField,
                                    formField.nominations,
                                    inputError,
                                    setInputError
                                  )
                                }}
                                withAsterisk={Number(prospectFormField.status) === 5}
                                error={inputError[`guardianAddress${index}`]}
                              />
                            </div>
                            <div className='col-md-2 mb-5'>
                              <CustomNumberInput
                                label='Guardian Contact No'
                                name='guardianContactNo'
                                value={nomination.guardianContactNo}
                                disabled={!isFormEditable}
                                onChange={(event) => {
                                  handleNominationsChange(
                                    event.target.value,
                                    event.target.name,
                                    index,
                                    setFormField,
                                    formField.nominations,
                                    inputError,
                                    setInputError
                                  )
                                }}
                                withAsterisk={Number(prospectFormField.status) === 5}
                                error={inputError[`guardianContactNo${index}`]}
                              />
                            </div>
                            <div className='col-md-2 mb-5'>
                              <CustomSelectInput
                                label='Guardian Relation'
                                name='guardianRelation'
                                data={[
                                  {label: 'Mother', value: 'mother'},
                                  {label: 'Father', value: 'father'},
                                  {label: 'Daugther', value: 'daugther'},
                                  {label: 'Son', value: 'son'},
                                ]}
                                value={nomination.guardianRelation}
                                disabled={!isFormEditable}
                                onChange={(value) => {
                                  handleNominationsChange(
                                    value,
                                    'guardianRelation',
                                    index,
                                    setFormField,
                                    formField.nominations,
                                    inputError,
                                    setInputError
                                  )
                                }}
                                withAsterisk={Number(prospectFormField.status) === 5}
                                error={inputError[`guardianRelation${index}`]}
                              />
                            </div>
                            <div className='col-md-2 mb-5'>
                              <FileInput
                                label='Guardian PAN card'
                                value={nomination.nomineePanCard}
                                disabled={!isFormEditable}
                                multiple={false}
                                placeholder='Choose File'
                                onChange={(value) => {
                                  handleNominationsChange(
                                    value,
                                    'nomineePanCard',
                                    index,
                                    setFormField,
                                    formField.nominations,
                                    inputError,
                                    setInputError
                                  )
                                }}
                                size='md'
                                withAsterisk={Number(prospectFormField.status) === 5}
                                error={inputError[`nomineePanCard${index}`]}
                              />
                            </div>
                          </div>
                        )}
                        <div className='col-md-12 '>
                          <ActionColumn
                            add={{
                              onClick: () => {
                                AddNominations(setFormField)
                              },
                              hidden: !(
                                formField.nominations.length >= 1 &&
                                index + 1 === formField.nominations.length &&
                                formField.nominations.length < 10
                              ),
                            }}
                            remove={{
                              onClick: () => {
                                RemoveNominations(
                                  index,
                                  setFormField,
                                  formField,
                                  inputError,
                                  setInputError
                                )
                              },
                              hidden: formField.nominations.length <= 1,
                            }}
                          />
                        </div>
                      </div>
                      <hr />
                    </>
                  )
                })}
                <InputErrorBox Message={inputError.percentage} />
              </div>
            </div>
            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_2_item_3'
              >
                <span className='accordion-icon'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                <h3
                  className={`fs-4 ${
                    errorSection.kyc ? 'text-danger' : 'text-gray-800'
                  }  fw-bold mb-0 ms-4`}
                >
                  KYC
                </h3>
              </div>
              <div
                id='kt_accordion_2_item_3'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_2'
              >
                <hr />
                <div>
                  <div className='mb-5 fs-5'>
                    <span className='text-danger'>*</span>Important Note : If the applicant is a
                    minor (under 18 years of age), please upload a copy of their birth certificate
                    as well as the required documents from their parents.{' '}
                  </div>
                  <div className='row '>
                    <div className='col-md-2 mb-5'>
                      <FileInput
                        label="Applicant's Aadhar card"
                        value={formField.aadharDocument}
                        disabled={!isFormEditable}
                        multiple={false}
                        placeholder='Choose File'
                        withAsterisk={Number(prospectFormField.status) === 5}
                        onChange={(value) => {
                          handleOtherInputChange(
                            value,
                            'aadharDocument',
                            setFormField,
                            inputError,
                            setInputError
                          )
                        }}
                        size='md'
                        error={inputError.aadharDocument}
                      />
                    </div>
                    <div className='col-md-2 mb-5'>
                      <CustomNumberInput
                        label="Applicant's Aadhar No"
                        name='aadharNo'
                        value={formField.aadharNo}
                        disabled={!isFormEditable}
                        onChange={(event) => {
                          handleInputChange(event, setFormField, inputError, setInputError)
                        }}
                        withAsterisk={Number(prospectFormField.status) === 5}
                        error={inputError['aadharNo']}
                      />
                    </div>
                  </div>
                  <div className='row '>
                    <div className='col-md-2 mb-5'>
                      <FileInput
                        label="Applicant's PAN card"
                        value={formField.panDocument}
                        disabled={!isFormEditable}
                        multiple={false}
                        placeholder='Choose File'
                        withAsterisk={Number(prospectFormField.status) === 5}
                        onChange={(value) => {
                          handleOtherInputChange(
                            value,
                            'panDocument',
                            setFormField,
                            inputError,
                            setInputError
                          )
                        }}
                        size='md'
                        error={inputError.panDocument}
                      />
                    </div>
                    <div className='col-md-2 mb-5'>
                      <CustomTextInput
                        label="Applicant's PAN No"
                        name='panNo'
                        value={formField.panNo?.toUpperCase()}
                        disabled={!isFormEditable}
                        onChange={(event) => {
                          handleInputChange(event, setFormField, inputError, setInputError)
                        }}
                        withAsterisk={Number(prospectFormField.status) === 5}
                        error={inputError['panNo']}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-2 mb-5'>
                      <FileInput
                        label='Cancelled Cheque'
                        value={formField.cancelledCheque}
                        disabled={!isFormEditable}
                        multiple={false}
                        placeholder='Choose File'
                        withAsterisk={Number(prospectFormField.status) === 5}
                        onChange={(value) => {
                          handleOtherInputChange(
                            value,
                            'cancelledCheque',
                            setFormField,
                            inputError,
                            setInputError
                          )
                        }}
                        size='md'
                        error={inputError.cancelledCheque}
                      />
                    </div>
                    <div className='col-md-2 mb-5'>
                      <FileInput
                        label='Photo'
                        value={formField.photo}
                        disabled={!isFormEditable}
                        multiple={false}
                        placeholder='Choose File'
                        withAsterisk={Number(prospectFormField.status) === 5}
                        onChange={(value) => {
                          handleOtherInputChange(
                            value,
                            'photo',
                            setFormField,
                            inputError,
                            setInputError
                          )
                        }}
                        size='md'
                        error={inputError.photo}
                      />
                    </div>
                    <div className='col-md-2 mb-5'>
                      <FileInput
                        label={
                          <span>
                            Address Proof
                            <i
                              className='fa-solid fa-circle-info ms-1'
                              title='(Any One of the Following)- Driving License / Valid Passport / Utility Bill / Aadhar Card-masked copy'
                            ></i>
                          </span>
                        }
                        value={formField.addressProofDoc}
                        disabled={!isFormEditable}
                        multiple={false}
                        placeholder='Choose File'
                        withAsterisk={Number(prospectFormField.status) === 5}
                        onChange={(value) => {
                          handleOtherInputChange(
                            value,
                            'addressProofDoc',
                            setFormField,
                            inputError,
                            setInputError
                          )
                        }}
                        size='md'
                        error={inputError.addressProofDoc}
                      />
                    </div>
                    <div className='row '>
                      <div className='col-md-2 mb-5' hidden={prospectFormField.isNRI !== 'NRI'}>
                        <FileInput
                          label={
                            <span>
                              Overseas Address Doc
                              <i
                                className='fa-solid fa-circle-info'
                                title='(Any One of the following)-Utility bill - not more than 2 months old (Landline Phone / Electricity / Gas / Water), Driving License with address,Registered Lease or Sale Agreement'
                              ></i>
                            </span>
                          }
                          value={formField.overseasAddressProof}
                          disabled={!isFormEditable}
                          multiple={false}
                          placeholder='Choose File'
                          withAsterisk={Number(prospectFormField.status) === 5}
                          onChange={(value) => {
                            handleOtherInputChange(
                              value,
                              'overseasAddressProof',
                              setFormField,
                              inputError,
                              setInputError
                            )
                          }}
                          size='md'
                          error={inputError.overseasAddressProof}
                        />
                      </div>
                      <div className='col-md-2 mb-5' hidden={prospectFormField.isNRI !== 'NRI'}>
                        <FileInput
                          label='Passport'
                          value={formField.passport}
                          disabled={!isFormEditable}
                          multiple={false}
                          placeholder='Choose File'
                          withAsterisk={Number(prospectFormField.status) === 5}
                          onChange={(value) => {
                            handleOtherInputChange(
                              value,
                              'passport',
                              setFormField,
                              inputError,
                              setInputError
                            )
                          }}
                          size='md'
                          error={inputError.passport}
                        />
                      </div>
                      <div className='col-md-2 mb-5' hidden={prospectFormField.isNRI !== 'NRI'}>
                        <FileInput
                          label='Visa'
                          value={formField.visa}
                          disabled={!isFormEditable}
                          multiple={false}
                          placeholder='Choose File'
                          withAsterisk={Number(prospectFormField.status) === 5}
                          onChange={(value) => {
                            handleOtherInputChange(
                              value,
                              'visa',
                              setFormField,
                              inputError,
                              setInputError
                            )
                          }}
                          size='md'
                          error={inputError.visa}
                        />
                      </div>
                      <div className='col-md-2 mb-5' hidden={prospectFormField.isNRI !== 'NRI'}>
                        <FileInput
                          label='Immigration'
                          value={formField.immigration}
                          disabled={!isFormEditable}
                          multiple={false}
                          placeholder='Choose File'
                          withAsterisk={Number(prospectFormField.status) === 5}
                          onChange={(value) => {
                            handleOtherInputChange(
                              value,
                              'immigration',
                              setFormField,
                              inputError,
                              setInputError
                            )
                          }}
                          size='md'
                          error={inputError.immigration}
                        />
                      </div>

                      <div className='col-md-2 mb-5' hidden={prospectFormField.isNRI !== 'NRI'}>
                        <FileInput
                          label='PIO & OCI Card'
                          value={formField.pioCard}
                          disabled={!isFormEditable}
                          multiple={false}
                          placeholder='Choose File'
                          withAsterisk={Number(prospectFormField.status) === 5}
                          onChange={(value) => {
                            handleOtherInputChange(
                              value,
                              'pioCard',
                              setFormField,
                              inputError,
                              setInputError
                            )
                          }}
                          size='md'
                          error={inputError.pioCard}
                        />
                      </div>
                      <div
                        className='col-md-2 mb-5'
                        hidden={formField.isTaxResidencyOtherThanIndia !== 'Yes'}
                      >
                        <FileInput
                          label='Tax Identification Doc'
                          value={formField.taxIdentificationDoc}
                          disabled={!isFormEditable}
                          multiple={false}
                          placeholder='Choose File'
                          withAsterisk={Number(prospectFormField.status) === 5}
                          onChange={(value) => {
                            handleOtherInputChange(
                              value,
                              'taxIdentificationDoc',
                              setFormField,
                              inputError,
                              setInputError
                            )
                          }}
                          size='md'
                          error={inputError.taxIdentificationDoc}
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-2 mb-5'
                      hidden={
                        (prospectFormField.dob &&
                          Math.abs(Number(calculateAge(prospectFormField.dob))) > 18) ||
                        !prospectFormField.dob
                      }
                    >
                      <FileInput
                        label='Birth Certificate'
                        value={formField.birthCertificate}
                        disabled={!isFormEditable}
                        multiple={false}
                        placeholder='Choose File'
                        withAsterisk={Number(prospectFormField.status) === 5}
                        onChange={(value) => {
                          handleOtherInputChange(
                            value,
                            'birthCertificate',
                            setFormField,
                            inputError,
                            setInputError
                          )
                        }}
                        size='md'
                        error={inputError.birthCertificate}
                      />
                    </div>
                  </div>
                  <hr />
                  {formField.documents.map((doc, index) => {
                    return (
                      <div className='row '>
                        <div className='col-md-2 mb-5'>
                          <CustomSelectInput
                            data={documentTypeData}
                            label='Document Name'
                            value={doc.documentType}
                            withAsterisk={false}
                            disabled={!isFormEditable}
                            onChange={(value) => {
                              handleDocumentsChange(
                                value,
                                'documentType',
                                index,
                                setFormField,
                                formField.documents,
                                inputError,
                                setInputError
                              )
                            }}
                            error={inputError[`documentType${index}`]}
                          />
                        </div>
                        <div className='col-md-2 mb-5' hidden={doc.documentType !== 'Other'}>
                          <CustomTextInput
                            label='Other document Type'
                            name='otherDocumentType'
                            value={doc.otherDocumentType}
                            disabled={!isFormEditable}
                            onChange={(event) => {
                              handleDocumentsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.documents,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={false}
                            error={inputError[`otherDocumentType${index}`]}
                          />
                        </div>
                        <div className='col-md-2 mb-5'>
                          <FileInput
                            label='Document'
                            value={doc.fileName}
                            disabled={!isFormEditable}
                            multiple={false}
                            placeholder='Choose File'
                            withAsterisk={false}
                            onChange={(value) => {
                              handleDocumentsChange(
                                value,
                                'fileName',
                                index,
                                setFormField,
                                formField.documents,
                                inputError,
                                setInputError
                              )
                            }}
                            size='md'
                            error={inputError[`fileName${index}`]}
                          />
                        </div>
                        <div className='col-md-2 mb-5'>
                          <CustomTextInput
                            label='Remark'
                            name='remark'
                            value={doc.remark}
                            disabled={!isFormEditable}
                            onChange={(event) => {
                              handleDocumentsChange(
                                event.target.value,
                                event.target.name,
                                index,
                                setFormField,
                                formField.documents,
                                inputError,
                                setInputError
                              )
                            }}
                            withAsterisk={false}
                            error={inputError[`remark${index}`]}
                          />
                        </div>

                        <div className='col-md-1 pt-6'>
                          <ActionColumn
                            add={{
                              onClick: () => {
                                AddDocuments(setFormField)
                              },
                              hidden: !(
                                formField.documents.length >= 1 &&
                                index + 1 === formField.documents.length &&
                                formField.documents.length < 10
                              ),
                              disabled: !isFormEditable,
                            }}
                            remove={{
                              onClick: () => {
                                RemoveDocuments(
                                  index,
                                  setFormField,
                                  formField,
                                  inputError,
                                  setInputError
                                )
                              },
                              hidden: formField.documents.length <= 1,
                              disabled: !isFormEditable,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_2_item_4'
              >
                <span className='accordion-icon'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                <h3
                  className={`fs-4 ${
                    errorSection.investment ? 'text-danger' : 'text-gray-800'
                  }  fw-bold mb-0 ms-4`}
                >
                  Investment Interest
                </h3>
              </div>
              <div
                id='kt_accordion_2_item_4'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_2'
              >
                <hr />
                <div className='row'>
                  <div className='col-md-2 mb-5'>
                    <CustomSelectInput
                      data={[
                        {label: 'Long Term Wealth Creation', value: 'Long Term Wealth Creation'},
                        {label: 'Retirement Planning', value: 'Retirement Planning'},
                        {label: 'Education Planning', value: 'Education Planning'},
                        {label: 'Marriage Planning', value: 'Marriage Planning'},
                        {label: 'Dream Home Planning', value: 'Dream Home Planning'},
                        {label: 'Dream Car Planning', value: 'Dream Car Planning'},
                      ]}
                      label='Investment Goal'
                      name='investmentGoal'
                      value={formField.investmentGoal}
                      disabled={!isFormEditable}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'investmentGoal',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.investmentGoal}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomNumberInput
                      label={
                        <span>
                          Investment Horizon
                          <i className='fa-solid fa-circle-info ms-1' title='In Years'></i>
                        </span>
                      }
                      name='investmentHorizon'
                      value={formField.investmentHorizon}
                      disabled={!isFormEditable}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.investmentHorizon}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomSelectInput
                      data={[
                        {label: 'Below 1 Lakh', value: 'Below 1 Lakh'},
                        {label: '1-5 Lakhs', value: '1-5 Lakhs'},
                        {label: '5-10 Lakhs', value: '5-10 Lakhs'},
                        {label: '10-25 Lakhs', value: '10-25 Lakhs'},
                        {label: '25-50 Lakhs', value: '25-50 Lakhs'},
                        {label: 'Above 50 Lakhs', value: 'Above 50 Lakhs'},
                      ]}
                      label='Annual Income (In INR)'
                      name='annualIncome'
                      value={formField.annualIncome}
                      disabled={!isFormEditable}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'annualIncome',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.annualIncome}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomTextInput
                      label='Source of Income'
                      name='sourceOfIncome'
                      disabled={!isFormEditable}
                      value={formField.sourceOfIncome}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.sourceOfIncome}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomNumberInput
                      label={
                        <span>
                          Current Net Worth
                          <i
                            className='fa-solid fa-circle-info ms-1'
                            title='Net worth comprises of assets such as a house (It can be yours/your spouse/your parents), car, jewelry, investment in the stock market / mutual funds or cash in the bank, minus any outstanding debts or liabilities.'
                          ></i>
                        </span>
                      }
                      name='currentWorth'
                      disabled={!isFormEditable}
                      value={formField.currentWorth}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.currentWorth}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomNumberInput
                      label={
                        <span>
                          Current Holding in Equity
                          <i
                            className='fa-solid fa-circle-info ms-1'
                            title='Equity MFs, Stocks, PMS. etc in INR'
                          ></i>
                        </span>
                      }
                      name='currentHoldinginEquity'
                      value={formField.currentHoldinginEquity}
                      disabled={!isFormEditable}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      title={''}
                      withAsterisk={isFormMandatory}
                      error={inputError.currentHoldinginEquity}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomNumberInput
                      label={
                        <span>
                          Current Holding in Debt
                          <i
                            className='fa-solid fa-circle-info ms-1'
                            title='All Fixed Income Investments & Fixed Deposits, Bank Savings, Govt. Bonds, Mutual Fund Debt Funds etc. in INR'
                          ></i>
                        </span>
                      }
                      name='currentHoldinginDebt'
                      value={formField.currentHoldinginDebt}
                      disabled={!isFormEditable}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.currentHoldinginDebt}
                    />
                  </div>
                  <div className='col-md-2 mb-5'>
                    <CustomNumberInput
                      label='Immediate Finance Needs'
                      name='immediateFinanceNeeds'
                      value={formField.immediateFinanceNeeds}
                      disabled={!isFormEditable}
                      onChange={(event) => {
                        handleInputChange(event, setFormField, inputError, setInputError)
                      }}
                      title={'In Years & How Much'}
                      withAsterisk={isFormMandatory}
                      error={inputError.immediateFinanceNeeds}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_2_item_5'
              >
                <span className='accordion-icon'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                <h3
                  className={`fs-4 ${
                    errorSection.riskprofile ? 'text-danger' : 'text-gray-800'
                  }  fw-bold mb-0 ms-4`}
                >
                  Risk Profile
                </h3>
              </div>
              <div
                id='kt_accordion_2_item_5'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_2'
              >
                <hr />
                <div className='row riskProfile'>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`1. ${Q1}`}
                      data={[
                        {
                          label: `a) ${Q1A1}`,
                          value: Q1A1,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `b) ${Q1A2} `,
                          value: Q1A2,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `c) ${Q1A3} `,
                          value: Q1A3,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `d) ${Q1A4} `,
                          value: Q1A4,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `e) ${Q1A5} `,
                          value: Q1A5,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `f) ${Q1A6}`,
                          value: Q1A6,
                          disabled: !isFormEditable,
                        },
                      ]}
                      value={formField.riskQ1}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ1',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      children={undefined}
                      error={inputError.riskQ1}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`2. ${Q2}`}
                      data={[
                        {
                          label: `a) ${Q2A1}`,
                          value: Q2A1,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `b) ${Q2A2}`,
                          value: Q2A2,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `c) ${Q2A3}`,
                          value: Q2A3,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `d) ${Q2A4}`,
                          value: Q2A4,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `e) ${Q2A5}`,
                          value: Q2A5,
                          disabled: !isFormEditable,
                        },
                      ]}
                      children={undefined}
                      w={1000}
                      value={formField.riskQ2}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ2',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ2}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`3. ${Q3}`}
                      data={[
                        {label: `a) ${Q3A1}`, value: Q3A1, disabled: !isFormEditable},
                        {label: `b) ${Q3A2}`, value: Q3A2, disabled: !isFormEditable},
                        {
                          label: `c) ${Q3A3}`,
                          value: Q3A3,
                          disabled: !isFormEditable,
                        },
                      ]}
                      children={undefined}
                      value={formField.riskQ3}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ3',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ3}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`4. ${Q4}`}
                      data={[
                        {label: `a) ${Q4A1}`, value: Q4A1, disabled: !isFormEditable},
                        {label: `b) ${Q4A2}`, value: Q4A2, disabled: !isFormEditable},
                        {label: `c) ${Q4A3}`, value: Q4A3, disabled: !isFormEditable},
                        {label: `d) ${Q4A4}`, value: Q4A4, disabled: !isFormEditable},
                      ]}
                      children={undefined}
                      value={formField.riskQ4}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ4',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ4}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`5. ${Q5}`}
                      data={[
                        {
                          label: `a) ${Q5A1}`,
                          value: Q5A1,
                        },
                        {
                          label: `b) ${Q5A2}`,
                          value: Q5A2,
                        },
                        {
                          label: `c) ${Q5A3}`,
                          value: Q5A3,
                        },
                        {
                          label: `d) ${Q5A4}`,
                          value: Q5A4,
                        },
                      ]}
                      children={undefined}
                      value={formField.riskQ5}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ5',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ5}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`6. ${Q6}`}
                      data={[
                        {
                          label: `a) ${Q6A1}`,
                          value: Q6A1,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `b) ${Q6A2}`,
                          value: Q6A2,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `c) ${Q6A3}`,
                          value: Q6A3,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `d) ${Q6A4}`,
                          value: Q6A4,
                          disabled: !isFormEditable,
                        },
                      ]}
                      children={undefined}
                      value={formField.riskQ6}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ6',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ6}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`7. ${Q7}`}
                      data={[
                        {
                          label: `a) ${Q7A1}`,
                          value: Q7A1,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `b) ${Q7A2}`,
                          value: Q7A2,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `c) ${Q7A3}`,
                          value: Q7A3,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `d) ${Q7A4}`,
                          value: Q7A4,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `e) ${Q7A5}`,
                          value: Q7A5,
                          disabled: !isFormEditable,
                        },
                      ]}
                      children={undefined}
                      value={formField.riskQ7}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ7',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ7}
                    />
                  </div>
                  <div className='mb-5 col-md-12'>
                    <CustomRadioInput
                      label={`8. ${Q8}`}
                      data={[
                        {
                          label: `a) ${Q8A1}`,
                          value: Q8A1,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `b) ${Q8A2}`,
                          value: Q8A2,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `c) ${Q8A3}`,
                          value: Q8A3,
                          disabled: !isFormEditable,
                        },
                        {
                          label: `d) ${Q8A4}`,
                          value: Q8A4,
                          disabled: !isFormEditable,
                        },
                      ]}
                      children={undefined}
                      value={formField.riskQ8}
                      onChange={(value) => {
                        handleOtherInputChange(
                          value,
                          'riskQ8',
                          setFormField,
                          inputError,
                          setInputError
                        )
                      }}
                      withAsterisk={isFormMandatory}
                      error={inputError.riskQ8}
                    />
                  </div>
                </div>
              </div>
            </div>

            {formType !== 'client' ? (
              <div className='mb-5'>
                <div
                  className='accordion-header py-3 d-flex collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#kt_accordion_2_item_6'
                  onClick={() => {
                    if (activeTab === null && selectedProducts.length > 0) setActiveTab('0')
                  }}
                >
                  <span className='accordion-icon'>
                    <KTSVG
                      className='svg-icon svg-icon-4'
                      path='/media/icons/duotune/arrows/arr064.svg'
                    />
                  </span>
                  <h3
                    className={`fs-4 ${
                      errorSection.product ? 'text-danger' : 'text-gray-800'
                    }  fw-bold mb-0 ms-4`}
                  >
                    Products
                  </h3>
                </div>
                <div
                  id='kt_accordion_2_item_6'
                  className='collapse fs-6 ps-10'
                  data-bs-parent='#kt_accordion_2'
                >
                  <hr />
                  <div className='row'>
                    <div className='row align-items-center flex-wrap '>
                      <div className='col-7'>
                        <div className='row align-items-center'>
                          <div className='mb-5 col-3'>
                            <CustomSelectInput
                              data={productName}
                              value={productFilterField.productName}
                              onChange={(value) => {
                                handleOtherInputChange(
                                  value,
                                  'productName',
                                  setProductFilterField,
                                  inputError,
                                  setInputError
                                )
                              }}
                              withAsterisk={false}
                              label='Product Name'
                              error={inputError.category}
                            />
                          </div>
                          <div className='mb-5 col-3'>
                            <CustomSelectInput
                              data={[
                                {label: 'Advisory', value: 'Advisory'},
                                {label: 'PMS', value: 'PMS'},
                                {label: 'Mutual Fund', value: 'Mutual Fund'},
                              ]}
                              value={productFilterField.category}
                              onChange={(value) => {
                                handleOtherInputChange(
                                  value,
                                  'category',
                                  setProductFilterField,
                                  inputError,
                                  setInputError
                                )
                              }}
                              withAsterisk={false}
                              label='Category'
                              error={inputError.category}
                            />
                          </div>
                          <div className='mb-5 col-3'>
                            <CustomSelectInput
                              data={[
                                {label: 'Lumpsum', value: 'Lumpsum'},
                                {label: 'SIP', value: 'SIP'},
                                {label: 'Lumpsum + SIP', value: 'Lumpsum + SIP'},
                              ]}
                              value={productFilterField.subCategory}
                              onChange={(value) => {
                                handleOtherInputChange(
                                  value,
                                  'subCategory',
                                  setProductFilterField,
                                  inputError,
                                  setInputError
                                )
                              }}
                              withAsterisk={false}
                              label='Sub Category'
                              error={inputError.subCategory}
                            />
                          </div>
                          <div className='col-1  d-flex'>
                            <Button
                              loaderPosition='center'
                              type='submit'
                              hidden={prospectFormField.operationalStatus === '3'}
                              className='btn btn-primary btn-sm  '
                              onClick={() => {
                                setProductFilterField({
                                  productName: '',
                                  category: '',
                                  subCategory: '',
                                })
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className=' col-4 mb-5 '>
                        <CustomMultiSelectInput
                          label='Products'
                          placeholder='Select Products'
                          data={filteredProducts}
                          id='productsData'
                          value={[]}
                          disabled={prospectFormField.operationalStatus === '3'}
                          onChange={(value) => {
                            handleProductSelectionChange(
                              value,
                              formField.products,
                              products,
                              setFormField,
                              selectedProducts,
                              setSelectedProduct
                            )
                          }}
                          searchable={false}
                          error={inputError.products}
                          withAsterisk={false}
                        />
                      </div>
                    </div>
                    <Tabs
                      value={activeTab}
                      onTabChange={(value) => {
                        setActiveTab(value)
                        setActiveProductTab('Pipeline')
                      }}
                      variant='outline'
                    >
                      <Tabs.List>
                        {selectedProducts?.map((product, index) => {
                          let selectedProduct = products?.filter((prd) => prd.value === product)[0]
                          return (
                            <>
                              <Tabs.Tab fz={18} value={`${index}`}>
                                {selectedProduct?.label}
                                <i
                                  className='fa-solid fa-xmark  ms-1'
                                  hidden={selectedProduct?.disabled}
                                  onClick={() =>
                                    removeMainProduct(
                                      selectedProduct.value,
                                      formField.products,
                                      setFormField,
                                      inputError,
                                      setInputError,
                                      selectedProducts,
                                      setSelectedProduct
                                    )
                                  }
                                ></i>
                              </Tabs.Tab>
                            </>
                          )
                        })}
                      </Tabs.List>
                      {selectedProducts?.map((product, index) => {
                        let selectedProduct = products?.filter((prd) => prd.value === product)[0]
                        let formProducts = formField?.products.filter(
                          (prd) => prd.productId === product
                        )[0]

                        return (
                          <>
                            <Tabs.Panel pt={'xl'} value={`${index}`}>
                              <div className='row mt-4'>
                                <div className='col-md-11'>
                                  Just for info :{' '}
                                  <span>
                                    {!selectedProduct?.profitPlan
                                      ? '-'
                                      : 'Profit Plan : ' + selectedProduct?.profitPlan}{' '}
                                    ,
                                    {!selectedProduct?.profitPercent
                                      ? '-'
                                      : ' Profit % : ' + selectedProduct.profitPercent}
                                  </span>{' '}
                                  ,{' '}
                                  {selectedProduct?.productsTicketSize?.length > 1 ? (
                                    selectedProduct?.productsTicketSize?.map(
                                      (productsTicketSize, index) => {
                                        return (
                                          <span key={`${index}`} className=' '>
                                            {productsTicketSize?.subCategory === null
                                              ? '-'
                                              : productsTicketSize?.subCategory + ' Ticket Size : '}
                                            {productsTicketSize?.ticketSize === null
                                              ? '0'
                                              : numberFormat(
                                                  productsTicketSize?.ticketSize,
                                                  'no-roundup'
                                                )}{' '}
                                            {index + 1 ===
                                            selectedProduct?.productsTicketSize?.length
                                              ? ''
                                              : ', '}
                                          </span>
                                        )
                                      }
                                    )
                                  ) : (
                                    <span>
                                      {selectedProduct?.productsTicketSize[0]?.subCategory === null
                                        ? '-'
                                        : selectedProduct?.productsTicketSize[0]?.subCategory +
                                          ' Ticket Size : '}
                                      {selectedProduct?.productsTicketSize[0]?.ticketSize === null
                                        ? '0'
                                        : numberFormat(
                                            selectedProduct.productsTicketSize[0]?.ticketSize,
                                            'no-roundup'
                                          )}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className='row'>
                                <Tabs
                                  value={activeProductTab}
                                  onTabChange={setActiveProductTab}
                                  variant='outline'
                                >
                                  <Tabs.List>
                                    {['Pipeline', 'Asset']?.map((tabName) => {
                                      return (
                                        <>
                                          <Tabs.Tab fz={18} value={`${tabName}`}>
                                            {tabName}
                                          </Tabs.Tab>
                                        </>
                                      )
                                    })}
                                  </Tabs.List>
                                  {['Pipeline', 'Asset']?.map((tabName) => {
                                    let selectedProduct = products?.filter(
                                      (prd) => prd.value === product
                                    )[0]
                                    let formProducts = formField?.products.filter(
                                      (prd) => prd.productId === product
                                    )[0]

                                    let mainProductsIndex =
                                      formField?.products?.indexOf(formProducts)

                                    return (
                                      <>
                                        <Tabs.Panel pt={'xl'} value={`${tabName}`}>
                                          <div className='row'>
                                            <div className='col-12'>
                                              <div
                                                className='accordion accordion-icon-toggle'
                                                id={`product_accordian${mainProductsIndex}`}
                                              >
                                                {formProducts?.product
                                                  ?.filter((item) => item.type === tabName)
                                                  ?.map((prod, prdIndex) => {
                                                    return formProducts.product
                                                      .filter(
                                                        (item) =>
                                                          (item.id === prod.id ||
                                                            item.parentId === prod.id) &&
                                                          (tabName === 'Asset'
                                                            ? item.type !== 'Pipeline'
                                                            : item.type === 'Pipeline')
                                                      )
                                                      ?.map((prd) => {
                                                        let index =
                                                          formProducts?.product?.indexOf(prd)
                                                        return (
                                                          <>
                                                            <div className='mb-5'>
                                                              <div
                                                                className='accordion-header py-3 d-flex collapsed'
                                                                data-bs-toggle='collapse'
                                                                data-bs-target={`#ABC${index}`}
                                                              >
                                                                <span className='accordion-icon'>
                                                                  <KTSVG
                                                                    className='svg-icon svg-icon-4'
                                                                    path='/media/icons/duotune/arrows/arr064.svg'
                                                                  />
                                                                </span>
                                                                <div className='row mt-4'>
                                                                  <div className='col-md-2 mb-5'>
                                                                    <CustomTextInput
                                                                      label='Start Date'
                                                                      name='startDate'
                                                                      type='date'
                                                                      value={prd.startDate}
                                                                      disabled={
                                                                        prd.isDisable ||
                                                                        prospectFormField.operationalStatus ===
                                                                          '3'
                                                                      }
                                                                      withAsterisk={
                                                                        prd.status === '16'
                                                                      }
                                                                      onChange={(event) => {
                                                                        handleProductChange(
                                                                          event.target.value,
                                                                          event.target.name,
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}startDate${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div className='col-md-2 mb-5'>
                                                                    <CustomTextInput
                                                                      label='End Date'
                                                                      name='endDate'
                                                                      type='date'
                                                                      value={prd.endDate}
                                                                      disabled={true}
                                                                      withAsterisk={
                                                                        prd.status === '16'
                                                                      }
                                                                      onChange={(event) => {
                                                                        handleProductChange(
                                                                          event.target.value,
                                                                          event.target.name,
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}endDate${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div className='col-md-2 mb-5'>
                                                                    <CustomSelectInput
                                                                      label='Status'
                                                                      name='status'
                                                                      data={[
                                                                        {
                                                                          label:
                                                                            'Verifiation of Online Form',
                                                                          value: '9',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: `Sent To ${selectedProduct?.name}`,
                                                                          value: '10',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: 'KYC Held',
                                                                          value: '11',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: 'E-Signed',
                                                                          value: '12',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: 'Fees Recieved',
                                                                          value: '13',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label:
                                                                            'Fees Invoice Sent',
                                                                          value: '14',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label:
                                                                            'Contract Note Updated',
                                                                          value: '15',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: 'Plan Active',
                                                                          value: '16',
                                                                          disabled: !(
                                                                            !prospectFormField.operationalStatus &&
                                                                            Number(
                                                                              prospectFormField.status
                                                                            ) > 4
                                                                          ),
                                                                        },
                                                                        {
                                                                          label: 'In Pipeline',
                                                                          value: '17',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: 'Lost',
                                                                          value: '18',
                                                                          disabled: prd.isDisable,
                                                                        },
                                                                        {
                                                                          label: 'Discontinue',
                                                                          value: '21',
                                                                        },
                                                                      ]}
                                                                      value={prd.status}
                                                                      disabled={
                                                                        prospectFormField.operationalStatus ===
                                                                          '3' || prd.isStatusDisable
                                                                      }
                                                                      withAsterisk={false}
                                                                      onChange={(value) => {
                                                                        handleProductChange(
                                                                          value,
                                                                          'status',
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}status${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div
                                                                    className='col-md-2 mb-5'
                                                                    hidden={prd.status !== '16'}
                                                                  >
                                                                    <CustomSelectInput
                                                                      label='Profit Plan'
                                                                      name='profitPlan'
                                                                      data={[
                                                                        {
                                                                          label: '50-50',
                                                                          value: '50-50',
                                                                        },
                                                                        {
                                                                          label: '80-20',
                                                                          value: '80-20',
                                                                        },
                                                                      ]}
                                                                      value={prd.profitPlan}
                                                                      disabled={
                                                                        prd.isDisable ||
                                                                        prospectFormField.operationalStatus ===
                                                                          '3'
                                                                      }
                                                                      withAsterisk={false}
                                                                      onChange={(value) => {
                                                                        handleProductChange(
                                                                          value,
                                                                          'profitPlan',
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}profitPlan${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div
                                                                    className='col-md-2 mb-5'
                                                                    hidden={prd.status !== '16'}
                                                                  >
                                                                    <CustomNumberInput
                                                                      label='Profit %'
                                                                      name='profitPercent'
                                                                      value={prd.profitPercent}
                                                                      disabled={
                                                                        prd.isDisable ||
                                                                        prospectFormField.operationalStatus ===
                                                                          '3'
                                                                      }
                                                                      withAsterisk={true}
                                                                      onChange={(event) => {
                                                                        handleProductChange(
                                                                          event.target.value,
                                                                          event.target.name,
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}profitPercent${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div
                                                                    className='col-md-2 mb-5'
                                                                    hidden={prd.status !== '16'}
                                                                  >
                                                                    <CustomNumberInput
                                                                      label='Fees'
                                                                      name='companyFee'
                                                                      value={prd.companyFee}
                                                                      disabled={
                                                                        prd.isDisable ||
                                                                        prospectFormField.operationalStatus ===
                                                                          '3'
                                                                      }
                                                                      withAsterisk={false}
                                                                      onChange={(event) => {
                                                                        handleProductChange(
                                                                          event.target.value,
                                                                          event.target.name,
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}companyFee${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div className='col-md-2 mb-5'>
                                                                    <CustomNumberInput
                                                                      label='Amount'
                                                                      name='amount'
                                                                      value={prd.amount}
                                                                      disabled={
                                                                        prd.isDisable ||
                                                                        prospectFormField.operationalStatus ===
                                                                          '3'
                                                                      }
                                                                      withAsterisk={
                                                                        prd.status === '16'
                                                                      }
                                                                      onChange={(event) => {
                                                                        handleProductChange(
                                                                          event.target.value,
                                                                          event.target.name,
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}amount${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>

                                                                  <div
                                                                    className='col-md-2 mb-5'
                                                                    hidden={prd.status !== '16'}
                                                                  >
                                                                    <CustomNumberInput
                                                                      value={getPaidFees(
                                                                        prd.profitPlan,
                                                                        prd.profitPercent,
                                                                        prd.amount,
                                                                        new Date(prd.startDate),
                                                                        new Date(prd.endDate)
                                                                      )}
                                                                      label='Paid Fees'
                                                                      disabled={true}
                                                                      withAsterisk={false}
                                                                    />
                                                                  </div>
                                                                  <div
                                                                    className='mb-5 col-md-3 '
                                                                    hidden={
                                                                      selectedProduct
                                                                        ?.productsTicketSize
                                                                        ?.length <= 1
                                                                    }
                                                                  >
                                                                    <CustomRadioInput
                                                                      label='Sub Category'
                                                                      value={prd.subCategory}
                                                                      children={undefined}
                                                                      data={[
                                                                        {
                                                                          label: 'Lumpsum',
                                                                          value: 'Lumpsum',
                                                                          disabled:
                                                                            prd.isDisable ||
                                                                            prospectFormField.operationalStatus ===
                                                                              '3',
                                                                        },
                                                                        {
                                                                          label: 'SIP',
                                                                          value: 'SIP',
                                                                          disabled:
                                                                            prd.isDisable ||
                                                                            prospectFormField.operationalStatus ===
                                                                              '3',
                                                                        },
                                                                      ]}
                                                                      onChange={(value) => {
                                                                        clearInputError(
                                                                          `${mainProductsIndex}amount${index}`,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                        handleProductChange(
                                                                          value,
                                                                          'subCategory',
                                                                          index,
                                                                          setFormField,
                                                                          formField.products,
                                                                          selectedProduct,
                                                                          mainProductsIndex,
                                                                          inputError,
                                                                          setInputError
                                                                        )
                                                                      }}
                                                                      error={
                                                                        inputError[
                                                                          `${mainProductsIndex}subCategory${index}`
                                                                        ]
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div
                                                                    className='col-md-1 pt-6'
                                                                    hidden={
                                                                      !(
                                                                        prd.status == '17' &&
                                                                        prd.type == 'Addon'
                                                                      ) ||
                                                                      prospectFormField.operationalStatus ===
                                                                        '3'
                                                                    }
                                                                  >
                                                                    <ActionColumn
                                                                      remove={{
                                                                        onClick: () => {
                                                                          removeProducts(
                                                                            index,
                                                                            mainProductsIndex,
                                                                            setFormField,
                                                                            formField,
                                                                            inputError,
                                                                            setInputError
                                                                          )
                                                                        },
                                                                      }}
                                                                    />
                                                                  </div>
                                                                  <div
                                                                    className='col-md-5 pt-6 '
                                                                    hidden={
                                                                      prospectFormField.operationalStatus ===
                                                                        '3' ||
                                                                      !(
                                                                        prd.type === 'Asset' &&
                                                                        prd.endDate > currentDate
                                                                      )
                                                                    }
                                                                  >
                                                                    <ActionColumn
                                                                      add={{
                                                                        onClick: () => {
                                                                          addProduct(
                                                                            setFormField,
                                                                            prd.id,
                                                                            formField.products,
                                                                            mainProductsIndex
                                                                          )
                                                                        },
                                                                      }}
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div
                                                                id={`ABC${index}`}
                                                                className='collapse fs-6 ps-10'
                                                                data-bs-parent={`#product_accordian${mainProductsIndex}`}
                                                              >
                                                                <hr
                                                                  hidden={
                                                                    prd.renewalData?.length === 0
                                                                  }
                                                                />
                                                                {prd.renewalData?.map(
                                                                  (renewalData, subIndex) => {
                                                                    return (
                                                                      <div className='row mt-4'>
                                                                        <div className='col-md-2 mb-5'>
                                                                          <CustomTextInput
                                                                            label='Renewal date'
                                                                            name='startDate'
                                                                            type='date'
                                                                            value={
                                                                              renewalData.renewalDate
                                                                            }
                                                                            disabled={true}
                                                                            withAsterisk={false}
                                                                          />
                                                                        </div>
                                                                        <div className='col-md-2 mb-5'>
                                                                          <CustomSelectInput
                                                                            label='Status'
                                                                            name='status'
                                                                            data={[
                                                                              {
                                                                                label: 'Paid',
                                                                                value: '20',
                                                                              },
                                                                              {
                                                                                label: 'Due',
                                                                                value: '19',
                                                                              },
                                                                            ]}
                                                                            disabled={
                                                                              renewalData.isDisabled
                                                                            }
                                                                            value={
                                                                              renewalData.status
                                                                            }
                                                                            withAsterisk={false}
                                                                            onChange={(value) => {
                                                                              handleProductRenewalChange(
                                                                                value,
                                                                                'status',
                                                                                index,
                                                                                subIndex,
                                                                                setFormField,
                                                                                formField.products,
                                                                                mainProductsIndex
                                                                              )
                                                                            }}
                                                                            error={
                                                                              inputError[
                                                                                `${mainProductsIndex}status${index}`
                                                                              ]
                                                                            }
                                                                          />
                                                                        </div>
                                                                        <div className='col-md-2 mb-5'>
                                                                          <CustomNumberInput
                                                                            label='Balance Fees'
                                                                            value={
                                                                              renewalData.renewalBalance
                                                                            }
                                                                            disabled={true}
                                                                            withAsterisk={false}
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                    )
                                                                  }
                                                                )}
                                                              </div>
                                                            </div>
                                                            <hr
                                                              hidden={
                                                                formProducts?.product?.filter(
                                                                  (item) => item.type === tabName
                                                                ).length ===
                                                                prdIndex + 1
                                                              }
                                                            />
                                                          </>
                                                        )
                                                      })
                                                  })}
                                              </div>
                                            </div>
                                          </div>
                                        </Tabs.Panel>
                                      </>
                                    )
                                  })}
                                </Tabs>
                              </div>
                            </Tabs.Panel>
                          </>
                        )
                      })}
                    </Tabs>
                  </div>
                  <hr hidden={isFormEditable || prospectFormField.operationalStatus === '3'} />
                  <div
                    className='d-flex flex-wrap justify-content-end align-items-center'
                    hidden={isFormEditable || prospectFormField.operationalStatus === '3'}
                  >
                    <Button
                      loaderPosition='center'
                      hidden={isFormEditable || prospectFormField.operationalStatus === '3'}
                      className='btn btn-primary btn-sm '
                      loading={buttonType === 'submit' && submitAPIStatus.loading}
                      onClick={() => {
                        setButtonType('submit')
                        handleSalesSubmit(
                          prospectFormField,
                          formField,
                          setProspects,
                          setEditId,
                          setFormField,
                          setProspectFormField,
                          editId,
                          setInputError,
                          setProspectInputError,
                          setSubmitAPIStatus,
                          addSalesDataInProspectByProspectId,
                          formType,
                          formType === 'client' ? 'Submit' : 'Update',
                          setIsFormEditable,
                          currentUser?.id ?? null,
                          backUrl,
                          setSelectedProduct,
                          products,
                          setShowForm
                        )
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div hidden={!isFormEditable}>
          <SubmitCancleButton
            cancle={{
              label: formType === 'client' ? 'Save' : 'Verify',
              loading:
                (buttonType === 'save' || buttonType === 'verify') && submitAPIStatus.loading,
              color: 'btn-success',
              disabled: formType == 'user' && prospectFormField.operationalStatus === '1',
              onClick:
                formType === 'client'
                  ? () => {
                      updateButtonType(buttonType, 'save')
                      handleSalesSubmit(
                        prospectFormField,
                        formField,
                        setProspects,
                        setEditId,
                        setFormField,
                        setProspectFormField,
                        editId,
                        setInputError,
                        setProspectInputError,
                        setSubmitAPIStatus,
                        addSalesDataInProspectByProspectId,
                        formType,
                        'Update',
                        setIsFormEditable,
                        currentUser?.id ?? null,
                        backUrl,
                        setSelectedProduct,
                        products,
                        setShowForm
                      )
                    }
                  : () => {
                      updateButtonType(buttonType, 'verify')
                      handleSalesSubmit(
                        prospectFormField,
                        formField,
                        setProspects,
                        setEditId,
                        setFormField,
                        setProspectFormField,
                        editId,
                        setInputError,
                        setProspectInputError,
                        setSubmitAPIStatus,
                        addSalesDataInProspectByProspectId,
                        formType,
                        'verify',
                        setIsFormEditable,
                        currentUser?.id ?? null,
                        backUrl,
                        setSelectedProduct,
                        products,
                        setShowForm
                      )
                    },
            }}
            submit={{
              editid: editId,
              label: formType === 'client' ? 'Submit' : editId ? 'Update' : 'Save',
              loading: buttonType === 'submit' && submitAPIStatus.loading,
              onClick: () => {
                updateButtonType(buttonType, 'submit')
                handleSalesSubmit(
                  prospectFormField,
                  formField,
                  setProspects,
                  setEditId,
                  setFormField,
                  setProspectFormField,
                  editId,
                  setInputError,
                  setProspectInputError,
                  setSubmitAPIStatus,
                  addSalesDataInProspectByProspectId,
                  formType,
                  formType === 'client' ? 'Submit' : 'Update',
                  setIsFormEditable,
                  currentUser?.id ?? null,
                  backUrl,
                  setSelectedProduct,
                  products,
                  setShowForm
                )
              },
            }}
          />
        </div>
      </div>
      <Modal
        opened={openModel}
        onClose={() => {
          getReferalData(setReferal)
          cancelSubmit(
            setNewProspectFormField,
            setEditId,
            setNewProspectInputError,
            {
              ...ProspectInitialInput,
              referalType: 'new',
              assignedBy: currentUser?.id ?? '',
              currentUserId: currentUser?.id ?? '',
            },
            setOpenModel
          )
        }}
        size='85%'
        withCloseButton={true}
      >
        <div className='card '>
          <div className='card-header'>
            <h4 className='card-title'>Add Referal</h4>
          </div>
          <div className='card-body'>
            <ProspectForm
              formField={newProspectformField}
              handleOpenModel={handleOpenModel}
              prospectType='new'
              inputError={newProspectInputError}
              setFormField={setNewProspectFormField}
              setInputError={setNewProspectInputError}
              setCity={setNewProspectCity}
              setState={setNewProspectState}
              city={newProspectCity}
              cityOfBirth={newProspectCityOfBirth}
              setCityOfBirth={setNewProspectCityOfBirth}
              state={newProspectState}
              referal={referal}
              isFormEditable={isFormEditable}
              editId={null}
            />
          </div>
          <SubmitCancleButton
            cancle={{
              onClick: () => {
                cancelSubmit(
                  setNewProspectFormField,
                  setNewProspectEditId,
                  setNewProspectInputError,
                  {
                    ...ProspectInitialInput,
                    referalType: 'new',
                    assignedBy: currentUser?.id ?? '',
                    currentUserId: currentUser?.id ?? '',
                  },
                  setOpenModel
                )
              },
            }}
            submit={{
              editid: editId,
              loading: submitAPIStatus.loading,
              onClick: () =>
                handleSubmit(
                  `${API.PROSPECTS}`,
                  newProspectformField,
                  {
                    ...ProspectInitialInput,
                    referalType: 'new',
                    assignedBy: currentUser?.id ?? '',
                    currentUserId: currentUser?.id ?? '',
                  },
                  setReferal,
                  setNewProspectEditId,
                  setNewProspectFormField,
                  newProspectEditId,
                  setNewProspectInputError,
                  validateProspectForm,
                  setSubmitAPIStatus,
                  addProspects,
                  updateProspectsById,
                  setShowForm
                ),
            }}
          />
        </div>
      </Modal>
      <Modal
        opened={openModalSendToClient}
        onClose={() => {
          setOpenModelSendToClient(false)
        }}
        size='50%'
        withCloseButton={true}
      >
        <div className='card '>
          <div className='card-body'>
            <h4 className='card-title'>
              Are you sure you want to send the form to{' '}
              <span className='text-primary'>{prospectFormField.email}</span> ?
            </h4>
          </div>
          <SubmitCancleButton
            cancle={{
              onClick: () => {
                setOpenModelSendToClient(false)
              },
            }}
            submit={{
              label: 'Submit',
              loading: sendEmailStatus.loading,
              onClick: () => {
                sendToClient(
                  setOpenModelSendToClient,
                  setSendEmailStatus,
                  editId,
                  currentUser?.id ?? '',
                  setProspectFormField
                )
              },
            }}
          />
        </div>
      </Modal>
      <Modal
        opened={previwModel}
        onClose={() => {
          setPreviwModel(false)
        }}
        withCloseButton={true}
        fullScreen
      >
        <div
          style={{height: 600, overflow: 'auto'}}
          ref={['xlsx', 'xls'].includes(preview?.fileType) ? excelRef : null}
        >
          {preview?.fileType?.includes('image') ? (
            <img src={preview.uri ?? ''} alt='Preview' style={{maxWidth: '100%'}} />
          ) : preview?.fileType?.includes('pdf') ? (
            <iframe src={preview.uri ?? ''} width={'100%'} height={1000} />
          ) : (
            <FileViewer
              fileType={preview.fileType}
              filePath={preview.uri}
              height={1000}
              width={'100%'}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default SalesForm
