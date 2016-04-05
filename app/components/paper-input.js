import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['label', 'type'],
  tagName: "paper-input"
});
