'use strict';
const toDoForm = document.querySelector('.js-form-toDo'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-list-toDo');

const TODOS_LS = 'toDos';

let toDos = [];

const deleteToDos = function (e) {
  const btn = e.target; // 해당 event(여기에선 btn의 click)의 대상을 targeting함
  const li = btn.parentNode; // btn에서 해당 li를 선택하기 위해 parentNode를 사용
  toDoList.removeChild(li); // 클릭된 li를 지움

  const cleanToDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  // 클릭한 li의 id와 같지 않은 나머지 li들을 다시 toDos의 array에 재정리 함. 결국 클릭한 li만 제외하게 되는 결과

  saveToDos(); // 그렇게 정리된 toDos를 다시 LS에 save함
};

const saveToDos = function () {
  // Object -> String
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // 참고, JSON.stringify는 JS object를 string으로 바꿔줌
  // (local storage의 모든 데이터를 object가 아닌 string으로 저장하려하기 때문)
};

const displayToDos = function (toDo) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;

  // create elements
  toDoList.appendChild(li);
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(span);

  delBtn.innerText = '❌';
  span.innerText = toDo;

  // function for delete
  delBtn.addEventListener('click', deleteToDos);

  // create toDo Object to make toDos Array
  const toDoObj = {
    task: toDo,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
};

const submitToDos = function (e) {
  e.preventDefault();

  const currentValue = toDoInput.value;

  displayToDos(currentValue);

  toDoInput.value = '';
};

const loadToDos = function () {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // 아래는 LS에 저장된 toDos를 같이 표시해주는 역할, 즉 display는 두번 이뤄짐. submit에서 한번, loaded에서 한번 더.
    // JSON.parse() : String -> Object
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      displayToDos(toDo.task);
    });
  }
};

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', submitToDos);
}
init();
