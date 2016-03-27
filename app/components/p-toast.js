import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'paper-toast',
  attributeBindings: ['opened', 'duration', 'text'],
  // opened: '',

  doOpen: Ember.observer('opened', function() {
    console.log('open now!');
    // Ember.$(this).show();
  }),
});
