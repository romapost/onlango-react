import {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Sound from 'react-sound';
import {getUserInfo, joinRoom, leaveRoom, newMessage, setLastReceive} from 'actions';
import {emojify} from 'react-emojione';
import scrollIntoView from 'scroll-into-view';
import moment from 'moment';
import sprite from 'react-emojione/assets/emojione.sprites.png';
import beepReceive from 'assets/bling1.mp3';
import beepSend from 'assets/whoosh.mp3';

moment.locale('ru');
const backgroundImage = `url(${sprite})`;
const defaultUserpic = '/userpic.jpg';
const unknownUser = {
  name: 'unknown',
  img: defaultUserpic
};

class Chat extends Component {
  state = {
    message: '',
    height: 30
  };
  unknownUsers = [];
  requestedUsers = [];
  handleChange = (e) => {
    const {target: {name, value}} = e;
    if (name) this.setState({[name]: value});
  }
  sendMessage = e => {
    e.preventDefault();
    if (this.state.message) {
      const {message} = this.state;
      this.props.newMessage(message);
      this.setState({message: '', height: 30, beepSend: true});
    }
  };
  checkForNewMessages(id, messages, lastReceive) {
    const newMessages = messages.filter(e => e.timestamp > lastReceive && e.userId !== id);
    if (newMessages.length > 0) {
      this.setState({beepReceive: true});
      const {lastMessageId} = newMessages.reduce((s, e) => s.timestamp > e.timestamp ? s : e);
      this.props.setLastReceive(lastMessageId);
    }
  }
  componentWillMount() {
    const {user: {id}, messages, lastReceive} = this.props;
    this.checkForNewMessages(id, messages, lastReceive);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.messages.length != nextProps.messages.length) {
      const {user: {id}, messages, lastReceive} = nextProps;
      this.checkForNewMessages(id, messages, lastReceive);
    }
  }
  componentDidUpdate() {
    this.unknownUsers.forEach(e => {
      if (this.requestedUsers.indexOf(e) == -1) this.props.getUserInfo(e);
      this.requestedUsers.push(e);
    });
    if (this.refs.message.scrollHeight != this.state.height) this.setState({height: this.refs.message.scrollHeight});
    scrollIntoView(this.refs.message);
  }
  render() {
    const {user, users, usersOnline, messages} = this.props;
    return <Col sm={4} className='chat'>
      <Sound
        url={beepReceive}
        volume={80}
        playStatus={this.state.beepReceive ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => { this.setState({beepReceive: undefined}) }}
      />
      <Sound
        url={beepSend}
        volume={40}
        playStatus={this.state.beepSend ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => { this.setState({beepSend: undefined}) }}
      />
      <Row>
        <Col className='col-inside-lg decor-default chat' style={{overflow: 'hidden', outline: 'none'}} tabIndex='5000'>
          <div className='chat-users '>
            <h6>Users</h6>
            {usersOnline.map((e, i) => {
              if (e == user.id) return;
              if (!(e in users)) {
                if (this.unknownUsers.indexOf(e) == -1) this.unknownUsers.push(e);
                return;
              }
              const {image, name, status = []} = users[e];
              return <div key ={i} className='user'>
                <div className='avatar'>
                  <img src={image || defaultUserpic} alt='User name' />
                  <div className={`status`}>{status.join(', ')}</div>
                </div>
                <div className='name'>{name}</div>
              </div>;
            }
          )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='col-inside-lg decor-default' style={{height: '80vh', 'overflowY': 'auto'}}>
          <div className='chat-body'>
            <h6>Chat</h6>
            {messages.map((e, i) => {
              const self = e.userId == user.id;
              let userinfo = self ? user : users[e.userId];
              if (!userinfo) {
                if (this.unknownUsers.indexOf(e.userId) == -1) this.unknownUsers.push(e.userId);
                userinfo = unknownUser;
              }
              let {name, image, status = []} = userinfo;
              console.log(status)
              if (!image) image = defaultUserpic;
              const answer = self ? 'right' : 'left';
              const {body, timestamp} = e;
              return <div key={i} className={`answer ${answer}`}>
                <div className='avatar'>
                  <img src={image} alt='User name' />
                  <div className={`status`}>{status.join(', ')}</div>
                </div>
                <div className='name'>{name}</div>
                <div className='text'>{emojify(body, {styles: {backgroundImage}})}</div>
                <div className='time'>{moment(timestamp).fromNow()}</div>
              </div>;
            })}
            <div className='answer-add'>
              <textarea placeholder='Write a message' name='message' onKeyPress={e => {
                if (e.key == 'Enter' && !e.shiftKey) this.sendMessage(e);
              }} onChange={this.handleChange} value={this.state.message} ref='message' style={{height: this.state.height}}/>
              {/* <span className='answer-btn answer-btn-1'></span> */}

              <span className='answer-btn answer-btn-2' onClick={this.sendMessage}></span>
            </div>
          </div>
        </Col>
      </Row>
    </Col>;
  }
}

export default connect(
  ({chat: {messages, users, usersOnline, lastReceive}, user}) => (
    {messages, users, usersOnline, lastReceive, user}
  ),
  {getUserInfo, newMessage, setLastReceive}
)(Chat);
