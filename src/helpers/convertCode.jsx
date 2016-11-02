import React from 'react';

const uriRE = /^((\w+):\/\/)([^[]+)$/gm;

export default function convertCode(string) {
  const a = [];
  const re = /\[(.+?)(?:=(.+?))?\](.*?)\[\/\1\]/g;
  let found;
  let i = 0;
  while ((found = re.exec(string))) {
    const [matched, tag, value, content] = found;
    if (i !== found.index) {
      a.push(string.slice(i, found.index));
    }
    i = found.index + matched.length;
    switch (tag) {
      case 'url': {
        let href;
        if (value) {
          href = value;
        } else if (uriRE.test(content)) {
          href = content;
        }
        if (href) {
          a.push(<a href={href} target='_blank'>{convertCode(content)}</a>);
        }
        break;
      }
      case 'img': {
        a.push(<img src={content} />);
        break;
      }
      default: {
        a.push(...convertCode(content));
      }
    }
  }
  if (i !== string.length) {
    a.push(string.slice(i, string.length));
  }
  return a;
}
