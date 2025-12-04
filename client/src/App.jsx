import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import Dashboard from './pages/dashboard'
import ResumeBuilder from './pages/resumeBuilder'
import Perview from './pages/perview'
import Login from './pages/login'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import {Toaster} from 'react-hot-toast'
function App() {
  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if(token) {
        const {data} = await api.get('/api/users/data',{headers:{Authorization: token}})
        if(data.user){
        dispatch(login({token, user:data.user}))
      }
      dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }

    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)

    }
  }
  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>
    <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='veiw/:resumeId' element={<Perview />}/>
        
      </Routes>
    </>
  )
}

export default App
