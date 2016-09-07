import {Component} from 'react';
import {withRouter} from 'react-router';
import {Grid, Tab, Nav, NavItem, Panel} from 'react-bootstrap';

import EditForm from './editForm.jsx';
import PasswordForm from './passwordForm.jsx';
import TeacherForm from './teacherForm.jsx';

const hashes = new Set(['#info', '#password', '#notify', '#becometeacher']);

class ProfileEdit extends Component {
  state = {key: '#info'};
  handleSelect = key => {
    if (key) {
      this.props.router.push(this.props.location.pathname + key);
      this.setState({key});
    }
  };
  componentWillMount() {
    const h = this.props.location.hash;
    if (hashes.has(h.toLocaleLowerCase())) this.setState({key: h});
  }
  render() {
    return <Tab.Container activeKey={this.state.key} onSelect={this.handleSelect}>
      <Grid fluid>
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
            <EditForm />
          </Tab.Pane>
          <Tab.Pane eventKey='#becometeacher'>
            <TeacherForm />
          </Tab.Pane>
          <Tab.Pane eventKey='#password'>
            <PasswordForm />
          </Tab.Pane>
          <Tab.Pane eventKey='#notify'>
            <Panel>Уведомления</Panel>
          </Tab.Pane>
        </Tab.Content>
    </Grid>
    </Tab.Container>;
  }
}

export default withRouter(ProfileEdit);
