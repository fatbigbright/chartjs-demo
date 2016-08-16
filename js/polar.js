/*
require.config({
  paths: {
    'jquery': '../node_modules/jquery/dist/jquery.min',
    'Chart': '../node_modules/chart.js/dist/Chart.bundle.min'
  }
});

define(['jquery', 'Chart'], function($, Chart){
  */
$(document).ready(function(){
  if($('canvas.can').length <= 0) return;
  var canvas = $('canvas.can')[0];

  var ctx = canvas.getContext('2d');
  Chart.defaults.global.hover.mode = 'single';
  var chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['2.2.1', '2.2.2', '2.2.c.1', '2.2.c.2', '2.2.3', '2.2.4', '2.2.5'],
      datasets: [
        {
          tension: 0,
          label: 'Warning on Temperature',
          data: [0, 2, 5, 1, 2, 3, 8],
          backgroundColor: [
            'rgba(0, 99, 200, 0.2)',
            'rgba(200, 99, 0, 0.2)',
            'rgba(99, 200, 200, 0.2)',
            'rgba(99, 200, 0, 0.2)',
            'rgba(0, 200, 200, 0.2)',
            'rgba(99, 99, 0, 0.2)',
            'rgba(0, 99, 0, 0.2)',
          ],
        }
      ]
    },
    options: {
      responsive: false,// to prevent the canvas to strech
      hover: {
        mode: 'label'
      },
      animation: {
        onComplete: function(animation){
          canvas.toBlob(function(blob){
            $('a#exportion').unbind().bind('click', function(){
              var pdf = new jsPDF();
              pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 50, 50);
              pdf.save('test.pdf');
            });
          }, 'application/vnd.x-pdf');
        }
      },
      boxWidth: 20
    }
  });
});
