const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('map');
const def_src = 'https://maps.google.com/maps?f=q&source=s_q&hl=en&output=embed&t=k';
function reverseLat(lat){
    let new_lat = '';
    if(lat[0] === '-'){
        new_lat = lat.replace('-' , '');
    } else {
        new_lat = '-' + lat;
    }
    return new_lat;
}
function reverseLong(long) {
    let long_float = parseFloat(long);
    let new_long = '';
    if(long[0] === '-'){
        long_float += 180;
        long_float = long_float.toFixed(5);
        new_long = long_float.toString();
    } else {
        long_float -= 180;
        long_float = long_float.toFixed(5);
        new_long = long_float.toString();
        if(new_long[0] === '-'){
            new_long.replace('-', '');
        } else {
            new_long = '-' + new_long;
        }
    }
    return new_long;
}
function setLocation(lat, long){
    lat = reverseLat(lat);
    long = reverseLong(long);
    latitude.value = lat;
    longitude.value = long;
    map.src = def_src + `&q=${lat},${long}`;
}
document.getElementById('coords').addEventListener('submit', function(e){
    e.preventDefault();
    let values = {
        lat: latitude.value.trim(),
        lng: longitude.value.trim()
    }
    if(values.lat !== '' && values.lng !== '' && !isNaN(values.lat) && !isNaN(values.lng)){
        setLocation(values.lat, values.lng)
    }
});
function showPosition(position) {
    setLocation(position.coords.latitude.toString(), position.coords.longitude.toString());
}
function showError(error) {
    let error_msg = '';
    switch(error.code) {
    case error.PERMISSION_DENIED:
        error_msg = "You denied the request for location."
    break;
    case error.POSITION_UNAVAILABLE:
        error_msg = "Location information is unavailable."
    break;
    case error.TIMEOUT:
        error_msg = "The request to get you location timed out."
    break;
    case error.UNKNOWN_ERROR:
        error_msg = "An unknown error occurred."
    break;
    }
    alert(error_msg);
}
document.getElementById('get_coords').addEventListener('click', function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        alert('Access to location is not supported by this browser.')
    }
})