// Write your JavaScript code here!

function SelectMission(json){
   return Math.floor(Math.random()*json.length);
}


window.addEventListener("load", ()=>{
   let form = document.querySelector("form");
   let missionTarget = document.getElementById("missionTarget");
   let pilotName = document.querySelector("input[name=pilotName]");
   let coPilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let receiveMission = document.getElementById("receiveMission");
   let faultyItems = document.getElementById("faultyItems");
   
   let nameSubmitFirstTime = true;
   let allFieldsFilled = true;
   let correctDataInField = true;
   
   let firstPressMissionBtn = true;
   
   receiveMission.addEventListener("click", ()=>{
      fetch("https://handlers.education.launchcode.org/static/planets.json").then((Response)=>{
         Response.json().then((json)=>{
            let misLoc = json[SelectMission(json)];
            
            missionTarget.innerHTML = 
            `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${misLoc.name}</li>
                  <li>Diameter: ${misLoc.diameter}</li>
                  <li>Star: ${misLoc.star}</li>
                  <li>Distance from Earth: ${misLoc.distance}</li>
                  <li>Number of Moons: ${misLoc.moons}</li>
               </ol>
               <img src="${misLoc.image}"></img>`
         })

         firstPressMissionBtn = false;
         receiveMission.innerHTML = (firstPressMissionBtn? "Receive Mission": "Get a different Mission");
      })
   })
      


   form.addEventListener("submit", (event)=>{
      if(pilotName.value===""||coPilotName.value===""){
         if(fuelLevel.value===""||cargoMass.value===""){alert("All fields are required!");//empty field checker
         allFieldsFilled = false;
         }
      }else if(!isNaN(pilotName.value)||!isNaN(coPilotName.value)){
         alert("Please only type names in the Pilot and Copilot name fields"); correctDataInField = false;//Type checker
      }else if(isNaN(fuelLevel.value)||isNaN(cargoMass.value)){
         alert("Please only type integer values for the Fuel Mass and Cargo Mass fields"); correctDataInField = false;//Type checker
      } 
      
      if(isNaN(pilotName.value)&&isNaN(coPilotName.value)){
         //Add pilot and copilot name to status
         allFieldsFilled = true;
         correctDataInField = true;
         if(nameSubmitFirstTime&&allFieldsFilled){
            pilotStatus.append(` - ${pilotName.value}`);
            copilotStatus.append(` - ${coPilotName.value}`);
            nameSubmitFirstTime = false;
         }
      }
      
      if(!isNaN(fuelLevel.value)&&!isNaN(cargoMass.value)){
         //fuel level checker and form handler
         if(allFieldsFilled&&correctDataInField){
            if(fuelLevel.value < 10000){
               fuelStatus.innerHTML = "Not enough fuel for journey!"; ShuttleNotReady();}
            
            if(cargoMass.value > 10000){
               cargoStatus.innerHTML = "Too much mass for the journey!"; ShuttleNotReady();}

            if(fuelLevel.value>=10000&&cargoMass.value<=10000){ShuttleReady();}
            faultyItems.style.visibility = "visible";   
         }
         
      }
      
      
      event.preventDefault();

   })

   function ShuttleNotReady(){
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }

   function ShuttleReady(){
      launchStatus.innerHTML = "Shuttle ready for launch!";
      launchStatus.style.color = "green";
   }
})