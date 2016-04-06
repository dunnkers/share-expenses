import Ember from 'ember';

export default Ember.Component.extend({
  hover: false,
  classNames: ['task-component', 'layout', 'horizontal'],

  mouseEnter() { this.set('hover', true); },

  mouseLeave() { this.set('hover', false); },

  actions: {
    delete() {
      this.get('deleted')(this.get('task'));
    }
  },

  toggle: Ember.observer('task.completed', function() {
    this.get('task').save();
  })
});
