// $(document).ready(function () {
let selectedItems = [];
let chipBtns;
let selectedChipBtns;
let helpLabel = document.getElementById('helpLabel');
let selectedChipContainer = document.getElementById('selectedChipContainer');
let chipCotainer = document.getElementById('chipCotainer');
let widthOfLastMovedChip = 0;

function initChipBtns() {
    chipBtns = document.getElementsByClassName('chip-btn');
    for (let i = 0; i < chipBtns.length; i++) {
        let pos = $(chipBtns[i]).position();
        $(chipBtns[i]).css('left', pos.left);
        $(chipBtns[i]).css('top', pos.top);
    }
}
initChipBtns();

function initSelectedChipBtns() {
    selectedChipBtns = document.getElementsByClassName('selected-chip-btn');
    for (let i = 0; i < selectedChipBtns.length; i++) {
        selectedChipBtns[i].addEventListener("click", function () {
            removeFromSelectedItem(selectedChipBtns[i])
        });
    }
}

function addToSelectedItem(ele) {
    let pos = $(ele).position();
    $(ele).css('left', pos.left);
    $(ele).css('top', pos.top);
    $(ele).removeClass('chip-btn');

    initChipBtns();
    for (let i = 0; i < chipBtns.length; i++) {
        $(chipBtns[i]).addClass('position-absolute');
        $(chipBtns[i]).animate({
            left: '-' + ($(ele).width() - 30 - 12 - 3) + 'px'
        }, 500);
    }

    $(ele).addClass('position-absolute');
    $(ele).addClass('selected-chip-btn');
    $(ele).animate({
        top: '20px',
        left: (widthOfLastMovedChip + 12) + 'px'
    }, 500);
    widthOfLastMovedChip += $(ele).width() + 30;
    let value = ele.getAttribute('value');
    if (selectedItems.length === 0) {
        helpLabel.innerHTML = '&nbsp;';
    }
    // selectedItems.push(value);
    // let newSelectedChip = getNewSelectedChipBtn();
    // newSelectedChip.setAttribute('value', value);
    // newSelectedChip.innerHTML = value;
    // selectedChipContainer.appendChild(newSelectedChip);
    // initSelectedChipBtns();
    // ele.classList.add('fadeOut');
    // chipCotainer.removeChild(ele)
}

function removeFromSelectedItem(ele) {
    console.log(ele);
    let value = ele.getAttribute('value');
    console.log(value);
    console.log(selectedItems);
    selectedItems.splice(selectedItems.indexOf(value), 1);
    if (selectedItems.length === 0) {
        helpLabel.classList.add('d-block');
    }
    let newChip = getNewChipBtn();
    newChip.setAttribute('value', value);
    newChip.innerHTML = value;
    chipCotainer.appendChild(newChip);
    initChipBtns();
    selectedChipContainer.removeChild(ele);
}

function getNewSelectedChipBtn() {
    let selectedChipBtn = document.createElement("button");
    selectedChipBtn.className += 'btn btn-primary mb-3 selected-chip-btn animated fadeIn';
    return selectedChipBtn;
}

function getNewChipBtn() {
    let chipBtn = document.createElement("button");
    chipBtn.className += 'btn btn-primary mb-3 chip-btn animated fadeIn';
    return chipBtn;
}
// });