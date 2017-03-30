import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {hasEntity, setEntity, getCurrentEntity, removeEntity} from './entity'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'

export default class LinkWrapper extends Component {
  render () {
    const editorState = this.props.getEditorState()
    const entitySelected = hasEntity('LINK', editorState)
    const entity = getCurrentEntity(editorState)
    let entityData = null

    if (entitySelected) {
      if (entity) { entityData = entity.getData() }
    }
    let url = entityData ? entityData.url : null

    return (
      <Link
        url={url}
        entitySelected={entitySelected}
        {...this.props}
      />
    )
  }
}

const linkify = linkifyIt({ fuzzyIP: false })
linkify.tlds(tlds)

class Link extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: props && props.url || '',
      error: null,
    }
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.textInput).focus()
  }

  onUrlChange (event) {
    event.stopPropagation()
    const url = event.target.value
    if (url === '') { this.cancelError() }
    this.setState({url})
  }

  setUrl (event) {
    this.submitUrl(this.state.url)
  }

  setError (errorMsg) {
    this.setState({error: errorMsg})
  }

  cancelError () {
    this.setState({error: null})
  }

  submitUrl (url) {
    let match = linkify.match(url)

    if (match === null) {
      this.setError(('Invalid Link'))
      ReactDOM.findDOMNode(this.refs.textInput).focus()
      return
    }

    let matchedUrl = match[0].url
    this.setState({url: matchedUrl}, () => {
      ReactDOM.findDOMNode(this.refs.textInput).value = matchedUrl
    })
    setEntity('LINK', {url: matchedUrl}, this.props.getEditorState(), this.props.setEditorState)
    this.props.closeModal()
  }

  onSubmit (event) {
    event.preventDefault()
    this.setUrl()
  }

  onCancel (event) {
    event.preventDefault()
    if (this.props.entitySelected) {
      removeEntity('LINK', this.props.getEditorState(), this.props.setEditorState)
    }
    this.cancelError()
    this.props.closeModal()
  }

  onKeyDown (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.setUrl()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      this.props.closeModal()
    }
  }

  render () {
    const { theme, entitySelected } = this.props
    const { error } = this.state
    let toolbarBackgroundStyle = { background: error ? '#e83f26' : '#fff' }
    let toolbarErrorStyle = {
      height: error ? '28px' : '0',
      paddingBottom: error ? '12px' : '0'
    }

    return (
      <div style={toolbarBackgroundStyle} className={theme.modalStyles.modalWrapper}>
        <input
          className={theme.modalStyles.modalInput}
          ref='textInput'
          type='text'
          onChange={::this.onUrlChange}
          value={this.state.url}
          onKeyDown={::this.onKeyDown}
          placeholder='Enter a link and press enter' />
        <span className={theme.modalStyles.modalButtonWrapper} >
          <button
            className={theme.modalStyles.modalButton}
            onClick={::this.onSubmit}
            type='button'
          >
            <svg fill='currentColor' width='18' height='18' viewBox='0 0 24 24'>
              <path d='M0 0h24v24H0z' fill='none' /><path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
            </svg>
          </button>

          <button
            className={theme.modalStyles.modalButton}
            onClick={::this.onCancel}
            type='button'
          >
          {
            entitySelected ? (
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <g fill='currentColor' fillRule='evenodd'><path d='M15.027 11l.974.972V11z' /><path d='M22 12c0-2.754-2.24-5-5-5h-4v2h4c1.71-.095 3.1 1.3 3 3 .1 1.121-.484 2.087-1 3l1 1a5 5 0 0 0 2-4M7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2H7c-1.71.1-3.1-1.291-3-3-.1-1.71 1.29-3.1 3-3h3L8 7H7zM13 15.099v1.9h4c.37 0 .729-.046 1.076-.123l-1.777-1.777H13z' /><path d='M8 11v2h8v-2z' /><path d='M4.269 3l-1.27 1.27 12.658 12.657-.117-.107L19.73 21l1.269-1.27z' /></g>
              </svg>
            ) : (
              <svg width='18' height='18' viewBox='0 0 24 24'>
                <g fill='currentColor' fillRule='evenodd'><path d='M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z' /><path d='M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z' /></g>
              </svg>
            )
          }
          </button>
        </span>
        {
          this.state.error &&
            <p style={toolbarErrorStyle} className={theme.modalStyles.modalError}>
              {this.state.error}
            </p>
        }
      </div>
    )
  }
}
