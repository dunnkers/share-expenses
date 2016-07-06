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
        invitation.set('failure', this.getFailureText(err.responseText));
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
  invitations: Ember.computed.sort('allInvitations', 'invitationSorting'),

  getFailureText(responseText) {
    switch (responseText) {
      case 'No email':
        return 'leeg email adres';
      case 'No group':
        return 'ongeldige groep';
      case 'Email failure':
        return 'foutje tijdens het mailen';
      case 'Invalid email':
        return 'ongeldig email adres';
      default:
        return 'onbekende fout';
    }
  }
});
