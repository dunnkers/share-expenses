import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('groups', function() {
    this.route('add');
  });

  this.route('group', { path: '/:group_id'}, function() {
    this.route('edit');
    this.route('deals', function() {
      this.route('add');
      this.route('deal', { path: '/:deal_id' });
    });
    this.route('tasks');
  });

  this.route('invite');
});

export default Router;
