import Ember from 'ember';

export default Ember.Checkbox.extend({
  tagName: 'paper-checkbox',

  toggle: Ember.observer('checked', function() {
    this.get('task').save();
  })
});
