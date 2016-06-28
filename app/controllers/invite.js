import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['group', 'token'],
  done: Ember.computed.or('succeed', 'failure')
});
