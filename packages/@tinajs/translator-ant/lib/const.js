const CLASSNAME_PREFIX_ROLE = 'mina-role-'
const CLASSNAME_PREFIX_SCOPE = 'mina-scope-'

const UNAVAILABLE_TAGNAME_MAPPING = {
  ul: 'view',
  li: 'view',
  header: 'view',
  footer: 'view',
  span: 'text',
}
const NON_BUILTIN_TAGNAME_MAPPING = {
  'rich-text': 'view',
  'functional-page-navigator': 'view',
  audio: 'view',
  video: 'view',
  camera: 'view',
  'live-player': 'view',
  'live-pusher': 'view',
  'open-data': 'view',
  ad: 'view',
  'official-account': 'view',
}

module.exports = {
  CLASSNAME_PREFIX_ROLE,
  CLASSNAME_PREFIX_SCOPE,
  UNAVAILABLE_TAGNAME_MAPPING,
  NON_BUILTIN_TAGNAME_MAPPING,
}
