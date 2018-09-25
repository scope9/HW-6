//////////////////display function
const render = function () {
    runListQuery();
};

const renderList = function (outputPlace, dataList) {
    for (let i = 0; i < dataList.length; i++) {
        const output = $(outputPlace);
        const temp = $(`<div class='entry'>`);
        const tempButton = $('<span class=left>');
        tempButton.append($("<button type='submit' class='delEntry'>").text("delete"));
        const tempSpan = $("<span class='entryText'>").text(`${dataList[i].newInput}`);
        temp.append(
            $("<input type='checkbox' class='inputBox'>"),
            tempSpan,
            tempButton
        );
        output.append(temp);
    }
};

const runListQuery = function () {
    $.ajax({ url: "/api/list", method: "GET" }).then(
        function (e) {
            renderList('#displayList', e);
        }
    );
}



render();

///submit function
const submitFunc = function () {
    console.log('get in submit');
    //event.preventDefault();


    const newEntry = {
        newInput: $('#newInput').val().trim()
        //id: count
    };
    console.log(newEntry);
    for (let key in newEntry) {
        if (newEntry[key] === '') {
            alert('Please enter the task');
            return;
        }
    }

    $.ajax({ url: '/api/list', method: 'POST', data: newEntry }).then(
        function (data) {
            if (data.success) {
                console.log('input data in post method ajax', data);
                alert('You just added a new entry!');
                $('#newInput').val('');
            } else {
                alert("There's a problem with your submision");
            }

        }
    );
};
console.log('in app.js');


$(document).on('click', '#submitButton', submitFunc);


//delete Function//
const deleteFunc = function () {
    console.log('get in delete');
    let parent = $(this).parent().parent().text();
    const selEntry = {
        newInput: parent.substring(0, parent.length - 6)
    };
    console.log(selEntry);
    $.ajax({ url: '/api/list', method: 'DELETE', data: selEntry }).then(
        function (data) {
            console.log(data.success);
            if (data.success) {
                console.log('input data in delete method ajax', data);
                alert('You just deleted a new entry!');
            } else {
                alert("There's a problem with your submision");
            }

        }
    );

};


$(document).on('click', '.delEntry', deleteFunc);