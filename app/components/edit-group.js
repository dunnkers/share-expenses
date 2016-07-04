import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
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
        email,
        group: this.get('group')
      });
      invitation.save().then(() => this.get('group').save());

      let data = invitation.toJSON();
      data.group = {
        id: data.group,
        name: this.get('group.name')
      };

      // first save all, then delete if failed.

      Ember.$.post('http://localhost:3000/invite', data).done(() => {
        invitation.set('succeed', true);
        invitation.save();
      }).fail((err) => {
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
        invitation.deleteRecord();
        this.get('deletedInvs').addObject(invitation);
      });
    }
  },

  inviteDisabled: Ember.computed.empty('invitationEmail'),
  invalid: Ember.computed.bool('error'),

  deletedInvs: [],
  allInvitations: Ember.computed.uniq('deletedInvs', 'group.invitations'),
  invitationSorting: ['date:desc'],
  invitations: Ember.computed.sort('allInvitations', 'invitationSorting')
});
