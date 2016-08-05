import { Meteor } from 'meteor/meteor';

let order
let kitchenOrderStatus = "No Orders?"
let em = new EventDDP('test');

Meteor.startup(() => {
  Meteor.methods({
    sendTableOrder: function(tableOrder) {
      order = tableOrder;
      console.log('order:', order)
      kitchenOrderStatus = "Pending..."
      em.emit('hello',order);
      return 'success';
    },
    getStatus: function(){
        	return kitchenOrderStatus;
    },
    setStatusDone: function(){
        kitchenOrderStatus = "Done!"
    }
  });
});
