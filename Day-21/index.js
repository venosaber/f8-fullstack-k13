/* -------------build content for sidebar---------------*/
/*

                                               ┌───────────────────────────┐
                                sidebar  ◄─────┼────────── .side-bar       │
                                               │      ┌───────────────────┐│
                                               │      │.side-bar__header  ││
                                               │      │                   ││
                                               │      └───────────────────┘│
                                               │                           │          sidebar__item_contents []
                                               │ ┌────────────────────────┐│               │
                                               │ │                        ││               │
                                               │ │     .side-bar__item    │◄───────────────┤
                                               │ └────────────────────────┘│               │ for each itemContent
                                               │ ┌────────────────────────┐│               │ │  ┌────────────────────────────────────────────────────┐
                                               │ │                        ││               │ │  │sidebar.innerHTML                                   │
                                               │ │     .side-bar__item    │◄───────────────┤ └─►│                                                    │
                                               │ └────────────────────────┘│               │    │  +=`<div class="side-bar__item>${itemContent}</div>│
                                               │ ┌────────────────────────┐│               │    │                                                    │
                                               │ │                        ││               │    └────────────────────────────────────────────────────┘
               sidebar__item__parent ◄─────────┼─┼─    .side-bar__item    │◄───────────────┘
                                               │ │                        ││
                         │                     │ │                        ││
                         │                     │ │┌──────────────────────┐││
                         │                     │ ││.side-bar__item__child│││               sidebar__item__child_contents []
                         │                     │ ││                      │││                    │
                         │                     │ ││┌────────────────────┐│││                    │
                         │      childItem  ◄───┼─┼┼┴────────────────────┘││◄────────────────────┤  for each itemContent
                         │                     │ ││┌────────────────────┐│││                    │  │  ┌────────────────────────────────────────────┐
                         │      childItem  ◄───┼─┼┼┴────────────────────┘││◄────────────────────┘  │  │sidebar__item__child.innerHTML              │
                         ▼                     │ │└──────────────────────┘││                       └─►│                                            │
┌──────────────────────────────────────────┐   │ └────────────────────────┘│                          │ +=`<div class="side-bar__item__child_item> │
│          onclick = ()=>  {               │   │                           │                          │                                            │
│                                          │   │                           │                          │                      ${itemContent}</div>  │
│                                          │   │                           │                          └────────────────────────────────────────────┘
│  childItem's currentDisplay === 'none'?  │   └───────────────────────────┘
│       │                        │         │
│       │                        │         │
│       │true                    │false    │
│       │                        │         │
│       ▼                        ▼         │
│ set to "block"           set to "none"   │
│                                          │
│     }                                    │
└──────────────────────────────────────────┘

 */
const sidebar = document.querySelector(".side-bar");
const sidebar__item_contents = [
    `<span>Menu</span>`,
    `<span class="mdi mdi-account"></span><span>Quản Lý Đơn Hàng</span>`,

    `<div>
            <div><span class="mdi mdi-account"></span><span>Quản Lý Xe</span></div>
            <span class="mdi mdi-chevron-down"></span>
     </div>
     <div class="side-bar__item__child"></div>`,

    `<span class="mdi mdi-account"></span><span>Quản Lý Dịch Vụ</span>`,
    `<span class="mdi mdi-account"></span><span>Cài Đặt Khác</span>`
];
sidebar__item_contents.forEach(itemContent => {
    sidebar.innerHTML += `<div class="side-bar__item">${itemContent}</div>`;
});

// build content for sidebar__item__child
const sidebar__item__child_contents = [
    `<span class="mdi mdi-account"></span><span>Quản Lý Xe Máy</span>`,
    `<span class="mdi mdi-account"></span><span>Quản Lý Xe Hơi</span>`
]
const sidebar__item__child = document.querySelector(".side-bar__item__child");
sidebar__item__child_contents.forEach(itemContent => {
    sidebar__item__child.innerHTML += `<div class="side-bar__item__child_item">${itemContent}</div>`;
});

// add show/hide function to the 3rd side-bar__item
const sidebar__item__child_item = Array.from(document.getElementsByClassName("side-bar__item__child_item"));
const sidebar__item__parent = document.querySelector(".side-bar__item:nth-of-type(3)");
sidebar__item__parent.onclick = () => {
    sidebar__item__child_item.forEach(childItem => {
        /* for the first time, .style.display just shows inline style, not from CSS file
         * therefore, should assign .style.display to window.getComputedStyle().display
         */
        const currentDisplay = window.getComputedStyle(childItem).display;
        childItem.style.display = (currentDisplay === "none") ? "block" : "none";
    })
}

