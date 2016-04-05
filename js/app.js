// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('vkMusic', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('vkMusicCtrl', function($scope, $ionicModal){
  $scope.tasks = [
    {name : 'DOWNLOAD', description : 'download on phone storage', status : true, icon: "glyphicon-save"},
    {name : 'PLAY', description : 'play from app', icon: "glyphicon-play"},
    {name : 'ADD', description : 'add to DB',   icon : "glyphicon-plus"},
    {name : 'DELETE', description : 'remove from DB', icon: "glyphicon-trash"}
  ];

  $scope.initVKAPI = function () {
    VK.init(function() {

    }, function() {

    }, '5.50');
  };

  $scope.initVKAPI();

});
