import Ember from 'ember';

export default Ember.Controller.extend({
  open: false,

  actions: {
    add() {
      let task = this.store.createRecord('task', {
        description: this.get('description')
      });
      task.save();
      this.set('description', '');
    },

    deletedUndo(task) {
      this.set('deletedTask', task);
      this.set('open', true);
      Ember.run.later(() => {
        this.set('open', false);
        this.get('deletedTask').save();
      }, 5500);
    },

    undo() {
      this.get('deletedTask').rollbackAttributes();
      this.set('open', false);
    }
  }
});
