 //#region Catch Elements
 let fajr = document.getElementById("fajr");
 let shrouk = document.getElementById("shrouk");
 let alduhr = document.getElementById("alduhr");
 let alasr = document.getElementById("alasr");
 let almaghrb = document.getElementById("almaghrb");
 let elasha = document.getElementById("elasha");
 let day = document.getElementById("day");
 let selected = document.getElementById("selected");
 let city = document.getElementById("city");
 //#endregion
 
 //#region Data Source
 let array = [
    {
        arabicName : "الرياض" ,
        country : "Ar Riyāḑ"   	
    } ,
    {
        arabicName : "الشرقيه" ,
        country : "Ash Sharqīyah" 
    },		
    {
        arabicName : "مكه" ,
        country : "Makkah al Mukarramah" 
    },
    {
        arabicName : "القصيم" ,
        country : "Al Qaşīm" 
    },
    {
        arabicName : "تَبُوْك" ,
        country : "Tabūk" 
    }
 ]
 //#endregion
 
 //#region Loop on Array To Fill Select
 for(arr of array){
    console.log(arr);
    const content = `
    <option style="background: none; color: black;">${arr.arabicName}</option>
    `
    selected.innerHTML += content;
 }
 //#endregion

 //#region Send A Selected Country To Function
 selected.addEventListener("change" , function() {
     city.innerHTML =this.value;
    let isoCountry = "";
    for(let arr of array){
       if(arr.arabicName == this.value){
        isoCountry = arr.country
       }
    }
    getData(isoCountry);
})
//#endregion
 
//#region API Code
 function getData(countryName){
    let params = {
        city : "SA" ,
        country : countryName
     }
     axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params:params
      })
      .then(function (response) {
        day.innerHTML = response.data.data.date.hijri.weekday.ar + " " +   response.data.data.date.gregorian.date;
        fajr.innerHTML = response.data.data.timings.Fajr;
        shrouk.innerHTML = response.data.data.timings.Sunrise;
        alduhr.innerHTML = response.data.data.timings.Dhuhr;
        alasr.innerHTML = response.data.data.timings.Asr;
        almaghrb.innerHTML = response.data.data.timings.Maghrib;
        elasha.innerHTML = response.data.data.timings.Isha;
      })
 }
 getData("Ar Riyāḑ");
 //#endregion
 