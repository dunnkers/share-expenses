import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      console.log('set deal.',this.get('session.uid'));
      this.controller.set('deal', this.store.createRecord('deal', {

      }));
    }
  }
});
