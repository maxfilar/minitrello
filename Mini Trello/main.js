"use strict"
$("body").css({
    'background-color': 'gray'
})

// ================== letiables ====================
const BOARD_STATS = {
    name: "",
    background: undefined,
    array_lists: [],
    cur_page: 1,
    max_lists_page: 4,
}
let page = []
BOARD_STATS.array_lists.push(page)
const TRIGGERS = {
    board_create_panel_opened: false,
}
const BACKGROUNDS_TEMPLATE_LIST = [
    new BackgroundTemplate("images/template1.jpg"),
    new BackgroundTemplate("images/template2.jpg"),
    new BackgroundTemplate("images/template3.jpg"),
]

// ================constructors=====================
function BackgroundTemplate(_url) {
    this.img = _url
    this.chosen = false
}

function List(_name, _id) {
    this.name = _name
    this.id = _id
    this.edit_panel_opened = false
    this.cards_list = []
    this.page = BOARD_STATS.array_lists.length
}

function Card(_name, _id) {
    this.name = _name
    this.id = _id
}

// ===================functions=====================
function create_new_board_panel() {
    if (TRIGGERS.board_create_panel_opened == false) {
        TRIGGERS.board_create_panel_opened = true
        console.log('board are created')

        // create the panel
        $("body").append('<div id="board_create_panel"></div>')

        // type board name panel
        $("#board_create_panel").append('<p class="create_panel_text">Type a name of a new board:</p>')
        $("#board_create_panel").append(`<input type="text" id="board_name_type">`)

        // background templates
        $("#board_create_panel").append('<p class="create_panel_text">Choose the background from templates:</p>')
        $("#board_create_panel").append(`<div id="templates_background_panel"></div>`)
        for (let i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
            $("#templates_background_panel").append(`<div class="template_image" id="image_id${i}"></div>`)
            $(`#image_id${i}`).css({
                'background-image': `url(${BACKGROUNDS_TEMPLATE_LIST[i].img})`,
            })
            console.log('images are added to templates')
        }

        // create button
        $("#board_create_panel").append(`<button id="create_board">Create</button>`)
    }
}

function select_image_from_template() {
    // get id from current image
    let get_element_id = $(this).attr('id')
    let get_id_num = get_element_id.slice(8, get_element_id.length)
    console.log(`image id num:${get_id_num}`)

    // clear chooses from all images
    for (let i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
        BACKGROUNDS_TEMPLATE_LIST[i].chosen = false
        $(`#image_id${i}`).css({
            'border': '0px',
            'margin-left': '10px',
            'margin-bottom': '10px',
        })
    }

    // mark this like chosen
    BACKGROUNDS_TEMPLATE_LIST[get_id_num].chosen = true
    $(`#image_id${get_id_num}`).css({
        'margin-left': '8px',
        'margin-bottom': '8px',
        'border': '2px solid black'
    })
}

function create_new_board() {
    // get setup 
    let get_name = $("#board_name_type").val()
    let get_background = undefined
    for (let i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
        if (BACKGROUNDS_TEMPLATE_LIST[i].chosen) {
            get_background = BACKGROUNDS_TEMPLATE_LIST[i].img
            break
        }
    }

    if (get_name != "" && get_background != undefined) {
        // remove elements for create
        $("#create_new_board").remove()
        $("#board_create_panel").remove()
        TRIGGERS.board_create_panel_opened = false

        // create top panel
        $("body").append(`<div id="top_panel"></div>`)
        $("#top_panel").append(`<p id="board_name"></p>`)
        $("#top_panel").append(`<button id="prev_page">Back</button>`)
        $("#top_panel").append(`<p id="page_current">Page: ${BOARD_STATS.cur_page}</p>`)
        $("#top_panel").append(`<button id="next_page">Next</button>`)
        $("#top_panel").append(`<button id="change_board_setup">Change</button>`)

        // create button "Create new list"
        $("body").append(`<div id="list_block"></div>`)
        $("#list_block").append(`<button id="create_new_list">Create new list</button>`)

        // apply setup
        BOARD_STATS.name = get_name
        BOARD_STATS.background = get_background

        board_setup_apply()
    }
}

