//getting api url
const count=10;
const accessKey='_Lr-tUtJj4AJyaack0lguWjUoR8UuK2iLOGgmFVEMus';
let imgArray=[];

let ready= false;
let imgLoad=0;
let totalImg=0;

const continer=document.querySelector('.continer');
const animation=document.querySelector('.animation');

function setAttributes(element,attributes){
  for (const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}

function imgLoaded(){
  imgLoad++;

  if(imgLoad===totalImg){
    ready=true;

  }
}

const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

 function displayPhoto(){

  imgLoad=0;
  
  totalImg=imgArray.length;
  console.log(imgArray);
 
  imgArray.forEach(photo=>{

  
    //create a link to images in dom
    const item=document.createElement('a');
    //  item.setAttribute('href',photo.links.html);
    //  item.setAttribute('target','_blank');
  setAttributes(item,{
    href: photo.links.html,
    target:'_blank',
  });
     //creeate image tag into dom
    const img=document.createElement('img');

     
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);


    setAttributes(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.likes,

    })
    //chek img loaded
    img.addEventListener('load',imgLoaded)

    //appenmding childs
  
    item.appendChild(img);
    continer.appendChild(item); 
  });
 
}

async function getPhotos(){
    

    try{
      const response= await fetch(apiUrl);

       imgArray = await response.json();
       displayPhoto();
       
    }catch(error){
      console.log(error);
    }
}
 

 window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY >=document.body.offsetHeight-1000  && ready){
    ready=false;
    getPhotos();
  }
})
getPhotos();