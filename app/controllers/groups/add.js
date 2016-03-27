import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      let newGroup = this.store.createRecord('group', {
        name: this.get('name'),
        description: this.get('description'),
        users: [this.get('session.uid')]
      });

      newGroup.save().then(() => this.send('back'));
    }
  }
});
