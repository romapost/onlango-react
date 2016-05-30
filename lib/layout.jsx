import React from 'react';

const min = process.env.NODE_ENV == 'production' ?  '.min' : '';
const defaults = {
  title: 'App',
  styles: [
    `/style${min}.css`,
    'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css'
  ],
  scripts: [
    `/vendor${min}.js`,
    `/bundle${min}.js`
  ]
};

export default props => {
  const get = (p, map) => {
    const val = p in props ? props[p] : defaults[p];
    return typeof map == 'function' ? Array.prototype.concat(val).map(map) : val;
  };

  return <html>
  <head>
    <meta charSet='utf-8' />
    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no shrink-to-fit=no' name='viewport' />
    <title>{get('title')}</title>
    {get('styles', (e, i) => <link rel='stylesheet' href={e} key={i}/>)}
  </head>
  <body>
    <div id='app' dangerouslySetInnerHTML={{__html: props.html}}></div>
    {get('scripts', (e, i) => <script src={e} key={i}/>)}
  </body>
</html>;
};
