(function ($) {

  var grupos = {
    '1A': [
      { nombre: 'Ariadna', calificacion: 8 },
      { nombre: 'Benjamin', calificacion: 7 },
      { nombre: 'Carla', calificacion: 5 },
      { nombre: 'Domingo', calificacion: 9 },
      { nombre: 'Ernesto', calificacion: 10 }
    ],
    '1B': [
      { nombre: 'Fabiola', calificacion: 8 },
      { nombre: 'Gabriel', calificacion: 6 },
      { nombre: 'Helena', calificacion: 7 },
      { nombre: 'Ignacio', calificacion: 10 },
      { nombre: 'Juan', calificacion: 9 }
    ]
  };
  window.gp = grupos;

  $(document).ready(function () {

    // Inicializar widget
    $('#table')
    .grouptable({
      group: grupos['1A'],

      // Listener del boton
      save: function (e, { data }) {
        console.log('Save!', e, data);
        var val = $('#groups').val();
        grupos[val] = data.slice();
      }
    });

    // Listener al select
    $('#groups').on('change', function () {
      var val = $(this).val();
      // Asignar nuevos datos
      $('#table')
        .grouptable('option', 'group', grupos[val]);
    });
  });
})(jQuery);
