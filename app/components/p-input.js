import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: ['label', 'type'],
  tagName: "paper-input",

  // keyUp() {
  //   this.set('value', this.element.value);
  // }

  // change only fires with number inputs
  // change() {}
});
