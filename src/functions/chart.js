const axios = require('axios');

export const getChart = (from, to, allData, typeReport, typeOperation) => {
    if (allData) {
        from = null;
        to = null;
    }
    if (typeReport === "sum") {
        return axios.post('/chart/querySum', {from: from, to: to, typeOperation: typeOperation}).then (resp => {
            return resp.data;
        }).catch(err => {
            return {errors: err};
        });
    }
    else {
        return axios.post('/chart/frequentlySum', {from: from,
            to: to,
            typeOperation: typeOperation,
            typeReport: typeReport}).
        then (resp => {
            return resp.data;
        }).catch(err => {
            return {errors: err};
        });
    }
};