const getDataSet = function (name, arr, type) {
    switch (type) {
        case 1:
            return {
                label: name,
                backgroundColor: 'rgba(78,255,56,0.2)',
                borderColor: 'rgb(78,255,56)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(78,255,56,0.4)',
                hoverBorderColor: 'rgb(78,255,56)',
                data: arr
            };
        case 2:
            return {
                label: name,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: arr
            };
        default:
            return {
                label: name,
                backgroundColor: 'rgba(78,255,56,0.2)',
                borderColor: 'rgb(78,255,56)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(78,255,56,0.4)',
                hoverBorderColor: 'rgb(78,255,56)',
                data: arr
            };
    }
};

const universalDataSet = function (name , data) {
    return {
        label: name,
        backgroundColor: getRandomColor,
        data: data
    };
};
const universalLineChartDataSet = function (name, data) {
    return {
        label: name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: getRandomColor(),
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
    }
};

const getChartData = function (labels, arr_data, arr_names) {
    let dataSets = [];
    for(let i = 0; i < arr_data.length; i++){
        dataSets.push(universalDataSet(arr_names[i], arr_data[i]));
    }
    return {
        labels: labels,
        datasets: dataSets
    }
};

const getLineChartData = function (labels, arr_data, arr_names) {
    let dataSets = [];
    for(let i = 0; i < arr_data.length; i++){
        dataSets.push(universalLineChartDataSet(arr_names[i], arr_data[i]));
    }
    return {
        labels: labels,
        datasets: dataSets
    }
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export {getDataSet, getChartData}
