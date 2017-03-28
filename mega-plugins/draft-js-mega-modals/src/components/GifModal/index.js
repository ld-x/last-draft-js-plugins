import React, {Component} from 'react'
import insertDataBlock from './insertDataBlock'
import styled from 'styled-components'
import Picker from './Picker'

export default class extends Component {
  addGif (gif) {
    let gifUrl = gif.fixed_width.url
    const data = {src: gifUrl, type: 'image'}
    this.props.setEditorState(insertDataBlock(this.props.getEditorState(), data, 'image'))
    this.props.closeModal()
  }

  render () {
    return (
      <Wrapper className='ld-gif-modal-wrapper'>
        <Picker onSelected={::this.addGif} closeModal={this.props.closeModal} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width: 360px;
`
