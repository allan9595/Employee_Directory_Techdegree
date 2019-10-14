
//select the dom, insert and make the gallery in html
const createGallery = (person) => {
    $('.container-gallery').append(
        `
            <div class="gallery">
                <img src='${person.picture.large}'>
                <div class="gallery-person-info">
                    <p class="gallery-name">${person.name.first} ${person.name.last}</p>
                    <p class="gallery-email">${person.email}</p>
                    <p class="gallery-city">${person.location.city}, ${person.location.state}</p>
                </div>
            </div>
        `
    )
}

//create a model
const createModel = (person,data,index) => {
    let date = new Date(person.dob.date);
    //console.log(index);
    let indexCurrent = index;
    $('.container-gallery').append(
        `<div class="model">
            <div class="model-content">
                <button class="btn-close">
                    x
                </button>
                <img src='${person.picture.large}'>
                <div class="gallery-person-info">
                    <p class="gallery-name">${person.name.first} ${person.name.last}</p>
                    <p class="gallery-email">${person.email}</p>
                    <p class="gallery-city">${person.location.city}, ${person.location.state}</p>
                </div>
                <hr>
                <div class="gallery-person-details">
                    <p class="gallery-cell">${person.cell}</p>
                    <p class="gallery-address">${person.location.street.number} ${person.location.street.name}, ${person.location.state}, ${person.location.postcode}</p>
                    <p class="gallery-birthday">Birthday: ${date.getUTCMonth()+1}-${date.getUTCDate()}-${date.getUTCFullYear()}</p>
                </div>
                <div class="btn-forward-back">
                    <button class="previous">Prev</button>
                    <button class="forward">Next</button>
                </div>
            </div>
        </div>`
    );
    //add an handler when user click the x, close the model
    $('.btn-close').click(() => {
        $('.model').remove();
    });

    //add onclick handler for forward 
    $('.forward').click(() => {
        $('.model').remove();
        //if indexCurrent is not undefined, or not reach the end or beginning
        if(indexCurrent+1 === data.results.length){
            createModel(data.results[0],data,0);
        }else{
            createModel(data.results[indexCurrent+1],data,indexCurrent+1);
        }
    })

    //add onclick handler for back
    $('.previous').click(() => {
        $('.model').remove();
        //if indexCurrent is not undefined, or not reach the end or beginning
        if(indexCurrent-1 < 0){
            createModel(data.results[data.results.length-1],data,data.results.length-1);
        }else{
            createModel(data.results[indexCurrent-1],data,indexCurrent-1);
        }
    })
}

const search = (name) => {
    //if the name included, then return true, otherwise return false
    if(name.toLowerCase().includes($('.search').val())){
        return true;
    }else{
        return false;
    }
}
 
//fetch data from the remote api
const fetchData = (gallery) => {
    fetch('https://randomuser.me/api/1.3/?results=12&nat=US&inc=name,email,location,picture,cell,dob')
        .then(res => {
            if(res.status === 200 && res.ok){
                return res.json();
            }else{
                throw new Error('oops, something went wrong')
            }
        })
        .then(data => {
            //console.log(data);
            //loop through each result
            data.results.map((person) => {
                createGallery(person);
            });
            //loop through each gallery and adding the click listener on them
            $('.gallery').each((index, element) => {
                $(element).click((e) => {
                    createModel(data.results[index], data, index);
                })
            })

            //remove the model outside when click outside the window
            window.onclick = (e) => {
                if($(e.target)[0].className == 'model'){
                    $('.model').remove();
                }
            }

            //add keyup to search input
            $('.search').keyup((e) => {
                e.preventDefault();
                $('.gallery-name').each((index, element) => {
                    //pass the list of names to the search bar
                    if(search($(element).text())){
                        $($('.gallery')[index]).show();
                    }else{
                        $($('.gallery')[index]).hide();
                    };
                })
            })
        }).then((e) => {
            if(e){
                console.log(e);
            }
        })
}

fetchData(createGallery);