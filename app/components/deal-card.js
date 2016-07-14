import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    edit() {
      this.set('deal.editing', true);
    },

    cancel() {
      this.get('deal').rollbackAttributes();
      this.set('deal.editing', false);
    },

    save() {
      this.set('deal.editing', false);
      let isNew = this.get('deal.isNew');
      this.get('deal').save().then((deal) => {
        if (isNew) {
          deal.get('group.content').save();
        }
      });
    },

    delete() {
      this.get('deal').destroyRecord();
    },

    addPayment() {
      let deal = this.get('deal');
      let by = this.get('paidBy');
      // create new payment
      let payment = this.get('store').createRecord('payment', {
        cost: this.get('cost'),
        by,
        deal
      });

      // update relations
      by.get('payments').addObject(payment);
      deal.get('payments').addObject(payment);

      // save all
      payment.save().then(
        () => by.save()).then(
        () => deal.save());
    },

    deletePayment(payment) {
      payment.destroyRecord(); // also updates all relations
    }
  },

  isUpdated: Ember.computed.equal('deal.dirtyType', 'updated'),
  paidBy: Ember.computed('session.record', function() {
    return this.get('session.record');
  })
});
