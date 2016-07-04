import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    back() {
      this.get('controller.model').rollbackAttributes();
      this.transitionTo('group', this.get('controller.model'));
    },

    save() {
      this.get('controller.model').save();
      this.transitionTo('group', this.get('controller.model'));
    }
  }

  // TODO Add ConfirmationMixin
});
