import React, { Component } from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'

/* Emoji plugin */
import createEmojiPlugin from 'draft-js-emoji-plugin'
import 'draft-js-emoji-plugin/lib/plugin.css'
const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions } = emojiPlugin

/* Hashtag plugin */
import createHashtagPlugin from 'draft-js-hashtag-plugin'
import 'draft-js-hashtag-plugin/lib/plugin.css'
const hashtagPlugin = createHashtagPlugin()

/* Image with Alignment, dnd, focus, resize plugin */
import createImagePlugin from 'draft-js-image-plugin'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createDndPlugin from 'draft-js-dnd-plugin'

import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'

const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin()
const dndPlugin = createDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  dndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

/* Linkify */
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-linkify-plugin/lib/plugin.css'
const linkifyPlugin = createLinkifyPlugin()

/* Mentions */
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'
import 'draft-js-mention-plugin/lib/plugin.css'
import {mentions, Entry, positionSuggestions} from './Mentions'
const mentionPlugin = createMentionPlugin({ mentions, positionSuggestions })
const { MentionSuggestions } = mentionPlugin



/* ld plugins */

/* toolbar */
import createToolbarPlugin from '../draft-js-toolbar-plugin/src/'
const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin

/* Side Toolbar */
import createSidebarPlugin from '../draft-js-sidebar-plugin/src/'
const sidebarPlugin = createSidebarPlugin()
const { Sidebar } = sidebarPlugin

/* Embed plugin */
//import createEmbedPlugin from '../draft-js-embed-plugin/src/'
import createEmbedPlugin from 'draft-js-embed-plugin'
const embedPlugin = createEmbedPlugin()

/* Link */
//import createLinkPlugin from '../draft-js-link-plugin/src/'
import createLinkPlugin from 'draft-js-link-plugin'
const linkPlugin = createLinkPlugin()

/* Color */
import {colorStyleMap} from '../draft-js-color-picker-plugin/src/'

/* init the plugins */
const plugins = [
  dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
  emojiPlugin, hashtagPlugin, linkifyPlugin, mentionPlugin,
  toolbarPlugin, sidebarPlugin, embedPlugin, linkPlugin
]

/* init the state, either from raw, html or text */
import { raw } from './initialState/raw'

/* from raw */
const content = convertFromRaw(raw)
let STATE = EditorState.createWithContent(content)

export default class Example extends Component {
  state = {
    editorState: STATE,
    suggestions: mentions
  }

  onChange = (editorState) => {
    this.setState({ editorState })

    let raw = convertToRaw(editorState.getCurrentContent())
    this.logState('raw state:', raw)
  }

  logState (type, raw) {
    // console.log(type)
    console.log(JSON.stringify(raw))
  }

  focus = () => {
    this.editor.focus()
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions)
    })
  }

  customCountFunction (str) {
    const wordArray = str.match(/\S+/g)
    return wordArray ? wordArray.length : 0
  }

  render () {
    return (
      <div>
        <div className='editor'>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            customStyleMap={colorStyleMap}
            ref={(element) => { this.editor = element }}
          />
          <AlignmentTool />
          <Toolbar />
          <Sidebar />
          <EmojiSuggestions />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            entryComponent={Entry}
          />
        </div>
      </div>
    )
  }
}
