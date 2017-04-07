import React, {Component} from 'react'
import Picker from '../../../../draft-js-emoji-picker-plugin/src/'

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
    const { theme } = this.props;
    console.log(theme)
    return (
      <div className={theme.modalStyles.modalWrapper}>
        <Picker
          onSelected={::this.addEmoji}
          closeModal={this.props.closeModal}
          theme={theme} />
      </div>
    )
  }
}
