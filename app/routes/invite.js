import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    let data = {
      uid: this.get('session.uid'),
      token: transition.queryParams.token
    };

    Ember.$.post('http://localhost:3000/verify', data)
      .done(() => this.controllerFor('invite').set('succeed', true))
      .fail((err) => {
        let msg = 'iets';
        switch (err.responseText) {
          case 'Token error':
            msg = 'een intern foutje, probeer opnieuw deel te nemen';
            break;
          case 'Token expired':
            msg = 'een verlopen uitnodiging! Probeer opnieuw deel te nemen';
            break;
          default:
            msg = 'een foutje in de uitnodiging';
        }

        this.controllerFor('invite').set('failure', msg);
      });
  }
});
