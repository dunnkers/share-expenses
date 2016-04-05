import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add() {
      let task = this.store.createRecord('task', {
        description: this.get('description')
      });
      this.set('description', '');
      this.get('model.tasks').pushObject(task);
      this.get('model').save().then(() => task.save());
    },

    deleted(task) {
      this.set('deletedTask', task);
      this.set('opened', true);
      this.set('timer', Ember.run.debounce(this, this.close, 3000));
    },

    undo() {
      Ember.run.cancel(this.get('timer'));
      this.set('opened', false);
      this.get('deletedTask').rollbackAttributes();
    },

    close() {
      Ember.run.cancel(this.get('timer'));
      this.close();
    }
  },

  close() {
    this.set('opened', false);
    Ember.Logger.debug('Deleting task permanently.', this.get('deletedTask'));
    this.get('deletedTask').save();
  }
});
