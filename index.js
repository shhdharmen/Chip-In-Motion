let selectedItems = [];
let chipBtns;
let selectedChipBtns;
let helpLabel = document.getElementById('helpLabel');
let selectedChipContainer = document.getElementById('selectedChipContainer');
let chipCotainer = document.getElementById('chipCotainer');
let rightOfLastMovedChip = 0;
let count = 0;

function initChipBtns() {
    chipBtns = document.getElementsByClassName('chip-btn');
    for (let i = 0; i < chipBtns.length; i++) {
        let pos = $(chipBtns[i]).position();
        $(chipBtns[i]).css('left', pos.left);
        $(chipBtns[i]).css('top', pos.top);
    }
}

function initSelectedChipBtns() {
    selectedChipBtns = document.getElementsByClassName('selected-chip-btn');
    for (let i = 0; i < selectedChipBtns.length; i++) {
        let pos = $(selectedChipBtns[i]).position();
        $(selectedChipBtns[i]).css('left', pos.left);
        $(selectedChipBtns[i]).css('top', pos.top);
    }
}

function addToSelectedItem(ele) {
    let pos = $(ele).position();
    $(ele).css('left', pos.left);
    $(ele).css('top', pos.top);
    if ($(ele).hasClass('chip-btn')) {
        count++;
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
        }
        rightOfLastMovedChip += $(ele).width() + 30;
        initSelectedChipBtns();
        for (let j = 0; j < selectedChipBtns.length; j++) {
            if (selectedChipBtns.length < 4 || j !== 0) {
                if (j === count - 4 && j !== 0) {
                    $(selectedChipBtns[count - 4]).addClass('merging-chip');
                }
                else {
                    $(selectedChipBtns[j]).animate({
                        left: '+=' + ($(ele).width() + 30) + 'px'
                    }, 500);
                }
            }
        }
        if (rightOfLastMovedChip > 301) {
            if (rightOfLastMovedChip > 301.5) {
                $(selectedChipBtns[0]).addClass('counter-chip');
            }
            setTimeout(function () {
                $(selectedChipBtns[0]).removeClass('counter-chip');
            }, 300);
            setTimeout(function () {
                selectedChipBtns[0].innerHTML = '+' + (count - 3);
            }, 100);
        }
        $(ele).addClass('position-absolute');
        $(ele).addClass('selected-chip-btn');
        $(ele).animate({
            top: '20px',
            left: 12 + 'px'
        }, 500);

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