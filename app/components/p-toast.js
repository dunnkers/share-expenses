import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'paper-toast',
  attributeBindings: ['opened', 'duration', 'text']
});
