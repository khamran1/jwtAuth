/**
 * Created by Hamid Ali on 5/22/2016.
 */
jwtApp.factory('fakeData', function ($http) {
    return{
        getFakeUser:function (success, failure){
            $http.get('/users')
                .success(function(fakeUser){
                    success(fakeUser)
                })
                .error(function(err){
                    failure(err)
                })
        }
    }

})