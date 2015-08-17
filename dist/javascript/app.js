angular.module('Site', ['ngResource', 'ngRoute', 'ngAnimate'])
.config([
  '$locationProvider',
  '$routeProvider',
  function($locationProvider, $routeProvider) {

    $routeProvider.when('/', {
      templateUrl: '/javascript/home/homeTemplate.html',
      controller: 'HomeController'
    })
    .when('/resume', {
      templateUrl: '/javascript/resume/resumeTemplate.html',
      controller: 'ResumeController'
    })

    // todo - add section for random stuff, like js art
    .when('/etc', {
      templateUrl: '/javascript/etc/etcTemplate.html',
      controller: 'etcController'
    })
    .when('/music', {
      templateUrl: '/javascript/music/musicTemplate.html'
    })
    .otherwise({
      template: '<div>nothing to report</div>'
    });

    $locationProvider.html5Mode(true);
  }
])
.run([
  '$location',
  '$rootScope',
  function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, route, previous) {
      $rootScope.location = $location.path();

    });
  }
]);
