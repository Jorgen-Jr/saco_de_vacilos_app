
export function enableButton(button_id, enable) {
    //Habilita ou desabilita o botão.
    let btn_target = document.getElementById(button_id);

    try {
        if (enable) {
            btn_target.classList.remove('waiting');
            btn_target.removeAttribute('disabled');
        } else {
            btn_target.setAttribute('disabled', 'disabled');
            btn_target.classList.add('waiting');
        }
    } catch (err) {
        console.error(err.message);
    }
}

export function enableElement(element_id, enable) {
    //Habilita ou desabilita o botão.
    let element_target = document.getElementById(element_id);
    try {
        if (enable) {
            element_target.disabled = false;
        } else {
            element_target.disabled = true;
        }
    } catch (err) {
        console.error(err.message);
    }
}


export function convertToDate(DateTimeTarget){
    let target = {
        day: 0,
        month: 0,
        year: 0,
        hours: 0,
        minutes: 0,
    }

    target.day = DateTimeTarget.substring(8,10);
    target.month = parseInt(DateTimeTarget.substring(5,7)) -1; //getMonth() compreende de 0 a 11, sendo 0 janeiro.
    target.year = DateTimeTarget.substring(0,4);
    target.hours = DateTimeTarget.substring(11,13);
    target.minutes = DateTimeTarget.substring(14,16);
    
    let return_date = new Date();
    
    return_date.setDate(target.day);
    return_date.setMonth(target.month);
    return_date.setFullYear(target.year);
    return_date.setHours(target.hours);
    return_date.setMinutes(target.minutes);

    return return_date;
}