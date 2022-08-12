'use strict';

angular.module('mainModule').controller('scoreController', ['$scope', '$http', 'socket', '$location','$timeout',
    function ($scope, $http, socket, $location,$timeout) {

        $scope.usernameText = '';
        $scope.passwordText = '';
        $scope.username = '';
        $scope.password = '';

        $scope.error = '';
        $scope.nameSearchingText = '';
        $scope.nameSearching = '';

        $scope.holeIds = Array(18).fill(0);
        $scope.holeNames = Array(18).fill(0);
        $scope.holePars = Array(18).fill(0);
        $scope.scoreOptions = [...Array(31).keys()];

        $scope.editingId = null;
        $scope.golfer = null;
        $scope.scores = Array(18).fill(0);


        $scope.group = 0;
        $scope.groupOptions = [...Array(40).keys()].map(v=>v+1);

        $scope.login = () => {
            $scope.username = '';
            $scope.password = '';
        }

        $scope.login = () => {
            $http({
                method: 'POST',
                url: '/score/login',
                data: {
                    'username': $scope.usernameText,
                    'password': $scope.passwordText
                }
            }).then(function successCallback(response) {
                if(response.data.status === 'OK'){
                    $scope.username = $scope.usernameText;
                    $scope.password = $scope.passwordText;
                }else{
                    $scope.error = 'Sai tài khoản hoặc mật khẩu. Xin vui lòng thử lại';
                }
            }, function errorCallback(response) {
                $scope.error = response.statusText;
            })
        }

        $scope.search = () => $scope.nameSearching = $scope.removeAccents($scope.nameSearchingText.toLowerCase());

        $scope.matchSearching = (name) => $scope.removeAccents(name.toLowerCase()).indexOf($scope.nameSearching) >= 0;

        $scope.edit = (editingId) => {
            $scope.editingId = editingId;
            $scope.refreshGolfer();
        };

        $scope.doneEdit = () => {
            $scope.editingId = null;
            $scope.refreshGolfers();
        };

        $scope.refreshGolfers = () => $http({
            method: 'GET',
            url: '/score/board'
        }).then(function successCallback(response) {
            $scope.golfers = response.data.data;
            $scope.golfers.forEach(golfer => golfer.thru = golfer.Holes.length === 18 ? 'F' : golfer.Holes.length)
        }, function errorCallback(response) {
            $scope.error = response.statusText;
        });

        $scope.refreshGolfer = () => $http({
            method: 'GET',
            url: `/score/player/${$scope.editingId}`
        }).then(function successCallback(response) {
            $scope.golfer = response.data.data;
            $scope.group = $scope.golfer.group_id;
            $scope.scores = Array(18).fill(0);
            $scope.golfer.Holes.forEach(hole => {
                $scope.scores[hole.holeIndex - 1] = hole.player_hole.score;
            });
            console.log($scope.scores);
        }, function errorCallback(response) {
            $scope.error = response.statusText;
        });

        $scope.updateGolferGroup = () => $http({
            method: 'POST',
            url: `/score/update-player-group/${$scope.editingId}`,
            data: {
                'username': $scope.username,
                'password': $scope.password,
                'group_id': $scope.group
            }
        }).then(function successCallback(response) {
            $scope.refreshGolfer();
        }, function errorCallback(response) {
            $scope.error = response.statusText;
        });

        $scope.updateHole = (index) => $http({
            method: 'POST',
            url: '/score/update-score',
            data: {
                'username': $scope.username,
                'password': $scope.password,
                'player_id': $scope.editingId,
                'hole_id': $scope.holeIds[index],
                'score': $scope.scores[index]
            }
        }).then(function successCallback(response) {
            $scope.refreshGolfer();
        }, function errorCallback(response) {
            $scope.error = response.statusText;
        });

        $scope.removeAccents = (s) => {
            if (!s) {
                return '';
            }
            return s.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/ig, "a")
                .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/ig, "e")
                .replace(/ì|í|ị|ỉ|ĩ/i, "ig")
                .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/ig, "o")
                .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/ig, "u")
                .replace(/ỳ|ý|ỵ|ỷ|ỹ/ig, "y")
                .replace(/đ/ig, "d");
        }

        $http({
            method: 'GET',
            url: '/score/holes'
        }).then(function successCallback(response) {
            response.data.data.forEach((hole, i) => {
                $scope.holeIds[i] = hole.id;
                $scope.holeNames[i] = hole.holeName;
                $scope.holePars[i] = hole.parValue;
            })
        }, function errorCallback(response) {
            $scope.error = response.statusText;
        });
        $scope.refreshGolfers();

        // socket.on('data_change', function (data) {
        //     $timeout( function() {
        //         $http({
        //             method: 'GET',
        //             url: '/score/board'
        //         }).then(function successCallback(response) {
        //             $scope.golfer = response.data.data;
        //         }, function errorCallback(response) {
        //             $scope.error = response.statusText;
        //         });
        //     }, 1000);
        //
        //
        // });
}]);