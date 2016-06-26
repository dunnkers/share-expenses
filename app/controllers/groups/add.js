import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      if (!this.get('model.name') || !this.get('model.description')) {
        return;
      }

      // TODO Validate name uniqueness
      let user = this.store.peekRecord('user', this.get('session.uid'));
      let group = this.store.createRecord('group', {
        name: this.get('model.name'),
        description: this.get('model.description'),
        users: [ user ]
      });

      user.get('groups').pushObject(group);
      user.save();

      group.save().then(() => this.send('back'));
    }
  }
});
