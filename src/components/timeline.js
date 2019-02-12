import React, { Component } from 'react';
import moment from 'moment';

// Components
import TimelineItem from './timeline_item';

class Timeline extends Component {

  sortedTimelineItems() {
    return this.props.timelineItems.sort((a, b) => {
      return moment(a.start).unix() - moment(b.start).unix();
    });
  }

  // Find first starting date for beginning of timeline
  timelineStart() {
    const items = this.sortedTimelineItems();
    return items[0].start;
  }

  // Find the latest ending date to set final date on timeline
  timelineEnd() {
    const reverseSortedItems = this.props.timelineItems.sort((a, b) => {
      return moment(a.end).unix() - moment(b.end).unix();
    }).reverse();
    return reverseSortedItems[0].end;
  }

  // Create array of all dates between first and last on timeline
  displayDates() {
    const firstItem = this.timelineStart();
    const lastItem = this.timelineEnd();
    const diff = moment(lastItem).diff(firstItem, 'days') + 1;
    const dateArr = [];
    for (var i = 0; i < diff; i++) {
      dateArr.push({
        date: moment(firstItem).add(i, 'days').format(),
        label: moment(firstItem).add(i, 'days').format('M/D')
      });
    }
    return dateArr.sort((a, b) => {
      return moment(a.date).unix() - moment(b.date).unix();
    });
  }

  groupedTimelineItems() {
    const results = [];
    const items = this.sortedTimelineItems();
    let foundExistingObj, nextVerticalPos;

    for (var i = 0; i < items.length; i++) {
      if (results.length === 0) {
        results.push({
          verticalPosition: 0,
          verticalPositionPx: `0px`,
          start: items[i].start,
          end: items[i].end,
          items: [ items[i] ]
        });
      } else {
        foundExistingObj = false;
        for (var j = 0; j < results.length; j++) {
          if(!this.isWithinRange(items[i], results[j])) {
            results[j].items.push(items[i]);
            results[j].end = items[i].end;
            foundExistingObj = true;
            break;
          }
        }
        if (!foundExistingObj) {
          nextVerticalPos = results[results.length - 1].verticalPosition + 1;
          results.push({
            verticalPosition: nextVerticalPos,
            verticalPositionPx: `${nextVerticalPos*30}px`,
            start: items[i].start,
            end: items[i].end,
            items: [items[i]]
          });
        }

      }
    }
    return results;
  }

  isWithinRange(item, resultItem) {
    return moment(item.start).isSameOrAfter(resultItem.start, 'day') &&
        moment(item.start).isSameOrBefore(resultItem.end, 'day');
  }

  getRandomColor() {
    const colorArr = [
      '#72d4f9', // blue
      '#f98e72', // red
      '#f7b84f', // yellow
      '#a872f9', // purple
      '#a7e56d', // green
      '#ff73c7', // pink
    ];
    return colorArr[Math.floor(Math.random() * colorArr.length)];
  }

  render() {
    const displayDates = this.displayDates();
    const groupedTimelineItems = this.groupedTimelineItems();

    return (
      <div>
        <div className="dates-container">
          {displayDates.map((d, i) => (
            <div className="date-label" key={i}>
              {d.label}
            </div>
          ))}
        </div>
        <div className="timeline-container">
          {groupedTimelineItems.map((group, i) => (
            <div key={group.verticalPosition} className="timeline-row" style={{ top: group.verticalPositionPx }}>
              {group.items.map((item) => (
                <TimelineItem
                  item={item}
                  key={item.id}
                  color={this.getRandomColor()}
                  timelineStart={this.timelineStart()}
                />
              ))}
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Timeline;
