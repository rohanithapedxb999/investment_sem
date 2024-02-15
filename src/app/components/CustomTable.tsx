import {Flex} from '@mantine/core'
import {TableHTMLAttributes, useEffect, useState} from 'react'
import {changeTextCapital} from '../../_metronic/helpers'
import {useThemeMode} from '../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {api} from '../../api/apiMiddleware'
import {APIResponse, CommonApiDataType, TableHeaderDataType} from '../../types/OtherTypes'
import {setupAxios} from '../modules/auth'
import LoadingSkeleton from './LoadingSkeleton'
import Paginations from './Paginations'
import Searching from './Searching'
import { getFilterLengthData } from '../CommonFunctions'

const CustomTable = (props: {
  data?: any
  setData?: Function
  tableHeadData: TableHeaderDataType[]
  tableBody: Function
  tableAttributes?: TableHTMLAttributes<HTMLTableElement>
  url?: string
  tableLabel?: string
  newRecordButton?: any
  isSearchingRequired?: boolean
  isSortingRequired?: boolean
  isPaginationRequired?: boolean
  defaultSorting?:string
}) => {
  const {mode} = useThemeMode()
  const [isActive, setIsActive] = useState<string | undefined>(props?.defaultSorting??'')
  const [isActiveSortType, setIsActiveSortType] = useState<string | null>(props?.defaultSorting?'DESC':null)
  const sortTableData = (sortBy: string | undefined, isSortable: boolean | undefined) => {
    if (isSortable === undefined || isSortable) {
      let sort = 'DESC'
      console.log(isActive,isActiveSortType)
      if (sortBy === isActive) {
        sort = !isActiveSortType ? 'DESC' : isActiveSortType === 'ASC' ? 'DESC' : 'ASC'
      }
      setIsActive(sortBy)
      setIsActiveSortType(sort)
      const {token} = setupAxios()
      let otherQuery = props?.url?.includes('?')
      const {filterDataLength} = getFilterLengthData(props?.url??'')
      api
        .get(
          `/${props.url}${otherQuery ? `&` : '?'}sort=${sort ?? null}&sortBy=${
            sortBy ?? null
          }&take=${props.data?.queryData?.take??filterDataLength??10}&page=1${
            props.data?.queryData?.search ? `&search=${props.data?.queryData?.search}` : ''
          }`,
          token,
          false
        )
        .then((res: APIResponse) => {
          if (res.statusCode === 200) {
            props?.setData &&
              props?.setData((prev: CommonApiDataType) => ({
                ...prev,
                data: res.data.result,
                queryData: res?.data?.queryParams,
              }))
          } else {
            props?.setData &&
              props?.setData((prev: CommonApiDataType) => ({
                ...prev,
                error: res.message,
                data: res.data?.result,
                queryData: res?.data?.queryParams,
              }))
          }
        })
    }
  }
  // useEffect(() => {
  //   if(props.defaultSorting){

  //     sortTableData(props.defaultSorting, true)
  //   }
  // }, [])
  return (
    <>
      <div className='card '>
        {(props?.tableLabel || props?.newRecordButton || props?.isSearchingRequired) && (
          <div className='card-header'>
            <Flex className='col-12' gap={'xs'} align={'center'} justify={'space-between'}>
              <h4 className='me-auto' hidden={!props?.tableLabel}>
                {props.tableLabel}
              </h4>
              {props.newRecordButton ?? ''}
              {(props?.isSearchingRequired === undefined || props?.isSearchingRequired) && (
                <Searching data={props.data} url={props?.url ?? ''} setData={props?.setData} />
              )}
            </Flex>
          </div>
        )}
        <div className='card-body py-0'>
          <div className='table-responsive'>
            <table
              className={`table mt-4 align-middle gy-3 ${props?.tableAttributes?.className ?? ''}`}
            >
              <thead>
                <tr className='fw-bold '>
                  {props.tableHeadData.map((obj: TableHeaderDataType) => {
                    return (
                      <th
                        {...obj.th}
                        key={obj.th.id}
                        style={{
                          ...obj.th.style,
                          backgroundColor: mode === 'dark' ? '#2B2B40' : '#F9F9F9',
                          fontSize: '0.999rem',
                        }}
                        onClick={() => sortTableData(obj.th.id, obj.isSortable)}
                      >
                        <Flex
                          mih={50}
                          gap='xs'
                          align='center'
                          justify={obj.justifyContent ?? 'start'}
                          direction='row'
                          wrap='wrap'
                        >
                          {changeTextCapital(obj.text)}
                          {(props?.isSortingRequired === undefined || props?.isSortingRequired) && (
                            <>
                              <i
                                className='fa-solid fa-arrow-up'
                                hidden={
                                  isActive === obj.th.id && isActiveSortType === 'DESC'
                                    ? false
                                    : true
                                }
                              />
                              <i
                                className='fa-solid fa-arrow-down'
                                hidden={
                                  isActive === obj.th.id && isActiveSortType === 'ASC'
                                    ? false
                                    : true
                                }
                              />
                            </>
                          )}
                        </Flex>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className='text-gray-800 fw-semibold '>
                {props?.data ? (
                  props?.data?.loading ? (
                    <tr>
                      <td colSpan={props.tableHeadData.length} className='text-center'>
                        <LoadingSkeleton />
                      </td>
                    </tr>
                  ) : props?.data?.error != null ? (
                    <tr>
                      <td colSpan={props.tableHeadData.length} className='text-center'>
                        <div className=' alert alert-danger'>
                          <div className='alert-text font-weight-bold'>{props?.data?.error}</div>
                        </div>
                      </td>
                    </tr>
                  ) : props?.data?.data?.length > 0 ? (
                    props.tableBody()
                  ) : (
                    <tr>
                      <td colSpan={props.tableHeadData.length} className='text-center'>
                        No Data Available
                      </td>
                    </tr>
                  )
                ) : (
                  props.tableBody()
                )}
              </tbody>
            </table>
          </div>
        </div>
        {(props?.isPaginationRequired === undefined || props?.isPaginationRequired) && (
          <div className='card-footer py-3'>
            <Paginations data={props.data} setData={props.setData} url={props?.url ?? ''} />
          </div>
        )}
      </div>
    </>
  )
}

export default CustomTable
