import React, {Component} from 'react';

export default Wrapped => class InputToData extends Component {
  data = {};
  handleChange = (e) => {
    const {target: {name, value}} = e;
    if (name) this.data[name] = value;
  }
  render() {
    return <Wrapped {...this.props} handleChange={this.handleChange} data={this.data} />;
  }
};
