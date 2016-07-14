import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  actions: {
    addDeal() {
      let store = this.get('store');
      let group = this.get('group');

      let deal = store.createRecord('deal', { group });
      let payment = store.createRecord('payment', {
        by: this.get('session.record'),
        deal
      });
      deal.get('payments').addObject(payment);
      deal.set('editing', true);
      this.get('group.deals').pushObject(deal);
    }
  },

  dealsSorting: ['createdAt:desc'],
  deals: Ember.computed.sort('group.deals', 'dealsSorting')
});
