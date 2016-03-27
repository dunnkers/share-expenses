import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    return this.get("session").fetch().catch(function() {
      console.log('We caught the session before the model!');
    });
  },

  model() {
    let uid = this.get('session.uid');

    if (!uid) { return null; }

    return this.store.find('user', uid).then((user) => user, () => {
      Ember.Logger.error('Failed to fetch user from database!');
      return null;
    });
  },
  user: Ember.computed.alias('model'),

  actions: {
    signIn: function (provider) {
      this.get("session").open("firebase", {
        provider: provider
      }).then((data) => {
        let user = this.store.createRecord('user', {
          id: data.uid,
          name: data.currentUser.displayName
        });
        user.save().then((res) => console.log('res!',res));
        console.log(user);
        console.log(data);
        console.log(data.currentUser);
      });
    },

    signOut: function () {
      this.get("session").close();
    },

    navigate(route) {
      this.transitionTo(route);
    }
  },

  setupController: function () {
    Ember.$(window).on('beforeunload', () => {
      this.endApplication();
    });
  },

  endApplication: function () {
    console.log('application ended!');
  }
});
