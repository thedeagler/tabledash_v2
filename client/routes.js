import { FlowRouter } from 'meteor/kadira:flow-router'
import React from 'react'
import Table from './components/TableView'
import Kitchen from './components/KitchenView'

FlowRouter.route('/kitchen/', {
  name: 'Kitchen',
  action() {
    ReactLayout.render(Kitchen, document.getElementById('app'));
  },
});

FlowRouter.route('/table/', {
  name: 'App',
  action() {
    ReactLayout.render(Table, document.getElementById('app'));
  },
});
