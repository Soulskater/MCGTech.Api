//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;

//loading popup with jQuery
function loadPopup() {
    //loads popup only if it is disabled
    if (popupStatus == 0) {
        $("#backgroundPopup").css({
            "opacity": "0.7"
        });
        $("#backgroundPopup").fadeIn("medium");
        $("#popupContact").fadeIn("medium");
        popupStatus = 1;
    }
}

//disabling popup with jQuery
function disablePopup() {
    //disables popup only if it is enabled
    if (popupStatus == 1) {
        $("#backgroundPopup").fadeOut("fast");
        $("#popupContact").fadeOut("fast");
        popupStatus = 0;
    }
}

//centering popup
function centerPopup() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#popupContact").height();
    var popupWidth = $("#popupContact").width();
    //centering
    $("#popupContact").css({
        "position": "absolute",
        "top": windowHeight / 2 - popupHeight / 2,
        "left": windowWidth / 2 - popupWidth / 2
    });
    //only need force for IE6

    $("#backgroundPopup").css({
        "height": windowHeight
    });
}

document.ready = function () {

    //CLOSING POPUP
    //Click the x event!
    document.getElementById("popupContactClose").onclick = function () {
        disablePopup();
    };
};