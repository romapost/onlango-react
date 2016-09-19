import {Component} from 'react';
import {NavItem} from 'react-bootstrap';
import moment from 'moment-timezone';
import {tz} from 'config';

moment.tz.setDefault(tz);

export default class Clock extends Component{
  componentDidMount() {
    this.timer = setInterval(() => { this.forceUpdate() }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return <NavItem disabled id='clock'>{moment().format('HH:mm')}<br />{tz}</NavItem>;
  }
}
