angular.module('TripSorter')
  .controller('TripSorterCtrl', ['$scope', 'RequestService', function ($scope, RequestService) {


    var init = init;
    var initCities = initCities;
    var ctrl = this;
    $scope.routesType = {
      'all' : 'all',
      'cheapest' : 'cheapest',
      'fastest' : 'fastest' 
    };

    $scope.selectedRoute = $scope.routesType.cheapest;  

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

    $scope.search = function() {
      
      $scope.currentDeals = getCurrentDeals();
      
    };

    function init() {
      RequestService.get('response.json')
        .then(function(response){

          ctrl.deals = response.data.deals;
          $scope.arrivals = _.uniq(_.pluck(ctrl.deals, 'arrival'));
          $scope.departures = _.uniq(_.pluck(ctrl.deals, 'departure'));

        }).catch(function(error){
          alert(error); // toaster can be used
        });
    };

    function initCities(){
      $scope.depCity = 'Departure City';
      $scope.arrCity = 'Arrival City';
    };

    function getCurrentDeals() {
      
      var deals = [];

      if(!$scope.depCity) {
        alert('Please select departure city'); //TODO toaster can be used to make look better
        return;
      }

      if(!$scope.arrCity) {
        alert('Please select arrival city'); //TODO toaster can be used to make look better
        return;
      }

      var currentDeals = ctrl.deals.filter(function(deal){
        return deal.departure === $scope.depCity && deal.arrival === $scope.arrCity ; 
      });

      if(!currentDeals.length) {
        return;
      }

      if($scope.selectedRoute === $scope.routesType.cheapest) {
        var cheapestDeal = currentDeals[0];
        var initialFare = cheapestDeal.cost - cheapestDeal.discount;
        currentDeals.forEach(function(currentDeal){
          var fare = currentDeal.cost - currentDeal.discount;
          if(fare <  initialFare) {
            cheapestDeal = currentDeal;
          }
        });
        deals.push(cheapestDeal);
      }


      if($scope.selectedRoute === $scope.routesType.fastest) {
        var fastestDeal = currentDeals[0]; 
        var initialDurationInMin = ( fastestDeal.duration.h * 60 ) + (fastestDeal.duration.m);
        currentDeals.forEach(function(currentDeal){
          var durationInMin = ( currentDeal.duration.h * 60 ) + (currentDeal.duration.m);
          if(durationInMin <  initialDurationInMin) {
            fastestDeal = currentDeal;
          }
        });
        deals.push(fastestDeal);
      }

      deals = currentDeals;

      return deals;
    }


  }]);
