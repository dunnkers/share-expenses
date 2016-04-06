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
    },

    deleted(task) {
      // Delete task permanently that was waiting to be delete
      if (this.get('opened')) {
        this.destroy();
      }

      // soft-delete task from list
      this.set('deletedTask', task);
      task.set('deleted', true);

      // set parameter to indicate an opened toast and set timer to close
      this.set('opened', true);
      this.set('timer', Ember.run.debounce(this, this.close, 3000));
    },

    undo() {
      Ember.run.cancel(this.get('timer'));
      this.set('opened', false);
      Ember.Logger.debug('Rolling back task deletion. ("%s")', this.get('deletedTask.id'));
      this.get('deletedTask').set('deleted', false);
    },

    close() {
      Ember.run.cancel(this.get('timer'));
      this.close();
    }
  },

  close() {
    this.set('opened', false);
    this.destroy();
  },

  destroy() {
    Ember.Logger.debug('Deleting task permanently. ("%s")', this.get('deletedTask.id'));
    this.get('deletedTask').destroyRecord().then(() => this.get('model').save());
  }
});
