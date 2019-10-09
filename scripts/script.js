
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


//fetch data from the remote api
const fetchData = (gallery) => {
    fetch('https://randomuser.me/api/1.3/?results=20&nat=US&inc=name,email,location,picture')
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
            }) 
        })
}

fetchData(createGallery);