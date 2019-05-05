function buttonPress() {
    var key;
    var isvalid = false;
    while (!isvalid) {
        key = getKeyGen();
        var firstfive = key["hashkey"].slice(0, 5);
        var geturl = "https://api.pwnedpasswords.com/range/" + firstfive;
        var data = getData(geturl);
        isvalid = checkformatch(data, key);
        console.log("pw found: " + key["clearkey"]);
     }
}

function getKeyGen() {
    var keydata = null;
    $.ajax({
        type: "GET",
        url: "/keygen",
        success: function (key) {
            keydata = key; // TODO is null
        }
     });
    return keydata;
}

function getData(geturl) {
    var jsondata = null;
    $.ajax({
        type: "GET",
        url: geturl,
        success: function (data) {
            jsondata = data;
        }
     });
     return jsondata;
}

function handleData(data) {
    var splitdata = data.split("\n");
    var jsondata = [];
    for (i = 0; i < splitdata.length; i++) {
        var hash = splitdata[i].slice(0,35);
        var count = splitdata[i].slice(36);
        jsondata.push({hash : hash, count : count});
    }
    return jsondata;
}

function checkformatch(jsondata, key) {
    var checkkey = key["hashkey"].slice(5);
    var retvalue = false;
    var index;
    for (i = 0; i < jsondata.length; i++) {
        var obj = jsondata[i];
        if (obj.hash === checkkey.toUpperCase()) {
            index = i;
            retvalue = true;
            console.log("MATCH FOUND AT " + i + "\n occured " + obj.count + "times");
        }
    }
    return retvalue;
}
