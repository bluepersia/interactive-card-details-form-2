const inputName = document.getElementById ('card-form__name');
const inputNumber = document.getElementById ('card-form__number');
const inputMonth = document.getElementById ('card-form__month');
const inputYear = document.getElementById ('card-form__year');
const inputCvc = document.getElementById ('card-form__cvc');
const mainEl = document.querySelector ('.main');

document.querySelector ('.card-form').addEventListener ('submit', submit);


function submit (e)
{
    e.preventDefault ();

    let err;

    err = validateInput (inputName);

    err =validateInput (inputNumber) || err;

    let errMonth = validateInput (inputMonth);

    err = errMonth || err;

    if (!errMonth)
        err = validateInput (inputYear) || err;

    err = validateInput (inputCvc) || err;

    if (err)
        return;

    mainEl.innerHTML = (`
        <div class='thanks'>
            <img src='./images/icon-complete.svg' alt='Checkmark' class='thanks__img'/>
            <h2 class='thanks__title'>Thank you!</h2>
            <p class='thanks__body'>We’ve added your card details</p>
            <button class='thanks__btn'>Continue</button>
        </div> 
        `);

        document.querySelector ('.thanks__btn').addEventListener ('click', () => mainEl.innerHTML = '');
}


function validateInput (input) 
{
    let err;

    if (input.dataset.required && !input.value)
        err = 'Is required';
    else if (input.dataset.number && !Number (input.value))
        err ='Must be a number';
    else if(input.dataset.min && Number (input.value) < Number (input.dataset.min))
        err = `Minimum ${input.dataset.min}`;
    else if(input.dataset.max && Number (input.value) > Number (input.dataset.max))
        err =`Maximum ${input.dataset.max}`;
 
    
    const container = input.classList.contains ('card-form__input-date') ? input.parentElement.parentElement : input.parentElement;

    container.classList.remove ('invalid');
    if (err)
    {
        container.classList.add ('invalid');
        container.querySelector ('.card-form__input-error').textContent = err;
    }

    return err;
}