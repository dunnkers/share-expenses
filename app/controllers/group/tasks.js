import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add() {
      let task = this.store.createRecord('task', {
        description: this.get('description')
      });
      this.set('description', '');
      this.get('model.tasks').pushObject(task);
      task.save().then(() => this.get('model').save());
    }
  },
});
