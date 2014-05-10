angular.module('app').factory('mvIdentity',function () {
  return {
    currentUser: undefined,
    isAuthenticated: function() {
    	console.log('isAuthenticated');
      return !!this.currentUser;
    }
  }
});

