//at first, the version using callback;
//then, the version using promise.

//the version using callback
function asyncAvg(n, avgCB) {
  // Save ongoing sum in JS closure.
  var sum = 0;
  function help(i, cb) {
    sum += i;
    if (i == n) {
      cb(sum);
      return;
    }

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i+1, cb));
  }

  // Start the helper, with CB to call avgCB.
  help(1, function(sum){
      var avg = sum/n;
      avgCB(avg);
  });
}



//the version using promise
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
