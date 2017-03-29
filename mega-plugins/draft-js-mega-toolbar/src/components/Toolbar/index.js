import React from 'react';
import { getVisibleSelectionRect } from 'draft-js';

export default class Toolbar extends React.Component {

  state = {
    isVisible: false,
  }

  componentWillMount() {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
  }

  onVisibilityChanged = (isVisible) => {
    const toolbarHeightOffset = 55
    setTimeout(() => {
      const selectionRect = isVisible ? getVisibleSelectionRect(window) : undefined;
      const position = selectionRect ? {
        top: (selectionRect.top + window.scrollY) - toolbarHeightOffset,
        left: selectionRect.left + window.scrollX + (selectionRect.width / 2),
        transform: 'translate(-50%) scale(1)'
      } : {
        transform: 'translate(-50%) scale(0)',
      };
      this.setState({
        position,
      });
    }, 0);
  }

  render() {
    const { theme, store } = this.props;
    return (
      <div
        className={theme.toolbarStyles.toolbar}
        style={this.state.position}
      >
        {this.props.structure.map((Component, index) => (
          <Component
            key={index}
            theme={theme.buttonStyles}
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            addLink={store.getItem('addLink')}
          />
        ))}
      </div>
    );
  }
}
