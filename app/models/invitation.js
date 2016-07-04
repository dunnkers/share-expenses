import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  succeed: DS.attr('boolean'),
  failure: DS.attr('string'),

  group: DS.belongsTo('group'),

  failed: Ember.computed.bool('failure'),
  processing: Ember.computed.or('succeed', 'failed', 'isLoading'),
  loading: Ember.computed('processing', function() {
    // 1 minute time out
    if (!this.get('processing') && new Date() - this.get('date') > 60 * 1000) {
      this.set('failed', true);
      this.set('failure', 'timeout');console.log('JUST SET TIMEOUT OF INVITATIONs');
    }

    return this.get('processing');
  }),

  date: DS.attr('date', {
    defaultValue() { return new Date(); }
  })
});
