import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    add() {
      this.transitionTo('deals.add');
    }
  }
});
