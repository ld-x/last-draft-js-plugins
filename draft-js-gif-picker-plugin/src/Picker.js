import React, { Component } from 'react'
import 'whatwg-fetch'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gifs: [],
      searchValue: '',
      giphySearchUrl: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC',
      giphyTrendingUrl: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC'
    }

    this.loadTrendingGifs()
  }

  static get propTypes () {
    return {
      onSelected: React.PropTypes.func.isRequired,
      visible: React.PropTypes.bool
    }
  }

  static get defaultProps () {
    return { visible: true }
  }

  loadTrendingGifs () {
    const {giphyTrendingUrl} = this.state
    fetch(giphyTrendingUrl, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then((response) => {
      let gifs = response.data.map((g, i) => {return g.images})
      this.setState({gifs})
    })
  }

  searchGifs () {
    const {giphySearchUrl, searchValue} = this.state
    if (searchValue.length < 1) { return }
    let url = giphySearchUrl + '&q=' + searchValue.replace(' ', '+')
    this.setState({gifs: []})
    fetch(url, {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then((response) => {
      let gifs = response.data.map((g, i) => {return g.images})
      this.setState({gifs})
    })
  }

  onGiphySelect (gif) {
    this.props.onSelected(gif)
  }

  onSearchChange (event) {
    event.stopPropagation()
    this.setState({searchValue: event.target.value}, () => this.searchGifs())
  }

  onKeyDown (event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.reset()
    }
  }

  reset () {
    this.setState({searchValue: ''})
  }

  render() {
    const {gifs} = this.state
    const {visible, theme} = this.props
    return (
      <div className={theme.gifPickerStyles.wrapper} visible={visible}>
        <div
          className={theme.gifPickerStyles.closeWrapper}
          onClick={this.props.closeModal}
        >
          <svg className={theme.gifPickerStyles.close} width='24' height='24' viewBox='0 0 24 24'>
            <g fill='currentColor' fillRule='evenodd'>
              <path d='M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z' />
              <path d='M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z' />
            </g>
          </svg>
        </div>

        <input
          className={theme.gifPickerStyles.input}
          name='giphy-search'
          type="text"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          onChange={::this.onSearchChange}
          value={this.state.searchValue}
          onKeyDown={::this.onKeyDown}
          placeholder='Search for gifs' />
        <div className={theme.gifPickerStyles.picker}>
          {
            gifs.map((g, i) => {
              let gifUrl = g.fixed_width.url
              return (
                <img className={theme.gifPickerStyles.gif}
                  key={i}
                  src={gifUrl}
                  onClick={() => {this.onGiphySelect(g)}} />
              )
            })
          }
        </div>

      </div>
    )
  }
}
