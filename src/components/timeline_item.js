import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimelineItem extends Component {

  static propTypes = {
    timelineStart: PropTypes.func.isRequired,
    item: PropTypes.object,
    timelineStart: PropTypes.string,
    color: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      isEditing: false,
      itemName: props.item.name
    };
  }

  toggleIsEditing(e) {
    e.preventDefault();

    this.setState(state => ({
      isEditing: !state.isEditing
    }));
  }

  handleChange(e) {
    this.setState({ itemName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
  }

  renderForm() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input type="text" value={this.state.itemName} onChange={e => this.handleChange(e)} />
      </form>
    );
  }

  renderName() {
    return (
      <a href="#" onClick={e => this.toggleIsEditing(e)}>
        {this.state.itemName}
      </a>
    );
  }

  render() {
    const { item, timelineStart, color } = this.props;
    const dayWidth = 30; // hard coding the height here is kind of blah
    let itemWidth = moment(item.end).diff(item.start, 'days');
    itemWidth = !itemWidth ? 1 : itemWidth;
    itemWidth = `${itemWidth * dayWidth}px`;
    const leftPos = `${moment(item.start).diff(timelineStart, 'days') * dayWidth}px`;

    return (
      <div className="timeline-item" style={{ left: leftPos, width: itemWidth, backgroundColor: color }}>
        {this.state.isEditing ? this.renderForm() : this.renderName()}
      </div>
    );
  }
}

export default TimelineItem;
