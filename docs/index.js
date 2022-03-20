//----- Constants ----- 
const LOCAL = "localhost:3000";
const PROD = null //null for now;


const URL = `http://${LOCAL}/books`;

// -----Variables------

//table
var table = document.getElementsByClassName("table"); 
var tbody = document.querySelector('#tbody');

//buttons
var addBtn = document.querySelector(".addBtn");
var cancelBtn = document.querySelector(".cancelBtn");
var editBtn = document.querySelector(".editBtn");
var dropBtn = document.querySelector(".dropBtn");

//form
var bookName = document.querySelector('input[type="text"]');
var mySelect = document.querySelector(".mySelect")

//Others



//Fetching API form backend(NodeJS) 
fetch(URL, {mode: "cors"})
    .then(response => response.json())
    .then(data => {
        console.log(data.result)
        data.result.forEach(book => {
            console.log(book.bname);
            var rows = `
                <tr>
                  <td>${book.id}</td>
                  <td>${book.bname}</td>
                  <td>${book.status === 1 ? "Active" : "Inactive"}</td>
                </tr>
            `
            tbody.innerHTML += rows
        })
    })


//Add button functionality
addBtn.addEventListener('click', () => {
    var data = {
        bname: bookName.value,
        status: parseInt(mySelect.value)
    }
    //console.log(mySelect.value)

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log(data);
    location.reload();
})

//Edit button functionality
editBtn.addEventListener('click', () => {
    var edit_id = document.querySelector("#edit_id").value;
    var edit_select = document.querySelector("#edit_select").value;
    var data = {
        id: parseInt(edit_id),
        status: parseInt(edit_select)
    }
    fetch(URL+"/"+edit_id, {
        method: "PATCH",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => console.log(response))
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log(edit_id);
    location.reload();
})

//Delete button functionality
dropBtn.addEventListener('click', () => {
    var drop_id = document.querySelector("#del_id").value;
    //console.log(drop_id);
    var data = {
        id: parseInt(drop_id)
    }
    fetch(URL+"/"+drop_id, {
        method: "DELETE",
        headers: {
            "Content-type":"Application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => console.log(response))
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    //console.log(edit_id);
    location.reload();
})

//Cancel button functionality
cancelBtn.addEventListener('click', () => {
        bookName.value = "";
        mySelect.value = "";
})


/*
JQuery goes here
*/

$(document).ready(function(){
    $('.modal').modal();
  });