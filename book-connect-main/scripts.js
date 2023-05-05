import {authors, genres, books, BOOKS_PER_PAGE} from './data.js' //Imported all the data needed from data.js

const extracted = books.slice(0, 36);
const fragment = document.createDocumentFragment();
const Items = document.querySelector('[data-list-items]');


const matches = books;
let page = 1;

//if (!books && !Array.isArray(books)) throw new Error('Source required')
//if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

//for genres list
const genresList = document.createDocumentFragment();
let element = document.createElement('option');                 //this create an HTML 'option' element that will represent a single genre option.
element.value = 'any';                                         //it sets the value attribute of the 'option' element to 'any'...the user will be able to search for all genres
element.innerHTML = 'All Genres';                             //Sets the text that will be displayed to the user for the 'any' option
genresList.appendChild(element);                            //this adds the 'options' element to the 'genreList' document fragment

for (const [id, name] of Object.entries(genres)) {        //added the 'for' loop so that it can iterates over each entry in the 'genres' object
    let element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genresList.appendChild(element);
}
document.querySelector('[data-search-genres]').appendChild(genresList);    // it helps to find  the element in the document with the 'data-search-genres' attribute and appends the entire 'genreList' document fragment to it.

//for authors list
const authorsList = document.createDocumentFragment();       //this create an HTML 'option' element that will represent a single author option.
let elementA = document.createElement('option');             //it sets the value attribute of the 'option' element to 'any'...the user will be able to search for all authors.
elementA.value = 'any';                                     //Sets the text that will be displayed to the user for the 'any' option
elementA.innerText = 'All Authors';                         //this adds the 'options' element to the 'genreList' document fragment
authorsList.appendChild(element);

for (const [id, name] of Object.entries(authors)) {           //added the 'for' loop so that it can iterates over each entry in the 'genres' object  
    let elementA = document.createElement('option');
    elementA.value = id;
    elementA.innerText = name;
    authorsList.appendChild(elementA);
}
document.querySelector('[data-search-authors]').appendChild(authorsList) ;         // it helps to find  the element in the document with the 'data-search-genres' attribute and appends the entire 'authorList' document fragment to it.
        

//For search button
const dataHearderSearch = document.querySelector('[data-header-search]');          //'document.querySelector()  it select an element to select an element that has a data attribute #data-header-search then it assigns this element to dataHeaderSearch     
dataHearderSearch.addEventListener("click",() => {  //this element uses the addEventListener() method...when clicked the function will be excuted.
    searchOverlay.open = true;
    dataHearderSearch.focus();
    
})
const searchOverlay = document.querySelector('[data-search-overlay]');   //it selects an element that has a data attribute "data-search-overlay" and assigns it to a variable 'searchOverlay'

//for the books to display
for (const { author, image, title, id } of extracted) {    

    let element = document.createElement('button')   // creates a button element using the document.createElement() method, and sets the class of the button to 'preview' using element.classList = 'preview'.      
    element.classList = 'preview'
    element.setAttribute('data-preview', id)


    element.innerHTML =        //The innerHTML of the button element is then set to a string that includes an img element with the book's image, and a div element with the book's title and author name
        `<img 
        class="preview__image" 
        src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
        `
    fragment.appendChild(element)

}
Items.appendChild(fragment)     //the button element is appended to a document fragment, which is then appended to another element with the ID 'Items' using Items.appendChild(fragment)




//for cancel via search button
const dataSearchCancel = document.querySelector('[data-search-cancel]')  // selects the element with the data-search-cancel attribute using the document.querySelector method and stores it in a variable named dataSearchCancel
dataSearchCancel.addEventListener('click', () => {      //Then, it adds an event listener to that element using the addEventListener method.
document.querySelector("[data-search-overlay]").style.display = "none";   //The callback function uses the document.querySelector method again to select the element with the data-search-overlay attribute and sets its display CSS property to "none" using the style object of the element. This causes the element to be hidden from view on the page.
})


//to show more details of the books
Items.addEventListener('click',(event) => {    //Adds an event listener to the HTML element with the ID of "Items" and listens for a click event. When the click event occurs, the function is executed with the "event" parameter containing information about the event that occurred.
     document.querySelector("[data-list-active]").open = true;    //Sets the "open" attribute of an HTML element with the attribute "data-list-active" to true
     let pathArray = Array.from(event.path || event.composedPath());   //Creates an array of all the DOM elements that were clicked, starting from the innermost element to the outermost element
     let active = null;

     for (const node of pathArray) {    //Iterates over the array of DOM elements that were clicked. For each element, the function checks if the "previewId" attribute is defined in the element's dataset. If it is defined, the function iterates over an array of books to find the book with an "id" property that matches the "previewId". If the book is found, the book is assigned to the "active" variable and the loop is broken.
         if (active) {break};
         const previewId = node?.dataset?.preview;

         for (const singleBook of books) {
             if (singleBook.id === previewId) {active = singleBook}
         }
    }

     if (!active) {     //If the "active" variable is null, the function exits and does not execute the remaining code. This means that if the clicked element does not have a "previewId" attribute or the "previewId" does not match any book "id", then nothing will happen.
        return
    }
    document.querySelector("[data-list-active]").open = true;      //If the "active" variable is not null, this code sets various HTML elements to display information about the book that was clicked. For example, it sets the "src" attribute of an HTML element with the attribute "data-list-image" to the book's image URL, sets the text content of an HTML element with the attribute "data-list-title" to the book's title, and so on.
    document.querySelector("[data-list-image]").setAttribute('src', active.image);
    document.querySelector("[data-list-blur]").style.background  =` url(${active.image})`;
    document.querySelector("[data-list-title]").textContent = active.title;
    document.querySelector("[data-list-subtitle]").textContent = `${authors[active.author]} (${new Date(active.published).getFullYear})`
    document.querySelector("[data-list-description]").textContent = active.description;
})

