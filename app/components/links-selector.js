import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['selected', 'selectable', 'selectedClass'],

  initChildLinkViews: Ember.on('init', function() {
    this.set('childLinkViews', Ember.A());
  }),

  buildChildLinkViews: Ember.on('didRender', function() {
    Ember.run.schedule('afterRender', this, function() {
      let prfx = this.get('selectable') || '>';
      let childLinkViews = this.$(prfx + '.ember-view').toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', Ember.A(childLinkViews));
    });
  }),

  selected: Ember.computed('childLinkViews.@each.active', function() {
    let activeLink = this.get('childLinkViews').findBy('active');
    return this.get('childLinkViews').indexOf(activeLink);
  }),
});
