import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import App from './App.js';
import Kitchen from './Kitchen.js';

FlowRouter.route('/kitchen/', {
  name: 'Kitchen',
  action() {
    ReactLayout.render(Kitchen,document.getElementById('app'));
  },
});

FlowRouter.route('/table/', {
  name: 'App',
  action() {
    ReactLayout.render(App,document.getElementById('app'));
  },
});
