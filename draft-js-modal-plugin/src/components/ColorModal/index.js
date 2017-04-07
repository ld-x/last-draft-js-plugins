import React, {Component} from 'react'
import {RichUtils} from 'draft-js'
import {Picker} from '../../../../draft-js-color-picker-plugin/src/'

export default class extends Component {
  setColor (color) {
    const editorState = this.props.getEditorState()
    const currentStyle = editorState.getCurrentInlineStyle()
    if (!currentStyle.has(color)) {
      const safeName = color.replace('#', '')
      this.props.setEditorState(
        RichUtils.toggleInlineStyle(editorState, `color-${safeName}`)
      )
      this.props.closeModal()
    }
  }

  render () {
    const { theme } = this.props
    return (
      <div style={{width: '260px'}} className={theme.modalStyles.modalWrapper}>
        <Picker
          onSelected={::this.setColor}
          closeModal={this.props.closeModal}
          theme={theme} />
      </div>
    )
  }
}
