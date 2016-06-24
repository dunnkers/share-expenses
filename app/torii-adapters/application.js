import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  store: Ember.inject.service(),

  open(user) {
    return this._super(user).then((user) => {
      this.get('store').find('user', user.uid).then(() => {
        Ember.Logger.debug('User found in database.');
      }).catch(() => {
        Ember.Logger.debug('Creating user in database.');
        return this.get('store').createRecord('user', {
          id: user.uid,
          name: user.currentUser.displayName,
          email: user.currentUser.email
        }).save();
      });

      return user;
    });
  }
});
