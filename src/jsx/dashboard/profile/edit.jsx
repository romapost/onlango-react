import React, {Component, PropTypes} from 'react';
import {Tab, Nav, NavItem, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {editUserInfo, submitUserInfo, uploadUserImage, changePassword, submitTeacherForm} from 'actions';
import EditForm from './editForm.jsx';
import PasswordForm from './passwordForm.jsx';
import TeacherForm from './teacherForm.jsx';

const hashes = new Set(['#info', '#password', '#notify', '#becometeacher']);

class ProfileEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  state = {key: '#info'};
  handleSelect = key => {
    if (key) {
      this.context.router.push(this.props.location.pathname + key);
      this.setState({key});
    }
  };
  componentWillMount() {
    const h = this.props.location.hash;
    if (hashes.has(h.toLocaleLowerCase())) this.setState({key: h});
  }
  render() {
    const {user, editUserInfo, submitUserInfo, uploadUserImage, changePassword, submitTeacherForm} = this.props;

    const propsEditForm = {user, editUserInfo, submitUserInfo, uploadUserImage};
    const propsTeacherForm = {user, submitTeacherForm};
    const propsPasswordForm = {changePassword};

    return <Tab.Container activeKey={this.state.key} onSelect={this.handleSelect}>
      <div>
        <Nav bsStyle='tabs'>
          <NavItem href='#info' eventKey='#info'>
            Информация
          </NavItem>
          <NavItem href='#becometeacher' eventKey='#becometeacher'>
            Стать учителем
          </NavItem>
          <NavItem href='#password' eventKey='#password'>
            Сменить пароль
          </NavItem>
          <NavItem href='#notify' eventKey='#notify'>
            Уведомления
          </NavItem>
        </Nav>
        <Tab.Content animation={false}>
          <Tab.Pane eventKey='#info'>
            <EditForm {...propsEditForm} />
          </Tab.Pane>
          <Tab.Pane eventKey='#becometeacher'>
            <TeacherForm {...propsTeacherForm}/>
          </Tab.Pane>
          <Tab.Pane eventKey='#password'>
            <PasswordForm {...propsPasswordForm}/>
          </Tab.Pane>
          <Tab.Pane eventKey='#notify'>
            <Panel>Уведомления</Panel>
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>;
  }
}

const mapDispatchToProps = {
  editUserInfo,
  submitUserInfo,
  uploadUserImage,
  changePassword,
  submitTeacherForm
};

export default connect(({user}) => ({user}), mapDispatchToProps)(ProfileEdit);
