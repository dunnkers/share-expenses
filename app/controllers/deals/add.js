import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      // var owner = this.store.createRecord('owner', {
      //   id: this.get('session.uid')
      // });
      var newDeal = this.store.createRecord('deal', {
        description: this.get('description'),
        amount: this.get('amount'),
        cost: this.get('cost'),
        owner: this.get('session.currentUser.id')
      });

      newDeal.save().then(() => this.send('back'));
    }
  }
});
