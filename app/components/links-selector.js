import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['selected', 'selectable', 'selectedClass'],

  // create empty array on component intialization
  initChildLinkViews: Ember.on('init', function() {
    this.set('childLinkViews', Ember.A());
  }),

  buildChildLinkViews: Ember.on('didRender', function() {
    // when rendered, add all `selectable` children to array
    Ember.run.schedule('afterRender', this, function() {
      // query `selectable` elements, or else direct children
      let prfx = this.get('selectable') || '>';
      // select link elements with jquery, and map this to the Ember View object
      let childLinkViews = this.$(`${prfx}.ember-view`).toArray().map((view) =>
        this._viewRegistry[view.id]
      );

      // convert the jquery object to an actual array
      this.set('childLinkViews', Ember.A(childLinkViews));
    });
  }),

  // the index of the selected link
  selected: Ember.computed('childLinkViews.@each.active', function() {
    // find the active link of the child views and return its index.
    let views = this.get('childLinkViews');
    return views.indexOf(views.findBy('active'));
  })
});
