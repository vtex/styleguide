import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

class DrawerBox extends Component {
  constructor(props) {
    super(props)
    this.overlay = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick(e) {
    if (this.overlay.current.contains(e.target)) {
      // The click was inside the drawer element
      return
    }

    // The click was in the overlay area
    this.props.onClose()
  }

  render() {
    return (
      <div ref={this.overlay} className="flex flex-column items-stretch vh-100">
        { this.props.children }
      </div>
    )
  }
}

class Drawer extends Component {
  render() {
    const styles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 10000,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      drawer: {
        width: '32rem',
      },
    }

    const { closeText, backLinkText, titleText, onClose, isOpen } = this.props

    return (
      isOpen && <div style={styles.overlay}>
        <div className="bg-white vh-100 right-0 absolute" style={styles.drawer}>
          <DrawerBox onClose={onClose}>
            <div className="bg-light-silver h4 flex flex-column-reverse ph6 pv3">
              <p>{ titleText }</p>
              <a href="#">{ backLinkText }</a>
            </div>

            <div className="flex-grow-1 ph6 pv3">
              { this.props.children }
            </div>

            <div className="bg-light-silver flex flex-row-reverse items-center ph6 pv3">
              <div className="dib ma3">
                <Button
                  variation="primary"
                  onClick={onClose}
                >
                  { closeText }
                </Button>
              </div>
            </div>
          </DrawerBox>
        </div>
      </div>
    )
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  backLinkText: PropTypes.string,
  closeText: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

DrawerBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Drawer
