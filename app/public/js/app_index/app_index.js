var app = angular.module('indexApp', ['ngRoute', 'ngResource']);
app.config(function ($routeProvider) {
    // $routeProvider
    //     .when("/", {
    //         templateUrl: "../../views/login.html",
    //         controller: "index_controller"
    //     })
    // ;
    // console.log($cookiesProvider);
    // $cookiesProvider.defaults.path = '/';
    // // $cookiesProvider.defaults.secure = true;
    // // $cookiesProvider.defaults.expires = exp_date;
    // console.log(location.host);
    // $cookiesProvider.defaults.domain = location.hostname;






});

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));