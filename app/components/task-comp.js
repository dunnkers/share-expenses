import Ember from 'ember';

export default Ember.Component.extend({
  hover: false,

  mouseEnter() {
    this.set('hover', true);
  },

  mouseLeave() {
    this.set('hover', false);
  },

  actions: {
    delete() {
      this.get('task').deleteRecord();
      if (this.get('task.isDeleted')) {
        this.get('deleted')(this.get('task'));
      }
    }
  }
});
