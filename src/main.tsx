import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import './index.css'

import Layout from './modules/layout/Layout'
import Dashboard from './modules/dashboard/Dashboard'
import Clientes from './modules/clientes/Clientes'
import Empleados from './modules/empleados/Empleados'
import Prendas from './modules/prendas/Prendas'
import Alquileres from './modules/alquileres/Alquileres'
import Lavanderia from './modules/lavanderia/Lavanderia'

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    { index: true, element: <Dashboard /> },
    { path: 'clientes', element: <Clientes /> },
    { path: 'empleados', element: <Empleados /> },
    { path: 'prendas', element: <Prendas /> },
    { path: 'alquileres', element: <Alquileres /> },
    { path: 'lavanderia', element: <Lavanderia /> },
  ]},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
