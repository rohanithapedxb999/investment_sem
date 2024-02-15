import {MantineProvider, useMantineTheme} from '@mantine/core'
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {MenuComponent} from '../../_metronic/assets/ts/components'
import CustomSidebar from '../../app/components/CustomSidebar'
import {WithChildren} from '../helpers'
import {themeModeSwitchHelper, useThemeMode} from '../partials/layout/theme-mode/ThemeModeProvider'
import {Content} from './components/Content'
import {Footer} from './components/Footer'
import {PageDataProvider, useLayout} from './core'

const MasterLayout: FC<WithChildren> = () => {
  const {classes} = useLayout()
  const {mode} = useThemeMode()
  const theme = useMantineTheme()
  const [shellOpened, setShellOpened] = useState(true)

  const location = useLocation()
  const content = useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  useEffect(() => {
    themeModeSwitchHelper(mode)
  }, [mode])

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: mode === 'dark' ? 'dark' : 'light',
          colors: {
            // Add your color
            deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
            // or replace default theme color
            blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          },

          shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
          },

          headings: {
            fontFamily: 'Roboto, sans-serif',
            sizes: {
              h1: {fontSize: '2rem'},
            },
          },
        }}
      >
        <PageDataProvider>
          <div className='page d-flex flex-row flex-column-fluid'>
            <div className='wrapper d-flex flex-row flex-row-fluid' id='kt_wrapper'>
              {/* <HeaderWrapper /> */}

              <CustomSidebar />

              <div className='col-11 d-flex flex-column flex-row-fluid'>
                <div
                  id='kt_content'
                  className='content d-flex flex-column flex-column-fluid bgi-size-cover bgi-no-repeat'
                  style={{
                    backgroundColor: `
                    ${mode == 'dark' ? '#151521' : '#F6F6F6'}`,
                  }}
                >
                  <div
                    className={clsx(
                      'd-flex flex-column-fluid align-items-start',
                      classes.contentContainer.join(' ')
                    )}
                    id='kt_post'
                  >
                    <Content>
                      <Outlet />
                    </Content>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </PageDataProvider>
      </MantineProvider>
    </>
  )
}

export {MasterLayout}
