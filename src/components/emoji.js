import React from 'react'
import { getData, getSanitizedData, unifiedToNative } from '../utils'
import { uncompress } from '../utils/data'
import { EmojiPropTypes, EmojiDefaultProps } from '../utils/shared-props'

const _getData = (props) => {
  var { emoji, skin, set, data } = props
  return getData(emoji, skin, set, data)
}

const _getPosition = (props) => {
  var { sheet_x, sheet_y } = _getData(props),
    multiplyX = 100 / (props.sheetColumns - 1),
    multiplyY = 100 / (props.sheetRows - 1)

  return `${multiplyX * sheet_x}% ${multiplyY * sheet_y}%`
}

const _getSanitizedData = (props) => {
  var { emoji, skin, set, data } = props
  return getSanitizedData(emoji, skin, set, data)
}

const _handleClick = (e, props) => {
  if (!props.onClick) {
    return
  }
  var { onClick } = props,
    emoji = _getSanitizedData(props)

  onClick(emoji, e)
}

const _handleOver = (e, props) => {
  if (!props.onOver) {
    return
  }
  var { onOver } = props,
    emoji = _getSanitizedData(props)

  onOver(emoji, e)
}

const _handleLeave = (e, props) => {
  if (!props.onLeave) {
    return
  }
  var { onLeave } = props,
    emoji = _getSanitizedData(props)

  onLeave(emoji, e)
}

const _isNumeric = (value) => {
  return !isNaN(value - parseFloat(value))
}

const _convertStyleToCSS = (style) => {
  let div = document.createElement('div')

  for (let key in style) {
    let value = style[key]

    if (_isNumeric(value)) {
      value += 'px'
    }

    div.style[key] = value
  }

  return div.getAttribute('style')
}

const Emoji = (props) => {
  if (props.data.compressed) {
    uncompress(props.data)
  }

  for (let k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k]
    }
  }

  let data = _getData(props)
  if (!data) {
    if (props.fallback) {
      return props.fallback(null, props)
    } else {
      return null
    }
  }

  let { unified, custom, short_names, imageUrl } = data,
    style = props.style,
    children = props.children,
    className = props.className,
    title = null

  if (!unified && !custom) {
    if (props.fallback) {
      return props.fallback(data, props)
    } else {
      return null
    }
  }

  if (props.tooltip) {
    title = short_names[0]
  }

  if (props.native && unified) {
    className += ' ' + props.classNameNative
    style.fontSize = props.size
    children = unifiedToNative(unified)

    if (props.forceSize) {
      style.display = 'inline-block'
      style.width = props.size
      style.height = props.size
    }
  } else if (custom) {
    className += ' ' + props.classNameCustom
    style.display = 'inline-block'
    style.width = props.size
    style.height = props.size
    if (data.spriteUrl) {
      style = {
        ...style,
        backgroundImage: `url(${data.spriteUrl})`,
        backgroundSize: `${100 * props.sheetColumns}% ${100 *
          props.sheetRows}%`,
        backgroundPosition: _getPosition(props),
      }
    } else {
      style = {
        ...style,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'contain',
      }
    }
  } else {
    let setHasEmoji =
      data[`has_img_${props.set}`] == undefined || data[`has_img_${props.set}`]

    if (!setHasEmoji) {
      if (props.fallback) {
        return props.fallback(data, props)
      } else {
        return null
      }
    } else {
      style = {
        ...style,
        width: props.size,
        height: props.size,
        display: 'inline-block',
        backgroundImage: `url(${props.backgroundImageFn(
          props.set,
          props.sheetSize,
        )})`,
        backgroundSize: `${100 * props.sheetColumns}% ${100 *
          props.sheetRows}%`,
        backgroundPosition: _getPosition(props),
      }
    }
  }

  if (props.html) {
    style = _convertStyleToCSS(style)
    return `<span style='${style}' ${
      title ? `title='${title}'` : ''
    } class='${className}'>${children || ''}</span>`
  } else if (props.inline) {
    return (
        <span
            key={props.emoji.id || props.emoji}
            className={className}
            style={style}
        >
          {children}
        </span>
    )
  } else {
    return (
      <span
        key={props.emoji.id || props.emoji}
        onClick={(e) => _handleClick(e, props)}
        onMouseEnter={(e) => _handleOver(e, props)}
        onMouseLeave={(e) => _handleLeave(e, props)}
        title={title}
        className={className}
      >
        <span style={style}>{children}</span>
      </span>
    )
  }
}

Emoji.propTypes = EmojiPropTypes
Emoji.defaultProps = EmojiDefaultProps

export default Emoji
