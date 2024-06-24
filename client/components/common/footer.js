import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="d-flex align-items-center justify-content-center">
        Copyright © 2024 Boundless. All rights reserved.
      </footer>

      <style jsx>
        {`
          footer {
            background-color: #000;
            color: #fff;
            height: 45px;
            width: 100%;
            font-size: 16px;
          }
        `}
      </style>
    </>
  )
}
