import React, { Component } from 'react'

export const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue,
    ...parentProps
  } = props

  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntryContainerLeft}>
          <img
            src={mention.get('avatar')}
            className={theme.mentionSuggestionsEntryAvatar}
            role="presentation"
          />
        </div>

        <div className={theme.mentionSuggestionsEntryContainerRight}>
          <div className={theme.mentionSuggestionsEntryText}>
            {mention.get('name')}
          </div>

          <div className={theme.mentionSuggestionsEntryTitle}>
            {mention.get('title')}
          </div>
        </div>
      </div>
    </div>
  )
}

export const positionSuggestions = ({ state, props }) => {
  let transform
  let transition

  if (state.isActive && props.suggestions.size > 0) {
    transform = 'scaleY(1)'
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)'
  } else if (state.isActive) {
    transform = 'scaleY(0)'
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)'
  }

  return {
    transform,
    transition,
  }
}


import { fromJS } from 'immutable'

export const mentions = fromJS([
  {
    name: 'benjamin',
    title: 'Frankfurt/London',
    avatar: 'https://avatars2.githubusercontent.com/u/4349324?v=3&s=400',
  },
  {
    name: 'julian',
    title: 'United Kingdom',
    avatar: 'https://pbs.twimg.com/profile_images/477132877763579904/m5bFc8LF_400x400.png',
  },
  {
    name: 'nik',
    title: 'Passionate about Software Architecture, UX, Skiing & Triathlons',
    avatar: 'https://pbs.twimg.com/profile_images/535634005769457664/Ppl32NaN_400x400.jpeg',
  }
])
