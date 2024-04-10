import React from 'react';
import AWS from 'aws-sdk';
import CurrentProjects from './CurrentProjects';
import GoogleCalendarData from './GoogleCalendarData.js';

const Projects = () => {
  return (
    <div>
      Projects content here
      <CurrentProjects />
      {/* <GoogleCalendarData />! */}
    </div>
  );
}

export default Projects;
