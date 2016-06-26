import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    save() {
      this.get('group').save();
    },

    invite() {
      if (this.get('inviteDisabled')) {
        return;
      }

      // Validation
      let email = this.get('invitationEmail');
      if (this.get('group').get('users').getEach('email').contains(email)) {
        this.set('error', 'Er zit al iemand in deze groep met deze email!');
        return;
      }
      if (this.get('group').get('invitations').getEach('email').contains(email)) {
        this.set('error', 'Je hebt deze persoon al uitgenodigd dude!');
        return;
      }

      this.set('error', '');
      this.set('invitationEmail', '');
      // TODO check all pending users for this group, to see whether we can
      // even invite this user.
      let invitation = this.get('store').createRecord('invitation', {
        email: email,
        group: this.get('group'),
        date: new Date()
      });
      invitation.save();
      this.get('group').save();

      let data = invitation.toJSON();
      data.group = {
        id: data.group,
        name: this.get('group.name')
      };

      Ember.$.post('http://localhost:3000/invite', data).done(() => {
        invitation.set('succeed', true);
        invitation.save();
      }).fail((err) => {
        invitation.set('failed', true);
        switch (err.responseText) {
          case 'No email':
            invitation.set('failure', 'leeg email adres');
            break;
          case 'No group':
            invitation.set('failure', 'ongeldige groep');
            break;
          case 'Email failure':
            invitation.set('failure', 'foutje tijdens het mailen');
            break;
          case 'Invalid email':
            invitation.set('failure', 'ongeldig email adres');
            break;
          default:
            invitation.set('failure', 'onbekende fout');
        }
        invitation.save();
      });
    }
  },

  inviteDisabled: Ember.computed('invitationEmail', function() {
    return !this.get('invitationEmail') || !this.get('invitationEmail').trim();
  }),

  invitationSorting: ['date'],
  invitations: Ember.computed.sort('group.invitations', 'invitationSorting'),
});
