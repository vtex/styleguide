import React, { Component, PropTypes } from 'react'
import Sidebar from './Sidebar'
import Helmet from "react-helmet";
import './theme.css'

class Template extends Component {
  render () {
    return (
      <div className="font-body">
        <Helmet
          script={[
            {src: 'https://unpkg.com/react-dom@15.4.2/dist/react-dom-server.min.js'}
          ]}
          link={[
              {rel: "stylesheet", href: "http://io.vtex.com.br/fonts/stylesheet.css"},
          ]}
        />
        <Sidebar />
        <main className="Window fl h-100 w-100 w-80-ns">
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Template
