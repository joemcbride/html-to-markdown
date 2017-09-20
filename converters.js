const spanConverter = {
  filter: 'span',
  replacement: (content)=> {
    return content
  }
}

const divConverter = {
  filter: 'div',
  replacement: (content)=> {
    return content
  }
}

const preConverter = {
  filter: 'pre',
  replacement: (content)=> {
    return '\n```\n' + content + '\n```\n'
  }
}

module.exports = [
  spanConverter,
  divConverter,
  preConverter
]
