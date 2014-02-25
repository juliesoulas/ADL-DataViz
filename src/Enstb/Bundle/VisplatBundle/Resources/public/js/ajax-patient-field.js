<<<<<<< HEAD
function selectFieldChanged(id) {
    $.ajax({
        type: "POST",
        url: Routing.generate('enstb_visplat_ajax_update_patient'),
        data: JSON.stringify({id: id}),
        dataType: "json",
        success: function (data) {
            // Remove old graphs
            document.getElementById('piechart').innerHTML = '';
            document.getElementById('piechartTable').innerHTML = '';
            document.getElementById('ganttchart').innerHTML = '';
            // Create new graphs
            createPieChart(data[0]);
            createGanttChart(data[1]);
=======
///////////////////////////////////////////////////
// Update the graphs with new data
// depended on patient, startDate, endDate
///////////////////////////////////////////////////

function updateGraph(patientId, startDate, endDate) {
    // Set the current route
    var route;
    if ($("#piechart").length && $('#piechartTable').length) {
        route = 'enstb_visplat_homepage';
    }
    else if ($("#chordDiagram").length && $('#chordDiagram').length) {
        route = 'enstb_visplat_dependency';
    }
    $.ajax({
        type: "POST",
        url: Routing.generate('enstb_visplat_ajax_update_patient'),
        data: JSON.stringify({id: patientId, startDate: startDate, endDate: endDate, route: route}),
        dataType: "json",
        success: function (data) {
            // Verify an existence of #piechart
            if ($("#piechart").length && $('#piechartTable').length) {
                // Remove old graphs
                document.getElementById('piechart').innerHTML = '';
                document.getElementById('piechartTable').innerHTML = '';
                createPieChart(data['pieChart']);
            }
            if ($('#ganttchart').length) {
                document.getElementById('ganttchart').innerHTML = '';
                createGanttChart(data['ganttChart']);
            }
            if ($('#chordDiagram').length) {
                document.getElementById('chordDiagram').innerHTML = '';
                createChordDiagram(data['events'], data['matrix']);
            }
>>>>>>> f1de8d8f6721d515c12da6b8d4d6cb8d368f4b69
            // Create responsive
            createResponsive();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Error : ' + errorThrown);
        }
    });
}

$(document).ready(function () {
    $('#form_patient').change(function () {
<<<<<<< HEAD
        var id = $(this).val();
        // Get the current route
        var pathname = window.location.pathname;
        selectFieldChanged(id)
=======
//        // Disabled the end date selector when the user is changed.
//        $('#form_endDate').attr('disabled', 'disabled');
        var patientId = $(this).val();
        // Update date field
        updateDateField(patientId);
        // Force the selector to select the first date
//        $('#form_date').val($('#form_date option:first').val());
        var startDate = $('#form_startDate').val();
        var endDate = $('#form_endDate').val();
        updateGraph(patientId, startDate, endDate)
    });
    $('#form_startDate').change(function () {
        // Enable endDate selector
//        if ($('#form_endDate').attr('disabled') != undefined) {
//            $('#form_endDate').removeAttr('disabled');
//        }
        var patientId = $('#form_patient').val();
        var startDate = $(this).val();
        updateEndDateField(patientId);
        var endDate = $('#form_endDate').val();
        updateGraph(patientId, startDate, endDate);
    });
    $('#form_endDate').change(function () {
        var patientId = $('#form_patient').val();
        var startDate = $('#form_startDate').val();
        var endDate = $(this).val();
        updateGraph(patientId, startDate, endDate);

>>>>>>> f1de8d8f6721d515c12da6b8d4d6cb8d368f4b69
    });
});
