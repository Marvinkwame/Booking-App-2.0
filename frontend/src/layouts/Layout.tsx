import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import SeacrhBar from '../components/SeacrhBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col bg-gray-100 min-h-screen'>
      {/* Header */}
      <Header />
      <Hero />
      <div className="mx-auto container">
        <SeacrhBar />
      </div>
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout