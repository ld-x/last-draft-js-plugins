import React, {Component} from 'react'
import styled from 'styled-components'
import Picker from './Picker'
import { Modifier, EditorState } from 'draft-js'

export default class extends Component {
  addEmoji (emoji) {
    let editorState = this.props.getEditorState()
    const selection = editorState.getSelection()
    let contentState = {}
    if (selection.isCollapsed()) {
      contentState = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        emoji,
        editorState.getCurrentInlineStyle(),
      )
    } else {
      contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        emoji,
        editorState.getCurrentInlineStyle(),
      )
    }

    this.props.setEditorState(
      EditorState.push(editorState, contentState, 'insert-characters')
    )
    this.props.closeModal()
  }

  render () {
    return (
      <Wrapper className='ld-gif-modal-wrapper'>
        <Picker onSelected={::this.addEmoji} closeModal={this.props.closeModal} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width: 360px;
`
