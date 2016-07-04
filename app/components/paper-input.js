import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['label', 'type', 'error-message', 'invalid',
    'auto-validate', 'required'],
  tagName: 'paper-input'
});
