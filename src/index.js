import React from 'react';
import { render } from 'react-dom';

// Data
import timelineItems from './timelineItems';

// Components
import Calendar from './components/timeline';

require('./index.css');

const App = () => (
  <div className="container">
    <h2 className="text-center">{'\u2728'} Brooke's Timeline {'\u2728'}</h2>
    <h3 className="text-center">{timelineItems.length} timeline items to render</h3>
    <Calendar
      timelineItems={timelineItems}
    />
  </div>
);

render(<App />, document.getElementById('root'));
