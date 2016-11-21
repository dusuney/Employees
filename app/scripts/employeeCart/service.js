(function(ng) {
    'use strict';

    ng.module('employees.employeeCart')
        .service('employee', EmployeeService);

    EmployeeService.$inject = ['$routeParams'];

    function EmployeeService($routeParams) {
        this.$routeParams = $routeParams;
    }

    EmployeeService.prototype = {
        constructor: EmployeeService,
        getEmployee: function() {
            var self = this;
            var employees = ng.fromJson(localStorage.employees);

            var employeeCart = employees.find(function(employee) {
                return employee.id === self.$routeParams.employeeId;
            });

            return employeeCart;
        },
        getDefaultPhoto: function() {
            return ng.fromJson(localStorage.defaultPhoto);
        },
        changePhoto: function(id, photoFile) {
            var employees = ng.fromJson(localStorage.employees);
            for (var i = 0; employees.length > i; i++) {
                if (employees[i].id === id) {
                    employees[i].photoFile = photoFile;
                    console.log(employees[i]);
                }
            }
            localStorage.employees = ng.toJson(employees);

        }
    }

})(angular);
