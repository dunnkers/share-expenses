import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    if (!transition.queryParams.token) {
      let str = 'No token';
      this.controllerFor('invite').set('failure', this.getFailureText(str));
    }

    let data = {
      uid: this.get('session.uid'),
      token: transition.queryParams.token
    };

    Ember.$.post('http://localhost:3000/verify', data)
      .done(() => this.controllerFor('invite').set('succeed', true))
      .fail((err) => {
        let str = err.responseText;
        this.controllerFor('invite').set('failure', this.getFailureText(str));
      });
  },

  getFailureText(responseText) {
    switch (responseText) {
      case 'Token expired':
        return 'Deze uitnodiging is inmiddels verlopen.';
      case 'Group not in database':
        return 'Deze groep bestaat inmiddels niet meer.';
      case 'Database failure':
        return 'Er ging iets goed mis bij ons intern.';
      case 'No token':
      case 'Token error':
        return 'Er was iets mis met de uitnodiging.';
      default:
        return 'Er ging ergens iets mis.';
    }
  }
});
