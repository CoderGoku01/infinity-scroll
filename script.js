// unsplash api
const imageContainer = document.getElementById('image-container')
let data

let ready = false
let imageLoaded = 0
let totalImages = 0;
const count = 30
const apiKey = 'zUhA9581YBicP--l4q5inQdUimfJe8hXn9ZYqZ0mFbQ'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// helper function for set attribute
function setAttributer(element,attributes){
  for(const key in attributes){
    element.setAttribute(key,attributes[key])
  }
}



// run function for each element
function displayPhoto(){
  totalImages = data.length
  console.log(totalImages)
  data.forEach(item=> {
    //create htmlLink
    const htmlLink = document.createElement('a')
    // htmlLink.setAttribute('href',item.links.html)
    // htmlLink.setAttribute('target','_blank')
    setAttributer(htmlLink,{
      href: item.links.html,
      target: '_blank'
    })
    //create <img> element
    const img = document.createElement('img')
    // img.setAttribute('src',item.urls.regular)
    // img.setAttribute('alt',item.alt_description)
    // img.setAttribute('title',item.alt_description)
    setAttributer(img,{
      src:item.urls.regular,
      alt:item.alt_description,
      title:item.alt_description
    })

    img.addEventListener('load',()=>{
      console.log('image loaded')
      imageLoaded++
      if(imageLoaded === totalImages){
        ready= true
        console.log(ready)
      }
    })

    htmlLink.appendChild(img)
    imageContainer.appendChild(htmlLink)
  });
}
// fetch request

async function getPhotos(){
  try{
    const res = await fetch(apiUrl)
    data = await res.json()
    
    displayPhoto()
  }
  catch(err) {
    console.log(err)
  }
}

// scroll event listener
window.addEventListener('scroll',()=>{
  // if(window.innerHeight + window.scrollY)
  //console.log(window.innerHeight,window.scrollY,document.body.offsetHeight)
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
    ready= false
    getPhotos()
  }

})

getPhotos()