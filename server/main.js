import { Meteor } from 'meteor/meteor';

let order
let kitchenOrderStatus = "Waiting for order..."
let em = new EventDDP('test');

Meteor.startup(() => {
  Meteor.methods({
    sendTableOrder: function(tableOrder) {
      order = tableOrder;
      kitchenOrderStatus = "Preparing order..."
      em.emit('hello',order);
      return 'success';
    },
    getStatus: function(){
    	return kitchenOrderStatus;
    },
    donePreparing: function(){
      kitchenOrderStatus = "Waiting for order..."
     	em.emit('done');
    }
  });
});
