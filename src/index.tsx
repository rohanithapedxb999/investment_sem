import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/style.scss'
import { ThemeModeProvider } from './_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { AuthProvider, setupAxios } from './app/modules/auth'
import { AppRoutes } from './app/routing/AppRoutes'
import RoleState from './context/RoleState'
setupAxios()

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <AuthProvider>
          <RoleState>
            <AppRoutes />
          </RoleState>
        </AuthProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  )
}