/*---------------------build content for table----------------------*/
/*

                        for each key in Object.keys(content)

                      ┌──────────────────────┬─────┐
                      │                      │     │
                      │                      │     │
                      │                ┌─────┼─────┼─────────────────────────────────────┐
                      │                │     │     │                     .table          │
                      │                │┌────┼─────┼───────────────────────────────────┐ │
                      │                ││    │     ▼ ┌─────┐ ┌─────┐  .table-header    │ │
                      │                ││    │       │ key │ │ key │                   │ │
                      │                ││    │       └─────┘ └─────┘                   │ │
                      │                │└────┼─────────────────────────────────────────┘ │
                      │                │┌────┼─────────────────────────────────────────┐ │
tableContents = [     │                ││    │ ┌────────────┐  ┌───┐                   │ │
                      │                ││    ▼ │content[key]│  │   │  .table-body      │ │
                      │                ││      └────────────┘  └───┘                   │ │
  {Id:    ,Name:   ,Mail:    ,Action: }│└──────────────────────────────────────────────┘ │
                                       │                                                 │
              │                        │┌──────────────────────────────────────────────┐ │
              │                        ││                                              │ │
              └────────────────────────►│                              .table-body     │ │
┌──────────────────────────────────┐   │└──────────────────────────────────────────────┘ │
│ for each content in tableContents│   │                                                 │
└──────────────────────────────────┘   │┌──────────────────────────────────────────────┐ │
             ┌─────────────────────────►│                                              │ │
             │                         ││                             .table-body      │ │
             │                         │└──────────────────────────────────────────────┘ │
 {Id:    ,Name:   ,Mail:    ,Action: } │                                                 │
                                       │                                                 │
]                                       └─────────────────────────────────────────────────┘

 */
const table = document.querySelector(".table");
const thead = document.querySelector(".table-header");

const actionContent =
    `<button class="edit-btn">
            <span class="mdi mdi-pencil"></span>edit
     </button>
     <button class="del-btn">
            <span class="mdi mdi-trash-can-outline"></span>delete
     </button>`;
const tableContent = [
    {Id: 1, Name: 'Tran Van A', Mail: 'a@test.com'},
    {Id: 2, Name: 'Tran Van B', Mail: 'b@test.com'},
    {Id: 3, Name: 'Tran Van C', Mail: 'c@test.com'}
];
tableContent.forEach(member => member.Action = actionContent);

const keys = Object.keys(tableContent[0]);
// the header of the table
keys.forEach(key => {
    thead.innerHTML += `<div class="table-header__cell">${key}</div>`
});
// the body of the table
tableContent.forEach(content => {
    let row = '<div class="table-body">';
    keys.forEach(key => {
        row += `<div class="table-body__cell">${content[key]}</div>`
    });
    row += '</div>';
    table.innerHTML += row;
});

/*-------------------- the overlay & dialog ------------------------*/
/*

                   ┌───────────────────────────────────────────────────────┐
                   │                         .overlay                      │
                   │                                                       │
                   │   ┌──────────────────────────────────────────────────┐│
                   │   │                                            ┌───┐ ││
                   │   │                                            │ X─┼─┼┼──┐
                   │   │                                            └───┘ ││  │
                   │   │                                                  ││  │  ┌──────────┐
                   │   │                                                  ││  │  │          │
                   │   │                                                  ││  │  │ .edit-btn│
                   │   │                                                  ││  │  └──────────┘
                   │   │┌───────────────────────────────────────────────┐ ││  │  ┌──────────┐
                   │   ││        .dialog__action                        │ ││  │  │          │
                   │   ││                                               │ ││  │  │ .edit-btn│
                   │   ││ ┌────────────────┐       ┌──────────────────┐ │ ││  │  └──────┬───┘
                   │   ││ │  button        │       │ button           │ │ ││  │         │
                   │   ││ │           │    │       │        │         │ │ ││  │         │
                   │   ││ └───────────┼────┘       └────────┼─────────┘ │ ││  │         │
                   │   │└─────────────┼─────────────────────┼───────────┘ ││  │         │
                   │   └──────────────┼─────────────────────┼─────────────┘│  │         │
                   └──────────────────┼─────────────────────┼──────────────┘  │         │
                                      │                     │                 │         │
                                      │                     │                 │         ▼
                                      ▼                     ▼                 ▼
                                     ┌────────────────────────────┐                   editButtons[]
                                     │  dialog__action_Buttons[]  │      xButton             │
┌─────────────────────────────────┐  └──────────────────┬─────────┘          │               │
│                                 │                     │                    │               │
│button => button.onclick = ()=>{ │                     │                    │               │
│                                 │                     │                    │               │
│ ┌──────────────────────────┐    │                     ▼                    ▼               ▼
│ │ overlay's currentDisplay │    │                   ┌────────────────────────────────────────┐
│ │                          │    │                   │                                        │
│ │       ==="none"?         │    │                   │            [   ,   ,   ]               │
│ └─────┬─────────────┬──────┘    │                   └──────────────────┬─────────────────────┘
│       │true         │false      │                                      │
│       │             │           │                                      │.flat(1)
│       ▼             ▼           │                                      │
│ set to "flex"   set to "none"   │    for each button                   ▼
│                                 │ ◄─────────────────── overlayDisplayButtons[]
│                                 │
│ }                               │
└─────────────────────────────────┘

 */
const editButtons = Array.from(document.getElementsByClassName("edit-btn"));
const dialog__action_Buttons = Array.from(document.querySelectorAll(".dialog__action>button"));
const xButton = document.querySelector(".dialog__header__icon");

// clicking these buttons => the overlay & dialog is shown or hidden
const overlayDisplayButtons = [editButtons, dialog__action_Buttons, xButton].flat(1);
const overlay = document.querySelector(".overlay");

overlayDisplayButtons.forEach(button => button.onclick = () => {
    /* for the first time, .style.display just shows inline style, not from CSS file
     * therefore, should assign .style.display to window.getComputedStyle().display
     */
    const currentDisplay = window.getComputedStyle(overlay).display;
    overlay.style.display = (currentDisplay === "none") ? "flex" : "none";
});
