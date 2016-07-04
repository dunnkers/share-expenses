import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    let group = this.get('session.record.groups.firstObject');
    if (group) {
      this.transitionTo('group', group);
    }
  }
});
