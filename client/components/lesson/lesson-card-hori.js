import React from 'react'

export default function CourseCard({
    img,
  name,
  teacher_name,
  average_rating,
  review_count,
  length,
  sales,
  price,
}) {
  return (
    <>
      <article className="course-card">
        <section className="course-image-wrapper">
          <img
            loading="lazy"
            src={`/課程與師資/lesson_img/${img}`}
            alt="Course Preview"
            className="course-image"
          />
        </section>
        <section className="courset-details">
          <h3 className="course-title">{name}</h3>
          <p className="course-instructor">by {teacher_name}老師</p>
          <div className="course-info">
            <div className="rating">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8287886cc0f8e59d93376690dc57f4af99a9e899badb88e0d2ed47fdb08d035?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                alt="Rating stars"
                className="rating-stars"
              />
              <span className="rating-value">{average_rating}</span>
              <span className="review-count">({review_count})</span>
            </div>
            <div>
              <span className="duration-time">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8df3a2bdde335108c6d04c0849bce7699504c28286258ab16838e6cce714455f?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                  alt="Clock icon"
                  className="duration-icon"
                />
                {length}小時
              </span>
            </div>
            <div className="enrolled-students">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d3076872f8f7cffe3e64f324e5f3c6851c51802240e5b7749e95a5dcbb6ab69?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                alt="User icon"
                className="user-icon"
              />
              <span className="enrollment-count">{sales}</span>
            </div>
          </div>
          <div className="pricelikes">
            <div className="course-price">NT$ {price}</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63b958d31f22ceac9729085dc4ee70e1cc6d5a2dab24fdc0543dd3b1c72eac0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
              alt=""
              className="icon-image"
            />
          </div>
        </section>
      </article>
      <style jsx>{`
        .course-card {
          max-width: 100%;
          border-radius: 5px;
          border: 1px solid #b9b9b9;
          background-color: #fff;
          display: flex;
          padding: 8px;
        }
        .course-image-wrapper {
          width: 120px;
          height: 120px;
          align-items: center;
          overflow: hidden;

          aspect-ratio: 1.33;
        }
        .course-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
        .icon-image {
          width: 20px;
          bottom: 12px;
          right: 12px;
        }
        .course-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .rating {
          display: flex;
          align-items: center;
        }

        .course-details {
          display: flex;
          flex-direction: column;
          color: #1d1d1d;
          font-weight: 400;
          padding: 14px 12px;
        }
        .course-title {
          font-size: 16px;
          font-family: Noto Sans TC, sans-serif;
          margin: 0;
        }
        .pricelikes {
          display: flex;
          justify-content: space-between;
        }
        .course-price {
          font-size: 18px;
          font-family: Noto Sans TC, sans-serif;
          font-weight: 700;
          margin-top: 11px;
        }
        .enrolled-students {
          text-align: right;
          color: #5a5a5a;
          font-size: 14px;
          font-family: Noto Sans TC, sans-serif;
        }
        /* Add your existing styles here */
      `}</style>
    </>
  )
}

