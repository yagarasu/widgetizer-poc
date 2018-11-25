(function ($) {
  $.widget('myapp.grouptable', {
    options: {
      group: [],

      // Events
      save: null
    },

    _create: function () {
      this.drawTable();
      this.drawStudents();
      this.$foot.find('.avg').html(this.calcAvg());
      this.$body.on('change', '.grade', function () {
        this.$foot.find('.avg').html(this.calcAvg());
      }.bind(this));
    },

    _refresh: function () {
      this.$body.empty();
      this.drawStudents();
      this.$foot.find('.avg').html(this.calcAvg());
    },

    _destroy: function () {
      this.$table.remove();
    },

    _setOptions: function () {
      this._superApply(arguments);
      this._refresh();
    },

    _setOption: function (key, val) {
      this._super(key, val);
    },

    drawTable: function () {
      this.$table = $('<table class="grouptable"></table>').appendTo(this.element);
      this.$head = $('<thead><tr><th>Nombre</th><th>Calificación</th></tr></thead>').appendTo(this.$table);
      this.$body = $('<tbody></tbody>').appendTo(this.$table);
      this.$foot = $('<tfoot><tr><th>Promedio</th><th class="avg">----</th></tr></tfoot>').appendTo(this.$table);
      this.$saveButton = $('<button type="button" class="grouptable-btn">Guardar</button>').appendTo(this.element)
        .on('click', function (e) {
          var data = [];
          this.$body.find('tr').each(function () {
            var name = $(this).find('.name').html();
            var grade = parseInt($(this).find('.grade').val(), 10);
            data.push({ nombre: name, calificacion: grade });
          });
          e.data = data;
          this._trigger('save', e);
        }.bind(this));
    },

    drawStudents: function () {
      $.each(this.options.group, function (idx, el) {
        this.$body.append(
          '<tr>'
            + '<td class="name">'
              + el.nombre
            + '</td>'
            + '<td>'
              + '<input value="' + el.calificacion + '" class="grade">'
            + '</td>'
          + '</tr>'
        );
      }.bind(this));
    },

    calcAvg: function () {
      var sum = 0;
      var $grades = this.$body.find('.grade');
      $grades.each(function (idx, el) {
        var val = parseInt($(el).val(), 10);
        sum += val;
      });
      return sum / $grades.length;
    }
  });
})(jQuery);
