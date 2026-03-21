import React from 'react'
import { RouterProvider } from 'react-router'
import { Router } from "./app.routes";
const App = () => {
  return (
    <RouterProvider router={Router}/>
  )
}

export default App
