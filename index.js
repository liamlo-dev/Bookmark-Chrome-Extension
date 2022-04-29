let myList = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const listFromLocalStorage = JSON.parse( localStorage.getItem("myList") )
const tabBtn = document.getElementById("tab-btn")

// show previous stored list
if (listFromLocalStorage) {
    myList = listFromLocalStorage
    render(myList)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myList.push(tabs[0].title)
        myList.push(tabs[0].url)
        localStorage.setItem("myList", JSON.stringify(myList) )
        render(myList)
    })
})

// open in new tab
function render(list) {
    let listItems = ""
    for (let i = 0; i < list.length; i += 2) {
        if (list[i+1] === null){
            listItems += `
                <li>
                    ${list[i]}
                </li>
            `
        }
        else {
            listItems += `
                <li>
                    <a target='_blank' href='${list[i+1]}'>
                        ${list[i]}
                    </a>
                </li>
            `
        }
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myList = []
    render(myList)
})

// clear input field
inputBtn.addEventListener("click", function() {
    myList.push(inputEl.value)
    myList.push(null)
    inputEl.value = ""
    localStorage.setItem("myList", JSON.stringify(myList) )
    render(myList)
})