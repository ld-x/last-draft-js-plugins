import React from 'react';

export default class BlockTypeSelect extends React.Component {

  state = {
    visible: false,
    style: {
      transform: 'translate(-50%) scale(0)',
      transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
    }
  }

  componentDidMount() {
    console.log(this.props.store)
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
  }

  onEditorStateChange = (editorState) => {
    const selection = editorState.getSelection();
    this.hide()
  }

  onClick = (e) => {
    e.stopPropagation();
    return this.state.visible ? this.hide() : this.show();
  }

  show = () => {
    this.setState({
      visible: true,
      popupStyle: { transform: 'translate(-50%) scale(1)' },
      buttonStyle: { transform: 'rotate(45deg)', background: '#ccc' }
    });
  }

  hide = () => {
    this.setState({
      visible: false,
      popupStyle: { transform: 'translate(-50%) scale(0)' },
      buttonStyle: { transform: 'none', background: '#181818' }
    });
  }

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
    const { popupStyle, buttonStyle } = this.state;
    return (
      <div onClick={this.onClick}>
        <div className={theme.blockTypeSelectStyles.blockType} style={buttonStyle}>
          <svg width='24' height='24' viewBox='0 0 24 24'>
            <g fill='currentColor' >
              <path d='M11 6h2v12h-2z' />
              <path d='M18 11v2H6v-2z' />
            </g>
          </svg>
        </div>
        {/*
          The spacer is needed so the popup doesn't go away when moving from the
          blockType div to the popup.
        */}
        <div className={theme.blockTypeSelectStyles.spacer} />
        <div className={theme.blockTypeSelectStyles.popup} style={popupStyle}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme.buttonStyles}
            />
          ))}
        </div>
      </div>
    );
  }
}
