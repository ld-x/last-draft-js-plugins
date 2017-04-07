/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 * Copyright (c) 2016, Nik Graf (https://www.draft-js-plugins.com)
 *
 * License: MIT
 */

import decorateComponentWithProps from 'decorate-component-with-props'
import Link from './Link'
import linkStrategy from './linkStrategy'
import styles from './styles.css'

const defaultTheme = {
  link: styles.link
}

const linkPlugin = (config = {}) => {
  const {
    component,
    theme = defaultTheme,
    target = '_self'
  } = config

  return {
    decorators: [
      {
        strategy: linkStrategy,
        component: decorateComponentWithProps(Link, { theme, target, component })
      }
    ]
  }
}

export default linkPlugin
