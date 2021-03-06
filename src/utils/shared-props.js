import data from '../../data/all.json'
import PropTypes from 'prop-types'

const EmojiPropTypes = {
  data: PropTypes.object,
  onOver: PropTypes.func,
  onLeave: PropTypes.func,
  onClick: PropTypes.func,
  fallback: PropTypes.func,
  backgroundImageFn: PropTypes.func,
  native: PropTypes.bool,
  inline: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  classNameNative: PropTypes.string,
  classNameCustom: PropTypes.string,
  forceSize: PropTypes.bool,
  tooltip: PropTypes.bool,
  skin: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  sheetSize: PropTypes.oneOf([16, 20, 32, 64]),
  sheetColumns: PropTypes.number,
  sheetRows: PropTypes.number,
  set: PropTypes.oneOf([
    'apple',
    'google',
    'twitter',
    'emojione',
    'messenger',
    'facebook',
  ]),
  size: PropTypes.number.isRequired,
  emoji: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

const EmojiDefaultProps = {
  skin: 1,
  set: 'apple',
  sheetSize: 64,
  sheetColumns: 52,
  sheetRows: 52,
  native: false,
  inline: false,
  style: {},
  className: '',
  classNameNative: '',
  classNameCustom: '',
  forceSize: false,
  tooltip: false,
  data: data,
  backgroundImageFn: (set, sheetSize) =>
    `https://unpkg.com/emoji-datasource-${set}@${EMOJI_DATASOURCE_VERSION}/img/${set}/sheets-256/${sheetSize}.png`,
  onOver: () => {},
  onLeave: () => {},
  onClick: () => {},
}

const PickerPropTypes = {
  data: EmojiPropTypes.data,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  onSkinChange: PropTypes.func,
  perLine: PropTypes.number,
  emojiSize: PropTypes.number,
  i18n: PropTypes.object,
  style: PropTypes.object,
  title: PropTypes.string,
  emoji: PropTypes.string,
  color: PropTypes.string,
  set: EmojiPropTypes.set,
  skin: EmojiPropTypes.skin,
  native: PropTypes.bool,
  backgroundImageFn: EmojiPropTypes.backgroundImageFn,
  sheetSize: EmojiPropTypes.sheetSize,
  emojisToShowFilter: PropTypes.func,
  showPreview: PropTypes.bool,
  showSearch: PropTypes.bool,
  inlineSkinPicker: PropTypes.bool,
  fixedWidth: PropTypes.bool,
  showSkinTones: PropTypes.bool,
  showTooltip: EmojiPropTypes.tooltip,
  include: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.arrayOf(PropTypes.string),
  recent: PropTypes.arrayOf(PropTypes.string),
  autoFocus: PropTypes.bool,
  custom: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      short_names: PropTypes.arrayOf(PropTypes.string).isRequired,
      emoticons: PropTypes.arrayOf(PropTypes.string),
      keywords: PropTypes.arrayOf(PropTypes.string),
      imageUrl: PropTypes.string.isRequired,
    }),
  ),
  skinEmoji: PropTypes.string,
  notFound: PropTypes.func,
  notFoundEmoji: PropTypes.string,
  icons: PropTypes.object,
}

const PickerDefaultProps = {
  onClick: () => {},
  onSelect: () => {},
  onSkinChange: () => {},
  emojiSize: 24,
  perLine: 9,
  i18n: {},
  style: {},
  title: 'Emoji Mart™',
  emoji: 'department_store',
  color: '#ae65c5',
  set: EmojiDefaultProps.set,
  data: EmojiDefaultProps.data,
  skin: null,
  defaultSkin: EmojiDefaultProps.skin,
  native: EmojiDefaultProps.native,
  sheetSize: EmojiDefaultProps.sheetSize,
  backgroundImageFn: EmojiDefaultProps.backgroundImageFn,
  emojisToShowFilter: null,
  showPreview: true,
  showSearch: true,
  inlineSkinPicker: false,
  fixedWidth: true,
  showSkinTones: true,
  showTooltip: EmojiDefaultProps.tooltip,
  autoFocus: false,
  custom: [],
  skinEmoji: '',
  notFound: () => {},
  notFoundEmoji: 'sleuth_or_spy',
  icons: {},
}

const EmojiTextPropTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  emojiProps: EmojiPropTypes,
}

const EmojiTextDefaultProps = {
  className: '',
  style: {},
  emojiProps: {size: 24}
}

export {
  EmojiPropTypes,
  EmojiDefaultProps,
  PickerPropTypes,
  PickerDefaultProps,
  EmojiTextPropTypes,
  EmojiTextDefaultProps
}
