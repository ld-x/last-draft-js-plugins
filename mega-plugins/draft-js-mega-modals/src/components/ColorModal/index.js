import React, {Component} from 'react'
import {RichUtils} from 'draft-js'
import styled from 'styled-components'
import Picker from './Picker'

export default class extends Component {
  setColor (color) {
    const editorState = this.props.getEditorState()
    const currentStyle = editorState.getCurrentInlineStyle()
    if (!currentStyle.has(color)) {
      const safeName = color.replace('#', '');
      this.props.setEditorState(
        RichUtils.toggleInlineStyle(editorState, `color-${safeName}`)
      )
      this.props.closeModal()
    }
  }

  render () {
    return (
      <Wrapper className='ld-gif-modal-wrapper'>
        <Picker onSelected={::this.setColor} closeModal={this.props.closeModal} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width: 260px;
`
