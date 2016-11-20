(function(ng) {
    'use strict';

    ng.module('employees.employeeCart')
        .service('employee', EmployeeService);

    EmployeeService.$inject = ['$http', '$routeParams'];

    function EmployeeService($http, $routeParams) {
        this.$http = $http;
        this.$routeParams = $routeParams;
    }

    EmployeeService.prototype = {
        constructor: EmployeeService,
        getEmployee: function() {
            var self = this;
            return this.$http.get('http://localhost:9000/data/data.json').then(function(response) {
                //response.data.photos[0];

                var employeeCart = response.data.employees.find(function(employee) {

                    return employee.id === self.$routeParams.employeeId;
                });
                return employeeCart;
            });
        },
        getDefaultPhoto: function() {
            var self = this;
            return this.$http.get('http://localhost:9000/data/data.json').then(function(response) {
                return response.data.photos[0];
            });
        },
        changePhoto: function() {
            var model = {
                name: 'test',
                email: 'test'
            };

            localStorage.userService = angular.toJson(model);
            console.log('set');
        },
        getPhoto:function(){

          var model = ng.fromJson(localStorage.userService);
          console.log(model);
        }
    }

})(angular);
