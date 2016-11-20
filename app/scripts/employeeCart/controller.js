(function(ng) {
    'use strict';

    ng.module('employees.employeeCart')
        .controller('employeeCartCtrl', EmployeeCartCtrl);

    EmployeeCartCtrl.$inject = ['$scope', '$http', '$routeParams'];

    function EmployeeCartCtrl($scope, $http, $routeParams) {

        $scope.test = 'some text';
        //var self = this;

        $http.get('http://localhost:9000/data/data.json').then(function(response) {
            $scope.photos = response.data.photos[0];

            $scope.employeeCart = response.data.employees.find(function(employee) {

              return employee.id === $routeParams.employeeId;
            });
        });

    }

})(angular);
