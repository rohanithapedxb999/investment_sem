import {Button} from '@mantine/core'
import API from '../../../../api/apiUrl'
import {EDIT_ROW_COLORS} from '../../../../contants'
import {UserMasterInitialInput} from '../../../../data/AdminModuleDefaultData'
import {UserMasterInput, UserMasterOutput} from '../../../../types/AdminModuleTypes'
import {deleteRecord} from '../../../CommonFunctions'
import ActionColumn from '../../../components/ActionColumn'
import CustomTable from '../../../components/CustomTable'
import {getUserByID, userTableHeaderData} from './UserFunctions'

const Table = (props: {
  UserData: UserMasterOutput
  showForm: boolean
  SetUser: Function
  SetShowForm: Function
  formField: UserMasterInput
  SetEditId: Function
  SetformField: Function
  setInputError: Function
  EditID: string | null
  setSecondaryRole: Function
  setState: Function
  setCity: Function
}) => {
  const getTableBody = () => {
    console.log(props?.UserData?.data)
    return props?.UserData?.data.map((obj) => {
      return (
        <tr
          key={obj?.id}
          className={`${props.EditID === obj?.id ?? '-' ? `${EDIT_ROW_COLORS} ` : ''}`}
        >
          <td>
            <b>
              {obj?.firstName ?? '-'} {obj?.lastName ?? '-'}
            </b>
            <br />
            {obj?.email ?? '-'}
          </td>
          <td>{`${obj?.addressLine1 ?? '-'} ${obj?.addressLine2 ?? ''} ${
            obj?.city?.name ? obj?.city?.name + ',' : ''
          } ${obj?.state?.name ? obj?.state?.name + ',' : ''} ${
            obj?.country?.name ? obj?.country?.name + ',' : ''
          } ${obj?.pin ?? ''}`}</td>
          <td>{obj?.dob ?? '-'}</td>
          <td>{obj?.gender ?? '-'}</td>
          <td>
            {obj?.roles?.length === 0
              ? '-'
              : obj?.roles?.map((subobj) => {
                  return (
                    <>
                      <span
                        className={`label label-inline        ${
                          subobj?.type === 'primary'
                            ? 'badge badge-light-success fw-bold py-2 my-1'
                            : 'badge badge-light-warning fw-bold py-2 my-1'
                        } `}
                        key={subobj.role.id}
                      >
                        {subobj?.role?.name ?? '-'}
                      </span>{' '}
                    </>
                  )
                })}
          </td>
          <td>
            {obj?.teamLead
              ? `${obj?.teamLead?.firstName ?? '-'} ${obj?.teamLead?.lastName ?? ''}`
              : ''}
          </td>
          <td>
            <ActionColumn
              edit={{
                onClick: () => {
                  getUserByID(
                    obj.id,
                    props.formField,
                    props.SetformField,
                    props.SetEditId,
                    props.SetShowForm,
                    props.setInputError,
                    props.setSecondaryRole,
                    props.setState,
                    props?.setCity
                  )
                },
              }}
              remove={{
                onClick: () =>
                  deleteRecord(
                    `${API.USER}/${obj.id}`,
                    props.SetUser,
                    props.SetformField,
                    props.SetEditId,
                    props.setInputError,
                    UserMasterInitialInput,
                    props.SetShowForm,
                    `${API.USER}?sortBy=name&sort=ASC`
                  ),
              }}
            />
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <style>
        {`li.nostyle {
  list-style-type: none;
}`}
      </style>
      <CustomTable
        data={props.UserData}
        setData={props.SetUser}
        url={`${API.USER}`}
        tableBody={getTableBody}
        tableHeadData={userTableHeaderData}
        tableLabel='Users'
        defaultSorting='name'
        newRecordButton={
          <Button
            type='button'
            className='btn btn-primary btn-sm me-3'
            onClick={() => props.SetShowForm(true)}
            hidden={props.showForm}
          >
            Add Users
          </Button>
        }
      />
    </>
  )
}

export default Table
