import React, { PropTypes, Component } from 'react'
import MarkdownRender from '../Component/MarkdownRender'
import Template from '../Template'

export default class MarkdownPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.loadComponent = this.loadComponent.bind(this)
  }

  componentDidMount () {
    this.loadComponent(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadComponent(nextProps)
  }

  loadComponent (props, state) {
    console.log(props)
    const { params: { page } } = props
    const {loadedPage, errorLoadingPage} = this.state
    const currentPage = page
    if ((loadedPage === currentPage) || (errorLoadingPage && errorLoadingPage.page === currentPage)) {
      return
    }

    try {
      console.log('../../patterns/' + page + '.md')
      let markdown = require('../../patterns/' + page + '.md')

      this.setState({
        title: page,
        markdown,
        loadedPage: page,
        errorLoadingPage: null,
      })
    } catch (e) {
      console.error(e)

      this.setState({
        title: null,
        markdown: null,
        loadedPage: page,
        errorLoadingPage: {
          error: e,
          page: page,
        },
      })
    }
  }

  render () {
    const {errorLoadingPage, markdown, title} = this.state

    if (errorLoadingPage) {
      return (
        <div>
          {JSON.stringify(errorLoadingPage.e, null, 2)}
        </div>
      )
    }

    if (!markdown) {
      return (
        <div>
          Loading
        </div>
      )
    }

    return (
      <Template>
        <section className="pt5 pl4 pr4 pl5-l pr5-l">
            <MarkdownRender {...this.props} markdown={markdown} />
        </section>
      </Template>
    )
  }
}

MarkdownPage.propTypes = {
  page: PropTypes.string,
}
