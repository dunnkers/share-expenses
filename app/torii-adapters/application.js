import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  store: Ember.inject.service(),

  open(user) {
    let session;

    return this._super(user).then((data) => {
      Ember.Logger.debug('Successfully opened session.');
      session = data;
      return this.get('store').find('user', data.uid);
    }).then((user) => {
      Ember.Logger.debug('User found in database.');
      return user;
    }).catch(() => {
      Ember.Logger.debug('Creating user in database.');
      return this.get('store').createRecord('user', {
        id: session.uid,
        name: session.currentUser.displayName,
        email: session.currentUser.email
      }).save();
    }).then((user) => {
      session.record = user;
      return session;
    });
  }
});
