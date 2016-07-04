import Ember from 'ember';

export default Ember.Route.extend({
  moment: Ember.inject.service(),

  beforeModel() {
    this.get('moment').changeLocale('nl');
    return this.get('session').fetch().catch(() => Ember.Logger.debug('No session found.'));
  },

  actions: {
    signIn(provider) {
      this.get('session').open('firebase', {
        provider,
        settings: {
          scope: 'email'
        }
      });
    },

    signOut() {
      this.get('session').close();
    }
  },

  setupController() {
    Ember.$(window).on('beforeunload', () => Ember.Logger.debug('App unloaded.'));
  }
});
