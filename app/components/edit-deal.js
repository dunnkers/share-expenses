import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      // add deal to group if group is present
      if (this.get('group')) {
        this.get('group.deals').pushObject(this.get('deal'));
        this.get('deal').save().then(() => this.get('group').save());
      } else {
        this.get('deal').save();
      }
      history.back();
    }
  }
});
