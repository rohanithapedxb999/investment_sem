import {Flex, Pagination, Text} from '@mantine/core'
import {useEffect, useMemo, useState} from 'react'
import {api} from '../../api/apiMiddleware'
import {APIResponse, CommonApiDataType} from '../../types/OtherTypes'
import {getFilterLengthData} from '../CommonFunctions'
import {setupAxios} from '../modules/auth'
import CustomSelectInput from './CustomInput/CustomSelectInput'


const Paginations = (props: {
  data: any
  setData: Function | undefined
  url: string
}) => {
  let {setData, data, url} = props
  const [activePage, setActivePage] = useState(1)
  const [filterLength, setFilterLength] = useState<string | null>('10')
const range=useMemo(()=>{
  let range=``
  let start=0
  let end=0
if(activePage===Math.ceil(Number(data?.queryData?.total ?? 0) / Number(filterLength))){
  end=Number(data?.queryData?.total ?? 0)
  if(activePage===1){start=1}else{
    start=end-Number(data?.data?.length??0)+1
  }
}else if(activePage===1){
  end=Number(data?.data?.length??0)
  start=1
}else if(activePage>1){
  end=Number(data?.data?.length??0)*activePage
  start=end-Number(data?.data?.length??0)+1
}
range=start+' - '+end
return range
},[filterLength,activePage,data])
  const getData = (page: number, filterLength: string | null) => {
    const {token} = setupAxios()
    let otherQuery = url.includes('?')
    api
      .get(
        `/${url}${otherQuery ? `&` : '?'}page=${page ?? null}&take=${
          filterLength ?? null
        }&sort=${data?.queryData?.sort}&sortBy=${data?.queryData?.sortBy}${
          data?.queryData?.search ? `&search=${data?.queryData?.search}` : ''
        }`,
        token,
        false
      )
      .then((res: APIResponse) => {
        if (res.statusCode === 200) {
          setActivePage(page)
          setData &&
            setData((prev: CommonApiDataType) => ({
              ...prev,
              data: res.data.result,
              queryData: res?.data?.queryParams,
            }))
          let storageData: any = sessionStorage.getItem('filterLength')
          const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/g
          let updatedStorageData: any = {}
          let key = url.replaceAll(pattern, '')
          if (storageData) {
            storageData = JSON.parse(storageData)
            updatedStorageData = {...storageData, [key]: filterLength}
          } else {
            updatedStorageData[key] = filterLength
          }
          sessionStorage.setItem('filterLength', JSON.stringify(updatedStorageData))
        } else {
          setData &&
            setData((prev: CommonApiDataType) => ({
              ...prev,
              error: res.message,
              data: res.data?.result,
              queryData: res?.data?.queryParams,
            }))
        }
      })
  }
  useEffect(() => {
    const {filterDataLength} = getFilterLengthData(url)
    setActivePage(Number(data?.queryData?.page ?? 1))
    setFilterLength((data?.queryData?.take ?? filterDataLength ?? 10).toString())
    console.log(filterDataLength, data)
    console.log(
      Math.ceil(Number(data?.queryData?.total ?? 0) / Number(filterLength)),
      data,
      filterLength
    )
  }, [data])
  return (
    <>
      <style>{`.mantine-1y56p0a[data-selected] {
      background-color: dodgerblue;
  }
  .mantine-UnstyledButton-root{
    border:none !important;
  }
  `}</style>
      <Flex gap={'xs'} align={'center'} justify={'flex-end'}>
        <Text className='me-auto'>{range} Of {Math.ceil(Number(data?.queryData?.total ?? 0))}</Text>
        <CustomSelectInput
          value={filterLength}
          onChange={(value) => {
            setFilterLength(value)
            getData(1, value)
          }}
          radius={10}
          data={[
            {value: '5', label: '5'},
            {value: '10', label: '10'},
            {value: '25', label: '25'},
            {value: '50', label: '50'},
            {value: '100', label: '100'},
          ]}
          w={80}
          ml={10}
          size='md'
          lh={1}
        />
        <Pagination
          value={activePage}
          size='lg'
          styles={(theme) => ({
            control: {
              '&[data-active]': {
                backgroundImage: theme.fn.gradient({from: 'cyan', to: 'indigo'}),
              },
            },
          })}
          onChange={(page) => {
            getData(page, filterLength)
          }}
          total={Math.ceil(Number(data?.queryData?.total ?? 0) / Number(filterLength))}
        ></Pagination>      
        </Flex>
    </>
  )
}

export default Paginations
