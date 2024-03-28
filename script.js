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
    values = values.map(element => parseFloat(element));
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

    //get absolute value to allow reverse order
    i = Math.abs(ranges[0][1] - ranges[0][0]) + 1;
    
    let checkI = ranges.every( function (element) {return element != ranges.every(element => {return element})});
    //check if i is equal in every range
    
    checkI = ranges.every( element => {
            element = element.reduce( function(prevI, element) {
            return Math.abs(element - prevI) + 1;
        })
        return element == i && checkI;
    });

    console.log(checkI);
    Math.abs(checkI);


    //error trapping
    if(frequency.length != ranges.length)
        return alert("Number of Range values are not equal to Frequency!");
    if(i <= 1 || !checkI)
        return alert("Invalid Interval for Range!");


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

    //checks special cases where there is no prev median nor prev/next modal index
    const cfMedian0 = cf[medianClassIndex-1] != undefined ? cf[medianClassIndex-1] : 0;
    const fMode0 = frequency[modalClassIndex-1] != undefined ? frequency[modalClassIndex-1] : 0;
    const fMode2 = frequency[modalClassIndex+1] != undefined ? frequency[modalClassIndex+1] : 0;

    
    median = lb[medianClassIndex] + (((cf[cf.length-1]/2)-cfMedian0)/frequency[medianClassIndex]) * i;
    d1 = frequency[modalClassIndex] - fMode0; d2 = frequency[modalClassIndex] - fMode2;
    
    mode = lb[modalClassIndex] + (d1/(d1+d2)) * i;



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
    numbers.sort((a, b) => a - b);
    const mean = summation/n;
    const medianFactor = Math.floor(numbers.length/2);
    let median = numbers.length/2 % 2 == 0 ? (numbers[medianFactor - 1] 
    + numbers[medianFactor])/2 : numbers[medianFactor];
    console.log(numbers);
    const range = numbers[numbers.length-1] - numbers[0];

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
        <p>Median = <b>${median}</b></p>
        <p>Range = <b>${range}</b></p>
        <p>Summation of x = <b>${summation}</b></p>
        <p>Summation of x - x^2 = <b>${summationXMean}</b></p>
        <p>Sample Variance = <b>${sampleVariance}</b></p>
        <p>Sample Standard Deviation = <b>${sampleStandardDeviation}</b></p>
        <p>Population Variance = <b>${populationVariance}</b></p>
        <p>Population Standard Deviation <b>${populationStandardDeviation}</b></p>
    `
    return element;
}
