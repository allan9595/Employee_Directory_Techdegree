
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
const createModel = (person) => {
    let date = new Date(person.dob.date);
    $('.gallery').append(
        `<div class="model">
            <div class="model-content">
                <img src='${person.picture.large}'>
                <div class="gallery-person-info">
                    <p class="gallery-name">${person.name.first} ${person.name.last}</p>
                    <p class="gallery-email">${person.email}</p>
                    <p class="gallery-city">${person.location.city}, ${person.location.state}</p>
                </div>
                <div class="gallery-person-details">
                    <p class="gallery-cell">${person.cell}</p>
                    <p class="gallery-address">${person.location.street.number} ${person.location.street.name}, ${person.location.state}, ${person.location.postcode}</p>
                    <p class="gallery-birthday">Birthday: ${date.getUTCMonth()+1}-${date.getUTCDate()}-${date.getUTCFullYear()}</p>
                </div>
            </div>
        </div>`
    );
    }
 
//fetch data from the remote api
const fetchData = (gallery) => {
    fetch('https://randomuser.me/api/1.3/?results=21&nat=US&inc=name,email,location,picture,cell,dob')
        .then(res => {
            if(res.status === 200 && res.ok){
                return res.json();
            }else{
                throw new Error('oops, something went wrong')
            }
        })
        .then(data => {
            console.log(data);
            //loop through each result
            data.results.map((person) => {
                createGallery(person);
            });
            /*
            $('.gallery').each((index, element) => {
                $(element).click((e) => {
                    createModel(data);
                })
            })*/
        })
}

fetchData(createGallery);