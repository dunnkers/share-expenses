import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      this.get('group.deals').pushObject(this.get('deal'));
      this.get('group').save().then(() => this.get('deal').save());
      history.back();
    }
  }
});
