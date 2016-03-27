import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  amount: DS.attr('number'),
  cost: DS.attr('number'),
  // currency: DS.belongsTo('number')

  owner: DS.belongsTo('user'),
  participants: DS.hasMany('user'),
  group: DS.belongsTo('group')
});
