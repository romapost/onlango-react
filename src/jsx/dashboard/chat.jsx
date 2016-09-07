import {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {connectSocket, disconnectSocket, getUserInfo, newMessage, initChat} from 'actions';
import scrollIntoView from 'scroll-into-view';

const defaultUserpic = '/userpic.jpg';
const unknownUser = {
  name: 'unknown',
  img: defaultUserpic,
  status: 'unknown'
};

class Chat extends Component {
  state = {
    message: ''
  };
  unknownUsers = [];
  requestedUsers = [];
  handleChange = (e) => {
    const {target: {name, value}} = e;
    if (name) this.setState({[name]: value});
  }
  sendMessage = e => {
    e.preventDefault();
    this.props.newMessage(this.state.message);
    this.setState({message: ''});
  };
  componentWillMount() {
    this.props.connectSocket('chat');
  }
  componentWillUnmount() {
    console.log('willUnmount');
    this.props.disconnectSocket('chat');
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.chat && nextProps.chat) this.props.initChat();
  }
  componentDidUpdate() {
    this.unknownUsers.forEach(e => {
      if (this.requestedUsers.indexOf(e) == -1) this.props.getUserInfo(e);
      this.requestedUsers.push(e);
    });
    scrollIntoView(this.refs.input);
  }
  render() {
    const {user, users, usersOnline, messages} = this.props;
    return <Grid fluid className='chat'>
      <Row>
        <Col sm={3} xs={12}>
          <div className='col-inside-lg decor-default chat' style={{overflow: 'hidden', outline: 'none'}} tabIndex='5000'>
            <div className='chat-users'>
              <h6>Users</h6>
              {usersOnline.map((e, i) => {
                if (e == user.id) return;
                if (!(e in users)) {
                  if (this.unknownUsers.indexOf(e) == -1) this.unknownUsers.push(e);
                  return;
                }
                const {image, name, status} = users[e];
                return <div key ={i} className='user'>
                  <div className='avatar'>
                    <img src={image || defaultUserpic} alt='User name' />
                    <div className={`status ${status}`}></div>
                  </div>
                  <div className='name'>{name}</div>
                </div>;
              }
            )}
            </div>
          </div>
        </Col>
        <Col sm={9} xs={12}>
          <div className='col-inside-lg decor-default' style={{height: '80vh', 'overflow-y': 'scroll'}}>
            <div className='chat-body'>
              <h6>Chat</h6>
              {messages.map((e, i) => {
                const self = e.userId == user.id;
                let userinfo = self ? user : users[e.userId];
                if (!userinfo) {
                  if (this.unknownUsers.indexOf(e.userId) == -1) this.unknownUsers.push(e.userId);
                  userinfo = unknownUser;
                }
                let {name, image, status} = userinfo;
                if (!image) image = defaultUserpic;
                const answer = self ? 'right' : 'left';
                const {text, time} = e;
                return <div key={i} className={`answer ${answer}`}>
                  <div className='avatar'>
                    <img src={image} alt='User name' />
                    <div className={`status ${status}`}></div>
                  </div>
                  <div className='name'>{name}</div>
                  <div className='text'>{text}</div>
                  <div className='time'>{new Date(time).toString()}</div>
                </div>;
              })}
              <div className='answer-add'>
                <input placeholder='Write a message' name='message' onKeyPress={e => {
                  if (e.key == 'Enter') this.sendMessage(e);
                }} onChange={this.handleChange} value={this.state.message} ref='input' />
                {/* <span className='answer-btn answer-btn-1'></span> */}
                <span className='answer-btn answer-btn-2' onClick={this.sendMessage}></span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>;
  }
}

export default connect(
  ({chat: {messages, users, usersOnline}, sockets: {chat}, user}) => ({chat, messages, users, usersOnline, user}),
  {connectSocket, disconnectSocket, getUserInfo, newMessage, initChat}
)(Chat);
