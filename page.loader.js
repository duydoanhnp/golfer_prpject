'use strict';

angular.module('mainModule').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        // $routeProvider.when('/eventViewer', {
        //     templateUrl : 'AngularViews/eventsViewer.html',
        //     controller: 'eventController'
        // }).when('/login', {
        //     templateUrl : 'AngularViews/loginViewer.html',
        //     controller: 'userController'
        // }).when('/scoreUpdater', {
        //     templateUrl : 'AngularViews/eventEditorView.html',
        //     controller: 'eventController'
        // }).when('/newEvent', {
        //     templateUrl : 'AngularViews/newEventViewer.html',
        //     controller: 'eventController'
        // }).when('/dashboard', {
        //     templateUrl : 'AngularViews/dashboardView.html',
        //     controller: 'eventController'
        // }).when('/exploreEvent', {
        //     templateUrl : 'AngularViews/exploreEventView.html',
        //     controller: 'eventController'
        // }).when('/liveEvents', {
        //     templateUrl : 'AngularViews/liveEventsView.html',
        //     controller: 'eventController'
        // }).when('/recentEvents', {
        //     templateUrl : 'AngularViews/recentEventView.html',
        //     controller: 'eventController'
        // }).when('/myEvents', {
        //     templateUrl : 'AngularViews/myEventsView.html',
        //     controller: 'eventController'
        // }).when('/help', {
        //     templateUrl : 'AngularViews/helpView.html',
        //     controller: 'eventController'
        // }).otherwise({
        //     templateUrl : 'AngularViews/eventsViewer.html',
        //     controller: 'eventController'
        // });
        $locationProvider.html5Mode(true);
}]);