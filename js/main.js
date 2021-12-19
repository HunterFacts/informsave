var activ = 1;
var massiveActiv = [];

var menace = 1;
var massiveMenace = [];

var massiveActivTest = [
    {
    id: 1,
    name: "Нужный актив",
    priority: 4
    },
    {
    id: 2,
    name: "Ненужный актив",
    priority: 1
    }
];
var massiveMenaceTest = [
    {
        id: 1,
        name: "Не угроза",
        level: 1
    },
    {
        id: 2,
        name: "Супер угроза",
        level: 3
    }
];

function addActiv() {
    activ++;
    $('#tableActiv .activ').append('<tr class="activ-block">'+
    '<td class="activ-id">'+activ+'</td>'+
    '<td>'+
    '<div class="input-field col s12">'+
    '<input placeholder="Актив '+activ+'" type="text" class="validate activ-text">'+
    '</div>'+
    '</td>'+
    '<td>'+
    '<div class="input-field col s12">'+
    '<input placeholder="0" type="number" min=0 max=100 class="validate activ-priority">'+
    '</div>'+
    '</td>'+
    '</tr>');
    M.AutoInit();
}

function saveActiv() {
    massiveActiv = [];
    $('#tableActiv .activ-block').each(function( index, value ) {
        objActiv = {
            id: $(value).find(".activ-id").html(),
            name: $(value).find(".activ-text").val(),
            priority: $(value).find(".activ-priority").val()
        }
        massiveActiv.push(objActiv);
    });
    $('.form-activ').hide();
    $('.form-menace').show();
}

function addMenace() {
    menace++;
    $('#tableMenace .menace').append('<tr class="menace-block">'+
    '<td class="menace-id">'+menace+'</td>'+
    '<td>'+
    '<div class="input-field col s12">'+
    '<input placeholder="Угроза '+menace+'" type="text" class="validate menace-text">'+
    '</div>'+
    '</td>'+
    '<td>'+
    '<div class="input-field col s12">'+
    '<select class="menace-select">'+
    '<option value="0" disabled selected>Выберете уровень угрозы</option>'+
    '<option value="1">Низкая</option>'+
    '<option value="2">Средняя</option>'+
    '<option value="3">Высокая</option>'+
    '</select>'+
    '</div>'+
    '</td>'+
    '</tr>');
    M.AutoInit();
}

function saveMenace() {
    massiveMenace = [];
    $('#tableMenace .menace-block').each(function( index, value ) {
        objMenace = {
            id: $(value).find(".menace-id").html(),
            name: $(value).find(".menace-text").val(),
            level: $(value).find(".menace-select").val()
        }
        massiveMenace.push(objMenace);
    });
    $('.form-menace').hide();
    $('.table-otchet').show();
    construcTable();
}

function construcTable(){
    /*
    
    <table class="striped">
        <thead>
          <tr>
              <th rowspan=4>Ценность актива</th>
              <th colspan=9>Угрозы</th>
          </tr>
          <tr>
            <th colspan=3>Угроза 1</th>
            <th colspan=3>Угроза 2</th>
            <th colspan=3>Угроза 3</th>
          </tr>
          <tr>
            <th colspan=3>Уровень уязвимости</th>
            <th colspan=3>Уровень уязвимости</th>
            <th colspan=3>Уровень уязвимости</th>
          </tr>
          <tr>
            <th>Н</th>
            <th>С</th>
            <th>В</th>
            <th>Н</th>
            <th>С</th>
            <th>В</th>
            <th>Н</th>
            <th>С</th>
            <th>В</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0 (Актив 1)</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    
    */

    var table = '<table class="striped"><thead><tr><th rowspan=4>Ценность актива</th>';
    var colspanMenace = massiveMenace.length * 3;
    table = table + '<th colspan='+colspanMenace+'>Угрозы</th></tr><tr>';

    thMenace = '';
    thLevelUy = '';
    thLevelCheck = '';

    massiveMenace.forEach(function(element) {
        thMenace = thMenace + '<th colspan=3>'+element.name+'</th>';
        thLevelUy = thLevelUy + '<th colspan=3>Уровень уязвимости</th>';
        thLevelCheck = thLevelCheck + '<th>Н</th><th>С</th><th>В</th>'
    });

    table = table + thMenace+'</tr><tr>' + thLevelUy + '</tr><tr>'+thLevelCheck+'</tr></thead>';

    tdString = '';

    massiveActiv.forEach(function(elementActiv) {
        tdString = tdString + '<tr><td>'+elementActiv.priority+' ('+elementActiv.name+')</td>';
        massiveMenace.forEach(function(elementMenace) {
            tdString = tdString + '<td>' + (Number(elementActiv.priority)+Number(elementMenace.level) + 1) + '</td>';
            tdString = tdString + '<td>' + (Number(elementActiv.priority)+Number(elementMenace.level) + 2) + '</td>'
            tdString = tdString + '<td>' + (Number(elementActiv.priority)+Number(elementMenace.level) + 3) + '</td>'
        });
        tdString = tdString + '</tr>'
    })

    table = table + '<tbody>'+tdString+'</tbody>'

    $('.table-otchet').html(table);
}

function start() {
    $('.start-block').hide();
    $('.form-activ').show();
}

$(document).ready(function(){
    M.AutoInit();
});