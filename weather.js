const weather = document.querySelector('.js-weather');

const API_KEY = 'cdb691d8419f5858be78e41e147615f5';
const COORDS = 'coords';

function getWeather(lat, lon) {
  // 여기서 fetch()는 request()와 같은 역할
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(response => response.json()) // 여기서 then은 자료가 처리되기까지 기다리라는 명령어.
    .then(json => {
      const temperature = json.main.temp,
        location = json.name;
      weather.innerText = `${temperature}℃ @ ${location}`;
    });
}

// LS에 위치 정보 저장 함수
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // object -> str으로
}

// 위치정보 획득 실패할 때 함수
function handleGeoError() {
  console.log(`can't access geo location`);
}
// 위치정보 획득 성공할 때 함수
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // Tip: 만약 obj 내에서 key 또는 value의 이름과 변수의 이름이 같을 때 이렇게 표현 가능
    longitude,
  };

  saveCoords(coordsObj);

  getWeather(latitude, longitude);
}
// 위치정보 요청 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  // navigator.geolocation.getCurrentPosition은 하나의 위치정보 요청 함수 set라고 보면 됨
  // 유저의 현재 위치 정보 요청 && 성공하면 첫 번째, 실패하면 두 번째 실행
}
// LS에서 정보 가져오는 함수
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  console.log(loadedCoords);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
