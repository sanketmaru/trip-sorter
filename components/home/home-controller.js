angular.module('TripSorter')
  .controller('TripSorterCtrl', ['$scope', 'RequestService', function ($scope, RequestService) {


    var init = init;


    $scope.routesType = {
      'all' : 'all',
      'cheapest' : 'cheapest',
      'fastest' : 'fastest' 
    };

    $scope.selectedRoute = $scope.routesType.cheapest; 

    function init() {
      RequestService.get('response.json')
        .then(function(response){

          var deals = response.data.deals;



        }).catch(function(error){
          alert(error); // toaster can be used
        });
    };

    init();

    $scope.routeChanged = function() {
      console.log('current route is ', $scope.selectedRoute);
    };




  }]);
