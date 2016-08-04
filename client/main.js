import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import Kitchen from './Kitchen.js';

Meteor.startup(() => {
  render(<Kitchen />, document.getElementById('app'));
});
