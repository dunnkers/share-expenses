import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit() {
      this.set('deal.editing', true);
    },

    cancel() {
      this.get('deal').rollbackAttributes();
      this.set('deal.editing', false);
    },

    save() {
      this.set('deal.editing', false);
      let isNew = this.get('deal.isNew');
      this.get('deal').save().then((deal) => {
        if (isNew) {
          deal.get('group.content').save();
        }
      });
    },

    delete() {
      this.get('deal').destroyRecord();
    }
  },

  isUpdated: Ember.computed.equal('deal.dirtyType', 'updated')
});
