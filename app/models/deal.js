import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  amount: DS.attr('number'),
  cost: DS.attr('number'),
  // currency: DS.belongsTo('number')

  owner: DS.belongsTo('user', { inverse: 'advances' }),
  participants: DS.hasMany('user', { inverse: 'participating' }),
  group: DS.belongsTo('group'),
  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  })
});
