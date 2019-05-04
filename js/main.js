function buttonPress() {
        $.ajax({
            type: "GET",
            url: "/keygen",
            success: function (key) {
                var firstfive = key["hashkey"].slice(0, 5);
                var geturl = "https://api.pwnedpasswords.com/range/" + firstfive;
                $.ajax({
                    type: "GET",
                    url: geturl,
                    success: function (data) {
                        var jsondata = handleData(data);
                        var isvalid = checkformatch(jsondata, key);
                        /*
                           TODO this doesn't work;
                            these ajax functions have to be called individually.
                            currently this creates a huge loop, by huge the data saved in RAM is meant.
                        * */
                        while (!isvalid) {
                            console.log("no valid key found, trying again");
                            buttonPress();
                        }
                            console.log("pw found: " + key["clearkey"]);
                    }
                });
            }
        });
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