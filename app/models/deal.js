import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),

  participants: DS.hasMany('user'),
  group: DS.belongsTo('group'),
  payments: DS.hasMany('payment'),

  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  })
});
