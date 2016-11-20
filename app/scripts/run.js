(function(ng) {
    'use strict';

    ng.module('employees')
        .run(['$http', function($http) {
            if (canRequest()) {
                $http.get('data/data.json').then(function(response) {
                  console.log('make request');
                    var departments = response.data.departments;
                    var defaultPhoto = response.data.photos[0];
                    var employees = response.data.employees;

                    localStorage.departments = ng.toJson(departments);

                    localStorage.defaultPhoto = ng.toJson(defaultPhoto);

                    localStorage.employees = ng.toJson(employees);

                });
            }

            function canRequest() {
                return !localStorage.departments || !localStorage.defaultPhoto || !localStorage.employees;
            }

        }]);

})(angular);
