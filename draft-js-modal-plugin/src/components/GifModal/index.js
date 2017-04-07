import React, {Component} from 'react'
import insertDataBlock from './insertDataBlock'
import Picker from '../../../../draft-js-gif-picker-plugin/src/'

export default class extends Component {
  addGif (gif) {
    let gifUrl = gif.fixed_width.url
    const data = {src: gifUrl, type: 'image'}
    this.props.setEditorState(insertDataBlock(this.props.getEditorState(), data, 'image'))
    this.props.closeModal()
  }

  render () {
    const { theme } = this.props;
    return (
      <div className={theme.modalStyles.modalWrapper} >
        <Picker
          onSelected={::this.addGif}
          closeModal={this.props.closeModal}
          theme={theme} />
      </div>
    )
  }
}
