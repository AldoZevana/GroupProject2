import React from 'react'
import ReactDOM from 'react-dom/client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import App from './App.jsx'
import './index.css'

//src/main.jsx
const stripePromise = loadStripe("pk_test_51PafxYRw9lSQ9MQVubcyz66asYdln68UA0yAWgpTqZlOCQnTcSK7fvntlNMViBCJQkdch7OU2X50GIcGMZvJHAFX00h75IuojV");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)