/**
 * Created by Hamid Ali on 5/22/2016.
 */
jwtApp.factory('authInterceptor', function ($q, tokenGetSet) {
    return {
        request: function (config) {
            var token = tokenGetSet.getToken();
            if(token){
                config.headers = config.headers || {};
                config.headers.Authorization = ''+ token;
            }
            return config;
        }
    }
})