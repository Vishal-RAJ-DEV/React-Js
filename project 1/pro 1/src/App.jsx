import React from 'react'
import Card from './components/Card'
import Getdata from './components/Getdata'
import {Routes,Route} from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Product from './components/Product'
import Home from './components/Home'
import Nav from './components/Nav'
import BGchanger from './project/BGchanger'
import Password from './project/Password'
const App = () => {

  // const user = [
  //   {
  //     "name": "Amit Sharma",
  //     "age": 27,
  //     "city": "Mumbai",
  //     "profession": "Software Engineer",
  //     "profile_photo": "https://example.com/photos/amit.jpg"
  //   },
  //   {
  //     "name": "Priya Verma",
  //     "age": 24,
  //     "city": "Delhi",
  //     "profession": "Graphic Designer",
  //     "profile_photo": "https://example.com/photos/priya.jpg"
  //   },
  //   {
  //     "name": "Rohan Das",
  //     "age": 30,
  //     "city": "Bangalore",
  //     "profession": "Data Scientist",
  //     "profile_photo": "https://example.com/photos/rohan.jpg"
  //   },
  //   {
  //     "name": "Sneha Patil",
  //     "age": 26,
  //     "city": "Pune",
  //     "profession": "Marketing Manager",
  //     "profile_photo": "https://example.com/photos/sneha.jpg"
  //   },
  //   {
  //     "name": "Vikas Yadav",
  //     "age": 29,
  //     "city": "Hyderabad",
  //     "profession": "Cybersecurity Analyst",
  //     "profile_photo": "https://example.com/photos/vikas.jpg"
  //   }
  // ]
  
  return (
    <div>
      {/* <div className='p-10'>
      </div>
    {user.map((elem,idx)=>{
      return <Card key = {idx} username={elem.name} age= {elem.age} city = {elem.city} work = {elem.profession} photo = {elem.profile_photo} />
    })} */}
    <Getdata />
    {/* <Nav />
    <Routes >
      <Route path = '/about' element  = {<About />} />
      <Route path = '/home' element  = {<Home/>}/>
      <Route  path = '/product' element  = {<Product/>}/>
      <Route  path = '/contact' element  = {<Contact/>}/>

    </Routes> */}
    {/* <BGchanger /> */}
    <Password />
    </div>

  )
}

export default App