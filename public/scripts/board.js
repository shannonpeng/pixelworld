var board = $("#view-board").attr("board"); // get board ID

// Connect to socket
var socket = io();
$(document).ready(function() {
    // Join board
    socket.on('connect', function() {
        socket.emit('room', board);
    })
    // Receive new pixel and update board
    socket.on('new-pixel', function(data){
        console.log('pixel received!');
        $("#" + data.pixel.x + "-" + data.pixel.y).css("background-color", data.pixel.hex);
    });
});

function pixPick(x, y){
    // Post new pixel to database
    var hex = document.getElementById('pixcolor').value;

    $.ajax({
        type: "POST",
        url: "board?" + board,
        data: {
          x: x,
          y: y,
          hex: hex
        },
        success: function(data) {
          console.log('yay');
        },
        error: function(data) {
          console.log('error');
        }
    });

    // Emit new pixel via socket
    var pixel = new Object();
    pixel.x = x;
    pixel.y = y;
    pixel.hex = document.getElementById('pixcolor').value;
    socket.emit('new-pixel', { pixel: pixel });
}

// Update 

// Overlay pixel
$('#pixcolor').on('input', function (evt) {
    var color = document.getElementById('pixcolor').value;
    var overlays = document.getElementsByClassName('overlay');
    for (overlay of overlays) {
        overlay.style.backgroundColor = color;
    }
});

// Show/hide sidebar on arrow click
$('.back-arrow').on('click', function (evt) {
    toggleSidebar();
});
