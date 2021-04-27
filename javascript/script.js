const draggableElements = document.querySelectorAll(".draggable"); // querySelectorAll() is used to select all elements
const droppableElements = document.querySelectorAll(".droppable");

// adding eventListener to the draggable and droppable elements

// for the draggableElements we should look for the NodeListOf<element> containg elements and adding the drag relataed
//listener to all the elements
draggableElements.forEach(elem=> {
  elem.addEventListener("dragstart",dragStart);//dragstart event occurs when the user starts dragging the element and this is function where we
  // define the data for drag and drop operation
  // the most imp part for dragging is that we should define the draggable=true for the draggable element

  //elem.addEventListener("drag",drag);
  //elem.addEventListener("dragend",dragEnd);
});

droppableElements.forEach(elem =>
{
  elem.addEventListener("dragenter",dragEnter);
  elem.addEventListener("dragover",dragOver);
  // in order to have a valid droppable element we should at least handle the "dragover" events
  // in order to prevent the default browser behaviour which is not to allow drop
  elem.addEventListener("dragleave",dragLeave);
  elem.addEventListener("drop",drop); // event to how to handle the transfered data
});

// drag and drop Functions

function dragStart(event)
{
  event.dataTransfer.setData("text",event.target.id); // dataTransfer object is used to hold the data that is being dragged dusring the
                                                              //drag and drop operation. Each may hold one or more data, each of one or more data types.

}

function dragOver(event)
{
  if(!event.target.classList.contains("dropped"))
  {
    event.preventDefault();// in order to prevent the default browser behaviour which is not to allow drop
  }
}

function dragEnter(event)
{
  if(!event.target.classList.contains("dropped")) // we only want to add droppable-hover class to the target element only if the tagrget element is not there and if dosent contains the class dropped
  // here we will add the class droppable-hover from HTML and css to the
  // taget droppable element
  {
      event.target.classList.add("droppable-hover"); // will scale-up of droppable area border
  }
}

function dragLeave(event)
{
  if(!event.target.classList.contains("dropped"))
  {
    event.target.classList.remove("droppable-hover"); // to remove the proprties defined in the
  // droppable-hover class when the element gets out of the droppable area.
  }
}

function drop(event)
{
  // for example if we drop an image or a link in a droppable element
  // the default evevnt handling bY the browser is to open the link or show the image
  // so here we are preventing the default baheviour of the browser
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  // accsess the dragged data
  const draggableElementData = event.dataTransfer.getData("text");
  //event.target.style.backgroundColor = draggableElementData; // to change the backgroundColor same as the element's color

  // now we have the event.target.id i.e. the id of the element
  // so we will have to compare it with the "data-draggable-id" attrubute to ensure that the correct input element is dragged to
  // the correct target element.
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  if(draggableElementData === droppableElementData)
  {
    event.target.classList.add("dropped");
    const draggableElement = document.getElementById(draggableElementData); // access draggableElementData by its id and store it in the variable
    event.target.style.backgroundColor = draggableElement.style.color; //to change the backgroundColor same as the element's color this type of style works only for the "inline" elements
    draggableElement.classList.add("dragged");  /*As soon as the draggable element is dropped, we add dragged class to it
                                                  setting user select to none to show that the dragged element is no longer available to choose*/
    draggableElement.setAttribute("draggable","false"); // so the draggable element should not be draggable anymore
    event.target.insertAdjacentHTML("afterbegin", `<i class = "fas fa-${draggableElementData}"></i>`); // to add the icon to the droppable area using insertAdjacentHTML();

  }
}
