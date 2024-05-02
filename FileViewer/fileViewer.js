window.onload = function() {
    token().then(response => {
        if(response.status == 401) {
            window.location.href = `../Log-in/login.html`;
        } 

        if(response.data.rank == "publisher") {
            window.location.href = `../MyBooks/mybooks.html`;
        }
    }).catch(error => {
        console.error('Hiba történt:', error);
    });
};


var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 0.75
};

var url = window.location.href;
var queryString = url.split('?')[1];
var params = queryString.split('&');
var id;

for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0] === 'id') {
        id = param[1];
        break;
    }
}

getFileViewerData({"id": id}).then(response => {
    if(response.status == 401) {
        window.location.href = `../Log-in/login.html`;
    } else if(response.status == 422) {
        window.history.back();
    } else {
        pdfjsLib.getDocument(`../${response.data.file}.pdf`).then((pdf) => {
            myState.pdf = pdf;
            render(pdf.numPages);
        });
    }
}).catch(error => {
    console.error('Hiba történt:', error);
});


// function render(pagesNumber) {
//     if(myState.currentPage > pagesNumber) {
//         canvas.style.display = "none";
//     } else {
//         myState.pdf.getPage(myState.currentPage).then((page) => {
//             var canvas = document.getElementById("pdf_renderer");
//             var ctx = canvas.getContext('2d');

//             var viewport = page.getViewport(myState.zoom);

//             var maxWidthPercent = 90;
//             var maxHeightPercent = 65;
//             var maxWidth = window.innerWidth * (maxWidthPercent / 100);
//             var maxHeight = window.innerHeight * (maxHeightPercent / 100);
//             var scale = Math.min(maxWidth / viewport.width, maxHeight / viewport.height);

//             canvas.width = viewport.width * scale;
//             canvas.height = viewport.height * scale;

//             page.render({
//                 canvasContext: ctx,
//                 viewport: viewport
//             });
//         });
//     }
// }

function render(pagesNumber) {
    if(myState.currentPage > pagesNumber) {
        canvas.style.display = "none";
    } else {
        myState.pdf.getPage(myState.currentPage).then((page) => {
            var canvas = document.getElementById("pdf_renderer");
            var ctx = canvas.getContext('2d');

            var viewport = page.getViewport(myState.zoom);
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            page.render({
                canvasContext: ctx,
                viewport: viewport
            });
        });
    }
}

document.getElementById('go_previous').addEventListener('click', (e) => {
    if (myState.pdf == null || myState.currentPage == 1)
        return;
    myState.currentPage -= 1;
    document.getElementById("current_page").value = myState.currentPage;
    render();
});

document.getElementById('go_next').addEventListener('click', (e) => {
    if (myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages)
        return;
    myState.currentPage += 1;
    document.getElementById("current_page").value = myState.currentPage;
    render();
});

document.getElementById('current_page').addEventListener('keypress', (e) => {
    if (myState.pdf == null) return;

    var code = (e.keyCode ? e.keyCode : e.which);

    if (code == 13) {
        var desiredPage = document.getElementById('current_page').valueAsNumber;

        if (desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
            myState.currentPage = desiredPage;
            document.getElementById("current_page").value = desiredPage;
            render();
        }
    }
});

document.getElementById('zoom_in').addEventListener('click', (e) => {
    if (myState.pdf == null) return;

    if (myState.zoom + 0.25 <= 2) { 
        myState.zoom += 0.25;
        render();
    }
});

document.getElementById('zoom_out').addEventListener('click', (e) => {
    if (myState.pdf == null) return;

    if (myState.zoom - 0.25 >= 0.25) {
        myState.zoom -= 0.25;
        render();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        if (myState.currentPage < myState.pdf._pdfInfo.numPages) {
            myState.currentPage += 1;
            document.getElementById("current_page").value = myState.currentPage;
            render();
        }
    } else if (event.key === 'ArrowLeft') {
        if (myState.currentPage > 1) {
            myState.currentPage -= 1;
            document.getElementById("current_page").value = myState.currentPage;
            render();
        }
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        if (myState.pdf == null) return;
        if (myState.zoom + 0.25 <= 2) { 
            myState.zoom += 0.25;
            render();
        }
    } else if (event.key === 'ArrowDown') {
        if (myState.pdf == null) return;
        if(myState.zoom - 0.25 != 0) {
            myState.zoom -= 0.25;
            render();
        };
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown") {
        event.preventDefault();
    }
});