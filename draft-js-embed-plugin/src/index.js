/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 * Copyright (c) 2016, Nik Graf (https://www.draft-js-plugins.com)
 *
 * License: MIT
 */

import decorateComponentWithProps from 'decorate-component-with-props'
import addEmbed from './modifiers/addEmbed'
import EmbedComponent from './embed'
import embedStyles from './embedStyles.css'

const defaultTheme = { embedStyles }

export default (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme
  let Embed = config.EmbedComponent || EmbedComponent
  if (config.decorator) {
    Embed = config.decorator(Embed)
  }
  const ThemedEmbed = decorateComponentWithProps(Embed, { theme })
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent()
        const entity = block.getEntityAt(0)
        if (entity) {
          return null
        }
        const type = contentState.getEntity(entity).getType()
        if (type === 'embed') {
          return {
            component: ThemedEmbed,
            editable: false
          }
        }
      }

      return null
    },
    addEmbed
  }
}

export const Embed = EmbedComponent
