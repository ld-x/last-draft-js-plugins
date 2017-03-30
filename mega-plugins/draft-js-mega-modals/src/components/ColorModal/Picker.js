import React, { Component } from 'react'
import styled from 'styled-components'
import {colors} from './colors'

export default class extends Component {
  handleColorChange (color) {
    this.props.onSelected(color)
  }

  render() {
    return (
      <ColorPickerWrapper className='ld-color-picker-wrapper'>
        <CloseWrapper className='ld-color-picker-close-wrapper' onClick={this.props.closeModal}>
          <Close width='24' height='24' viewBox='0 0 24 24' className='ld-color-picker-close'>
            <g fill='currentColor' fillRule='evenodd'>
              <path d='M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z' />
              <path d='M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z' />
            </g>
          </Close>
        </CloseWrapper>

        <ColorWrapper className='ld-color-picker'>
          {
            colors.map((c, i) => {
              return <ColorSpan className='ld-color-picker-item' key={i} color={c} onClick={() => this.handleColorChange(c)} />
            })
          }
        </ColorWrapper>
      </ColorPickerWrapper>
    )
  }
}


const ColorPickerWrapper = styled.div`
  position: absolute;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  background-color: inherit;
  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  height: 15rem;
  padding: 1.5rem;
  padding-top: 1.8rem;
  z-index: 100;
`

const ColorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ColorSpan = styled.span`
  cursor: pointer;
  width: 1rem;
  flex: 1 0 10%;
  margin: 0.1rem;
  border-radius: 2px;
  background-color: ${props => props.color};
  border-color: ${props => props.color};
`

const CloseWrapper = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.1rem;
  cursor: pointer;
  border: 0;
  background: transparent;
  color: #ccc;

  &:hover {
    color: #9d1d20;
  }
`

const Close = styled.svg`
  display: block;
  margin: 0 0 0 auto;
`
