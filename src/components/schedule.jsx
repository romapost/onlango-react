import React, {Component} from 'react';
import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';

export default class Schedule extends Component {
  check = () => {
    console.log(this.data);
  };
  componentDidMount() {
    const data = this.data = [];
    YUI().use(
      'aui-scheduler',
      function(Y) {
        var events = [
          {
            content: 'Event1',
            endDate: new Date(2013, 1, 4, 5),
            startDate: new Date(2013, 1, 4, 1)
          }
        ];

        var eventRecorder = new Y.SchedulerEventRecorder();
        var weekView = new Y.SchedulerWeekView();

        const s = new Y.Scheduler(
          {
            boundingBox: '#myScheduler',
            date: new Date(2013, 1, 4),
            eventRecorder: eventRecorder,
            items: events,
            render: true,
            views: [weekView]
          }
        );

        eventRecorder.on('save', function(data) {
          console.log(data);
          console.log(s);
        });
      }
    );
  }
  render() {
    return <Grid fluid>
      <Row>
        <Col>
          <Panel>
            <div id='myScheduler' />
            <Button onClick={this.check}>Check</Button>
          </Panel>
        </Col>
      </Row>
    </Grid>;
  }
}