//to close the more details of the books
const detailsClose = document.querySelector('[data-list-close]');
detailsClose.addEventListener('click', () => {   //The addEventListener() method is then used to add a click event listener to detailsClose. When the button or link is clicked, the function inside the arrow function () => { ... } is executed.
document.querySelector("[data-list-active]").style.display = "none";  //he page that has a data-list-active attribute and sets its display CSS property to "none". This will hide the element from view on the webpage.
})

//for the theme button
const settingbutton = document.querySelector("[data-header-settings]");   //creates a constant variable settingbutton and assigns it the value of the first DOM element that has a data-header-settings attribute. This variable is used to reference the button that is clicked.
settingbutton.addEventListener('click', () => {      //adds an event listener to the settingbutton element, which listens for a click event. When the button is clicked, the function inside the parentheses is executed.
 document.querySelector("[data-settings-overlay]").style.display = "block";    //when the button is clicked uses another DOM query selector to find the first element that has a data-settings-overlay attribute, and sets the display style property of that element to "block". This will make the overlay visible on the page.
})

//Theme To Light and Dark Mode
const dataSettingsTheme = document.querySelector('[data-settings-theme]')   //creates a constant variable dataSettingsTheme and assigns it the value of the first DOM element that has a data-settings-theme attribute.
const saveButton = document.querySelector('[form="settings"]')          //creates a constant variable saveButton and assigns it the value of the first DOM element that has a form attribute with a value of "settings". This variable is used to reference the save button element.
saveButton.addEventListener('click', (event) =>{                         //adds an event listener to the saveButton element, which listens for a click event. When the button is clicked, the function inside the parentheses is executed.
    event.preventDefault();
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark);
    document.querySelector('body').style.setProperty('--color-light', day.light);
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark);
    document.querySelector('body').style.setProperty('--color-light', night.light);
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
const css = {
    night: {
         dark: '#333',
        light: '#ddd'
     },
     day: {
        dark: '#ddd',
        light: '#333'
     }
};
document.documentElement.style.setProperty('--color-dark', css[colorScheme].dark);
document.documentElement.style.setProperty('--color-light', css[colorScheme].light);

const day = {
   dark: '10, 10, 20',
   light: '255, 255, 255',
}

const night = {
   dark: '255, 255, 255',
    light: '10, 10, 20',
}

//for a cancel button of theme button
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', () => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

//for Show more button
const showMoreButton = document.querySelector('[data-list-button]')
showMoreButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment();
    startIndex1 += 0;
    endIndex1 += 36;
    const startIndex1 = startIndex1
    const endIndex1 = endIndex1
    console.log(startIndex1)
    console.log(endIndex1)
    const extracted = books.slice(startIndex1, endIndex1)
    for (const {author ,image, title, id , description, published} of extracted) {
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment.appendChild(preview)
        }
    const booklist1 = document.querySelector('[data-list-items]')
    booklist1.appendChild(fragment)
})
showMoreButton.innerHTML = `Show more (${books.length})`

//for search button
const searchSubmit = document.querySelector('[form="search"]');
searchSubmit.addEventListener("submit", (event) => {
    const formData = new FormData(event.target);
    const title1 = formData.get('title');
    const genre = formData.get('genre');
    const author = formData.get('author');
    console.log(title1 + genre + author)
})












































































































/*const data = document.querySelector("[data-header-search]");
data.addEventListener('click', () => {
 document.querySelector("[data-search-overlay]").style.display = "block";

})*/



// function submitDataSettingsForm() {
//     return actions.settings.submit();
// }

// function closeDataList() {
//     return dataListActive.open === false;

//dataSearchForm.addEventListener('submit', () => {
 //  event.preventDefault();
  // const formData = new FormData(event.target);
  // const filters = Object.fromEntries(formData)
//})


//const dataSearchForm = document.querySelector('[data-search-form]')
//     for (const book of bookList) {
//         const titleMatch = filters.title.trim() === '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
//         const authorMatch = filters.author === 'any' || book.author === filters.author;

//         let genreMatch = filters.genre === 'any';

//         if (filters.genre !== 'any') {
//             for (const genre of book.genres) {
//                 if (genre === filters.genre) {
//                     genreMatch = true;
//                     break;
//                 }
//             }
//         }
//         if (titleMatch && authorMatch && genreMatch) {
//             result.push(book)
//         }
//     }



//     const display = result.slice();
//     const range = [0, BOOKS_PER_PAGE];
//     const extracted = display.slice(range[0], range[1])

//     data - list - items.innerHTML <= ''


//     const initial = display.length - [page * BOOKS_PER_PAGE]
//     const remaining = hasRemaining ? initial : 0;
//     data - list - button.disabled == initial <= 0;

//     data - list - button.innerHTML == /* html */ /*`
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `
//     data - list - message.classList.toggle('list__message_show', display.length < 1)

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data - search - overlay.open == false;
// });























