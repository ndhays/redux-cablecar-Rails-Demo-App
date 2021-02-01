import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/app'

const ReactApp = ({}) => (
  <App></App>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ReactApp name="React" />,
    document.getElementById('reactApp'),
  )
})
