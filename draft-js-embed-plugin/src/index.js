/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 * Copyright (c) 2016, Nik Graf (https://www.draft-js-plugins.com)
 *
 * License: MIT
 */

import { Entity } from 'draft-js'
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
    blockRendererFn: (block) => {
      if (block.getType() === 'atomic') {
        const entity = Entity.get(block.getEntityAt(0))
        const type = entity.getType()
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
