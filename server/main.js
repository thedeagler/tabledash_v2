import { Meteor } from 'meteor/meteor';

let order

Meteor.startup(() => {
  Meteor.methods({
    sendTableOrder: function(tableOrder) {
      order = tableOrder;
      return 'success';
    }
    getStatus: function(){
        	return orderStatus;
        }
  });
});
