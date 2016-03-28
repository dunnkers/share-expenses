import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch()
      .then(() => console.log('Successfully fetched session!'))
      .catch((err) => Ember.logger.error('Fetching user model failed.', err));
  },

  actions: {
    signIn(provider) {
      this.get('session').open('firebase', {
        provider: provider
      }).then((data) => console.log('Successfully logged in!', data));
    },

    signOut() {
      this.get('session').close();
    },

    navigate(route) {
      this.transitionTo(route);
    }
  },

  setupController() {
    Ember.$(window).on('beforeunload', () => console.log('App unloaded.'));
  }
});
