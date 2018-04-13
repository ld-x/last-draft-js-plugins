import React, { Component } from 'react'

export default class Embed extends Component {
  render () {
    const {
      block,
      theme = {},
      ...otherProps
    } = this.props
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      ...elementProps
    } = otherProps
    const entity = block.getEntityAt(0);
    const { src } = contentState.getEntity(entity).getData();
    return (
      <div className={theme.embedStyles.embedWrapper}>
        <iframe
          {...elementProps}
          src={src}
          className={theme.embedStyles.embed} />
      </div>
    )
  }
}
