/**
 * Created by Hamid Ali on 5/22/2016.
 */
jwtApp.
    factory('tokenGetSet', function () {
    return{
        getToken: function () {
            if(sessionStorage.token){
                return sessionStorage.token
            }
        },
        setToken: function (token) {
            sessionStorage.token = token
        }
    }
})