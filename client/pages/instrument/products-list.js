import React from 'react'

const ProductCard = ({
  productName,
  productPrice,
  productImage,
  productImageAlt,
  soldOut,
}) => (
  <article className="product-card">
    <div className="product-image-wrapper">
      <img src={productImage} alt={productImageAlt} className="product-image" />
    </div>
    <div className="product-info">
      <h2 className="product-name">{productName}</h2>
      <p className="product-price">{productPrice}</p>
      <p className="product-status">{soldOut ? '已售完' : '在庫あり'}</p>
    </div>
  </article>
)

const ProductShowcase = () => {
  const products = [
    {
      productName: 'Fender Telecaster model 1970',
      productPrice: 'NT$ 22,680',
      productImage:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/66b57f5d4ca40da7f3f4a2b1fb8c1901a2a41f62eb118a340fc315213f440ba2?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&',
      productImageAlt: 'Fender Telecaster model 1970',
      soldOut: false,
    },
    // Repeat the structure for other products as required
  ]

  return (
    <main>
      <section className="product-showcase">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </section>
    </main>
  )
}

export default ProductShowcase
;<style jsx>{`
  .product-showcase {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 24px;
  }
  .product-card {
    flex-basis: 25%;
    border: 1px solid #b9b9b9;
    margin: 10px;
    padding: 8px;
    border-radius: 5px;
    background-color: #fff;
  }
  .product-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .product-image {
    width: 100%;
    height: auto;
  }
  .product-info {
    padding: 14px 12px;
  }
  .product-name {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }
  .product-price {
    color: #333;
    font-size: 18px;
  }
  .product-status {
    color: #5a5a5a;
    font-size: 14px;
  }
  @media (max-width: 991px) {
    .product-showcase {
      padding: 0 20px;
    }
    .product-card {
      flex-basis: 100%;
    }
  }
`}</style>
