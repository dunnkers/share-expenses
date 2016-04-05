import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      let user = this.get('session.currentUser');
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
