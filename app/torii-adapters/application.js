import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

/*
 * Dunnkers &copy; 2016
 *
 * Code was obtained partly from StackExchange question #32023653;
 *  `emberfire-authentication-and-toriifirebaseadapter`
 */

export default ToriiFirebaseAdapter.extend({
  firebase: Ember.inject.service(),
  store: Ember.inject.service(),

  /**
   * Executed after Firebase authentication.
   *
   * Find or create the user based on the Firebase `authData`
   *
   * @param  {Object} authData
   * @return {Promise<Object>} Updated session info
   */
  open(authData) {
    return this._findOrCreateUser(authData).then((user) => user);
  },

  /**
   * Fetch an existing Firebase auth session and place into `session.currentUser`
   *
   * @return {Promise<Object>} Updated session info
   */
  fetch() {
    let authData = this.get('firebase').getAuth();

    if (!authData) {
      return Ember.RSVP.Promise.reject(new Error('No Firebase session found'));
    }

    return this._findOrCreateUser(authData).then((user) => user);
  },

  /**
   * Find the user with the given `authData`, create if not found
   *
   * @param  {Object} authData
   * @return {Promise<Object>} The user
   */
  _findOrCreateUser(authData) {
    let store = this.get('store');
    let data = authData[authData.provider];

    return store.find('user', authData.uid)
      .then((user) => this.returnUser(user, data))
      .catch(() => {
        let newUser = store.createRecord('user', {
          id: authData.uid,
          name: data.displayName
        });

        return newUser.save().then((user) => this.returnUser(user, data));
      });
  },

  returnUser(currentUser, data) {
    return {
      currentUser,
      profileImageURL: data.profileImageURL
    };
  }
});
