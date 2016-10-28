angular.module('TripSorter')
  .controller('TripSorterCtrl', ['$scope', 'RequestService', function ($scope, RequestService) {


    var init = init;
    var initCities = initCities;

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
          $scope.arrivals = _.uniq(_.pluck(deals, 'arrival'));
          $scope.departures = _.uniq(_.pluck(deals, 'departure'));

        }).catch(function(error){
          alert(error); // toaster can be used
        });
    };

    function initCities(){
      $scope.depCity = 'Departure City';
      $scope.arrCity = 'Arrival City';
    };

    initCities();
    init();

    $scope.routeChanged = function() {
      console.log('current route is ', $scope.selectedRoute);
      console.log('dep ', $scope.depCity);
      console.log('arr ', $scope.arrCity);
    };

    $scope.changeDepartureCity = function(city) {
      $scope.depCity = city;
    };

    $scope.changeArrivalCity = function(city) {
      $scope.arrCity = city;
    };

    $scope.reset = function() {
      initCities();
    };



  }]);
