"use strict"

// ================== variables ====================
const BOARD_STATS = {
    name: "", 
    background: undefined,
}
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
        for (var i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
            $("#templates_background_panel").append(`<div class="template_image" id="image_id${i}"></div>`)
            $(`#image_id${i}`).css({
                'background-image' : `url(${BACKGROUNDS_TEMPLATE_LIST[i].img})`,
            })
            console.log('images are added to templates')
        }

        // create button
        $("#board_create_panel").append(`<button id="create_board">Create</button>`)
    }
}

function select_image_from_template(){
    // get id from current image
    let get_element_id = $(this).attr('id')
    let get_id_num = get_element_id.slice(8,get_element_id.length)
    console.log(`image id num:${get_id_num}`)

    // clear chooses from all images
    for (var i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
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
    for (var i = 0; i < BACKGROUNDS_TEMPLATE_LIST.length; i++) {
        if (BACKGROUNDS_TEMPLATE_LIST[i].chosen) {
            get_background = BACKGROUNDS_TEMPLATE_LIST[i].img
            break
        }
    }

    if (get_name != "" && get_background != undefined) {
        // remove elements for create
        $("#create_new_board").remove()
        $("#board_create_panel").remove()

        // apply setup
        BOARD_STATS.name = get_name
        BOARD_STATS.background = get_background

        board_setup_apply()
    }
}

function board_setup_apply() {
    $("body").append(`<p id="board_name">${BOARD_STATS.name}</p>`)
    $("body").css({
        'background-image' : `url(${BOARD_STATS.background})`
    })
}

// ====================events=======================
$("#create_new_board").click(create_new_board_panel)

$(document).on("click",".template_image",select_image_from_template)

$(document).on("click","#create_board",create_new_board)