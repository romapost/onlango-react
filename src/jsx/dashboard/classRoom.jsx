import {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import {joinRoom, leaveRoom} from 'actions';
import {connect} from 'react-redux';
import Chat from './chat';

class ClassRoom extends Component {
  componentWillMount() {
    this.props.joinRoom(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.leaveRoom(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.socket.connected && nextProps.socket.connected) {
      this.props.joinRoom(this.props.params.id);
    }
  }
  render() {
    return <Row id='classRoom'>
      <Col sm={8} className='lessons'>
        <Panel>
          <h4>Lessons</h4>
        </Panel>
      </Col>
      <Chat roomId={this.props.params.id} />
    </Row>;
  }
}

export default connect(({socket}) => ({socket}), {joinRoom, leaveRoom})(ClassRoom);
