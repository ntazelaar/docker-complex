import logo from './logo.svg'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom'

import FibComponent from './Fib'
import OtherPage from './OtherPage'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Fibonacci Calculator</h1>
          <Link to="/">Home</Link> <Link to="/otherpage">Other Page</Link>
        </header>
        <Routes>
          <Route exact path="/" element={<FibComponent />} />
          <Route path="/otherpage" element={<OtherPage />} />
        </Routes>
        <Outlet />
      </div>
    </Router>
  )
}

export default App
