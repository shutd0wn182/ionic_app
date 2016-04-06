// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
var app = angular.module('vkMusic', ['ionic' , 'ngCordova'])

	.run(function($ionicPlatform, $cordovaSQLite) {
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

//			db = $cordovaSQLite.openDB("my.db");
//			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, name text, description text, status boolean)");
		});
	})

	.controller('vkMusicCtrl', function($scope, $ionicModal, $timeout, $ionicActionSheet){
		if(!angular.isUndefined(window.localStorage['tasks'])){
			$scope.tasks = JSON.parse(window.localStorage['tasks']);
		}
		else{
			$scope.tasks = [
				{name : 'DOWNLOAD', description : 'download on phone storage', status : true, icon: "glyphicon-save"},
				{name : 'PLAY', description : 'play from app', icon: "glyphicon-play"},
				{name : 'ADD', description : 'add to DB',   icon : "glyphicon-plus"},
				{name : 'DELETE', description : 'remove from DB', icon: "glyphicon-trash"}
			];
		}

		$ionicModal.fromTemplateUrl('views/list.html', function(modal){
			$scope.taskModal = modal;
			},
			{
				scope : $scope,
				animation : 'slide-in-up'
			}
		);

		$scope.currentTaskId = -1;

		$scope.addTask = function(){
			$scope.taskModal.show();

			$scope.currentTaskId = -1;

			$scope.activeTask = {
				name : '',
				description : '',
				status : false
			};
		};

		$scope.closeTask = function(){
			$scope.taskModal.hide();
		};

		$scope.openTask = function(id){
			var task = $scope.tasks[id];
			$scope.currentTaskId = id;

			$scope.activeTask = {
				name : task.name,
				description : task.description,
				status : task.status
			};

			$scope.taskModal.show();
		};

		$scope.saveTask = function(task){
			$scope.tasks[$scope.currentTaskId].name = task.name;
			$scope.tasks[$scope.currentTaskId].description = task.description;
			$scope.tasks[$scope.currentTaskId].status = task.status;

			$scope.saveToDB();
			$scope.taskModal.hide();
		};

		$scope.saveNewTask = function(task){
			$scope.tasks.push({
				name : task.name,
				description : task.description,
				status : task.status
			});

			$scope.saveToDB();
			$scope.taskModal.hide();
		};

		$scope.saveToDB = function(){
			$timeout(function(){
				window.localStorage['tasks'] = angular.toJson($scope.tasks);
			});
		};

		$scope.showSheet = function(index){
			$scope.indexForRemove = index;

			var hideSheet =  $ionicActionSheet.show({
				destructiveText: 'Delete',
				cancel: function(){},
				destructiveButtonClicked : function(){
					$scope.tasks.splice($scope.indexForRemove, 1);

					$scope.saveToDB();
					hideSheet();
				}
			});

			$timeout(function() {
				hideSheet();
			}, 3000);
		};

/*		$scope.initVKAPI = function () {
			var vkUri = "https://oauth.vk.com/authorize?client_id=5399607&scope=9999999&" +
				"redirect_uri=http://oauth.vk.com/blank.html&display=touch&response_type=token";

			VK.init(function() {

			}, function() {

			}, '5.50');
		};*/
	});
//
//app.config(function($stateProvider) {
//	$stateProvider
//		.state('index', {
//			url: '/',
//			templateUrl: 'index.html'
//		})
//		.state('add', {
//			url: '/add',
//			templateUrl: 'views/list.html'
//		});
//});