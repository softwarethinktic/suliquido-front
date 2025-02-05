import { FC } from 'react'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router'

export const App : FC = () => {
  return (
    <BrowserRouter>
    
    <AppRouter />

    </BrowserRouter>
  )
  
  
}
