import quests from '../data.js';
import { findById } from '../utils.js';
import { getUser, updateUserChoice } from '../local-storage-utils.js';

// const user = getUser();
const section = document.querySelector('section');
const form = document.createElement('form');
const searchParams = new URLSearchParams(window.location.search);

const questId = searchParams.get('id');
const quest = findById(quests, questId);
console.log(quest);

const h1 = document.createElement('h1');
h1.textContent = quest.title;

const descriptionDiv = document.createElement('div');
descriptionDiv.textContent = quest.description;

const image = document.createElement('img');
image.src = quest.image;

const result = document.createElement('div');

const button = document.createElement('button');
button.textContent = 'Ima go with this one';
 
form.append(h1, image, result, descriptionDiv, button);

for (let choice of quest.choices) {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'choice';
    radio.value = choice.id;
    label.append(choice.description, radio);
    form.append(label);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    const choice = formData.get('choice');  //This part messed me up, this choice needed to match choice on line 36
    const userChoice = findById(quest.choices, choice);
    updateUserChoice(questId, userChoice);
    result.textContent = userChoice.result;
    // alert(result);
    console.log(userChoice);
    // alert(JSON.stringify(getUser(), true, 2));

});

section.append(form);
