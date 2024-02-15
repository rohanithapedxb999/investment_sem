import {useEffect} from 'react'
import CustomTable from '../../../components/CustomTable'
import {commentTableHeaderData} from './commentFunction'

const Comments = () => {
  const getTableBody = () => {
    //   return obj.comment?.map((item) => {
    //     return (
    //       <tr key={item?.id ?? '-'}>
    //          <td>{item?.id ?? '-'}</td>
    //         <td>{item?.startDate ?? '-'}</td>
    //         <td>{item?.comment ?? '-'}</td>
    //         <td>{item?.user?.id ?? '-'}</td>
    //         <td>{item?.commentType ?? '-'}</td>
    //         <td>{item?.followUpDate ?? '-'}</td>
    //       </tr>
    //     )
    //   })
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      // getRecords(API.Comments, setAccount)
    }

    return () => {
      mounted = false
    }
  }, [])
  return (
    <>
      {' '}
      <div className='row justify-content-center'>
        <div className='col-9'>
          <CustomTable
            // data={account}
            // setData={setAccount}
            //   url={API.ACCOUNT}
            tableBody={getTableBody}
            tableHeadData={commentTableHeaderData}
            tableLabel='Comments'
            isPaginationRequired={false}
            isSearchingRequired={false}
            isSortingRequired={false}
          />
        </div>
      </div>
    </>
  )
}

export default Comments
