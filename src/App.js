import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"
import User from "./pages/User"
import Header from "./common/Header"
import Footer from "./common/Footer"
import { Container } from "@mui/material"
import UserForm from "./pages/User/userForm"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <Container>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/users" element={<User />} />
          <Route path="/user/:id" element={<UserForm />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="*" element={<PageNotFound />} />
          
        </Routes>
      </BrowserRouter>
      <Footer />
    </Container>
  )
}

export default App
