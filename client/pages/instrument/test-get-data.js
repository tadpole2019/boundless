import React, { useState, useEffect } from 'react'

function App() {
  const [instruments, setInstruments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 定義一個函數用於獲取樂器資料
    const fetchInstruments = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/instruments')
        const data = await response.json()
        setInstruments(data)
      } catch (error) {
        console.error('Error fetching instrument data:', error)
      } finally {
        setLoading(false)
      }
    }

    // 呼叫函數以觸發資料獲取
    fetchInstruments()
  }, []) // 注意：這裡的空陣列表示 useEffect 只會在組件初次渲染時執行

  return (
    <div>
      <h1>Data from Express API:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {instruments.map((instrument) => (
            <li key={instrument.id}>
              {instrument.name} - ${instrument.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
