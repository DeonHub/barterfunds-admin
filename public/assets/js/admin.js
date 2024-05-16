<script>
            "use strict";
            function notify(status, message) {
                if (typeof message == 'string') {
                    iziToast[status]({
                        message: message,
                        position: "topRight"
                    });
                } else {
                    $.each(message, function (i, val) {
                        iziToast[status]({
                            message: val,
                            position: "topRight"
                        });
                    });
                }
            }
        </script>

        <script src="assets/admin/js/nicEdit.js"></script>

        <script src="assets/global/js/select2.min.js"></script>
        <script src="assets/admin/js/app.js"></script>

       
            "use strict";
            bkLib.onDomLoaded(function () {
                $(".nicEdit").each(function (index) {
                    $(this).attr("id", "nicEditor" + index);
                    new nicEditor({
                        fullPanel: true
                    }).panelInstance('nicEditor' + index, {
                        hasPanel: true
                    });
                });
            });
            (function ($) {
                $(document).on('mouseover ', '.nicEdit-main,.nicEdit-panelContain', function () {
                    $('.nicEdit-main').focus();
                });
            })(jQuery);
       

       

        
            "use strict";

            var ctx = document.getElementById('userBrowserChart');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Chrome", "Handheld Browser", "Firefox", "Safari"],
                    datasets: [{
                        data: [40, 33, 5, 1],
                        backgroundColor: [
                            '#ff7675',
                            '#6c5ce7',
                            '#ffa62b',
                            '#ffeaa7',
                            '#D980FA',
                            '#fccbcb',
                            '#45aaf2',
                            '#05dfd7',
                            '#FF00F6',
                            '#1e90ff',
                            '#2ed573',
                            '#eccc68',
                            '#ff5200',
                            '#cd84f1',
                            '#7efff5',
                            '#7158e2',
                            '#fff200',
                            '#ff9ff3',
                            '#08ffc8',
                            '#3742fa',
                            '#1089ff',
                            '#70FF61',
                            '#bf9fee',
                            '#574b90'
                        ],
                        borderColor: [
                            'rgba(231, 80, 90, 0.75)'
                        ],
                        borderWidth: 0,

                    }]
                },
                options: {
                    aspectRatio: 1,
                    responsive: true,
                    maintainAspectRatio: true,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: false
                        }]
                    },
                    legend: {
                        display: false,
                    }
                }
            });

            var ctx = document.getElementById('userOsChart');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Windows 10", "Android", "Mac OS X"],
                    datasets: [{
                        data: [42, 34, 3],
                        backgroundColor: [
                            '#ff7675',
                            '#6c5ce7',
                            '#ffa62b',
                            '#ffeaa7',
                            '#D980FA',
                            '#fccbcb',
                            '#45aaf2',
                            '#05dfd7',
                            '#FF00F6',
                            '#1e90ff',
                            '#2ed573',
                            '#eccc68',
                            '#ff5200',
                            '#cd84f1',
                            '#7efff5',
                            '#7158e2',
                            '#fff200',
                            '#ff9ff3',
                            '#08ffc8',
                            '#3742fa',
                            '#1089ff',
                            '#70FF61',
                            '#bf9fee',
                            '#574b90'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 0.05)'
                        ],
                        borderWidth: 0,

                    }]
                },
                options: {
                    aspectRatio: 1,
                    responsive: true,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: false
                        }]
                    },
                    legend: {
                        display: false,
                    }
                },
            });

           
            var ctx = document.getElementById('userCountryChart');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Bangladesh", "Nigeria", "Benin", "", "United States"],
                    datasets: [{
                        data: [21, 14, 9, 5, 3],
                        backgroundColor: [
                            '#ff7675',
                            '#6c5ce7',
                            '#ffa62b',
                            '#ffeaa7',
                            '#D980FA',
                            '#fccbcb',
                            '#45aaf2',
                            '#05dfd7',
                            '#FF00F6',
                            '#1e90ff',
                            '#2ed573',
                            '#eccc68',
                            '#ff5200',
                            '#cd84f1',
                            '#7efff5',
                            '#7158e2',
                            '#fff200',
                            '#ff9ff3',
                            '#08ffc8',
                            '#3742fa',
                            '#1089ff',
                            '#70FF61',
                            '#bf9fee',
                            '#574b90'
                        ],
                        borderColor: [
                            'rgba(231, 80, 90, 0.75)'
                        ],
                        borderWidth: 0,

                    }]
                },
                options: {
                    aspectRatio: 1,
                    responsive: true,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: false
                        }]
                    },
                    legend: {
                        display: false,
                    }
                }
            });
        
            if ($('li').hasClass('active')) {
                $('#sidebar__menuWrapper').animate({
                    scrollTop: eval($(".active").offset().top - 320)
                }, 500);
            }
       

        

        