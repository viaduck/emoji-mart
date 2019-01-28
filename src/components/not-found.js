import React from 'react'
import PropTypes from 'prop-types'

import Emoji from './emoji'

export default class NotFound extends React.PureComponent {
  render() {
    const { data, emojiProps, i18n, notFound, notFoundEmoji } = this.props

    const component = (notFound && notFound()) || (
      <div className="emoji-mart-no-results">
        {Emoji({
          data: data,
          ...emojiProps,
          size: 38,
          emoji: notFoundEmoji,
          onOver: null,
          onLeave: null,
          onClick: null,
        })}
        <div className="emoji-mart-no-results-label">{i18n.notfound}</div>
      </div>
    )

    return component
  }
}

NotFound.propTypes = {
  notFound: PropTypes.func.isRequired,
  notFoundString: PropTypes.string.isRequired,
  emojiProps: PropTypes.object.isRequired,
}
