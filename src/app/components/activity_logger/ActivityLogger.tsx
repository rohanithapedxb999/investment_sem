import {useEffect, useState} from 'react'
import TimelineContent from './TimelineContent'
import TimelineHead from './TimelineHead'
import {getActivityLogs} from '../../../api/CommonAPI'
import {useAuth} from '../../modules/auth'
import {changeTextCamal} from '../../../_metronic/helpers'

const ActivityLogger = () => {
  const [activities, setActivities] = useState<
    {
      parent: {
        id: number
        module: string
        entity: string
        entityId: string
        action: string
        userId: string
        changes: {
          id: string
          name: string
        }
        createdAt: string
      }
      children: {
        id: 20
        module: string
        entity: string
        entityId: string
        action: string
        userId: string
        changes: {}
        createdAt: string
      }[]
    }[]
  >([])
  const {currentUser} = useAuth()
  const [showRow, setShowRow] = useState<number[]>([])
  const [apiStatus, setAPIStatus] = useState({
    loading: false,
    error: null,
  })
  const checkArrayElement = (element: number) => {
    let arr: number[] = [...showRow]
    let isExists = false
    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i] === element) {
        arr.splice(i, 1)
        isExists = true
        break
      }
    }

    if (!isExists) {
      arr.push(element)
    }
    setShowRow(arr)
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      setAPIStatus((prev: any) => ({...prev, loading: true}))
      getActivityLogs(currentUser?.email).then((res) => {
        if (res.statusCode === 200) {
          setActivities(res.data)
          setAPIStatus((prev: any) => ({...prev, loading: false, error: null}))
        } else {
          setAPIStatus((prev: any) => ({...prev, loading: false, error: res.message}))
        }
      })
    }

    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <div className='card'>
        <div className='card-header'>
          <div className='card-title'>
            <i className='fa-solid fa-calendar-days fs-1 me-2'></i> Activity
          </div>
        </div>
        <div className='card-body'>
          {apiStatus.loading ? (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          ) : apiStatus.error != null ? (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{apiStatus.error}</div>
            </div>
          ) : activities.length > 0 ? (
            activities.map((activity, index) => {
              return (
                <div className='timeline shadow p-5 mb-5 rounded'>
                  <div className='d-flex'>
                    <div
                      className='timeline-icon symbol symbol-circle symbol-40px me-4'
                      onClick={() => {
                        checkArrayElement(index)
                      }}
                    >
                      <div className='symbol-label bg-light'>
                        <i
                          className={`fa fa-${
                            !showRow.includes(index) ? 'plus' : 'minus'
                          } text-gray-700`}
                        >
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                        </i>
                      </div>
                    </div>
                    <div className='flex-grow-1'>
                      <TimelineHead
                        action={`${changeTextCamal(activity.parent.action.toLocaleLowerCase())}d`}
                        createdBy={activity.parent.module}
                        master={activity.parent.entity}
                        content={activity.parent.changes}
                        createdAt={activity.parent.createdAt}
                      />
                      <div className='d-flex'>
                        <div className='timeline-icon symbol symbol-circle symbol-40px me-4'></div>
                        <div className='flex-grow-1' hidden={!showRow.includes(index)}>
                          {activity.children.length
                            ? activity.children.map((subActivity) => {
                                return (
                                  <TimelineContent
                                    action={`${changeTextCamal(
                                      subActivity.action.toLocaleLowerCase()
                                    )}d`}
                                    createdBy={subActivity.module}
                                    content={subActivity.changes}
                                    createdAt={subActivity.createdAt}
                                  />
                                )
                              })
                            : 'No Sub Activities are found'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            'No Activities are found'
          )}
        </div>
      </div>
    </>
  )
}

export default ActivityLogger
