import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    return this.get("session").fetch().catch(function() {
      console.log('We caught the session before the model!');
    });
  },

  actions: {
    signIn: function (provider) {
      this.get("session").open("firebase", {
        provider: provider
      }).then(function(data) {
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
