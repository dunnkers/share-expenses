import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),

  groups: DS.hasMany('group'),
  advances: DS.hasMany('deal'), /* advance payments this user made for others */
  participating: DS.hasMany('deal'),
  tasks: DS.hasMany('task')
});
