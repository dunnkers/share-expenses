import Ember from 'ember';

const paperListboxComponent = Ember.Component.extend({
  tagName: 'paper-listbox',
  attributeBindings: [ 'role' ],
  classNames: [ 'dropdown-content' ],
  role: 'listbox',

  didRender() {
    let component = this;

    // initially select predefined item
    this.$().on('iron-items-changed', function() {
      let selected = component.get('selected');
      let selectedIndex = component.get('items').indexOf(selected);
      this.selectIndex(selectedIndex);
    });

    // update selected variable upon a selection
    this.$().on('iron-select', function() {
      let selected = component.get('items').objectAt(this.selected);
      component.set('selected', selected);
    });
  }
});

paperListboxComponent.reopenClass({
  positionalParams: [ 'items' ]
});

export default paperListboxComponent;
