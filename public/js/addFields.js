document.addEventListener('DOMContentLoaded', () => {
  const addAnswer = document.getElementsByClassName('addAnswer');
  let answerCounter = 0;

  Array.from(addAnswer).forEach(el => el.addEventListener('click', newAnswer));
  
  function newAnswer() {
    const label = document.createElement('label');
    const num = this.getAttribute('data-num');
    const prevFor = this.previousElementSibling.getAttribute('for');
    const lastNum = +prevFor[4] + 1;

    label.classList.add('custom-control', 'custom-radio');
    label.setAttribute('for', `val${num}${lastNum}`);
    label.innerHTML = `<input name="isCorrect${num}" id="val${num}${lastNum}" value="${lastNum}" type="radio" class="custom-control-input">
                      <span class="custom-control-indicator"></span>
                      <span class="custom-control-description"><input type="text" name="answer${num}"></span>`;
    this.insertAdjacentElement('beforebegin', label);
    answerCounter++;
  }
});
