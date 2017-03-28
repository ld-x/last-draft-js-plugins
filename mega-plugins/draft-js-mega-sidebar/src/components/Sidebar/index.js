import React from 'react';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';

export default class Sidebar extends React.Component {

  state = {
    position: {
      transform: 'scale(0)',
      modalVisible: false,
      modal: null
    }
  }

  componentDidMount() {
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('editorState', this.onEditorStateChange);
  }

  onEditorStateChange = (editorState) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
      const top = node.getBoundingClientRect().top;
      const editor = this.props.store.getItem('getEditorRef')().refs.editor;
      this.setState({
        position: {
          top: (top + window.scrollY),
          left: editor.getBoundingClientRect().left - 25,
          transform: 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      });
    }, 0);
  }

  toggleModal = (type) => {
    const modal = this.props.getModalByType(type)
    this.setState({ modal }, () => {
      this.setState({ modalVisible: !this.state.modalVisible })
    })
  }

  render() {
    const { theme, store } = this.props
    const { modal } = this.state

    let InputModal = modal

    const { modalVisible } = this.state
    return (
      <div
        className={theme.sidebarStyles.wrapper}
        style={this.state.position}
      >

      { /* decide here which modal */
        modalVisible &&
          <InputModal
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            theme={theme}
            toggleModal={::this.toggleModal} />
      }
      {
        this.props.structure.map((Component, index) => (
          <Component
            key={index}
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            theme={theme}
            store={store}
            toggleModal={::this.toggleModal}
            />
        ))
      }
      </div>
    )
  }
}
