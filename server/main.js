import { Meteor } from 'meteor/meteor';

let order
let kitchenOrderStatus = "No Orders?"
let em = new EventDDP('test');

Meteor.startup(() => {
  Meteor.methods({
    sendTableOrder: function(tableOrder) {
      order = tableOrder;
      console.log('order:', typeof order)
      kitchenOrderStatus = "Pending..."
      em.emit('hello',order);
      return 'success';
    },
    getStatus: function(){
        	return kitchenOrderStatus;
    },
    setStatusNoOrders: function(){
        kitchenOrderStatus = "No Orders!"
    },
    donePreparing: function(){
        kitchenOrderStatus = "Done!!"
     	em.emit('done');   
    }
  });
});
