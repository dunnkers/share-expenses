import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(() => Ember.Logger.debug('No session found.'));
  },

  actions: {
    signIn(provider) {
      this.get('session').open('firebase', {
        provider: provider,
        settings: {
          scope:'email'
        }
      });
    },

    signOut() {
      this.get('session').close();
    },

    navigate(route, ...models) {
      this.controller.transitionToRoute(route, ...models);
    }
  },

  setupController() {
    Ember.$(window).on('beforeunload', () => Ember.Logger.debug('App unloaded.'));
  }
});
