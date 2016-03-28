import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      console.log('lets save this baby');
      let user = this.get('session.currentUser');
      let group = this.store.createRecord('group', {
        name: this.get('name'),
        description: this.get('description'),
        users: [ user ]
      });

      user.get('groups').pushObject(group);
      user.save();

      group.save().then(() => this.send('back'));
    }
  }
});
