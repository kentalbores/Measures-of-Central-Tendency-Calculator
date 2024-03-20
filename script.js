const ungroupedButton = document.querySelector("#ungroupedButton");
const groupedButton = document.querySelector("#groupedButton");
const groupedBody = document.querySelector("#groupedBody");
const ungroupedBody = document.querySelector("#ungroupedBody");
const output = document.querySelector("#output");
let calculateButton =  document.querySelector("#calculateUngrouped");
let values;

ungroupedButton.addEventListener("change", function(){
    if(this.checked){
        ungroupedBody.style.display = "block";
        groupedBody.style.display = "none";
        calculateButton = document.querySelector("#calculateGrouped");
        console.log("ungrouped");
    }
})
groupedButton.addEventListener("change", function(){
    if(this.checked){
        groupedBody.style.display = "block";
        ungroupedBody.style.display = "none";
        console.log("grouped");
    }
})


calculateButton.addEventListener("click",function(){
    const data = document.querySelector("#ungroupedData").value;
    values = data.split(",");
    values.includes("") ? values.pop() : console.log("no error");
    values = values.map(element => parseInt(element));
    console.log(values)
    answers = getAnswer(values);
    output.innerHTML = answers;
})

function getAnswer(numbers){
    let summation = 0, summationXMean = 0, n = numbers.length;
    numbers.forEach(number => {
        summation += number;
    })
    const mean = summation/n;
    numbers.forEach(number => {
        summationXMean += (number - mean)**2;
        console.log(summationXMean);
    })
    sampleVariance = summationXMean/(n-1);
    sampleStandardDeviation = Math.sqrt(sampleVariance);
    populationVariance = summationXMean/n;
    populationStandardDeviation = Math.sqrt(populationVariance);

    const element = `
        <p>Mean = <b>${mean}</b></p>
        <p>Summation of x = <b>${summation}</b></p>
        <p>Summation of x - x^2 = <b>${summationXMean}</b></p>
        <p>Sample Variance = <b>${sampleVariance}</b></p>
        <p>Sample Standard Deviation = <b>${sampleStandardDeviation}</b></p>
        <p>Population Variance = <b>${populationVariance}</b></p>
        <p>Population Standard Deviation <b>${populationStandardDeviation}</b></p>
    `
    return element;
}