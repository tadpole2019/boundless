import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="container">
        {/* 頁面內容 */}
        <main
          className="main"
          style={{
            backgroundColor: 'rgb(195, 195, 195)',
          }}
        >
          主要內容
        </main>
      </div>
      <Footer />

      <style jsx>{`
        .main {
          min-height: 100svh;
        }
      `}</style>
    </>
  )
}
