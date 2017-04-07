import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import getVideoUrl from './Url/getVideoUrl'
import {audioUrlValid, resolveAudioUrl} from './Url/getAudioUrl'
import insertDataBlock from './insertDataBlock'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { url: '' }
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.textInput).focus()
  }

  onUrlChange (event) {
    event.stopPropagation()
    const url = event.target.value
    this.setState({url})
  }

  setUrl (event) {
    this.submitUrl(this.state.url)
    this.props.closeModal()
  }

  submitUrl (src) {
    /* video */
    let videoSrc = getVideoUrl(src)
    if (videoSrc !== undefined) {
      const data = {src: videoSrc, type: 'embed'}
      this.props.setEditorState(insertDataBlock(this.props.getEditorState(), data, 'embed'))
      return
    }

    /* audio */
    if (audioUrlValid(src)) {
      resolveAudioUrl(src, (audioSrc) => {
        const data = {src: audioSrc, type: 'embed'}
        this.props.setEditorState(insertDataBlock(this.props.getEditorState(), data, 'embed'))
        return
      })
    }
  }

  onSubmit (event) {
    event.preventDefault()
    this.setUrl()
  }

  onCancel (event) {
    event.preventDefault()
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
    const { theme } = this.props
    return (
      <div className={theme.modalStyles.modalWrapper}>
        <input
          className={theme.modalStyles.modalInput}
          ref='textInput'
          type='text'
          onChange={::this.onUrlChange}
          value={this.state.url}
          onKeyDown={::this.onKeyDown}
          placeholder='Enter audio/video URL' />

        <span className={theme.modalStyles.modalButtonWrapper} >
          <button
            className={theme.modalStyles.modalButton}
            onClick={::this.onSubmit}
            type='button'
          >
            <svg fill='currentColor' width='18' height='18' viewBox='0 0 24 24'>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
            </svg>
          </button>

          <button
            className={theme.modalStyles.modalButton}
            onClick={::this.onCancel}
            type='button'
          >
            <svg width='18' height='18' viewBox='0 0 24 24'>
              <g fill='currentColor' fillRule='evenodd'>
                <path d='M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z' />
                <path d='M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z' />
              </g>
            </svg>
          </button>
        </span>
      </div>
    )
  }
}