function create_setup_change_panel() {
    if (TRIGGERS.board_create_panel_opened == false) {
        TRIGGERS.board_create_panel_opened = true

        // create the panel
        $("body").append('<div id="board_create_panel"></div>')
        let btn_change_pos = $("#change_board_setup").offset()
        $("#board_create_panel").css({
            'z-index': 3,
            'position': 'fixed',
            'right': '8px',
            'top': btn_change_pos.top + 48 + 'px'
        })

        // type board name panel
        $("#board_create_panel").append('<p class="create_panel_text">Type a new name for the board:</p>')
        $("#board_create_panel").append(`<input type="text" id="board_name_type">`)

        // background templates
        $("#board_create_panel").append('<p class="create_panel_text">Choose the background from templates:</p>')
        $("#board_create_panel").append(`<div id="templates_background_panel"></div>`)
        for (let i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
            $("#templates_background_panel").append(`<div class="template_image" id="image_id${i}"></div>`)
            $(`#image_id${i}`).css({
                'background-image': `url(${BACKGROUNDS_TEMPLATE_LIST[i].img})`,
            })
            console.log('images are added to templates')
        }

        // create button
        $("#board_create_panel").append(`<button id="change_board">Apply</button>`)
    } else {
        $("#board_create_panel").remove()
        TRIGGERS.board_create_panel_opened = false
    }
}

function apply_new_changes() {
    // get setup 
    let get_name = $("#board_name_type").val()
    let get_background = undefined
    for (let i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
        if (BACKGROUNDS_TEMPLATE_LIST[i].chosen) {
            get_background = BACKGROUNDS_TEMPLATE_LIST[i].img
            break
        }
    }

    // apply setup
    if (get_name != "" && get_background != undefined) {
        // reset
        $("#board_create_panel").remove()
        TRIGGERS.board_create_panel_opened = false

        BOARD_STATS.name = get_name
        BOARD_STATS.background = get_background

        board_setup_apply()
    }
}

function board_setup_apply() {
    $("#board_name").text(BOARD_STATS.name)
    $("body").css({
        'background-image': `url(${BOARD_STATS.background})`
    })
}

function open_creation_list_panel() {
    $("#create_new_list").remove()

    $("#list_block").append(`<div id="new_list_creation"></div>`)

    $("#new_list_creation").append(`<input type="text" id="new_list_name">`)
    $("#new_list_creation").append(`<button id="list_create_apply" class="list_creation_panel" >Create</button>`)
    $("#new_list_creation").append(`<button id="list_create_cancel" class="list_creation_panel" >Cancel</button>`)
}

function close_creation_list_panel() {
    $("#new_list_creation").remove()
    $("#create_new_list").remove()
    if (BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1].length < BOARD_STATS.max_lists_page) {
        $("#list_block").append(`<button id="create_new_list">Create new list</button>`)
    }
}

function list_elements_create(id) {
    $("#list_block").append(`<div id="id_list${id}" class="class_list" ></div>`)
    $(`#id_list${id}`).append(`<p id="list_name_id${id}" class="list_name_class">${BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][id].name}</p>`)
    $(`#id_list${id}`).append(`<button id="list_edit_id${id}" class="list_edit_class">Edit</button>`)
    btn_addcard_create(id)
}

function create_new_list() {
    let get_name = $("#new_list_name").val()
    let get_id = BOARD_STATS.array_lists[BOARD_STATS.array_lists.length - 1].length


    //console.log(`lists before new creating:${JSON.stringify(BOARD_STATS.array_lists,null,2)}`)
    if (get_name != "") {
        BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1].push(new List(get_name, get_id))

        let new_page = []
        if (BOARD_STATS.array_lists[BOARD_STATS.array_lists.length - 1].length >= BOARD_STATS.max_lists_page) {
            BOARD_STATS.array_lists.push(new_page)
        }

        console.log(`lists after creating:${JSON.stringify(BOARD_STATS.array_lists, null, 2)}`)
        console.log(`count of pages:${BOARD_STATS.array_lists.length}`)

        list_elements_create(get_id)

        close_creation_list_panel()
    }

}

