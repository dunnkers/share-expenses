import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      let deal = this.store.createRecord('deal', {
        description: this.get('description'),
        amount: this.get('amount'),
        cost: this.get('cost'),
        owner: this.get('session.uid')
      });

      deal.save().then(() => this.send('back'));
    }
  }
});
