import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    this.store.findAll('task').then((tasks) => {
      this.controller.set('tasks', tasks);
    });
  }
});
