import DS from 'ember-data';

export default DS.Model.extend({
  cost: DS.attr('number'),
  group: DS.belongsTo('group'),
  by: DS.belongsTo('user')
});
