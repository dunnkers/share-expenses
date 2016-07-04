import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  avatar: DS.attr('string'),

  groups: DS.hasMany('group'),
  advances: DS.hasMany('deal'), /* advance payments this user made for others */
  participating: DS.hasMany('deal'),

  title: Ember.computed('name', 'email', function() {
    return this.get('name') ? this.get('name') : this.get('email');
  }),
});
