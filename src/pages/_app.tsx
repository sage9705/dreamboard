import type { AppProps } from 'next/app'
import { ThemeProvider } from '../hooks/useTheme'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </DndProvider>
  )
}

export default MyApp