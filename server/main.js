import { Meteor } from 'meteor/meteor';

let order

Meteor.startup(() => {
  Meteor.methods({
    sendTableOrder: function(tableOrder) {
      order = tableOrder;
      console.log('order:', order)
      return 'success';
    }
  });
});
