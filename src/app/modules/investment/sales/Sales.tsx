import {Button, Center, Tabs} from '@mantine/core'
import {useContext, useEffect, useMemo, useState} from 'react'
import {numberFormat} from '../../../../_metronic/helpers'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import roleContext from '../../../../context/roleContext'
import {ProspectInitialInput, SalesInitialInput} from '../../../../data/InvestmentModuleDefaultData'
import {APIStatusData} from '../../../../data/OtherDefaultData'
import {
  ProspectInputType,
  ProspectOutput,
  SalestInputType,
} from '../../../../types/InvestmentModuleTypes'
import {
  InputErrorType,
  MasterDashboardDataType,
  RoleContextValue,
  SelectValueType,
} from '../../../../types/OtherTypes'
import {getRecords} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomRadioInput from '../../../components/CustomInput/CustomRadioInput'
import CustomTable from '../../../components/CustomTable'
import DashboardCards from '../../../components/DashboardCards'
import {useAuth} from '../../auth'
import {commentTableHeaderData} from '../comments/commentFunction'
import {getProspectTableHeaderData} from '../prospect/ProspectFunction'
import SalesForm from './SalesForm'
import {checkArrayRenewalProduct, getSalesProspectByID} from './SalesFunction'

const Sales = () => {
  let roleState: RoleContextValue = useContext(roleContext)
  const [role, setRole] = useState<string>('advisor')
  const [editId, setEditId] = useState<string | null>(null)
  const [count, setCount] = useState<MasterDashboardDataType>({...APIStatusData, data: {}})
  const [showForm, setShowForm] = useState<boolean>(false)
  const {prospectTableHeaderData} = getProspectTableHeaderData()
  const [prospects, setProspects] = useState<ProspectOutput>({
    ...APIStatusData,
    data: [],
  })
  const [inputError, setInputError] = useState<InputErrorType>({})
  const [propspectInputError, setProspectInputError] = useState<InputErrorType>({})
  const [formField, setFormField] = useState<SalestInputType>(SalesInitialInput)
  const {currentUser} = useAuth()
  const [prospectFormField, setProspectFormField] = useState<ProspectInputType>({
    ...ProspectInitialInput,
    referalType: 'existing',
    assignedBy: currentUser?.id ?? '',
    currentUserId: currentUser?.id ?? '',
  })
  const [selectedProduct, setSelectedProduct] = useState<string[]>([])
  const [state, setState] = useState<SelectValueType[]>([])
  const [city, setCity] = useState<SelectValueType[]>([])
  const [cityOfBirth, setCityOfBirth] = useState<SelectValueType[]>([])
  const [showProduct, setShowProduct] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<string | null>('0')
  const [showRenewalProduct, setShowRenewalProduct] = useState<number[]>([])
  const [activeProductTab, setActiveProductTab] = useState<string | null>('Pipeline')

  const clearShowProduct = useMemo(() => {
    setShowProduct([])
    if (!showForm) {
      getRecords(`${API.PROSPECTS}/user/${currentUser?.id}/${role}/count`, setCount)
    }
  }, [showForm])

  const checkArrayProduct = (element: number) => {
    setShowProduct((prevshowProduct) => {
      const isExists = prevshowProduct.includes(element)
      if (isExists) {
        return prevshowProduct.filter((row) => row !== element)
      } else {
        return [element]
      }
    })
    setActiveTab('0')
  }
  const getTableBody = () => {
    return (
      <>
        {prospects?.data?.map((obj, index) => {
          return (
            <>
              <tr
                className={`${editId === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
                key={obj?.id ?? '-'}
              >
                <>
                  <td>
                    <div className='text-center'>
                      <i
                        className={`fas fa-chevron-${showProduct.includes(index) ? 'up' : 'down'}`}
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          checkArrayProduct(index)
                        }}
                      />
                    </div>
                  </td>

                  <td>{`${obj?.firstName ?? ''} ${obj?.lastName ?? ''}`}</td>
                  <td>{obj?.mobileNo ?? '-'}</td>
                  <td>{obj?.email ?? '-'}</td>
                  <td>
                    {!obj.addressLine1 &&
                    !obj?.addressLine2 &&
                    !obj?.pin &&
                    !obj?.city?.name &&
                    !obj?.state?.name &&
                    !obj?.country?.name
                      ? '-'
                      : `${obj?.addressLine1 ? obj?.addressLine1 + ',' : ''} ${
                          obj?.addressLine2 ? obj?.addressLine2 + ',' : ''
                        } ${obj?.city?.name ? obj?.city?.name + ',' : ''} ${
                          obj?.state?.name ? obj?.state?.name + ',' : ''
                        } ${obj?.country?.name ? obj?.country?.name + ',' : ''} ${obj?.pin ?? ''}`}
                  </td>
                  <td>
                    {obj?.newReferal?.firstName
                      ? `${obj?.newReferal?.firstName ?? ''} ${obj?.newReferal?.lastName ?? ''}`
                      : `${obj?.existingReferal?.firstName ?? ''} ${
                          obj?.existingReferal?.lastName ?? ''
                        }`}
                  </td>
                  <td>
                    {' '}
                    {obj?.newReferal?.firstName
                      ? obj?.newReferal?.mobileNo
                      : obj?.existingReferal?.mobileNo}
                  </td>
                  <td>
                    {obj?.assignedBy
                      ? obj?.assignedBy?.firstName + ' ' + obj?.assignedBy?.lastName
                      : '-'}
                  </td>
                  <td>{!obj?.probability ? '-' : obj?.probability}</td>
                  <td>{!obj?.operationalStatus ? obj?.status ?? '' : obj?.operationalStatus}</td>
                  <td>
                    <ActionColumn
                      edit={{
                        onClick: () => {
                          getSalesProspectByID(
                            obj.id,
                            formField,
                            setFormField,
                            prospectFormField,
                            setProspectFormField,
                            setEditId,
                            setInputError,
                            setShowForm,
                            setState,
                            setCity,
                            setCityOfBirth,
                            setSelectedProduct
                          )
                        },
                      }}
                    />
                  </td>
                </>
              </tr>
              <tr hidden={!showProduct.includes(index)}>
                <td colSpan={12}>
                  <div className='row'>
                    {obj?.clientProduct?.length > 0 ? (
                      <Tabs value={activeTab} onTabChange={setActiveTab} variant='outline'>
                        <Tabs.List>
                          {obj?.clientProduct?.map((product, index) => {
                            return (
                              <>
                                <Tabs.Tab fz={18} value={`${index}`}>
                                  {product?.productDetails?.productName +
                                    ' - ' +
                                    product?.productDetails?.category +
                                    ' - ' +
                                    product?.productDetails?.subCategory}
                                </Tabs.Tab>
                              </>
                            )
                          })}
                        </Tabs.List>
                        {obj?.clientProduct?.map((product, index) => {
                          return (
                            <>
                              <Tabs.Panel pt={'xl'} value={`${index}`}>
                                <div className='row ps-1'>
                                  <div className='col-12 mb-3'>
                                    Just for info :{' '}
                                    <span>
                                      {!product?.productDetails?.profitPlan
                                        ? '-'
                                        : 'Profit Plan : ' +
                                          product?.productDetails?.profitPlan}{' '}
                                      ,
                                      {!product?.productDetails?.profitPercent
                                        ? '-'
                                        : ' Profit % : ' + product?.productDetails.profitPercent}
                                    </span>{' '}
                                    ,{' '}
                                    {product?.productDetails?.productsTicketSize?.length > 1 ? (
                                      product?.productDetails?.productsTicketSize?.map(
                                        (productsTicketSize, index) => {
                                          return (
                                            <span key={`${index}`}>
                                              {productsTicketSize?.subCategory === null
                                                ? '-'
                                                : productsTicketSize?.subCategory +
                                                  ' Ticket Size : '}
                                              {productsTicketSize?.ticketSize === null
                                                ? '0'
                                                : numberFormat(
                                                    productsTicketSize?.ticketSize,
                                                    'no-roundup'
                                                  )}
                                              {index + 1 ===
                                              product?.productDetails?.productsTicketSize?.length
                                                ? ''
                                                : ', '}
                                            </span>
                                          )
                                        }
                                      )
                                    ) : (
                                      <span>
                                        {product?.productDetails?.productsTicketSize[0]
                                          ?.subCategory === null
                                          ? '-'
                                          : product?.productDetails?.productsTicketSize[0]
                                              ?.subCategory + ' Ticket Size : '}
                                        {product?.productDetails?.productsTicketSize[0]
                                          ?.ticketSize === null
                                          ? '0'
                                          : numberFormat(
                                              product?.productDetails?.productsTicketSize[0]
                                                ?.ticketSize,
                                              'no-roundup'
                                            )}
                                      </span>
                                    )}
                                  </div>
                                </div>
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
                                    return (
                                      <>
                                        <Tabs.Panel pt={'xl'} value={`${tabName}`}>
                                          <div className='row'>
                                            <div className='col-12'>
                                              <>
                                                <div className='mt-4'>
                                                  <CustomTable
                                                    tableBody={() => {
                                                      return product?.product
                                                        ?.filter((item) => item.type === tabName)
                                                        ?.map((prod, prdIndex) => {
                                                          return product.product
                                                            .filter(
                                                              (item) =>
                                                                (item.id === prod.id ||
                                                                  item.parentId?.id === prod.id) &&
                                                                (tabName === 'Asset'
                                                                  ? item.type !== 'Pipeline'
                                                                  : item.type === 'Pipeline')
                                                            )
                                                            ?.map((prd, subIndex) => {
                                                              return (
                                                                <>
                                                                  <tr>
                                                                    <td>
                                                                      <div className='text-center'>
                                                                        <i
                                                                          className={`fas fa-chevron-${
                                                                            showRenewalProduct.includes(
                                                                              subIndex
                                                                            )
                                                                              ? 'up'
                                                                              : 'down'
                                                                          }`}
                                                                          style={{
                                                                            cursor: 'pointer',
                                                                          }}
                                                                          onClick={() => {
                                                                            checkArrayRenewalProduct(
                                                                              subIndex,
                                                                              setShowRenewalProduct
                                                                            )
                                                                          }}
                                                                        />
                                                                      </div>
                                                                    </td>
                                                                    <td>{prd?.startDate ?? '-'}</td>
                                                                    <td>{prd?.endDate ?? '-'}</td>
                                                                    <td>{prd?.amount ?? '-'}</td>
                                                                    <td>
                                                                      {prd?.profitPlan ?? '-'}
                                                                    </td>
                                                                    <td>
                                                                      {prd?.profitPercent ?? '-'}
                                                                    </td>
                                                                    <td>
                                                                      {prd?.companyFee ?? '-'}
                                                                    </td>
                                                                    <td>
                                                                      {prd?.profitAmount ?? '-'}
                                                                    </td>
                                                                    <td>
                                                                      {prd.status.code === '10'
                                                                        ? `Sent To ${product.productDetails.productName}  `
                                                                        : prd.status.name}
                                                                    </td>
                                                                    <td
                                                                      hidden={
                                                                        product?.productDetails
                                                                          ?.productsTicketSize
                                                                          ?.length < 2
                                                                      }
                                                                    >
                                                                      {prd?.subCategory ?? '-'}
                                                                    </td>
                                                                  </tr>
                                                                  <tr
                                                                    hidden={
                                                                      !showRenewalProduct.includes(
                                                                        subIndex
                                                                      )
                                                                    }
                                                                  >
                                                                    <td colSpan={14}>
                                                                      <div className='mt-4'>
                                                                        <CustomTable
                                                                          tableBody={() => {
                                                                            return prd?.clientProductRenewal?.map(
                                                                              (
                                                                                clientProductRenewal
                                                                              ) => {
                                                                                return (
                                                                                  <>
                                                                                    <tr>
                                                                                      <td>
                                                                                        {clientProductRenewal?.renewalDate ??
                                                                                          '-'}
                                                                                      </td>
                                                                                      <td>
                                                                                        {clientProductRenewal?.renewalBalance ??
                                                                                          '-'}
                                                                                      </td>

                                                                                      <td>
                                                                                        {
                                                                                          clientProductRenewal
                                                                                            .status
                                                                                            .name
                                                                                        }
                                                                                      </td>
                                                                                    </tr>
                                                                                  </>
                                                                                )
                                                                              }
                                                                            )
                                                                          }}
                                                                          tableHeadData={[
                                                                            {
                                                                              th: {
                                                                                id: 'startDate',
                                                                              },
                                                                              text: 'Renewal Date',
                                                                            },
                                                                            {
                                                                              th: {
                                                                                id: 'endDate',
                                                                              },
                                                                              text: 'Renewal Balance',
                                                                            },
                                                                            {
                                                                              th: {
                                                                                id: 'status',
                                                                              },
                                                                              text: 'Status',
                                                                            },
                                                                          ]}
                                                                          isPaginationRequired={
                                                                            false
                                                                          }
                                                                          isSearchingRequired={
                                                                            false
                                                                          }
                                                                          isSortingRequired={false}
                                                                          data={
                                                                            !prd?.clientProductRenewal
                                                                              ? []
                                                                              : {
                                                                                  data: prd?.clientProductRenewal,
                                                                                }
                                                                          }
                                                                        />
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                </>
                                                              )
                                                            })
                                                        })
                                                    }}
                                                    tableHeadData={[
                                                      {
                                                        th: {
                                                          id: '',
                                                        },
                                                        text: '',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'startDate',
                                                        },
                                                        text: 'Start Date',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'endDate',
                                                        },
                                                        text: 'End Date',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'amount',
                                                        },
                                                        text: 'Amount',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'profitPlan',
                                                        },
                                                        text: 'Profit Plan',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'profitPercent',
                                                        },
                                                        text: 'Profit %',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'companyFee',
                                                        },
                                                        text: 'Fees',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'profitAmount',
                                                        },
                                                        text: 'Paid Fees',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'status',
                                                        },
                                                        text: 'Status',
                                                      },
                                                      {
                                                        th: {
                                                          id: 'subCategory',
                                                          hidden:
                                                            product?.productDetails
                                                              ?.productsTicketSize?.length < 2,
                                                        },
                                                        text: 'Sub Category',
                                                      },
                                                    ]}
                                                    isPaginationRequired={false}
                                                    isSearchingRequired={false}
                                                    isSortingRequired={false}
                                                    data={
                                                      !product?.product
                                                        ?.filter((item) => item.type === tabName)
                                                        ?.map((prod, prdIndex) => {
                                                          return product.product.filter(
                                                            (item) =>
                                                              (item.id === prod.id ||
                                                                item.parentId?.id === prod.id) &&
                                                              (tabName === 'Asset'
                                                                ? item.type !== 'Pipeline'
                                                                : item.type === 'Pipeline')
                                                          )
                                                        })
                                                        ? []
                                                        : {
                                                            data: product?.product
                                                              ?.filter(
                                                                (item) => item.type === tabName
                                                              )
                                                              ?.map((prod, prdIndex) => {
                                                                return product.product.filter(
                                                                  (item) =>
                                                                    (item.id === prod.id ||
                                                                      item.parentId?.id ===
                                                                        prod.id) &&
                                                                    (tabName === 'Asset'
                                                                      ? item.type !== 'Pipeline'
                                                                      : item.type === 'Pipeline')
                                                                )
                                                              }),
                                                          }
                                                    }
                                                  />
                                                </div>
                                              </>
                                            </div>
                                          </div>
                                        </Tabs.Panel>
                                      </>
                                    )
                                  })}
                                </Tabs>
                              </Tabs.Panel>
                            </>
                          )
                        })}
                      </Tabs>
                    ) : (
                      <Center>No Products Selected.</Center>
                    )}
                  </div>
                  <div className='row '>
                    <div className='col-12'>
                      <CustomTable
                        tableBody={() => {
                          return obj.comments?.map((item: any) => {
                            return (
                              <tr key={item?.id ?? '-'}>
                                <td>{item?.id ?? '-'}</td>
                                <td>{item?.startDate ?? '-'}</td>
                                <td>{item?.comment ?? '-'}</td>
                                <td>{item?.user ?? '-'}</td>
                                <td>{item?.commentType ?? '-'}</td>
                                <td>{item?.followUpDate ?? '-'}</td>
                              </tr>
                            )
                          })
                        }}
                        data={!obj.comments ? [] : {data: obj.comments}}
                        tableHeadData={commentTableHeaderData}
                        tableLabel='Comments'
                        isPaginationRequired={false}
                        isSearchingRequired={false}
                        isSortingRequired={false}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </>
          )
        })}
      </>
    )
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      setShowForm(false)
      getRecords(`${API.PROSPECTS}/user/${currentUser?.id}/${role}/count`, setCount)
      getRecords(`${API.PROSPECTS}/user/${currentUser?.id}/${role}/sales`, setProspects)
    }

    return () => {
      mounted = false
    }
  }, [role])
  return (
    <>
      <div className='card mb-2' hidden={roleState.state !== 'TEAM_LEADER'}>
        <div className='card-body pb-5 pt-2'>
          <CustomRadioInput
            data={[
              {
                label: `My`,
                value: 'advisor',
              },
              {
                label: `Teams`,
                value: 'teamlead',
              },
            ]}
            children={undefined}
            value={role}
            onChange={(value) => {
              setRole(value)
            }}
            withAsterisk={Number(prospectFormField?.operationalStatus) > 2}
          />
        </div>
      </div>
      <>
        <div className='mb-5'>
          <div className='card card-flush h-xl-100'>
            <div className='card-body '>
              {count?.loading ? (
                <span className='indicator-progress fs-3 text-white' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border align-middle ms-2'></span>
                </span>
              ) : (
                <div className='position-relative'>
                  <div className='row g-3 g-lg-6 d-flex align-items-stretch'>
                    <DashboardCards
                      iconSrc={
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                          <path
                            fill='currentColor'
                            d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                          />
                        </svg>
                      }
                      srNo={count?.data?.['Assigned'] ?? '0'}
                      title='Assigned'
                      link='#'
                      // colSize={true}
                      color={'cyan'}
                    />
                    <DashboardCards
                      iconSrc={
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                          <path
                            fill='currentColor'
                            d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                          />
                        </svg>
                      }
                      srNo={count?.data?.['In Progress'] ?? '0'}
                      title='In Progress'
                      link='#'
                      // colSize={true}
                      color={'yellow'}
                    />
                    <DashboardCards
                      iconSrc={
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                          <path
                            fill='currentColor'
                            d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                          />
                        </svg>
                      }
                      srNo={count?.data?.['Requested to Client'] ?? '0'}
                      title='Requested to Client'
                      link='#'
                      // colSize={true}
                      color={'yellow'}
                    />
                    <DashboardCards
                      iconSrc={
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                          <path
                            fill='currentColor'
                            d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                          />
                        </svg>
                      }
                      srNo={count?.data?.['Reverted by Advisor'] ?? '0'}
                      title='Reverted by Advisor'
                      link='#'
                      // colSize={true}
                      color={'yellow'}
                    />
                    <DashboardCards
                      iconSrc={
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                          <path
                            fill='currentColor'
                            d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                          />
                        </svg>
                      }
                      srNo={count?.data?.['Responded by Client'] ?? '0'}
                      title='Responded by Client'
                      link='#'
                      // colSize={true}
                      color={'yellow'}
                    />
                    <DashboardCards
                      iconSrc={
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                          <path
                            fill='currentColor'
                            d='M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128s-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v40 80 40.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1c12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 0 0 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48H173.3c-17 0-33.3-6.7-45.3-18.7L28.1 393.4C10.1 375.4 0 351 0 325.5V224 160 104C0 81.9 17.9 64 40 64zm560 0c22.1 0 40 17.9 40 40v56 64V325.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48V385.1c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 0 0 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8c9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V224 144 104c0-22.1 17.9-40 40-40z'
                          />
                        </svg>
                      }
                      srNo={count?.data?.['Sales Verified'] ?? '0'}
                      title='Sales Verified'
                      link='#'
                      // colSize={true}
                      color={'green'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
      <div className='col-12 mb-4' hidden={!showForm}>
        <SalesForm
          formType='user'
          editId={editId}
          setEditId={setEditId}
          setShowForm={setShowForm}
          formField={formField}
          setFormField={setFormField}
          inputError={inputError}
          setInputError={setInputError}
          city={city}
          setCity={setCity}
          cityOfBirth={cityOfBirth}
          setCityOfBirth={setCityOfBirth}
          state={state}
          setState={setState}
          prospectFormField={prospectFormField}
          setProspectFormField={setProspectFormField}
          setProspects={setProspects}
          prospectInputError={propspectInputError}
          setProspectInputError={setProspectInputError}
          setSelectedProduct={setSelectedProduct}
          selectedProducts={selectedProduct}
          backUrl={`${API.PROSPECTS}/user/${currentUser?.id}/${role}/sales`}
        />
      </div>

      <div className='col-12 ' hidden={showForm}>
        <CustomTable
          data={prospects}
          setData={setProspects}
          url={`${API.PROSPECTS}/user/${currentUser?.id}/${role}/sales`}
          tableBody={getTableBody}
          tableHeadData={prospectTableHeaderData}
          tableLabel='My Sales'
          // isPaginationRequired={false}
          // isSearchingRequired={false}
          // isSortingRequired={false}
          newRecordButton={
            <Button
              type='button'
              className='btn btn-primary btn-sm me-3'
              onClick={() => {
                setShowForm(true)
              }}
              hidden={showForm === true}
            >
              Add Sales
            </Button>
          }
        />
      </div>
    </>
  )
}

export default Sales
