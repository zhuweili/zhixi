app.controller("index_controller",
    ["$scope", "$http",function ($scope, $http) {
        console.log("this is index");

        $scope.recent_list = [];
        $scope.hot_list = [];
        $scope.content_to_post = null;
        $scope.id_to_get = null;
        $scope.list_got = null;


        $scope.get_recent_list = function() {

            $http.get("api/v1/get_recent_list").success(function (response) {
                $scope.recent_list = response;
                console.log($scope.recent_list);
            });

        };

        $scope.get_hot_list = function() {

            $http.get("api/v1/get_hot_list").success(function (response) {
                $scope.hot_list = response;
                console.log($scope.hot_list);
            });

        };

        $scope.get_recent_list();
        $scope.get_hot_list();



        $scope.post_list = function() {
            var input = {
                content: $scope.content_to_post
            };
            // console.log(input);
            $http.post("/api/v1/post_list", input)
                .success(function (data) {
                    console.log(data);
                    $scope.content_to_post = null;
                    $scope.get_recent_list();
                    $scope.get_hot_list();

                });
        };

        $scope.get_list = function() {

            $http.get("api/v1/get_list/" + $scope.id_to_get.toString()).success(function (response) {
                $scope.list_got = response;
                $scope.id_to_get = null;
                $scope.get_recent_list();
                $scope.get_hot_list();
            });

        };








        $scope.referesh = function() {
            $scope.get_list($scope.current_page)
        };








        $scope.post_unpublic = function() {
            var input = {
                text: $scope.unpublic_to_post,
                page_id: $scope.current_page.id,
                token: $scope.current_page.access_token
            };
            // console.log(input);
            $http.post("/api/v1/post_unpublic", input)
                .success(function (data) {
                    console.log(data);
                    $scope.get_list($scope.current_page);
                    $scope.unpublic_to_post = null
                });
        };


        $scope.post_schedule = function() {
            var input = {
                text: $scope.scheduld_to_post,
                time_to_post: (new Date($scope.time_to_post)) / 1000,
                page_id: $scope.current_page.id,
                token: $scope.current_page.access_token
            };
            console.log(input);
            $http.post("/api/v1/post_schedule", input)
                .success(function (data) {
                    console.log(data);
                    $scope.get_list($scope.current_page);
                    $scope.scheduld_to_post = null;
                    $scope.time_to_post = null;
                });
        }














    }]);
