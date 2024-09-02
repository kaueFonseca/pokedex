
import { AppRoutes } from './components/pages/routes'
import { GlobalStyle } from './components/style/GlobalStyle'
import { ThemeProvider } from './contexts/theme-context'
function App() {
  return (
    <>
     <ThemeProvider>
      <GlobalStyle />
      <AppRoutes />
     </ThemeProvider>
    </>
  )
}


export default App