function get_element_id(sym_start, element) {
    let get_id = $(element).attr('id')
    console.log(`element id: ${get_id}`)
    return get_id.slice(sym_start, get_id.length)
}

function open_list_edit_panel() {
    let get_num = get_element_id(12, this)

    if (BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][get_num].edit_panel_opened == false) {
        BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][get_num].edit_panel_opened = true
        console.log(`btn edit list id: ${get_num}`)

        let position = $(this).offset()

        $("body").append(`<div class="list_edit_panel_class" id="list_edit_panel_id${get_num}"></div>`)
        $(`#list_edit_panel_id${get_num}`).css({
            'z-index': 2,
            'position': 'fixed',
            'top': `${position.top + 36}px`,
            'left': `${position.left + 16}px`
        })

        $(`#list_edit_panel_id${get_num}`).append(`<p id="list_editname_text_id${get_num}" class="list_type_name_class">Type new name: </p>`)
        $(`#list_edit_panel_id${get_num}`).append(`<input type="text" id="list_edit_name_id${get_num}" class="list_edit_name_class">`)
        $(`#list_edit_panel_id${get_num}`).append(`<button id="list_editname_apply_id${get_num}" class="list_edit_btn">Apply</button>`)
        $(`#list_edit_panel_id${get_num}`).append(`<button id="list_delete_id${get_num}" class="list_edit_btn">Delete list</button>`)
    } else {
        close_list_edit_panel(get_num)
    }
}

function close_list_edit_panel(id) {
    BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][id].edit_panel_opened = false

    $(`#list_edit_panel_id${id}`).remove()
}

function list_edit_apply(element) {
    let cur_id = get_element_id(22, element)

    let get_name = $(`#list_edit_name_id${cur_id}`).val()

    if (get_name != "") {
        BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][cur_id].name = get_name
        $(`#list_name_id${cur_id}`).text(`${BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][cur_id].name}`)
    }

    close_list_edit_panel(cur_id)
}

function delete_list(element) {
    let get_id = get_element_id(14, element)

    close_list_edit_panel(get_id)

    BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1].splice(get_id, 1)
    $(`#id_list${get_id}`).remove()

    if (BOARD_STATS.cur_page > 1 &&
        BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1].length < 1 &&
        BOARD_STATS.array_lists[BOARD_STATS.cur_page - 2].length < BOARD_STATS.max_lists_page
    ) {
        jump_prev_page()
    } else {
        reset_lists_order()
    }
    reorder_lists_inpages()
    delete_empty_page()
}

function reset_lists_order() {
    $(".class_list").remove()

    let array = BOARD_STATS.array_lists
    for (let i = 0; i < array[BOARD_STATS.cur_page - 1].length; i++) {
        array[BOARD_STATS.cur_page - 1][i].id = i
        let card_array = array[BOARD_STATS.cur_page - 1][i].cards_list
        for (let j = 0; j < card_array.length; j++) {
            card_array[j].id = j
        }
    }

    for (let i = 0; i < array[BOARD_STATS.cur_page - 1].length; i++) {
        list_elements_create(i)
        let card_array = array[BOARD_STATS.cur_page - 1][i].cards_list
        for (let j = 0; j < card_array.length; j++) {
            card_elements_create(i, card_array[j].id)

            if (j == card_array.length - 1) {
                btn_addcard_create(i)
            }
        }
    }

    console.log(JSON.stringify(BOARD_STATS.array_lists))

    close_creation_list_panel()
}

