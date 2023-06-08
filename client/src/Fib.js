import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FibComponent = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: '',
  })

  useEffect(() => {
    fetchIndexes()
    fetchValues()
  }, [])

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current')
    setState((current) => {
      return { ...current, values: values.data }
    })
  }

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all')
    setState((current) => {
      return { ...current, seenIndexes: seenIndexes.data }
    })
  }

  const renderSeenIndexes = () => {
    return state.seenIndexes.map(({ number }) => number).join(', ')
  }

  const renderValues = () => {
    return Object.keys(state.values).map((key) => {
      return (
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      )
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post('/api/values', {
      index: state.index,
    })

    setState((current) => {
      return { ...current, index: '' }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) =>
            setState((current) => {
              return { ...current, index: event.target.value }
            })
          }
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  )
}

export default FibComponent
