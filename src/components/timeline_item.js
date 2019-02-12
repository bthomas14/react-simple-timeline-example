import React, { Component } from 'react';
import moment from 'moment';

class TimelineItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      isEditing: false,
      itemName: props.item.name
    };

    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.itemName} onChange={this.handleChange} />
      </form>
    );
  }

  renderName() {
    return (
      <a href="#" onClick={this.toggleIsEditing}>
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
