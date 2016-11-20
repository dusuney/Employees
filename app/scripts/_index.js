(function(ng) {
    ng.module('employees', [
        'ngRoute',
        'employees.employeeCart',
        'employees.departmentsList',
        'employees.employeesList'
    ]);

})(angular);
