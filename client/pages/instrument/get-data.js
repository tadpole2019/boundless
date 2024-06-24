import React, { useState, useEffect } from 'react'

function App() {
  const [result, setResult] = useState(null)
  function getTodos() {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:3005/api/instrument'
      fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          resolve(result)
          setResult(result)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  }

  useEffect(() => {
    getTodos()
  }, [])
  return (
    <div>
      <h1>Data from Express API:</h1>
      <p>{result ? JSON.stringify(result) : 'Loading...'}</p>
    </div>
  )
}

export default App
