import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  groups: DS.hasMany('group'),
  deals: DS.hasMany('deal')
});
