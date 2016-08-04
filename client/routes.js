import { FlowRouter } from 'meteor/kadira:flow-router';


FlowRouter.route('/kitchen/', {
  name: 'Kitchen',
  action() {
    render(<Kitchen />, document.getElementById('app'));
  },
});

FlowRouter.route('/table/', {
  name: 'App',
  action() {
    render(<App />, document.getElementById('app'));
  },
});
