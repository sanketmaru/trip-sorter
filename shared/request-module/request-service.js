angular.module('Request', [])
  .service('RequestService', ['$http', '$q', function($http, $q){

    // get call
    this.get = function(url) {

      var deferred = $q.defer();
      $http.get(url)
        .then(function(response){
          deferred.resolve(response);
        }).catch(function(error){
          deferred.resolve(error);
        });
      return deferred.promise;
    };

    //post call
    this.post = function() {

    };


  }]);
