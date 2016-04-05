import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'paper-tabs',
  attributeBindings: ['selected'],

  initChildLinkViews: Ember.on('init', function(){
    this.set('childLinkViews', Ember.A());
  }),

  buildChildLinkViews: Ember.on('didRender', function(){
    Ember.run.schedule('afterRender', this, function(){
      // let childLinkSelector = this.get('linkSelector');
      let childLinkElements = this.$('>.ember-view');

      let childLinkViews = childLinkElements.toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', Ember.A(childLinkViews));

      console.log('childLinkViews', this.get('childLinkViews'));
    });
  }),

  selected: Ember.computed('childLinkViews.@each.active', function(){
    let activeLink = this.get('childLinkViews').findBy('active');
    return this.get('childLinkViews').indexOf(activeLink);
  }),
});
