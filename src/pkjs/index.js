Pebble.addEventListener('ready', function() {
  require('pebblejs');
  var UI = require('pebblejs/ui');
  var Vector2 = require('pebblejs/lib/vector2');
  var Accel = require('pebblejs/ui/accel');
  var ajax = require('pebblejs/lib/ajax');

  var main = new UI.Card({
    title: 'Cellar',
    body: 'Loading data..',
    scrollable: false,
    action: {
      up: 'IMAGE_RELOAD',
      down: 'IMAGE_INFO'
    }
  });

  main.show();

  var textfield = new UI.Text({
   position: new Vector2(0, 0),
   size: new Vector2(144, 168),
   font: 'gothic-18-bold'
  });

  function getTemperature() { ajax({ url: 'http://weeny.lindvall.co/temperature.php', type: 'json' },
    function(data) {
      var hwid = data[0].hwid;
      var id = data[0].id;
      var temperature = data[0].temperature.toFixed(2);
      var type = data[0].type;
      var unit = data[0].unit.substring(0,1).toUpperCase();
      var raw_unit = data[0].unit;
      main.body(temperature + '' + unit);
      textfield.text(
        'ID: ' + id + '\n' + 
        'TYPE: ' + type + '\n' + 
        'HWID: ' + hwid + '\n' + 
        'UNIT: ' + raw_unit + '\n'
        );
      }
    );
  }

  getTemperature()

  main.on('click', 'down', function() {
    var wind = new UI.Window();
    wind.add(textfield);
    wind.show();
  });

  main.on('click', 'up', function() {
    main.body('Loading data..');
    getTemperature()
  });
});