import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),

  users: DS.hasMany('user'),
  deals: DS.hasMany('deal'),
  tasks: DS.hasMany('task'),
  invitations: DS.hasMany('invitation')
});
