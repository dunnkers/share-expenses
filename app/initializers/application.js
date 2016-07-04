import Ember from 'ember';

export default {
  name: 'webcomponents-polyfill-support',
  initialize() {
    Ember.Component.reopen({
      classNameBindings: ['shadowDOM:x-scope', 'elementName'],

      /* Indicates whether ShadowDOM was polyfilled.
      * The used global is defined by webcomponents in:
      * webcomponentsjs/src/WebComponents/build/boot.js#L55 */
      shadowDOM: Ember.computed(function() {
        return window.WebComponents.flags.shadow;
      }),

      elementName: Ember.computed(function() {
        if (this.get('shadowDOM')) {
          let tagName = this.get('tagName');
          return `${tagName} -0`;
        }
      })
    });

    Ember.LinkComponent.reopen({
      classNameBindings: ['active:iron-selected'],
      attributeBindings: ['icon']
    });
  }
};
