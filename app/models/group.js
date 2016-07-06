import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  users: DS.hasMany('user'),
  deals: DS.hasMany('deal'),
  payments: DS.hasMany('payment'),
  invitations: DS.hasMany('invitation')
});
