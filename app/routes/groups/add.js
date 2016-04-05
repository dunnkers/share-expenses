import Ember from 'ember';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(ConfirmationMixin, {
  model() {
    return {};
  },

  actions: {
    back() {
      this.transitionTo('index');
    }
  },

  confirmationMessage(model) {
    const name = Ember.get(model, 'name');
    return `You have unsaved changes for ${name}, are you sure you want to continue?`;
  }
});
