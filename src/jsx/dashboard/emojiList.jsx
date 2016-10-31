import {Col} from 'react-bootstrap';
import {emojify} from 'react-emojione';
import sprite from 'react-emojione/assets/emojione.sprites.png';
const emojiOptions = {styles: {backgroundImage: `url(${sprite})`}};

const list = [
  ':grinning:',
  ':grimacing:',
  ':grin:',
  ':joy:',
  ':smiley:',
  ':smile:',
  ':sweat_smile:',
  ':laughing:',
  ':innocent:',
  ':wink:',
  ':blush:',
  ':slight_smile:',
  ':relaxed:',
  ':yum:',
];

export default ({addEmoji, visible, show}) => <Col>
  {
    visible
      ? <div style={{display: 'inline-block', borderRadius: 3, border: '1px solid #aab', backgroundColor: '#ddf'}}>{list.map(e => <span key={e} style={{display: 'inline-block', margin: '0.7rem 0.2rem 0'}} onClick={() => addEmoji(e)}>{emojify(e, emojiOptions)}</span>).concat(<button style={{float: 'right', margin: '0.5rem'}} onClick={() => { addEmoji('') }}>X</button>)}</div>
      : <span style={{float: 'right', margin: '0.5rem', padding: '0.6rem 0.2rem 0.1rem', borderRadius: 3, border: '1px solid #aab', backgroundColor: '#dde'}}onClick={show}>{emojify(':smile:', emojiOptions)}</span>
  }
</Col>;
