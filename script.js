const ungroupedButton = document.querySelector("#ungroupedButton");
const groupedButton = document.querySelector("#groupedButton");
const groupedBody = document.querySelector("#groupedBody");
const ungroupedBody = document.querySelector("#ungroupedBody");

const output = document.querySelector("#output");
const calculateButton =  document.querySelector("#calculateUngrouped");
let values;

const outputGrouped = document.querySelector("#outputGrouped");
const calculateGroupedButton = document.querySelector("#calculateGrouped");


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

calculateGroupedButton.addEventListener("click", function(){
    let x, fx, frequency, lb = [], cf = [], summFX = 0, medianClassIndex = 0, modalClassIndex, median, mode, mean, i;
    let ranges = document.querySelector("#groups").value.split(",").map(element => element.split("-"));
    ranges = ranges.map(element => {
        return element.map(i => parseInt(i));
    });

    //f[]
    frequency = document.querySelector("#frequency").value.split(",").map(element => parseInt(element));

    //x
    x = ranges.map(element => {
        return (element[1]+element[0])/2
    })

    //i
    i = (ranges[0][1] - ranges[0][0]) + 1

    //lb[],cf[], summFX, done  medianclassindex, modalclassindex, i
    ranges.forEach(element => {
        lb.push(element[0]-0.5);
    })

    let comfreq = 0, biggestNum = 0;
    frequency.forEach((element,index) => {
        comfreq += element;
        cf.push(comfreq)
        summFX += (element * x[index])
        if(element > biggestNum){
            biggestNum = element
            modalClassIndex = index;
        }
    })

    for(medianClassIndex = 0; medianClassIndex < frequency.length; medianClassIndex++ ){
        console.log(medianClassIndex)
        if(cf[medianClassIndex] >= (cf[cf.length-1]/2)){
            break;
        }
    }

    mean = summFX/cf[cf.length-1];
    median = lb[medianClassIndex] + (((cf[cf.length-1]/2)-cf[medianClassIndex-1])/frequency[medianClassIndex]) * i;
    d1 = cf[modalClassIndex] - cf[modalClassIndex-1]; d2 = cf[modalClassIndex] - cf[modalClassIndex+1];
    mode = lb+(d1/(d1+d2))*i


    let summationFXMean = 0, sampleStandardDeviation, sampleVariance, populationStandardDeviation, populationVariance;
    x.forEach((element, index) => {
        summationFXMean += frequency[index] * ((element - mean)**2);
    })
    sampleVariance = summationFXMean/(cf[cf.length-1]-1);
    sampleStandardDeviation = Math.sqrt(sampleVariance);
    populationVariance = summationFXMean/ cf[cf.length-1];
    populationStandardDeviation = Math.sqrt(populationVariance);
    

    console.log(`
        median: ${medianClassIndex}
        modal: ${modalClassIndex}
        i: ${i}
        mean: ${mean}
        median: ${median}
        mode: ${mode}
        summation of f(x-mean)^2: ${summationFXMean}
        sample standard deviation:  ${sampleStandardDeviation}
        sample variance: ${sampleVariance}
        population standard deviation: ${populationStandardDeviation}
        population variance: ${populationVariance}
`)
    document.querySelector("#outputGrouped").innerHTML = `
        <p>Mean = <b>${mean}</b></p>
        <p>Median = <b>${median}</b></p>
        <p>Mode = <b>${mode}</b></p>
        <p>Interval = <b>${i}</b></p>
        <p>Summation of f(x-mean)^2 = <b>${summationFXMean}</b></p>
        <p>Sample Variance = <b>${sampleVariance}</b></p>
        <p>Sample Standard Deviation = <b>${sampleStandardDeviation}</b></p>
        <p>Population Variance = <b>${populationVariance}</b></p>
        <p>Population Standard Deviation <b>${populationStandardDeviation}</b></p>
    `
    
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