/*
                                           ┌────────────────────────────┐          ┌─────────────────────────────────┐
   ┌──────────────────────┐                │ clear-btn is hidden        │          │isDropdownOpen?showDropdown()    │
   │                      │                │                            │◄────┐    │              :hideDropdown()    │
   │   inputE.value =''   │◄───────────────┼─resetInputToDefault()      │     │    └─────────────────────────────────┘
   │                      │                └────────────────────────────┘     │                        ▲
   │   render('')         │                                              clear-btn   toggle-btn ───────┘
   │                      │                                                    ▲       ▲
   └──────────────────────┘    ┌───────────────────────────────────────────────┼───────┼──────┐
                               │                                               │       │      │
                               │                                               │       │      │
                               │    ┌──────────────────────────────────────────┼───────┼──┐   │
                               │    │ ┌───────────────────────────────────┐  ┌─┼──┐ ┌──┼─┐│   │             render(searchStr)
                               │    │ │          ▲                        │  │ │  │ │  │ ││   │        ┌─────────────────────────────────────────────────┐
                               │    │ │   label ─┘            input       │  │ X  │ │ V  ││   │        │                                                 │
                               │    │ └───────────────────────────────────┘  └────┘ └────┘│   │        │  reset content: ulE.innerHTML = ''              │
                               │    └─────────────────────────────────────────────────────┘   │        │                                                 │
                               │    ┌───────────────────────────────────────────┐             │        │                                                 │
                               │    │ ul                                        │             │        │                                                 │       members = [
     isDropdownOpen     ◄──────┼────┼──                                         │             │        │  member.name.toLowerCase()                filter│                    {id:  , name: }
                               │    │    ┌─────────────────────────────────┐    │             │        │                                     ◄───────────┼──────
                               │    │    │li                               │    │             │        │  .includes(searchStr.toLowerCase()              │                    {id:  , name: }
     isOptionChosen     ◄──────┼────┼────┼─                                │    │             │        │                                                 │
                               │    │    └─────────────────────────────────┘    │             │        │               │                                 │                 ]
                               │    │    ┌─────────────────────────────────┐    │             │        │               │ map()                           │
                               │    │    │li                               │    │             │        │               │                                 │
            cursor       ◄─────┼────┼────┼─                                │    │             │        │               │                                 │
                               │    │    └─────────────────────────────────┘    │             │        │               ▼                                 │
                               │    └───────────────────────────────────────────┘             │        │                                                 │
                               │                                                              │        │  <li class="option">${member.name}</li>
                               │                                                              │        │                                                 │
                               │                                                              │        │                │                                │
                               │                                                              │        │                │                                │
                               └──────────────────────────────────────────────────────────────┘        │                ▼                                │
                                                                                                       │                                                 │
                                                                                                       │     ulE.innerHTML +=                            │
                                                                                                       │                                                 │
                                                                                                       │                                                 │
                                                                 inputE                                │                                                 │
                                                                    │ │                                │ query all .option item                          │
                                                                    │ │                                │   │                                             │
                                                                    │ │                                │   │     ┌───────────────────────────────────┐   │
                                                   input event  ◄───┘ └──────►focus event              │   │     │                                   │   │
                                                                                                       │   └────►│ add click event                   │   │
                                             ┌──────────────────────────┐    ┌──────────────┐          │ for each│                                   │   │
                                             │  render(inputE.value)    │    │showDropdown()│          │  item   │   = setNameValue(item.textContent)│   │
                                             │                          │    └──────────────┘          │         └──────────┬────────────────────────┘   │
                                             │ ensureDropdownVisible()  │                              └────────────────────┼────────────────────────────┘
                                             │                          │                                                   │
                                             │   isOptionChosen = false │                                                   │
                                             │                          │                                                   │
                                             │  clear-btn is hidden     │                                                   ▼
                                             │                          │                                                 ┌──────────────────────────────┐
                                             │    cursor = null         │                                                 │                              │
                                             │                          │                       setNameValue(optionValue) │ inputE.value = optionValue   │
                                             └──────────────────────────┘                                                 │                              │
                                                                                                                          │                              │
                                                                                                                          │                              │
                                                                                                                          │ isOptionChosen = true        │
                                                                                                                          │                              │
                                                                                                                          │ clear-btn display "inline"   │
                                                                                                                          │                              │
                                                                                                                          │ hideDropdown();              │
                                                                                                                          │                              │
                                                                                                                          └──────────────────────────────┘

 */
