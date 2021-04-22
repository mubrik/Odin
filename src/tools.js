/** function for getting a specific card
 * takes in an array and a value to search for, returns null if empty
* @param {Array} arrayItem - array to loop
* @param {Number} uniqueItem - index/id
*/

function getCard(arrayItem, uniqueItem) {
    
    if (arrayItem.length === 0) return null
    let item  = arrayItem.find((value) => {
        return value.id === uniqueItem
    })
    return item
}


/** callback function to filter an item
* 
* 
*/
function itemToDelete(bindId, value){

    return value.id !== bindId;
}

/** function to get note data (title, text) object from card
* @param {Event} eventObj - event object
* @param {Array} arrayItem - array to loop
*/
function createNoteData(eventObj, arrayItem) {

    let targetAtr = parseInt(eventObj.target.getAttribute('data-index'));
    let card = getCard(arrayItem, targetAtr);
    let data = {
        id: card.id,
        text: card.text,
        title: card.title,
    }
    return data;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 10000) + 1
}

export {getCard, itemToDelete, createNoteData, generateRandomNumber};