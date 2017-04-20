/* eslint-disable */
import React, { PropTypes, Component } from 'react'
import MTRC from 'markdown-to-react-components'
import Heading from 'vtex.onda/packages/onda/src/Heading'
import { Table, TableHeader, TableBody, Row, Cell } from 'vtex.onda/packages/onda/src/Table'
import CodeEmbed from './CodeEmbed'

export default class MarkdownRender extends Component {
  constructor(props) {
    super(props)

    const content = removeDuplicateContent(this.props.markdown)

    this.state = {
      content: MTRC(content).tree,
    }
  }

  componentWillReceiveProps(nextProps) {
    const content = removeDuplicateContent(nextProps.markdown)

    this.setState({
      content: MTRC(content).tree,
    })
  }

  render() {
    const {content} = this.state
    return (
      <div className="f5 f4-xl lh-copy">
        {content}
      </div>
    )
  }
}

MarkdownRender.propTypes = {
  markdown: PropTypes.any.isRequired,
}

const removeDuplicateContent = (markdown) => {
  let content

  content = markdown.replace(/version:(.*)/, '')
  content = content.replace(/status:(.*)/, '')

  return content
}

MTRC.configure({
  h1: () => {
    return null
  },
  h2: (props) => {
    return <Heading size={2}>{props.children}</Heading>
  },
  h3: (props) => {
    return <Heading size={3} line={true}>{props.children}</Heading>
  },
  h4: (props) => {
    return <Heading size={4}>{props.children}</Heading>
  },
  h5: (props) => {
    return <Heading size={5}>{props.children}</Heading>
  },
  p: (props) => {
    return <p className="f5-ns f4-l lh-copy black-70 mv3">{props.children}</p>
  },
  ul: (props) => {
    return <ul className="pv3">{props.children}</ul>
  },
  li: (props) => {
    return <li className="f5-ns f4-l lh-copy black-70 pv1">{props.children}</li>
  },
  code: (props) => {
    return <CodeEmbed lang={props.language}>{props.code}</CodeEmbed>
  },
  tr: (props) => {
    return <Row>{props.children}</Row>
  },
  td: (props) => {
    return <Cell>{props.children}</Cell>
  },
  th: (props) => {
    return <Cell>{props.children}</Cell>
  },
  table: (props) => {
    return <Table>{props.children}</Table>
  },
  tbody: (props) => {
    return <TableBody>{props.children}</TableBody>
  },
  thead: (props) => {
    return <TableHeader>{props.children}</TableHeader>
  },
})
