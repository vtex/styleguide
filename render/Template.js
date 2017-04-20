import React, { Component, PropTypes } from 'react'
import Sidebar from './Sidebar'
import Helmet from "react-helmet";
import './theme.css'

class Template extends Component {
  render () {
    return (
      <div className="font-body">
        <Helmet
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
