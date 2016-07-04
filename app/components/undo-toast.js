import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    undo() {
      Ember.run.cancel(this.get('timer'));
      Ember.Logger.debug('Rolling back model deletion. ("%s")', this.get('deletedModel.id'));
      this.set('opened', false);
      this.set('deletedModel.deleted', false);
      this.set('deletedModel', null);
    },

    close() {
      Ember.run.cancel(this.get('timer'));
      this.close();
    }
  },

  showToast: Ember.observer('deletedModel', function() {
    // Do not trigger when deletedModel is set back to null
    if (!this.get('deletedModel')) {
      return;
    }
    // Permanently delete preceding, still opened model
    if (this.get('opened')) {
      this.destroy();
    }
    this.set('model', this.get('deletedModel'));

    // Delete task permanently that was waiting to be delete
    Ember.Logger.debug('Deleted model. ("%s")', this.get('deletedModel.id'));
    this.set('opened', true);

    // set parameter to indicate an opened toast and set timer to close
    this.set('timer', Ember.run.debounce(this, this.close, 3000));
  }),

  close() {
    this.set('opened', false);
    this.destroy();
  },

  destroy() {
    if (!this.get('model')) {
      return;
    }

    Ember.Logger.debug('Deleting model permanently. ("%s")', this.get('model.id'));
    this.get('model').destroyRecord();
  }
});
