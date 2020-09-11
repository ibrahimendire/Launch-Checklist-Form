// Write your JavaScript code here!
let form = document.querySelector("form");
let result = [];
fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then(function (res) {
      return res.json();
   })
   .then(function (json) {
      result = json;
      console.log(result);
   });

window.addEventListener("load", function () {
   let form = document.querySelector("form");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   form.addEventListener("submit", function (event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInLitter = document.querySelector("input[name=fuelLevel]");
      let cargoMassInKg = document.querySelector("input[name=cargoMass]");
      let launchStatus = document.getElementById("launchStatus");
      let faultyItems = document.getElementById("faultyItems");


      pilotStatus.innerHTML = `Pilot: ${pilotNameInput.value} is Ready`
      copilotStatus.innerHTML = `Co-pilot: ${copilotNameInput.value} is Ready`
      fuelStatus.innerHTML = `Fuel level high enough for launch`
      cargoStatus.innerHTML = `Cargo mass low enough for launch`

      if (pilotNameInput.value === "" ||
         copilotNameInput.value === "" ||
         fuelLevelInLitter.value === "" ||
         cargoMassInKg.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(pilotNameInput.value) !== true ||
         isNaN(copilotNameInput.value) !== true ||
         isNaN(fuelLevelInLitter.value) === true ||
         isNaN(cargoMassInKg.value) === true) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else {
         if (fuelLevelInLitter.value < 10000) {
            fuelStatus.innerHTML = `Fuel level too low for launch`
            fuelStatus.style.color = "red"
            launchStatus.innerHTML = "Shuttle is Not ready for launch"
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
            event.preventDefault();
         } if (cargoMassInKg.value > 10000) {
            cargoStatus.innerHTML = `Cargo mass too high for launch`
            cargoStatus.style.color = "red"
            launchStatus.innerHTML = "Shuttle is Not ready for launch"
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
            event.preventDefault();
         } if (cargoMassInKg.value <= 10000 && fuelLevelInLitter.value >= 10000) {
            launchStatus.innerHTML = "Shuttle is  ready for launch"
            fuelStatus.style.color = "black"
            cargoStatus.style.color = "black"
            launchStatus.style.color = "green";
            faultyItems.style.visibility = "visible";
            event.preventDefault();
         }

         let object = result[Math.floor(Math.random() * result.length)];
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
    <ol>
    <li>Name: ${object.name}</li>
    <li>Diameter: ${object.diameter}</li>
    <li>Star: ${object.star}</li>
    <li>Distance from Earth: ${object.distance}</li>
    <li>Number of Moons: ${object.moons}</li>
    </ol>
    <img src="${object.image}">`;
      }
   });
});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
