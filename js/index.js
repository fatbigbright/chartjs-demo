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
    type: 'line',
    data: {
      labels: ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15'],
      datasets: [
        {
          label: 'Humidity',
          yAxisID: 'HT',
          data: [0.75, 0.8, 0.76, 0.85, 0.9, 0.68],
          backgroundColor: 'rgba(200, 99, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1
        },
        {
          label: 'Temperature',
          yAxisID: 'TT',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(0, 99, 200, 0.2)',
          borderColor: 'rgba(00, 00, 255, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: false,// to prevent the canvas to strech
      hover: {
        mode: 'label'
      },
      scales: {
        yAxes: [
          {
            id: "TT",
            position: "left",
            ticks: {
              beginAtZero: true
            }
          },
          {
            id: "HT",
            position: "right",
            ticks:{
              beginAtZero: true
            }
          }
        ]
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
