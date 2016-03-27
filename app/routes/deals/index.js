import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    this.store.findAll('deal').then((deals) => {
      this.controller.set('deals', deals);
    });
  }
});
