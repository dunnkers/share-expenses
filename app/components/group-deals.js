import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    addDeal() {
      let deal = this.get('store').createRecord('deal', {
        group: this.get('group')
      });
      deal.set('editing', true);
      this.get('group.deals').pushObject(deal);
    }
  },

  dealsSorting: ['createdAt:desc'],
  deals: Ember.computed.sort('group.deals', 'dealsSorting')
});