function jump_next_page() {
    if (BOARD_STATS.cur_page < BOARD_STATS.array_lists.length) {
        $(".list_edit_panel_class").remove()
        for (let i = 0; i < BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1].length; i++) {
            BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][i].edit_panel_opened = false
        }

        BOARD_STATS.cur_page++
        $("#page_current").text(`Page: ${BOARD_STATS.cur_page}`)
        reset_lists_order()
    }
}

function jump_prev_page() {
    if (BOARD_STATS.cur_page > 1) {
        $(".list_edit_panel_class").remove()
        for (let i = 0; i < BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1].length; i++) {
            BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][i].edit_panel_opened = false
        }

        BOARD_STATS.cur_page--
        $("#page_current").text(`Page: ${BOARD_STATS.cur_page}`)
        reset_lists_order()
    }
}

function delete_empty_page() {
    for (let i = 0; i < BOARD_STATS.array_lists.length; i++) {
        if (i + 1 < BOARD_STATS.array_lists.length &&
            BOARD_STATS.array_lists[i].length < BOARD_STATS.max_lists_page &&
            BOARD_STATS.array_lists[i + 1].length < 1) {
            BOARD_STATS.array_lists.splice(i + 1, 1)
        }
    }
}

function reorder_lists_inpages() {
    for (let i = 0; i < BOARD_STATS.array_lists.length; i++) {
        if (i + 1 < BOARD_STATS.array_lists.length &&
            BOARD_STATS.array_lists[i].length < BOARD_STATS.max_lists_page &&
            BOARD_STATS.array_lists[i + 1].length > 0) {
            let list_from_page = BOARD_STATS.array_lists[i + 1][0]

            BOARD_STATS.array_lists[i + 1].splice(0, 1)

            BOARD_STATS.array_lists[i].push(list_from_page)
        }
    }
    delete_empty_page()
    reset_lists_order()
}

function btn_addcard_create(id) {
    $(`#add_card_id${id}`).remove()
    $(`#new_card_name_id${id}`).remove()
    $(`#id_list${id}`).append(`<input type="text" id="new_card_name_id${id}" class="new_card_name_class">`)
    $(`#id_list${id}`).append(`<button id="add_card_id${id}" class="add_card_class">Create new card</button>`)
}

function add_new_card() {
    let get_id = get_element_id(11, this)
    let get_name = $(`#new_card_name_id${get_id}`).val()

    if (get_name !== "") {
        let _list = BOARD_STATS.array_lists[BOARD_STATS.cur_page - 1][get_id].cards_list
        _list.push(new Card(get_name, _list.length))
        console.log(`all lists:${JSON.stringify(BOARD_STATS.array_lists, null, 2)}`)
        card_elements_create(get_id, _list.length - 1)
        btn_addcard_create(get_id)
    }
}

function card_elements_create(list_id, card_id) {
    $(`#id_list${list_id}`).append(`<div id="id_card${card_id}" class="class_card"></div>`)
}



// ====================events=======================
$("#create_new_board").click(create_new_board_panel)

$(document).on("click", ".template_image", select_image_from_template)

$(document).on("click", "#create_board", create_new_board)

$(document).on("click", "#change_board_setup", create_setup_change_panel)

$(document).on("click", "#change_board", apply_new_changes)

$(document).on("click", "#create_new_list", open_creation_list_panel)

$(document).on("click", "#list_create_cancel", close_creation_list_panel)

$(document).on("click", "#list_create_apply", create_new_list)

$(document).on("click", ".list_edit_class", open_list_edit_panel)

$(document).on("click", ".list_edit_btn", function () {
    let get_id = $(this).attr('id')
    let get_type = get_id.slice(0, 14)

    console.log(`finded type: ${get_type}`)

    if (get_type == 'list_delete_id') {
        delete_list(this)
    } else {
        list_edit_apply(this)
    }
})

$(document).on("click", "#next_page", jump_next_page)

$(document).on("click", "#prev_page", jump_prev_page)

$(document).on("click", ".add_card_class", add_new_card)