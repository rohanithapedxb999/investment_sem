import {Center, Tabs} from '@mantine/core'
import {useEffect, useState} from 'react'
import {numberFormat} from '../../../../../_metronic/helpers'
import API from '../../../../../api/apiUrl'
import {APIStatusData} from '../../../../../data/OtherDefaultData'
import {ProspectOutput} from '../../../../../types/InvestmentModuleTypes'
import {getRecords} from '../../../../CommonFunctions'
import CustomTable from '../../../../components/CustomTable'
import {useAuth} from '../../../auth'
import {commentTableHeaderData} from '../../comments/commentFunction'
import {checkArrayRenewalProduct} from '../../sales/SalesFunction'
import {getProspectTableHeaderData} from '../ProspectFunction'

const ConvertedProspect = (props: {role: string}) => {
  let {role} = props
  const {prospectTableHeaderData} = getProspectTableHeaderData(false, true)
  const [prospects, setProspects] = useState<ProspectOutput>({
    ...APIStatusData,
    data: [],
  })
  const {currentUser} = useAuth()
  const [showProduct, setShowProduct] = useState<number[]>([])
  const [showRenewalProduct, setShowRenewalProduct] = useState<number[]>([])
  const [activeProductTab, setActiveProductTab] = useState<string | null>('Pipeline')
  const [activeTab, setActiveTab] = useState<string | null>('0')

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
              <tr key={obj?.id ?? '-'}>
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
      getRecords(`${API.PROSPECTS}/user/${currentUser?.id}/${role}/sales`, setProspects)
    }

    return () => {
      mounted = false
    }
  }, [role])
  return (
    <div className='col-12 '>
      <CustomTable
        data={prospects}
        setData={setProspects}
        url={`${API.PROSPECTS}/user/${currentUser?.id}/${role}/sales`}
        tableBody={getTableBody}
        tableHeadData={prospectTableHeaderData}
        tableLabel='Converted Prospects'
        // isPaginationRequired={false}
        // isSearchingRequired={false}
        // isSortingRequired={false}
      />
    </div>
  )
}

export default ConvertedProspect
