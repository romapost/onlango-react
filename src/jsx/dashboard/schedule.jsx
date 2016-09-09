import {Component} from 'react';
import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Schedule extends Component {
  state = {events: []};
  check = () => {
    console.log(this.events);
  };
  render() {
    return <Grid fluid>
      <Row>
        <Col>
          <Panel style={{minHeight: '30em'}}>
            <BigCalendar
              selectable
              culture='ru'
              events={this.state.events}
              defaultView='month'
              defaultDate={new Date(2015, 3, 1)}
              onSelectEvent={event => { console.log(event) }}
              onSelectSlot={slotInfo => {
                console.log(slotInfo);
                let {start, end} = slotInfo;
                if (!start.getHours() && !end.getHours()) end.setDate(end.getDate() + 1);
                this.setState({events: [...this.state.events, {start, end, title: 'lesson'}]});
              }}
            />
            <Button onClick={this.check}>Check</Button>
          </Panel>
        </Col>
      </Row>
    </Grid>;
  }
}