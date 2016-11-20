(function(ng) {
    'use strict';

    ng.module('employees.departments')
        .controller('departmentsCtrl', DepartmentsCtrl);

    DepartmentsCtrl.$inject = ['$scope'];

    function DepartmentsCtrl($scope) {

      $scope.test = 'some text';
    }

})(angular);
