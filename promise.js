
function asyncAvg(n) {
    // Save ongoing sum in JS closure.
    var sum = 0, resolve, reject, p = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    try {
        function help(i) {
            try {
                sum += i;
                if (i == n) {
                    var avg = sum / n;
                    resolve(avg);
                    return;
                }
                // "Asynchronous recursion".
                // Schedule next operation asynchronously.
                setImmediate(help.bind(null, i + 1));
                // throw "649";
            } catch (e) {
                reject(e);
            }
        }
        // Start the helper, with CB to call avgCB.
        help(1);
        // throw "655";
    } catch (e) {
        reject(e);
    }
    return p;
}
asyncAvg(100).then(ave => {
    console.log("average:" + ave);
}).catch(e => {
    console.log("error:" + e);
})
