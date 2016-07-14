import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return this.get('session.record');
  },

  actions: {
    back() {
      this.transitionTo('index');
    },

    save() {
      this.get('session.record').save();
      this.transitionTo('index');
    }
  }
});
