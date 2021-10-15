const speedoNumberInputs = document.querySelectorAll('input[type=number]')
console.log(speedoNumberInputs)
function updateSpeedometer() {

    let maxValue = 0;
    let rating = 0;
    speedoNumberInputs.forEach((input) => {
        let inputValue = parseInt(input.value, 10) ;

        rating += inputValue;
       
    })
 maxValue = speedoNumberInputs.length * 10;
console.log(`Rating: ${rating}`);
console.log(`MaxValue: ${maxValue}`)
    let performancePercentage = rating/maxValue * 100;
    let updatedSpeed = Math.round(performancePercentage*180/100)-45;

    document.getElementById("speedbox-score").style.transform =` rotate(${updatedSpeed}deg)`;
}

speedoNumberInputs.forEach((input) => {
    input.addEventListener('click', updateSpeedometer)
})