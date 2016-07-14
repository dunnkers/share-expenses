import DS from 'ember-data';

export default DS.Model.extend({
  cost: DS.attr('number'),
  by: DS.belongsTo('user'),
  deal: DS.belongsTo('deal')
});
