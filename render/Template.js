import React, { Component, PropTypes } from 'react'
import Helmet from "react-helmet"

import Sidebar from './Sidebar'
import Principles from './Pages/Principles'
import NotFound from './Pages/PageNotFound'

class Template extends Component {
  render () {
    const Component = this.props.path === undefined ? Principles : NotFound
    return (
      <div className="font-body">
        <Helmet
          script={[
            {
              type: 'text/javascript',
              src: 'https://unpkg.com/react@15.6.1/dist/react.min.js',
              defer: true
            },
            {
              type: 'text/javascript',
              src: 'https://unpkg.com/react-dom@15.6.1/dist/react-dom-server.min.js',
              defer: true
            }
          ]}
          link={[
              {rel: "stylesheet", href: "http://io.vtex.com.br/fonts/fabriga/stylesheet.css"},
          ]}
        />
        <Sidebar />
        <main className="Window fl h-100 w-100 w-80-ns">
          {this.props.children || <Component />}
        </main>
      </div>
    )
  }
}

export default Template
