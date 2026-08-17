import { RouterProvider } from 'react-router'
import { router } from "@/routes/index"
import '@/index.css'

// Redux
import { persistor, store } from "@/app/store"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

// Context
import ModeProvider from '@/contexts/mode/ModeProvider'
import ThemeProvider from '@/contexts/theme/ThemeProvider'
import TimeProvider from '@/contexts/time/TimeProvider'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ModeProvider>
                    <ThemeProvider>
                        <TimeProvider>
                            <RouterProvider router={router} />
                        </TimeProvider>
                    </ThemeProvider>
                </ModeProvider>
            </PersistGate>
        </Provider >
    )
}

export default App