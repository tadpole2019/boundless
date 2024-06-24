import React from 'react'
import { FaHeart } from 'react-icons/fa'

function InstrumentCard({
  productName,
  productPrice,
  productSold,
  productImage,
  iconImage,
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <div className="image-container">
          <img
            loading="lazy"
            srcSet={productImage}
            alt={productName}
            className="product-image"
          />
          <FaHeart className="icon-image" />
        </div>
      </div>
      <div className="product-details">
        <h3 className="product-title">{productName}</h3>
        <p className="product-price">{productPrice}</p>
        <p className="product-sold">已售出 {productSold}</p>
      </div>
      <style jsx>{`
        .product-card {
          max-width: 240px;
          border-radius: 5px;
          border: 1px solid #b9b9b9;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding: 8px;
        }
        .product-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1.33;
          width: 100%;
        }
        .image-container {
          position: relative;
        }
        .product-image,
        .icon-image {
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .icon-image {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: gray;
          font-size: 24px;
        }
        .product-details {
          display: flex;
          flex-direction: column;
          color: #1d1d1d;
          font-weight: 400;
          padding: 14px 12px;
        }
        .product-title {
          font-size: 16px;
          font-family: Noto Sans TC, sans-serif;
          margin: 0;
        }
        .product-price {
          font-size: 18px;
          font-family: Noto Sans TC, sans-serif;
          font-weight: 700;
          margin-top: 11px;
        }
        .product-sold {
          color: #5a5a5a;
          text-align: right;
          font-size: 14px;
          font-family: Noto Sans TC, sans-serif;
          margin-top: 46px;
        }
      `}</style>
    </article>
  )
}

// Usage of ProductCard component with hypothetical data
export default function ProductsContainer() {
  const products = [
    {
      productName: 'Fender Telecaster model 1970',
      productPrice: 'NT$ 22,680',
      productSold: 10,
      productImage: 'path/to/telecaster.jpg',
      iconImage: 'path/to/icon.jpg',
    },
    // Add more products as needed
  ]

  return (
    <section className="products-container">
      {products.map((product, index) => (
        <InstrumentCard
          key={index}
          productName={product.productName}
          productPrice={product.productPrice}
          productSold={product.productSold}
          productImage={product.productImage}
          iconImage={product.iconImage}
        />
      ))}
    </section>
  )
}
