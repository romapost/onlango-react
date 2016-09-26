import {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, Panel, Image} from 'react-bootstrap';
import Sound from 'react-sound';
import {getUserInfo, newMessage, setLastReceive, changeChatStatus} from 'actions';
import {emojify} from 'react-emojione';
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
    height: 30,
    pinned: true
  };
  unknownUsers = [];
  requestedUsers = [];
  handleChange = (e) => {
    const {target: {name, value}} = e;
    if (name) {
      this.setState({[name]: value});
      if (name == 'message') {
        if (this.typingTimer) {
          clearTimeout(this.typingTimer);
        } else {
          this.props.changeChatStatus('typing');
        }
        this.typingTimer = setTimeout(() => {
          this.props.changeChatStatus('idle');
          this.typingTimer = null;
        }, 2000);
      }
    }
  }
  sendMessage = e => {
    e.preventDefault();
    if (this.state.message) {
      const {message} = this.state;
      this.props.newMessage(message);
      this.setState({message: '', height: 30, beepSend: true});
      if (this.typingTimer) {
        clearTimeout(this.typingTimer);
        this.props.changeChatStatus('idle');
        this.typingTimer = null;
      }
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
  componentDidMount() {
    this.timeUpdateTimer = setInterval(() => { this.forceUpdate() }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timeUpdateTimer);
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
    if (this.state.pinned) this.messagesList.scrollTop = this.messagesList.scrollHeight;
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
      <Panel>
      <Row>
        <Col sm={12}><h4>Users</h4></Col>
        <Col className='users-box' sm={12}>
          {usersOnline.map((e, i) => {
            if (e == user.id) return;
            if (!(e in users)) {
              if (this.unknownUsers.indexOf(e) == -1) this.unknownUsers.push(e);
              return;
            }
            const {image = defaultUserpic, name, status = [], typing} = users[e];
            return <div key ={i} className='user'>
              <Image className='avatar' src={image} alt='User name' circle />
              <div className='name'>{name}{typing && <span className='typing-mark'>печатает</span>}</div>
              <div className='status'>{status.join(', ')}</div>
            </div>;
          }
          )}
        </Col>
        <Col sm={12}><h4>Chat</h4></Col>
        <Col className='messages-box' sm={12} ref={c => { this.messagesList = findDOMNode(c) }} onScroll={e => {
          const {scrollTop, scrollHeight, offsetHeight} = e.target;
          const d = scrollHeight - scrollTop - offsetHeight;
          if (d < 10 && !this.state.pinned) {
            this.setState({pinned: true});
          } else if (d > 10 && this.state.pinned) {
            this.setState({pinned: false});
          }
        }}>
          {messages.map((e, i) => {
            const self = e.userId == user.id;
            let userinfo = self ? user : users[e.userId];
            if (!userinfo) {
              if (this.unknownUsers.indexOf(e.userId) == -1) this.unknownUsers.push(e.userId);
              userinfo = unknownUser;
            }
            let {name, image, status = []} = userinfo;
            if (!image) image = defaultUserpic;
            const answer = self ? 'right' : 'left';
            const {body, timestamp} = e;
            return <div key={i} className={`answer ${answer}`}>
              <div>
                <Image className='avatar' src={image} alt='User name' circle/>
                <div className='text'>{emojify(body, {styles: {backgroundImage}})}</div>
              </div>
              <div>
                <div className='name'>{name}</div>
                <div className='status'>{status.join(', ')}</div>
                <div className='time'>{moment(timestamp).fromNow()}</div>
              </div>
            </div>;
          })}
        </Col>
        <Col className='send-box' sm={12}>
          <textarea placeholder='Write a message' name='message' onKeyPress={e => {
            if (e.key == 'Enter' && !e.shiftKey) this.sendMessage(e);
          }} onChange={this.handleChange} value={this.state.message} ref='message' style={{height: this.state.height}}/>
          <span className='answer-btn' onClick={this.sendMessage}></span>
        </Col>
      </Row>
      </Panel>
    </Col>;
  }
}

export default connect(
  ({chat: {messages, users, usersOnline, lastReceive}, user}) => (
    {messages, users, usersOnline, lastReceive, user}
  ),
  {getUserInfo, newMessage, setLastReceive, changeChatStatus}
)(Chat);
