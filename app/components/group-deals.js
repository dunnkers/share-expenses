import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    addDeal: function() {
      let deal = this.get('store').createRecord('deal', {
        group: this.get('group')
      });
      deal.set('editing', true);
      this.get('group.deals').pushObject(deal);
    }
  }
});
