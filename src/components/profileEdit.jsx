import React from 'react';
import {Grid, Tab, Nav, NavItem, Panel} from 'react-bootstrap';

import InfoForm from './profileEditInfo.jsx';
import PasswordForm from './profileEditPassword.jsx';

export default props =>
  <Tab.Container defaultActiveKey='info' animation={false}>
    <Grid fluid>
        <Nav bsStyle='tabs'>
        <NavItem eventKey="info">
          Информация
        </NavItem>
        <NavItem eventKey="password">
          Сменить пароль
        </NavItem>
        <NavItem eventKey="notify">
          Уведомления
        </NavItem>
        </Nav>
      <Tab.Content animation>
        <Tab.Pane eventKey="info">
          <InfoForm />
        </Tab.Pane>
        <Tab.Pane eventKey="password">
          <PasswordForm />
        </Tab.Pane>
        <Tab.Pane eventKey="notify">
          <Panel>Уведомления</Panel>
        </Tab.Pane>
      </Tab.Content>
  </Grid>
  </Tab.Container>;
