require.config({
  paths: {
    'jquery': '../node_modules/jquery/dist/jquery.min',
    'Chart': '../node_modules/chart.js/dist/Chart.bundle.min'
  }
});

define(['jquery', 'Chart'], function($, Chart){
  if($('canvas.can').length <= 0) return;
  var canvas = $('canvas.can')[0];

  var ctx = canvas.getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: false,// to prevent the canvas to strech
      scales: {
        yAxes: [
          {
            ticks: {
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
