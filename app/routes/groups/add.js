import Ember from 'ember';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(ConfirmationMixin, {
  model() {
    return this.store.createRecord('group', {});
  },

  actions: {
    back() {
      this.transitionTo('index');
    },

    saveGroup() {
      let group = this.get('controller.model'),
          user = this.get('session.record');

      // update group with user and vice-versa.
      group.get('users').addObject(user);
      user.get('groups').addObject(group);

      // save both and transition.
      group.save().then(() => user.save());
      this.transitionTo('group', group);
    }
  },

  confirmationMessage(model) {
    let name = Ember.get(model, 'name');
    let forname = name ? `${name}` : 'Deze groep';
    // TODO check if dirty
    return `${forname} niet aanmaken?`;
  }
});
