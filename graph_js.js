window.addEventListener("load", setup); 


var remove_number = 1

const y = (n,x) => {
    return ((-1)**n)/(factorialize(2*n+1))*(x**(2*n+1))
} 

console.log(y(0,5))

var fav = 0
var tav = 0
var not = 0

// Generate values
var xValues = [];
var yValues = [];
for (var x = -6.5; x <= 6.5; x += 0.1) {
    xValues.push(radians_to_degrees(x));
    var y_value = Math.sin(x)
    yValues.push(y_value);
}

// Display using Plotly
var data = [{x:xValues, y:yValues, mode:"lines"}];


function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function setup() {     
    setup_plot()   
    addListener()
}


function setup_plot(){
    console.log("new thing should appear")
    var layout = {
        xaxis: {title: "Angle In Degrees"},
        yaxis: {title: "Sine Value",  range: [-1.5, 1.5]},
        title: "Taylor Series Sine Approximation APP"
        };
    Plotly.newPlot("the_plot", data, layout);

}

function addListener(){
    document.getElementById("compute").addEventListener("click",computation)
    document.getElementById("see_the_hints").addEventListener("click",see_hints)
}

function see_hints(){
    document.getElementById("hints").innerHTML = "Hints: 4 terms can provides a good match for the range -180 to 180, and 8 terms can provides a good match for the range -360 to 360"
    document.getElementById("see_the_hints").setAttribute("disabled","true")
    //self.setAttribute("disabled","true")
    const close_button = document.createElement("button")
    close_button.innerHTML = "click to close hints"
    close_button.setAttribute("id","close_button")
    document.getElementById("hint_button").appendChild(close_button)
    close_button.addEventListener("click",close_hints)
}

function close_hints(){
    document.getElementById("hints").innerHTML = "Hints: "
    document.getElementById("see_the_hints").disabled = false
    const self_button = document.getElementById("close_button")
    document.getElementById("hint_button").removeChild(self_button)
}

function renew_plot(){
    const remove = document.getElementById("clean")
    remove.disabled = true
    location.reload();
    remove_number = 1

}
function computation(){
    if(remove_number=1){
        const remove = document.getElementById("clean")
        remove.disabled = false
        remove.addEventListener("click",renew_plot)
        remove_number = 0
    }
    const from_angel_value = document.getElementById("from_angle")
    const to_angel_value = document.getElementById("to_angle")
    const number_of_terms_value = document.getElementById("number_of_terms")
    fav = from_angel_value.value
    tav = to_angel_value.value
    not = number_of_terms_value.value
    //console.log((fav+" "+tav+" "+not))

    var x_new_value = []
    var y_new_value = []
    for (let index = fav/(180/Math.PI); index < tav/(180/Math.PI); index+=0.1){
        x_new_value.push(index*(180/Math.PI))
        var new_y = 0
        for (let i = 0; i <= not; i++) {
            new_y += y(i,index)
        }
        y_new_value.push(new_y)

    }
    data.push({x:x_new_value, y:y_new_value, mode:"lines"})
    setup_plot()
}
 
function factorialize(num) {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  }