/**
 * Created by Hamid Ali on 5/22/2016.
 */
var jwtApp = angular.module('jwtApp',[])
    //.constant('api','http://localhost:3000/')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor')
    })
    .controller('signInCtrl',['$scope','$http','fakeData','tokenGetSet', function ($scope, $http, fakeData, tokenGetSet) {
        $scope.fakeassGuy = {};
        $scope.token = sessionStorage.token;
        $scope.signIn = function (user) {
            if(!user.username || !user.password){
                return;
            }else{
                $http.post('/signin',user)
                    .then(function (token) {
                        if(token.data){
                            tokenGetSet.setToken(token.data)
                            alert(token.data);
                        }
                    }, function (userErr) {
                        console.log(userErr);
                    })
            }
        };
        $scope.fakeUsers = function(){
            fakeData.getFakeUser(function (fuser) {
                $scope.fakeassGuy = fuser;
            }, function (err) {
                errHandler(err)
            })
        }
        function errHandler(err){
            alert("error "+JSON.stringify(err));
            console.log(err);
        }}
    ]);