const inputE = document.querySelector("#name");
const clearBtnE = document.querySelector(".clear-btn");
const toggleBtnE = document.querySelector(".toggle-btn");
const ulE = document.querySelector("#name~ul");
const members = [
    {id: 1, name: 'Trung'},
    {id: 2, name: 'Dung'},
    {id: 3, name: 'Luc'},
    {id: 4, name: 'Son'},
    {id: 5, name: 'Giang'},
    {id: 7, name: 'Hoc'},
    {id: 8, name: 'Dat'},
    {id: 9, name: 'Huy'},
    {id: 10, name: 'Vuong'},
]

// check the display status of ulE
let isDropdownOpen = false;
// check if there is a valid value placed on the inputE
let isOptionChosen = false;
// the cursor of the current option inside the ulE
let cursor = null;

// Force the DOM to redraw immediately
function ensureDropdownVisible() {
    // Use setTimeout to make sure this happens after other changes in DOM
    setTimeout(() => {
        if (document.activeElement === inputE) {
            if (ulE.style.display !== "block") {
                ulE.style.display = "block";
                // Force reflow
                void ulE.offsetHeight;
            }
        }
    }, 0);
}

inputE.addEventListener("input", () => {
    render(inputE.value);
    ensureDropdownVisible();

    isOptionChosen = false;
    clearBtnE.style.display = "none";
    cursor = null;

    if (inputE.value.trim() !== '') {
        inputE.classList.add("filled");
    } else {
        inputE.classList.remove("filled");
    }
});

// while focus on input => show dropdown
inputE.addEventListener("focus", () => {
    showDropdown();
});

// hide the dropdown when clicked outside
document.addEventListener("click", (event) => {
    if (!event.target.closest('.form__field')) {
        hideDropdown();
        if (!isOptionChosen) resetInputToDefault();
    }
});

function showDropdown() {
    ulE.style.display = "block";
    toggleBtnE.classList.remove("fa-caret-down");
    toggleBtnE.classList.add("fa-caret-up");
    isDropdownOpen = true;
}

function hideDropdown() {
    ulE.style.display = "none";
    toggleBtnE.classList.remove("fa-caret-up");
    toggleBtnE.classList.add("fa-caret-down");
    isDropdownOpen = false;
}

toggleBtnE.addEventListener('click', () => {
    isDropdownOpen ? hideDropdown() : showDropdown();
});

clearBtnE.addEventListener('click', () => {
    clearBtnE.style.display = "none";
    resetInputToDefault();
})

function resetInputToDefault() {
    inputE.value = '';
    inputE.classList.remove("filled");
    render(inputE.value);
}

function render(searchStr) {
    // reset contents
    ulE.innerHTML = '';
    // filter and display
    const ulE_html = members
        .filter(member => member.name.toLowerCase().includes(searchStr.toLowerCase()))
        .map(member => `<li class="option">${member.name}</li>`)
        .join('');
    if (ulE_html) {
        ulE.innerHTML += ulE_html;
    } else {
        ulE.innerHTML = `<li class="no-option">No option</li>`;
    }

    // for each option item, add click event
    // => whenever clicked, option's textContent will be copied to input's value
    Array.from(document.querySelectorAll(".option"))
        .forEach(item => item.addEventListener("click", () => {
            setNameValue(item.textContent);
        }));
}

function setNameValue(optionValue) {
    // copy the option's value to input's value
    inputE.value = optionValue;
    // to keep the label stay on top of input field
    inputE.classList.add("filled");
    // to know that an option has been chosen
    isOptionChosen = true;
    // the clear button is shown
    clearBtnE.style.display = "inline";
    hideDropdown();
}

render('');

inputE.addEventListener('keydown', event => {
    // keycode 40 - ArrowDown, 38 - ArrowUp, 13 - Enter
    if (![40, 38, 13].includes(event.keyCode)) return;
    const filteredOptions = Array.from(document.querySelectorAll(".option"));

    if (filteredOptions.length === 0) return;

    if (cursor === null) {
        cursor = (event.keyCode === 40) ? 0 :
            (event.keyCode === 38) ? (filteredOptions.length - 1) : cursor;
    } else if (event.keyCode === 40) {
        cursor++;
    } else if (event.keyCode === 38) {
        cursor--;
    }

    if (cursor === -1) {
        cursor = filteredOptions.length - 1;
    } else if (cursor === filteredOptions.length) {
        cursor = 0;
    }

    // if the cursor is at the itemE => the itemE will be highlighted, otherwise not
    filteredOptions.forEach((itemE, index) => {
        (index === cursor) ? itemE.classList.add('highlight') : itemE.classList.remove('highlight')
    })
    if (event.keyCode === 40 || event.keyCode === 38) {
        const highlightedItem = filteredOptions[cursor];
        highlightedItem.scrollIntoView();
    }

    // press Enter => copy the option's value to inputE
    if (event.keyCode === 13 && cursor !== null) {
        setNameValue(filteredOptions[cursor].textContent);
        event.preventDefault(); // avoid reloading
    }
});