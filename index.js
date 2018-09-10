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
        let left = $(chipBtns[i]).css('left');
        left = left.substring(0, left.length - 2);
        let top = $(chipBtns[i]).css('top');
        top = top.substring(0, top.length - 2);
        let chiPos = {
            left: +left,
            top: +top
        }
        $(chipBtns[i]).addClass('position-absolute');
        if (chiPos.left > pos.left && chiPos.top === pos.top) {
            $(chipBtns[i]).animate({
                left: '-=' + ($(ele).width() + 30) + 'px'
            }, 500);
        }
        // else if (chiPos.top > pos.top && chiPos.left < pos.left) {
        //     $(chipBtns[i]).animate({
        //         top: '-=' + ($(ele).height()) + 'px',
        //         right: '+=' + ($(ele).width() + 30) + 'px'
        //     }, 500);
        // }
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