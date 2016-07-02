import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  failed: DS.attr('boolean'),
  succeed: DS.attr('boolean'),
  failure: DS.attr('string'),

  group: DS.belongsTo('group'),

  loading: Ember.computed.or('succeed', 'failed', 'isLoading'),

  date: DS.attr('date', {
    defaultValue() { return new Date(); }
  })
});
