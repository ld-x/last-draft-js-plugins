import React from 'react'
import { getVisibleSelectionRect } from 'draft-js'

export default class Toolbar extends React.Component {

  state = {
    isVisible: false,
    modalVisible: false,
    modal: null
  }

  componentWillMount () {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged)
  }

  componentWillUnmount () {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged)
  }

  onVisibilityChanged = (isVisible) => {
    const toolbarHeightOffset = 55
    const selectionRect = isVisible ? getVisibleSelectionRect(window) : undefined

    if (selectionRect === undefined || selectionRect === null) { return }
    console.log(selectionRect)
    const top = (selectionRect.top === undefined) ? 0 : (selectionRect.top + window.scrollY) - toolbarHeightOffset
    const left = (selectionRect.left === undefined) ? 0 : selectionRect.left + window.scrollX + (selectionRect.width / 2)
    const position = { top, left }
    this.setState({position})
  }

  openModal = (type) => {
    const modal = this.props.getModalByType(type)
    this.setState({ modal }, () => {
      this.setState({ modalVisible: true })
    })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  render () {
    const { theme, store } = this.props
    const { modal, modalVisible, position } = this.state
    let Modal = modal
    let getEditorState = store.getItem('getEditorState')
    let editorState = getEditorState()

    let show = true
    if (editorState.getSelection().isCollapsed()) {
      show = false
    }
    let toolbarStyle = { display: show ? 'flex' : 'none' }
    if (position !== undefined) {
      toolbarStyle = Object.assign(position, toolbarStyle)
      toolbarStyle = {...toolbarStyle}
    }

    return (
      <div
        className={theme.toolbarStyles.toolbar}
        style={toolbarStyle}
      >
        {
          modalVisible &&
            <Modal
              getEditorState={store.getItem('getEditorState')}
              setEditorState={store.getItem('setEditorState')}
              theme={theme}
              closeModal={::this.closeModal}
              openModal={::this.openModal} />
        }
        {
          !modalVisible &&
            this.props.structure.map((Component, index) => (
              <Component
                key={index}
                theme={theme.buttonStyles}
                getEditorState={store.getItem('getEditorState')}
                setEditorState={store.getItem('setEditorState')}
                addLink={store.getItem('addLink')}
                closeModal={::this.closeModal}
                openModal={::this.openModal} />
            ))
        }
      </div>
    )
  }
}
