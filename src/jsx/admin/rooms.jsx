import {Component, PropTypes} from 'react';
import {Panel, Table, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getRoom, addRoom, editRoom, removeRoom} from 'actions';
import moment from 'moment';

const TableRow = ({id, name, createdAt, comment, onClick}) => <tr onClick={onClick}>
  {[id, name, moment(createdAt).format('HH:mm DD.MM.YY'), comment].map((e, i) => <td key={i}>{e}</td>)}
</tr>;

class Rooms extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  state = {};
  trClickHandler = id => e => { this.setState({id: id == this.state.id ? undefined : id}) }
  buttonClickHandler = e => {
    e.stopPropagation();
    const {name} = e.target;
    switch (name) {
      case 'add':
        this.props.addRoom(null, id => { this.setState({edit: true, id}) });
        break;
      case 'edit':
        if (this.state.edit) {
          const {id, name, comment} = this.state;
          this.props.editRoom({id, name, comment});
          this.setState({edit: undefined, name: undefined, comment: undefined});
        } else {
          let name, comment;
          this.props.rooms.some(e => {
            if (e.id == this.state.id) {
              name = e.name;
              comment = e.comment;
              return true;
            }
          });
          this.setState({edit: true, name, comment});
        }
        break;
      case 'enter':
        this.context.router.push(`/class/${this.state.id}`);
        break;
      case 'delete':
        this.props.removeRoom(this.state.id);
        this.setState({edit: undefined, name: undefined, comment: undefined});
        break;
    }
  };
  editHandler = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };
  componentWillMount() {
    this.props.getRoom();
  }
  render() {
    const rows = [];
    const sortedRooms = Array.from(this.props.rooms).sort((a, b) => a.createdAt - b.createdAt);
    for (const room of sortedRooms) {
      const {id} = room;
      rows.push(<TableRow key={id} {...room} onClick={this.trClickHandler(id)}/>);
      if (id == this.state.id) {
        if (this.state.edit) {
          const {createdAt} = room;
          rows.pop();
          rows.push(
            <tr key={id} onChange={this.editHandler}>
              <td>{id}</td>
              <td>
                <input type='text' name='name' value={this.state.name} />
              </td>
              <td>{moment(createdAt).format('HH:mm DD.MM.YY')}</td>
              <td>
                <textarea rows={1} name='comment' value={this.state.comment}></textarea>
              </td>
            </tr>
          );
        }
        rows.push(<tr key='control' onClick={this.trClickHandler(id)}>
          <td colSpan={4}>
            <ul className='chat-room-control'>
              <li><Button onClick={this.buttonClickHandler} name='enter'>Войти</Button></li>
              <li><Button onClick={this.buttonClickHandler} name='edit'>{this.state.edit ? 'Сохранить' : 'Редактировать'}</Button></li>
              <li><Button onClick={this.buttonClickHandler} name='delete' bsStyle='danger'>Удалить</Button></li>
            </ul>
          </td>
        </tr>);
      }
    }
    return <Panel id='adminChat'>
      <Table responsive striped condensed hover>
        <thead>
          <tr>{['#', 'Название', 'Дата создания', 'Комментарий'].map((e, i) => <th key={i}>{e}</th>)}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <Button onClick={this.buttonClickHandler} name='add' bsStyle='primary'>Добавить</Button>
    </Panel>;
  }
}

export default connect(({rooms}) => ({rooms}), {getRoom, addRoom, editRoom, removeRoom})(Rooms);
