import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="div-4">
              <img
                loading="lazy"
                srcSet="..."
                className="img"
              />
              <div className="div-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fa7256259ed32d6f88147e43b3420b08282219e5f5e08b1d252742ed7f50916?"
                  className="img-2"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2002daaa88815e4d1cae3a7a011408911922d6d0bbc28125d361a19ab7958b6?"
                  className="img-3"
                />
              </div>
            </div>
          </div>
          <div className="div-6">
            <div className="div-7" />
            <div className="div-8" />
            <div className="div-9" />
            <div className="div-10" />
          </div>
        </div>
          </div>
          
      <style jsx>{`
        .div {
          justify-content: center;
          align-items: center;
          align-self: stretch;
          background-color: #fff;
          display: flex;
          padding: 55px 60px;
        }
        @media (max-width: 991px) {
          .div {
            padding: 0 20px;
          }
        }
        .div-2 {
          display: flex;
          width: 100%;
          max-width: 1440px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
          }
        }
        .div-3 {
          justify-content: center;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          padding: 0 60px;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .div-4 {
          disply: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 535px;
          width: 100%;
          justify-content: center;
          padding: 80px 28px;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            margin-right: 3px;
            padding: 0 20px;
          }
        }
        .img {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .div-5 {
          position: relative;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          margin: 160px 0 112px;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 100%;
            flex-wrap: wrap;
            margin: 40px 0;
          }
        }
        .img-2 {
          aspect-ratio: 0.51;
          object-fit: auto;
          object-position: center;
          width: 28px;
          stroke-width: 4px;
          stroke: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.75);
          border-style: solid;
          border-width: 4px;
        }
        .img-3 {
          aspect-ratio: 0.51;
          object-fit: auto;
          object-position: center;
          width: 28px;
          stroke-width: 4px;
          stroke: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.75);
          border-style: solid;
          border-width: 4px;
        }
        .div-6 {
          align-self: center;
          display: flex;
          margin-top: 20px;
          gap: 19px;
        }
        .div-7 {
          background-color: #1581cc;
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }
        .div-8 {
          background-color: var(--body, #b9b9b9);
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }
        .div-9 {
          background-color: #b9b9b9;
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }
        .div-10 {
          background-color: #b9b9b9;
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </>
  );
}



