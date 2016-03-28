import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    return this.get('session').fetch().catch(function() {
      console.log('We caught the session before the model!');
    });
  },

  actions: {
    signIn: function (provider) {
      this.get('session').open('firebase', {
        provider: provider
      }).then((data) => {
        // let user = this.store.createRecord('user', {
        //   id: data.uid,
        //   name: data.currentUser.displayName
        // });
        // user.save().then((res) => console.log('res!',res));
        // console.log(user);
        console.log('some data from app route',data);
        console.log('more data from app route',data.currentUser);
      });
    },

    signOut: function () {
      this.get('session').close();
    },

    navigate(route) {
      this.transitionTo(route);
    }
  },

  setupController: function () {
    Ember.$(window).on('beforeunload', () => {
      console.log('application ended!');
    });
  }
});
