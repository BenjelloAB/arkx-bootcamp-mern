// eslint-disable-next-line no-unused-vars
import React from 'react'
import './index.css'
import Pagination from './Pagination'
import Header from './Header'
import Footer from './Footer'
import BlogCard from './BlogCard'
import EmailForm from './EmailForm'
function App() {

  return (
    <>
      <Header />
      <h1 className="text-center font-bold">Welcome to Byte Sized Narratives</h1>
      <h3 className="text-center font-bold">A Blog that cover all topics around the IT industry and all latest updates in this vast field</h3>

      <EmailForm />
      <div className="flex gap-10 justify-center items-center p-10 flex-wrap">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <Pagination />
      <Footer />
    </>
  )
}

export default App
