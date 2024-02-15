import {useEffect, useState} from 'react'
import API from '../../../../api/apiUrl'
import {APIStatusData} from '../../../../data/OtherDefaultData'
import {AccountMasterOuput} from '../../../../types/AdminModuleTypes'
import {TableHeaderDataType} from '../../../../types/OtherTypes'
import {getRecords} from '../../../CommonFunctions'
import CustomTable from '../../../components/CustomTable'

const AccountManager = () => {
  const [account, setAccount] = useState<AccountMasterOuput>({...APIStatusData, data: []})
  const getTableBody = () => {
    return account?.data?.map((obj) => {
      return (
        <tr key={obj?.id ?? '-'}>
          <td>{obj?.name ?? '-'}</td>
          <td>{obj?.accountOwner?.name ?? '-'}</td>
          <td>{obj?.cluster?.name ?? '-'}</td>
          <td>{obj?.country?.name ?? '-'}</td>
        </tr>
      )
    })
  }
  const accountTableHeaderData: TableHeaderDataType[] = [
    {
      th: {
        id: 'name',
        style: {
          minWidth: '90px',
          width: '100px',
        },
      },
      text: 'Account',
    },
    {
      th: {
        id: 'accountOwner',
        style: {
          minWidth: '90px',
          width: '100px',
        },
      },
      text: 'Account Manager',
    },
    {
      th: {
        id: 'cluster',
        style: {
          minWidth: '90px',
          width: '100px',
        },
      },
      text: 'Cluster',
    },
    {
      th: {
        id: 'country',
        style: {
          minWidth: '90px',
          width: '100px',
        },
      },
      text: 'Country',
    },
  ]
  useEffect(() => {
    let mounted = true
    if (mounted) {
      getRecords(API.ACCOUNT, setAccount)
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
            data={account}
            setData={setAccount}
            url={API.ACCOUNT}
            tableBody={getTableBody}
            tableHeadData={accountTableHeaderData}
            tableLabel='Accounts'
          />
        </div>
      </div>
    </>
  )
}

export default AccountManager
