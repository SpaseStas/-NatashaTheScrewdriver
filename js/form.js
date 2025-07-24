// window.addEventListener("load", function() {});



// ZaprosUSD_EUR();
  let BEL_USD;
  let USD_EUR;
  let EUR_USD;
ZaprosBEL_USD();
Zaprosalfa();

// $.get('https://openexchangerates.org/api/latest.json', {app_id: 'a2ddba5de8b442a69dadbc419f229585'}, function(data) {
//     console.log(data);
// });

// async function ZaprosUSD_EUR(){
// let response = await fetch('https://openexchangerates.org/api/latest.json?app_id=a2ddba5de8b442a69dadbc419f229585');

// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();

//   USD_EUR = json.rates.EUR;
// } else {
//    alert("Ошибка HTTP: " + response.status);
// }
// };


async function ZaprosBEL_USD(){
let response = await fetch('https://api.nbrb.by/exrates/rates/431');

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
  let kurs = json.Cur_OfficialRate;
  BEL_USD = kurs;
  // console.log(json.Cur_OfficialRate);
} else {
  alert("Ошибка HTTP: " + response.status);
}
};


async function Zaprosalfa(){
let response = await fetch('https://developerhub.alfabank.by:8273/partner/1.0.0/public/rates');

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
  console.log(json.rates[2]);
    USD_EUR = json.rates[2].buyRate;
    EUR_USD = json.rates[2].sellRate;
    console.log(USD_EUR);
    console.log(EUR_USD);
} else {
  alert("Ошибка HTTP: " + response.status);
}
};




let crosCursEur = document.getElementById("crosCursEur");
let crosCursDol = document.getElementById("crosCursDol");
let priceMinsk = 0;
let buyerFee = 0;
let priceCea = 0;
let CustomPriceEngine = 0;
let CustomPrice = 0;
let CustomEngine = 0;
let sum = 0;
let flag = false;
let PreparationExportdocuments$ = 0; //Оформление экспортных документов

let outHtml = document.getElementById("resulTotal");
let result = 0; //вывовд в html итоговых значений
// let engineСapacityValue = 0; //объем двигателя для кода
let PriceLot = document.getElementById("PriceLot"); //мониторинг суммы лота
let priceLot = document.getElementById("PriceLot").value;//сумма лота
let OutPriceLot = document.getElementById("OutPriceLot");//Вывод суммы лота
let EngineСapacity = document.getElementById("engineСapacity"); //Мониторинг объём движка
let engineСapacity = document.getElementById("engineСapacity").value; //объём движка
let AgeAuto = document.getElementById("Age"); //Мониторинг возраста автомобиля
let ageAuto = document.getElementById("Age").selectedIndex; //возраст автомобиля
let TypeTC = document.getElementById("TypeTC"); //Мониторинг типа транспортного средства
let typeTC = document.getElementById("TypeTC").selectedIndex; //Тип транспортного средства
let Platform = document.getElementById("platform"); //Мониторинг Текущаю платформа
let platform = document.getElementById("platform").selectedIndex; // Текущаю платформа
let StateLocation = document.getElementById("Location"); //Мониторинг текущей локации
let statelocation = document.getElementById("Location").selectedIndex; // Текущаю локация
let StateLocation1 = document.getElementById("Location1"); //Мониторинг текущей локации
let statelocation1 = document.getElementById("Location1").selectedIndex; // Текущаю локация
let Dacument = document.getElementById("Dacument"); // Получаем документ
let salvageDocument = document.getElementById("Dacument").selectedIndex; // Текущий докумет


let DeliveyGeo = document.getElementById("DeliveyGeo"); //Доставка до порта клайпид/грузия
let deliverytoPort= document.getElementById("DeliveyGeo").selectedIndex;; // текузаю локация прибытия(Грузия,Клайпида)
let CustomsDutyEngine = document.getElementById("CustomsDutyEngine"); //Пошлина по объему
let CustomsDutyPrice = document.getElementById("CustomsDutyPrice"); //Пошлина по цене
let AuctionDealerFees = document.getElementById("AuctionDealerFees"); //Аукционные / дилерские сборы
let CustomsDuties = document.getElementById("CustomsDuties"); //Тамаженный сборы и оформление
let RecyclingFee = document.getElementById("RecyclingFee"); //Утиль сбор
let PreparationExportdocuments = document.getElementById("resultUSA"); //Оформление экспортных документов
let PreparationExportdocumentsCheck = document.getElementById("PreparationExportdocumentsCheck"); //Оформление экспортных документов чекбокс
let DeliverytoPort = document.getElementById("DeliverytoPort");
let RegistrationDocuments = document.getElementById("Re-RegistrationDocuments"); //Перерегистрация техпаспорта
let resultTotal = document.getElementById("resulTotal1");
let OtherEV = document.getElementById("OtherEV"); //льготная таможня






// ZaprosUSD_EUR();
// ZaprosBEL_USD();



  let crosEur = EUR_USD;
  let crosDol = USD_EUR;
StateLocation.style.display ="none";
StateLocation1.style.display ="none";

// крос курс из $ in eu
// function dataCursEur(){
//   crosEur = document.getElementById("crosCursEur").value;
//   crosEur = crosEur.replace(/,/g, '.');
// }

// // крос курс из eu in $
// function dataCursDol(){
//   crosDol = document.getElementById("crosCursEur").value;
//   crosDol = crosDol.replace(/,/g, '.');
// }


function dataPrice(){
  priceLot = +document.getElementById("PriceLot").value;
  OutPriceLot.textContent = priceLot + " $";
  CalculationOfCustomsDuty();
  calculationFees();
}

function dataengineСapacity(){
  engineСapacity = document.getElementById("engineСapacity").value;
  CalculationOfCustomsDuty();
};

function getAge(){
  ageAuto = document.getElementById("Age").selectedIndex;
  CalculationOfCustomsDuty();
};

function dataTypeTC(){
  typeTC = document.getElementById("TypeTC").selectedIndex;
  CalculationOfCustomsDuty();
};


function dataPlatform(){
 platform = document.getElementById("platform").selectedIndex;
 if (platform != 0) {RESETFUNCTION();};
 if (platform === 1) {
  StateLocation.style.display = "block";
  StateLocation1.style.display = "none";
 } else if(platform === 2){
  StateLocation.style.display = "none";
  StateLocation1.style.display = "block";
 }
 calculationFees();
 calculationDeliverySea();
};

function dataLocation(){
  statelocation = document.getElementById("Location").selectedIndex;
  calculationDeliverySea();
};

function dataLocation1(){
  statelocation1 = document.getElementById("Location1").selectedIndex;
  calculationDeliverySea();
};

// в какой порт везём
function dataDeliverytoPort(){
  deliverytoPort = document.getElementById("DeliveyGeo").selectedIndex;
  if (deliverytoPort === 1) {
    document.getElementById("DeliverytoPortLocation").textContent = "Доствка из США до Клайпеды";
  }else if(deliverytoPort === 2){
    document.getElementById("DeliverytoPortLocation").textContent = "Доставка из США до Грузии";
  }

deliveryToMinsk();
};

// перерегистрация документов
function dataDacument(){
  salvageDocument = document.getElementById("Dacument").selectedIndex;
  calculationDocuments();
  ResultTotal();
};


// льготная таможня да/нет
function PreferentialCustoms(){
  if (flag === false) { flag = true}
    else if(flag === true) {flag = false};
  CalculationOfCustomsDuty();
}

// оформление экспортных документов да/нет
function CheckDockument(){
  if (PreparationExportdocumentsCheck.checked === true) {
    PreparationExportdocuments$ = 400;
  }
  else {
    PreparationExportdocuments$ = 0;
  };
  PreparationExportdocuments.textContent = PreparationExportdocuments$ + " руб"
        sumRub_Dol();
        ResultTotal();
}




//рассчёт таможенной пошлины
function CalculationOfCustomsDuty(){
CustomsDuties.textContent =" 120 руб";
   CustomPrice = 0;
   CustomEngine = 0;
  if (typeTC === 0) {   //Если втомобиль
  if (ageAuto === 0 && priceLot != " ") {  // до 3 лет
    RecyclingFee.textContent = "544,50 руб";
     let euro = priceLot * EUR_USD;  //перевод из $ в евро
     if (euro <= 8500) {
      CustomPrice = Math.round(euro * 0.54); 
      CustomEngine = (engineСapacity * 2.5);
    }
    else if (euro > 8500 && euro <= 16700) {
      CustomPrice = Math.round(euro * 0.48);
      CustomEngine =  (engineСapacity * 3.5);
    }
    else if (euro > 16700 && euro <= 42300) {
      CustomPrice = Math.round(euro * 0.48);
      CustomEngine = (engineСapacity * 5.5);
    }
    else if (euro > 42300 && euro <= 84500) {
      CustomPrice = Math.round(euro * 0.48);
      CustomEngine = (engineСapacity * 7.5);
    }
    else if (euro > 84500 && euro <= 169000) {
      CustomPrice = Math.round(euro * 0.48);
      CustomEngine = (engineСapacity * 15 );
    }
    else if (euro > 169000) {
      CustomPrice = Math.round(euro * 0.48);
      CustomEngine = (engineСapacity * 20);
    };

      if (CustomPrice > CustomEngine) {
          CustomEngine = CustomPrice;
      } else{
          CustomPrice = 0;
      }
    
    };

  if (ageAuto === 1 && engineСapacity != " ") {  // от 3 до 5 лет
    RecyclingFee.textContent = "1089 руб";
      // CustomsDutyPrice.textContent = "0";
      if (engineСapacity <= 1000) {CustomEngine = engineСapacity * 1.5};
      if (engineСapacity > 1000 && engineСapacity <= 1500) {CustomEngine = engineСapacity * 1.7};
      if (engineСapacity > 1500 && engineСapacity <= 1800) {CustomEngine = engineСapacity * 2.5};
      if (engineСapacity > 1800 && engineСapacity <= 2300) {CustomEngine = engineСapacity * 2.7};
      if (engineСapacity > 2300 && engineСapacity <= 3000) {CustomEngine = engineСapacity * 3};
      if (engineСapacity > 3000) {CustomEngine = engineСapacity * 3.6};

  };
  if (ageAuto === 2 && engineСapacity != " ") { //старже 5 лет
    RecyclingFee.textContent = "1089 руб";
      // CustomsDutyPrice.textContent = "0";
      if (engineСapacity <= 1000) {CustomEngine = engineСapacity * 3};
      if (engineСapacity > 1000 && engineСapacity <= 1500) {CustomEngine = engineСapacity * 3.2};
      if (engineСapacity > 1500 && engineСapacity <= 1800) {CustomEngine = engineСapacity * 3.5};
      if (engineСapacity > 1800 && engineСapacity <= 2300) {CustomEngine = engineСapacity * 4.8};
      if (engineСapacity > 2300 && engineСapacity <= 3000) {CustomEngine = engineСapacity * 5};
      if (engineСapacity > 3000) {CustomEngine = engineСapacity * 5.7};
  };
    if (flag === true) {CustomEngine = CustomEngine/2};
   CustomsDutyEngine.textContent = CustomEngine + " Eu " + Math.round(CustomEngine*USD_EUR)+"$" ;
  };
  ResultTotal();
};

//Аукционные / дилерские сборы:
function calculationFees(){
  
  if (platform === 1) {
    buyerFee = 0;
    let environmentalFee = 15;
    let virtualBidFee = 160;   // интрнет сборы   let InternetBidFee = ?; 
    let gateFree = 95;
    let titlePickupFee = 20; // 20$ везде;
    if (priceLot > 0 && priceLot <= 49.99) {buyerFee=1};
    if (priceLot >= 50.00 && priceLot <= 99.99) {buyerFee=1};
    if (priceLot >= 100.00  && priceLot <= 199.99) {buyerFee=25.00};
    if (priceLot >= 200.00  && priceLot <= 299.99) {buyerFee=60.00};
    if (priceLot >= 300.00  && priceLot <= 349.99) {buyerFee=85.00};
    if (priceLot >= 350.00  && priceLot <= 399.99) {buyerFee=100.00};
    if (priceLot >= 400.00  && priceLot <= 449.99) {buyerFee=125.00};
    if (priceLot >= 450.00  && priceLot <= 499.99) {buyerFee=135.00};
    if (priceLot >= 500.00  && priceLot <= 549.99) {buyerFee=145.00};
    if (priceLot >= 550.00  && priceLot <= 599.99) {buyerFee=155.00};
    if (priceLot >= 600.00  && priceLot <= 699.99) {buyerFee=170.00};
    if (priceLot >= 700.00  && priceLot <= 799.99) {buyerFee=195.00};
    if (priceLot >= 800.00  && priceLot <= 899.99) {buyerFee=215.00};
    if (priceLot >= 900.00  && priceLot <= 999.99) {buyerFee=230.00};
    if (priceLot >= 1000.00 && priceLot <= 1199.99) {buyerFee=250.00};
    if (priceLot >= 1200.00 && priceLot <= 1299.99) {buyerFee=270.00};
    if (priceLot >= 1300.00 && priceLot <= 1399.99) {buyerFee=285.00};
    if (priceLot >= 1400.00 && priceLot <= 1499.99) {buyerFee=300.00};
    if (priceLot >= 1500.00 && priceLot <= 1599.99) {buyerFee=315.00};
    if (priceLot >= 1600.00 && priceLot <= 1699.99) {buyerFee=330.00};
    if (priceLot >= 1700.00 && priceLot <= 1799.99) {buyerFee=350.00};
    if (priceLot >= 1800.00 && priceLot <= 1999.99) {buyerFee=370.00};
    if (priceLot >= 1900.00 && priceLot <= 1999.99) {buyerFee=370.00};
    if (priceLot >= 2000.00 && priceLot <= 2399.99) {buyerFee=390.00};
    if (priceLot >= 2400.00 && priceLot <= 2499.99) {buyerFee=425.00};
    if (priceLot >= 2500.00 && priceLot <= 2999.99) {buyerFee=460.00};
    if (priceLot >= 3000.00 && priceLot <= 3499.99) {buyerFee=505.00};
    if (priceLot >= 3500.00 && priceLot <= 3999.99) {buyerFee=555.00};
    if (priceLot >= 4000.00 && priceLot <= 4499.99) {buyerFee=600.00};
    if (priceLot >= 4500.00 && priceLot <= 4999.99) {buyerFee=625.00};
    if (priceLot >= 5000.00 && priceLot <= 5499.99) {buyerFee=650.00};
    if (priceLot >= 5500.00 && priceLot <= 5999.99) {buyerFee=675.00};
    if (priceLot >= 6000.00 && priceLot <= 6499.99) {buyerFee=700.00};
    if (priceLot >= 6500.00 && priceLot <= 6999.99) {buyerFee=720.00};
    if (priceLot >= 7000.00 && priceLot <= 7499.99) {buyerFee=755.00};
    if (priceLot >= 7500.00 && priceLot <= 7999.99) {buyerFee=775.00};
    if (priceLot >= 8000.00 && priceLot <= 8499.99) {buyerFee=800.00};
    if (priceLot >= 8500.00 && priceLot <= 8999.99) {buyerFee=820.00};
    if (priceLot >= 9000.00 && priceLot <= 9999.99) {buyerFee=820.00};
    if (priceLot >= 10000.00 && priceLot <= 11499.99) {buyerFee=850.00};
    if (priceLot >= 11500.00 && priceLot <= 11999.99) {buyerFee=860.00};
    if (priceLot >= 12000.00 && priceLot <= 12499.99) {buyerFee=875.00};
    if (priceLot >= 12500.00 && priceLot <= 14999.99) {buyerFee=890.00};
    if (priceLot >= 15000) {buyerFee = priceLot * 0.06};
    buyerFee +=  environmentalFee + virtualBidFee + gateFree + titlePickupFee;
    AuctionDealerFees.textContent = buyerFee + "$";
  };
  if (platform === 2) {
    buyerFee = 0;
    let ServiceFee = 95;
    let TitleHandingFee = 20;   
    let environmentalFee = 15;
    let InternetBidFee = 0; 

    if (priceLot > 0 && priceLot <= 99.99) {InternetBidFee = 0}
      else if(priceLot > 99.99 && priceLot <= 499.99) {InternetBidFee = 49.00}
      else if(priceLot > 499.99 && priceLot <= 999.99) {InternetBidFee = 59.00}
      else if(priceLot > 999.99 && priceLot <= 1499.99) {InternetBidFee = 79.00}
      else if(priceLot > 1499.99 && priceLot <= 1999.99) {InternetBidFee = 89.00}
      else if(priceLot > 1999.99 && priceLot <= 3999.99) {InternetBidFee = 99.00}
      else if(priceLot > 3999.99 && priceLot <= 5999.99) {InternetBidFee = 109.00}
      else if(priceLot > 5999.99 && priceLot <= 7999.99) {InternetBidFee = 139.00}
        else{InternetBidFee = 149};

    if (priceLot > 0 && priceLot <= 99.99) {buyerFee=25.00};
    if (priceLot >= 50.00 && priceLot <= 99.99) {buyerFee=45.00};
    if (priceLot >= 100.00  && priceLot <= 199.99) {buyerFee=80.00};
    if (priceLot >= 200.00  && priceLot <= 299.99) {buyerFee=130.00};
    if (priceLot >= 300.00  && priceLot <= 349.99) {buyerFee=150.00};
    if (priceLot >= 350.00  && priceLot <= 399.99) {buyerFee=160.00};
    if (priceLot >= 400.00  && priceLot <= 449.99) {buyerFee=170.00};
    if (priceLot >= 450.00  && priceLot <= 499.99) {buyerFee=180.00};
    if (priceLot >= 500.00  && priceLot <= 549.99) {buyerFee=200.00};
    if (priceLot >= 550.00  && priceLot <= 599.99) {buyerFee=205.00};
    if (priceLot >= 600.00  && priceLot <= 699.99) {buyerFee=235.00};
    if (priceLot >= 700.00  && priceLot <= 799.99) {buyerFee=260.00};
    if (priceLot >= 800.00  && priceLot <= 899.99) {buyerFee=280.00};
    if (priceLot >= 900.00  && priceLot <= 999.99) {buyerFee=305.00};
    if (priceLot >= 1000.00 && priceLot <= 1199.99) {buyerFee=355.00};
    if (priceLot >= 1200.00 && priceLot <= 1299.99) {buyerFee=380.00};
    if (priceLot >= 1300.00 && priceLot <= 1399.99) {buyerFee=400.00};
    if (priceLot >= 1400.00 && priceLot <= 1499.99) {buyerFee=410.00};
    if (priceLot >= 1500.00 && priceLot <= 1599.99) {buyerFee=420.00};    
    if (priceLot >= 1600.00 && priceLot <= 1699.99) {buyerFee=440.00};
    if (priceLot >= 1700.00 && priceLot <= 1799.99) {buyerFee=450.00};
    if (priceLot >= 1800.00 && priceLot <= 1999.99) {buyerFee=465.00};
    if (priceLot >= 2000.00 && priceLot <= 2399.99) {buyerFee=500.00};
    if (priceLot >= 2400.00 && priceLot <= 2499.99) {buyerFee=525.00};
    if (priceLot >= 2500.00 && priceLot <= 2999.99) {buyerFee=550.00};
    if (priceLot >= 3000.00 && priceLot <= 3499.99) {buyerFee=650.00};
    if (priceLot >= 3500.00 && priceLot <= 3999.99) {buyerFee=700.00};
    if (priceLot >= 4000.00 && priceLot <= 4499.99) {buyerFee=725.00};
    if (priceLot >= 4500.00 && priceLot <= 4999.99) {buyerFee=750.00};
    if (priceLot >= 5000.00 && priceLot <= 5999.99) {buyerFee=775.00};
    if (priceLot >= 6000.00 && priceLot <= 6999.99) {buyerFee=800.00};
    if (priceLot >= 7000.00 && priceLot <= 7499.99) {buyerFee=825.00};
    if (priceLot >= 7500.00 && priceLot <= 7999.99) {buyerFee=825.00};
    if (priceLot >= 8000.00 && priceLot <= 9999.99) {buyerFee=850.00};
    if (priceLot >= 10000.00 && priceLot <= 11499.99) {buyerFee=900.00};
    if (priceLot >= 11500.00 && priceLot <= 11999.99) {buyerFee=900.00};
    if (priceLot >= 12000.00 && priceLot <= 12499.99) {buyerFee=900.00};
    if (priceLot >= 12500.00 && priceLot <= 14999.99) {buyerFee=900.00};
    if (priceLot >= 15000) {buyerFee = priceLot * 0.075};
    buyerFee +=  ServiceFee + TitleHandingFee + environmentalFee + InternetBidFee ;
    AuctionDealerFees.textContent = buyerFee + "$";
  };
  deliveryAmount();
};

//Доства из текущих локация Америки В клйпед/Грузия
function calculationDeliverySea() {
  priceCea = 0;
  if (platform === 1 && deliverytoPort === 1) {
    if (statelocation === 0) {priceCea = 0}
    if (statelocation === 1) {priceCea = 1225}   
    if (statelocation === 2) {priceCea = 1800} //ADELANTO - CA
    if (statelocation === 3) {priceCea = 3650} //ADP TOWING MAUI -HI
    if (statelocation === 4) {priceCea = 1075}  //ALBANY - NY
    if (statelocation === 5) {priceCea = 1475}  //ALBUQUERQUE - PA
    if (statelocation === 6) {priceCea = 1250}  //ALTOONA - PA
    if (statelocation === 7) {priceCea = 1400}  //AMARILLO - TX
    if (statelocation === 8) {priceCea = 1300}  //ANDREWS - TX
    if (statelocation === 9) {priceCea = 1900}  //ANTELOPE - CA
    if (statelocation === 10) {priceCea = 1350}  //APPLETON - WI
    if (statelocation === 11) {priceCea = 1125} //ATLANTA EAST - GA
    if (statelocation === 12) {priceCea = 1125} //ATLANTA NORTH - GA
    if (statelocation === 13) {priceCea = 1100} //ATLANTA SOUTH - GA
    if (statelocation === 14) {priceCea = 1100} //ATLANTA WEST - GA
    if (statelocation === 15) {priceCea = 1075} //Augusta - GA
    if (statelocation === 16) {priceCea = 1125} //AUSTIN - TX
    if (statelocation === 17) {priceCea = 1850} //BAKERSFIELD - CA
    if (statelocation === 18) {priceCea = 1125} //BALTIMORE - MD
    if (statelocation === 19) {priceCea = 1125} //BALTIMORE EAST - MD
    if (statelocation === 20) {priceCea = 1225} //BATON ROUGE - LA
    if (statelocation === 21) {priceCea = 2825} //BILLINGS - MT
    if (statelocation === 22) {priceCea = 1175} //BIRMINGHAM - AL
    if (statelocation === 23) {priceCea = 2425} //BOISE - ID
    if (statelocation === 24) {priceCea = 1300} //BUFFALO - NY
    if (statelocation === 25) {priceCea = 1200} //CANDIA - NH
    if (statelocation === 26) {priceCea = 1100} //CARTERSVILLE - GA
    if (statelocation === 27) {priceCea = 1150} //CHAMBERSBURG - PA
    if (statelocation === 28) {priceCea = 1425} //CHARLESTON - WV
    if (statelocation === 29) {priceCea = 1205} //CHICAGO NORTH - IL
    if (statelocation === 30) {priceCea = 1205} //CHICAGO SOUTH - IL
    if (statelocation === 31) {priceCea = 1205} //CHICAGO SOUTH-Wood
    if (statelocation === 32) {priceCea = 1100} //CHINA GROVE - NC
    if (statelocation === 33) {priceCea = 1325} //CICERO - IN
    if (statelocation === 34) {priceCea = 1350} //CLEVELAND EAST - OH
    if (statelocation === 35) {priceCea = 1350} //CLEVELAND WEST - OH
    if (statelocation === 36) {priceCea = 1525} //COLORADO SPRINGS - CO
    if (statelocation === 37) {priceCea = 1350} //COLUMBUS - OH
    if (statelocation === 38) {priceCea = 1100} //CONCORD - NC
    if (statelocation === 39) {priceCea = 1150} //CORPUS CHRISTI - TX
    if (statelocation === 40) {priceCea = 1075} //CRASHEDTOYS ATLANTA - GA
    if (statelocation === 41) {priceCea = 1150} //CRASHEDTOYS DALLAS  - TX
    if (statelocation === 42) {priceCea = 1475} //CRASHEDTOYS EAST BETHEL - MN
    if (statelocation === 43) {priceCea = 1350} //CRASHEDTOYS ELDRIDGE - IA
    if (statelocation === 44) {priceCea = 1475} //CRASHEDTOYS MINNEAPOLIS - MN
    if (statelocation === 45) {priceCea = 1950} //CRASHEDTOYS SACRAMENTO - CA
    if (statelocation === 46) {priceCea = 1150} //DALLAS - TX
    if (statelocation === 47) {priceCea = 1150} //DALLAS SOUTH - TX
    if (statelocation === 48) {priceCea = 1100} //DANVILLE - VA
    if (statelocation === 49) {priceCea = 1350} //DAVENPORT - 169 Davenport sublot - IA
    if (statelocation === 50) {priceCea = 1350} //DAVENPORT - IA
    if (statelocation === 51) {priceCea = 1350} //DAYTON - OH
    if (statelocation === 52) {priceCea = 1675} //DENVER - CO
    if (statelocation === 53) {priceCea = 1675} //DENVER CENTRAL - CO
    if (statelocation === 54) {priceCea = 1675} //DENVER SOUTH - CO
    if (statelocation === 55) {priceCea = 1425} //DES MOINES - IA
    if (statelocation === 56) {priceCea = 1425} //DETROIT - MI
    if (statelocation === 57) {priceCea = 4325} //DK TOWING KAUAI - HI
    if (statelocation === 58) {priceCea = 1175} //DOTHAN - AL
    if (statelocation === 59) {priceCea = 1205} //DYER - IN
    if (statelocation === 60) {priceCea = 1350} //EARLINGTON - KY
    if (statelocation === 61) {priceCea = 1300} //EL PASO - TX
    if (statelocation === 62) {priceCea = 2350} //EUGENE - OR
    if (statelocation === 63) {priceCea = 1150} //EXETER  - RI
    if (statelocation === 64) {priceCea = 1075} //FAIRBURN  - GA
    if (statelocation === 65) {priceCea = 1475} //FLINT - MI
    if (statelocation === 66) {priceCea = 1325} //FORT WAYNE - IN
    if (statelocation === 67) {priceCea = 1050} //FREDERICKSBURG  - VA
    if (statelocation === 68) {priceCea = 1175} //FREETOWN - MA
    if (statelocation === 69) {priceCea = 1875} //FRESNO - CA
    if (statelocation === 70) {priceCea = 1025} //FT. PIERCE - FL
    if (statelocation === 71) {priceCea = 1150} //FT. WORTH - TX
    if (statelocation === 72) {priceCea = 1125} //GASTONIA - NC
    if (statelocation === 73) {priceCea = 1000} //GLASSBORO EAST - NJ
    if (statelocation === 74) {priceCea = 1000} //GLASSBORO WEST - NJ
    if (statelocation === 75) {priceCea = 2125} //GRAHAM - WA
    if (statelocation === 76) {priceCea = 1075} //GREER - SС
    if (statelocation === 77) {priceCea = 1205} //HAMMOND - IN
    if (statelocation === 78) {priceCea = 950}  //HAMPTON - VA
    if (statelocation === 79) {priceCea = 1075} //HARRISBURG - PA
    if (statelocation === 80) {priceCea = 1025} //HARTFORD - CT
    if (statelocation === 81) {priceCea = 1325} //HARTFORD CITY - IN
    if (statelocation === 82) {priceCea = 1050} //HARTFORD SPRINGFIELD - CT
    if (statelocation === 83) {priceCea = 1900} //HAYWARD - CA
    if (statelocation === 84) {priceCea = 2725} //HELENA - MT
    if (statelocation === 85) {priceCea = 2595} //HONOLULU - HI
    if (statelocation === 86) {priceCea = 1055} //HOUSTON - TX
    if (statelocation === 87) {priceCea = 1055} //HOUSTON EAST - TX
    if (statelocation === 88) {priceCea = 1325} //INDIANAPOLIS - IN
    if (statelocation === 89) {priceCea = 1425} //IONIA - MI
    if (statelocation === 90) {priceCea = 1225} //JACKSON - MS
    if (statelocation === 91) {priceCea = 1050} //JACKSONVILLE EAST - FL
    if (statelocation === 92) {priceCea = 1050} //JACKSONVILLE NORTH - FL
    if (statelocation === 93) {priceCea = 1050} //JACKSONVILLE WEST - FL
    if (statelocation === 94) {priceCea = 1425} //KANSAS CITY - KS
    if (statelocation === 95) {priceCea = 1775} //KINCHELOE - MI
    if (statelocation === 96) {priceCea = 3500} //KENS TOWING HILO - HI
    if (statelocation === 97) {priceCea = 1200} //KNOXVILLE - TN
    if (statelocation === 98) {priceCea = 1425} //LANSING - MI
    if (statelocation === 99) {priceCea = 1875} //LAS VEGAS - NV
    if (statelocation === 100) {priceCea = 1875} //LAS VEGAS WEST - NV
    if (statelocation === 101) {priceCea = 1350} //LEXINGTON WEST - KY
    if (statelocation === 102) {priceCea = 1350} //LEXINGTON EAST - KY
    if (statelocation === 103) {priceCea = 1475} //LINCOLN - NE
    if (statelocation === 104) {priceCea = 1475} //LITTLE ROCK - AR
    if (statelocation === 105) {priceCea = 1650} //LONG BEACH - CA
    if (statelocation === 106) {priceCea = 1050} //LONG ISLAND - NY
    if (statelocation === 107) {priceCea = 1150} //LONGVIEW - TX
    if (statelocation === 108) {priceCea = 1660} //LOS ANGELES - CA
    if (statelocation === 109) {priceCea = 1350} //LOUISVILLE - KY
    if (statelocation === 110) {priceCea = 1150} //LUFKIN - TX
    if (statelocation === 111) {priceCea = 1100} //LUMBERTON - NC
    if (statelocation === 112) {priceCea = 1275} //LYMAN - ME
    if (statelocation === 113) {priceCea = 1050} //MACON - GA
    if (statelocation === 114) {priceCea = 1325} //MADISON - WI
    if (statelocation === 115) {priceCea = 1325} //MADISON SOUTH - WI
    if (statelocation === 116) {priceCea = 1900} //MARTINEZ - CA
    if (statelocation === 117) {priceCea = 1225} //MCALLEN - TX
    if (statelocation === 118) {priceCea = 1100} //MEBANE - NC
    if (statelocation === 119) {priceCea = 1300} //MEMPHIS - TN
    if (statelocation === 120) {priceCea = 1800} //MENTONE - CA
    if (statelocation === 121) {priceCea = 950} //MIAMI CENTRAL - FL
    if (statelocation === 122) {priceCea = 950} //MIAMI NORTH - FL
    if (statelocation === 123) {priceCea = 975} //MIAMI SOUTH - FL
    if (statelocation === 124) {priceCea = 1250} //MILWAUKEE - Stutervant sublot - WI
    if (statelocation === 125) {priceCea = 1250} //MILWAUKEE - Waukesha sublot - WI
    if (statelocation === 126) {priceCea = 1250} //MILWAUKEE - WI
    if (statelocation === 127) {priceCea = 1250} //MILWAUKEE SOUTH - WI
    if (statelocation === 128) {priceCea = 1250} //MILWAUKEE NORTH - WI
    if (statelocation === 129) {priceCea = 1250} //MILWAUKEE- Yard 339 Milwaukee sublot - WI
    if (statelocation === 130) {priceCea = 1475} //MINNEAPOLIS - MN
    if (statelocation === 131) {priceCea = 1475} //MINNEAPOLIS NORTH - MN
    if (statelocation === 132) {priceCea = 1425} //MO - COLUMBIA - MO
    if (statelocation === 133) {priceCea = 1200} //MOBILE - AL
    if (statelocation === 134) {priceCea = 1200} //MOBILE SOUTH - AL
    if (statelocation === 135) {priceCea = 1100} //MOCKSVILLE  - NC
    if (statelocation === 136) {priceCea = 1200} //MONTGOMERY - AL
    if (statelocation === 137) {priceCea = 1250} //N.Boston-ROWLEY Sublot - MA
    if (statelocation === 138) {priceCea = 1200} //NASHVILLE - TN
    if (statelocation === 139) {priceCea = 1225} //NEW ORLEANS - LA
    if (statelocation === 140) {priceCea = 1025} //NEWBURGH - NY
    if (statelocation === 141) {priceCea = 1175} //NORTH BOSTON - MA
    if (statelocation === 142) {priceCea = 1075} //NORTH CHARLESTON - SC
    if (statelocation === 143) {priceCea = 2175} //NORTH SEATTLE - WA
    if (statelocation === 144) {priceCea = 1125} //OCALA - FL
    if (statelocation === 145) {priceCea = 2050} //OGDEN - UT
    if (statelocation === 146) {priceCea = 1275} //OKLAHOMA CITY - OK
    if (statelocation === 147) {priceCea = 1075} //ORLANDO - FL
    if (statelocation === 148) {priceCea = 1075} //ORLANDO NORTH - FL
    if (statelocation === 149) {priceCea = 1075} //ORLANDO SOUTH - FL
    if (statelocation === 150) {priceCea = 2325} //PASCO - WA
    if (statelocation === 151) {priceCea = 1325} //PEORIA - IL
    if (statelocation === 152) {priceCea = 1000} //PHILADELPHIA - PA
    if (statelocation === 153) {priceCea = 1000} //PHILADELPHIA EAST - PA
    if (statelocation === 154) {priceCea = 1850} //PHOENIX - AR
    if (statelocation === 155) {priceCea = 1200} //PITTSBURGH EAST - PA
    if (statelocation === 156) {priceCea = 1250} //PITTSBURGH NORTH - PA
    if (statelocation === 157) {priceCea = 1250} //PITTSBURGH SOUTH - PA
    if (statelocation === 158) {priceCea = 1250} //PITTSBURGH WEST - PA
    if (statelocation === 159) {priceCea = 2225} //PORTLAND NORTH - OR
    if (statelocation === 160) {priceCea = 2275} //PORTLAND SOUTH - OR
    if (statelocation === 161) {priceCea = 1050} //PUNTA GORDA - FL
    if (statelocation === 162) {priceCea = 1100} //PUNTA GORDA SOUTH - FL
    if (statelocation === 163) {priceCea = 1100} //RALEIGH - NC
    if (statelocation === 164) {priceCea = 1700} //RANCHO CUCAMONGA - CA
    if (statelocation === 165) {priceCea = 2300} //REDDING - CA
    if (statelocation === 166) {priceCea = 2050} //RENO - NV
    if (statelocation === 167) {priceCea = 975} //RICHMOND - VA
    if (statelocation === 168) {priceCea = 975} //RICHMOND EAST - VA
    if (statelocation === 169) {priceCea = 1250} //ROCHESTER - NY
    if (statelocation === 170) {priceCea = 1900} //SACRAMENTO - CA
    if (statelocation === 171) {priceCea = 2150} //SALT LAKE CITY - UT
    if (statelocation === 172) {priceCea = 2050} //SALT LAKE CITY NORTH - UT
    if (statelocation === 173) {priceCea = 1175} //SAN ANTONIO - TX
    if (statelocation === 174) {priceCea = 1700} //SAN BERNARDINO - CA
    if (statelocation === 175) {priceCea = 1730} //SAN DIEGO - CA
    if (statelocation === 176) {priceCea = 1900} //SAN JOSE - CA
    if (statelocation === 177) {priceCea = 925} //SAVANNAH - GA
    if (statelocation === 178) {priceCea = 975} //SAVANNAH / VERTIA SUBLOT-Georgia Copart - GA
    if (statelocation === 179) {priceCea = 1075} //SC - COLUMBIA - SC
    if (statelocation === 180) {priceCea = 1050} //SCRANTON - PA
    if (statelocation === 181) {priceCea = 1125} //SEAFORD - DE
    if (statelocation === 182) {priceCea = 1190} //SHREVEPORT - LA
    if (statelocation === 183) {priceCea = 1500} //SIKESTON - MO
    if (statelocation === 184) {priceCea = 1900} //SOSACRAMENTO - CA
    if (statelocation === 185) {priceCea = 950} //SOMERVILLE - NJ
    if (statelocation === 186) {priceCea = 1175} //SOUTH BOSTON - MA
    if (statelocation === 187) {priceCea = 1375} //Southern Illinois - IL
    if (statelocation === 188) {priceCea = 1100} //SPARTANBURG - SC
    if (statelocation === 189) {priceCea = 2325} //SPOKANE - WA
    if (statelocation === 190) {priceCea = 1425} //SPRINGFIELD - MO
    if (statelocation === 191) {priceCea = 1525} //ST. CLOUD - MN
    if (statelocation === 192) {priceCea = 1375} //ST. LOUIS - MO
    if (statelocation === 193) {priceCea = 1700} //SUN VALLEY - CA
    if (statelocation === 194) {priceCea = 1125} //SYRACUSE - NY
    if (statelocation === 195) {priceCea = 1125} //TALLAHASSEE - FL
    if (statelocation === 196) {priceCea = 1075} //TAMPA SOUTH - FL
    if (statelocation === 197) {priceCea = 1100} //TAMPA SOUTH - Mulberry Sublot - FL
    if (statelocation === 198) {priceCea = 1225} //TANNER - AL
    if (statelocation === 199) {priceCea = 1075} //TIFTON - GA
    if (statelocation === 200) {priceCea = 3700} //TOW GUYS KAMUELA - HI
    if (statelocation === 201) {priceCea = 950} //TRENTON - NJ
    if (statelocation === 202) {priceCea = 1900} //TUCSON - AZ
    if (statelocation === 203) {priceCea = 1350} //TULSA - OK
    if (statelocation === 204) {priceCea = 1900} //VALLEJO - CA
    if (statelocation === 205) {priceCea = 1700} //VAN NUYS - CA
    if (statelocation === 206) {priceCea = 1200} //WACO - TX
    if (statelocation === 207) {priceCea = 1575} //WALTON - KY
    if (statelocation === 208) {priceCea = 1100} //WASHINGTON DC - MD
    if (statelocation === 209) {priceCea = 1200} //WEBSTER - NH
    if (statelocation === 210) {priceCea = 995} //WEST PALM BEACH - FL
    if (statelocation === 211) {priceCea = 1175} //WEST WARREN - MA
    if (statelocation === 212) {priceCea = 1205} //WHEELING - IL
    if (statelocation === 213) {priceCea = 1275} //Windham - NY
    if (statelocation === 214) {priceCea = 1425} //WICHITA - KS
    if (statelocation === 215) {priceCea = 1075} //YORK HAVEN - PA
    if (statelocation === 216) {priceCea = 1425} //WAYLAND - MI
      priceCea+=1000;
  };

  if (platform === 2 && deliverytoPort === 1) {
    if (statelocation1 === 0) {priceCea = 0} 
    if (statelocation1 === 1) {priceCea = 1225} //ABILENE - TX 
    if (statelocation1 === 2) {priceCea = 1660} //ACE - Carson - CA
    if (statelocation1 === 3) {priceCea = 1750} //ACE - Perris - CA
    if (statelocation1 === 4) {priceCea = 1775}  //ACE - PERRIS 2 - CA
    if (statelocation1 === 5) {priceCea = 1350}  //AKRON-CANTON - OH
    if (statelocation1 === 6) {priceCea = 1075}  //ALBANY - NY
    if (statelocation1 === 7) {priceCea = 1475}  //ALBUQUERQUE - NM
    if (statelocation1 === 8) {priceCea = 1250}  //ALTOONA - PA
    if (statelocation1 === 9) {priceCea = 1400}  //AMARILLO - TX
    if (statelocation1 === 10) {priceCea = 1700}  //ANAHEIM - CA
    if (statelocation1 === 11) {priceCea = 1350} // APPLETON - WI
    if (statelocation1 === 12) {priceCea = 1200} //ASHEVILLE - NC
    if (statelocation1 === 13) {priceCea = 1100} //ATLANTA - GA
    if (statelocation1 === 14) {priceCea = 1125} //ATLANTA EAST - GA
    if (statelocation1 === 15) {priceCea = 1100} //ATLANTA NORTH - GA
    if (statelocation1 === 16) {priceCea = 1100} //ATLANTA SOUTH - GA
    if (statelocation1 === 17) {priceCea = 1125} //AUSTIN - TX
    if (statelocation1 === 18) {priceCea = 925} //AVENEL NEW JERSEY - NJ
    if (statelocation1 === 19) {priceCea = 1150} //BALTIMORE - MD
    if (statelocation1 === 20) {priceCea = 1275} //BATON ROUGE - LA
    if (statelocation1 === 21) {priceCea = 2825} //BILLINGS - MT
    if (statelocation1 === 22) {priceCea = 1175} //BIRMINGHAM - AL
    if (statelocation1 === 23) {priceCea = 2425} //BOISE - ID
    if (statelocation1 === 24) {priceCea = 1175} //BOSTON - SHIRLEY - MA
    if (statelocation1 === 25) {priceCea = 1000} //BRIDGEPORT - PA
    if (statelocation1 === 26) {priceCea = 1425} //BUCKHANNON - WV
    if (statelocation1 === 27) {priceCea = 1300} //BUFFALO - NY
    if (statelocation1 === 28) {priceCea = 1300} //BURLINGTON - VT
    if (statelocation1 === 29) {priceCea = 950} //CENTRAL NEW JERSEY - NJ   1111
    if (statelocation1 === 30) {priceCea = 1075} //CHARLESTON - SC
    if (statelocation1 === 31) {priceCea = 1100} //CHARLOTTE - NC
    if (statelocation1 === 32) {priceCea = 1275} //CHATTANOOGA - TN
    if (statelocation1 === 33) {priceCea = 1205} //CHICAGO NORTH - IL
    if (statelocation1 === 34) {priceCea = 1205} //CHICAGO SOUTH - IL
    if (statelocation1 === 35) {priceCea = 1205} //CHICAGO-WEST - IL
    if (statelocation1 === 36) {priceCea = 1350} //CINCINNATI - OH
    if (statelocation1 === 37) {priceCea = 1350} //CINCINNATI SOUTH - OH
    if (statelocation1 === 38) {priceCea = 1075} //CLEARWATER - FL
    if (statelocation1 === 39) {priceCea = 1375} //CLEVELAND - OH
    if (statelocation1 === 40) {priceCea = 1525} //COLORADO SPRINGS - CO
    if (statelocation1 === 41) {priceCea = 1700} //COLTON - CA
    if (statelocation1 === 42) {priceCea = 1075} //COLUMBIA - SC
    if (statelocation1 === 43) {priceCea = 1350} //COLUMBUS - OH
    if (statelocation1 === 44) {priceCea = 1100} //CONCORD - NC
    if (statelocation1 === 45) {priceCea = 1150} //CORPUS CHRISTI - TX
    if (statelocation1 === 46) {priceCea = 1050} //CULPEPER - VA
    if (statelocation1 === 47) {priceCea = 3500} //D&D TOWING INC MAUI - HI
    if (statelocation1 === 48) {priceCea = 1150} //DALLAS - TX
    if (statelocation1 === 49) {priceCea = 1150} //Dallas/Ft Worth - TX
    if (statelocation1 === 50) {priceCea = 1350} //DAVENPORT - IA
    if (statelocation1 === 51) {priceCea = 1350} //DAYTON - OH
    if (statelocation1 === 52) {priceCea = 3500} //DC TOWING HILO - HI
    if (statelocation1 === 53) {priceCea = 1675} //DENVER - CO
    if (statelocation1 === 54) {priceCea = 1675} //DENVER EAST - CO
    if (statelocation1 === 55) {priceCea = 1425} //DES MOINES - IA
    if (statelocation1 === 56) {priceCea = 1425} //DETROIT - MI
    if (statelocation1 === 57) {priceCea = 1175} //DOTHAN - AL
    if (statelocation1 === 58) {priceCea = 1100} //DUNDALK - MD
    if (statelocation1 === 59) {priceCea = 1900} //EAST BAY - CA
    if (statelocation1 === 60) {priceCea = 1300} //EL PASO - TX
    if (statelocation1 === 61) {priceCea = 1150} //Elkton - VA
    if (statelocation1 === 62) {priceCea = 950} //Englishtown - NJ
    if (statelocation1 === 63) {priceCea = 1300} //ERIE - PA
    if (statelocation1 === 64) {priceCea = 2350} //EUGENE - OR
    if (statelocation1 === 65) {priceCea = 1675} //FARGO - ND      
    if (statelocation1 === 66) {priceCea = 1350} //FAYETTEVILLE - AR
    if (statelocation1 === 67) {priceCea = 1475} //FLINT - MI
    if (statelocation1 === 68) {priceCea = 1700} //FONTANA - CA
    if (statelocation1 === 69) {priceCea = 1075} //FORT MYERS - FL
    if (statelocation1 === 70) {priceCea = 1025} //FORT PIERCE - FL
    if (statelocation1 === 71) {priceCea = 1150} //Fort Worth North - TX
    if (statelocation1 === 72) {priceCea = 1050} //Fredericksburg-South - VA
    if (statelocation1 === 73) {priceCea = 1900} //FREMONT - CA
    if (statelocation1 === 74) {priceCea = 1875} //FRESNO - CA
    if (statelocation1 === 75) {priceCea = 1425} //GRAND RAPIDS - MI
    if (statelocation1 === 76) {priceCea = 1100} //GREENSBORO - NC
    if (statelocation1 === 77) {priceCea = 1100} //GREENVILLE - SС
    if (statelocation1 === 78) {priceCea = 1225}  //GRENADA - MS
    if (statelocation1 === 79) {priceCea = 1200} //GULF COAST - MS
    if (statelocation1 === 80) {priceCea = 1800} //HIGH POINT - CA
    if (statelocation1 === 81) {priceCea = 1025} //HARTFORD - CT
    if (statelocation1 === 82) {priceCea = 1025} //HARTFORD-SOUTH - CT
    if (statelocation1 === 83) {priceCea = 1800} //HIGH DESERT - CA
    if (statelocation1 === 84) {priceCea = 2595} //HONOLULU - HI
    if (statelocation1 === 85) {priceCea = 1055} //HOUSTON - TX
    if (statelocation1 === 86) {priceCea = 1055} //HOUSTON SOUTH - TX
    if (statelocation1 === 87) {priceCea = 1040} //HOUSTON-NORTH - TX
    if (statelocation1 === 88) {priceCea = 1250} //HUNTSVILLE - AL
    if (statelocation1 === 89) {priceCea = 1075} //IAA CAT HOUSTON - TX
    if (statelocation1 === 90) {priceCea = 1325} //INDIANAPOLIS - IN
    if (statelocation1 === 91) {priceCea = 1625} //INDIANAPOLIS SOUTH - IN
    if (statelocation1 === 92) {priceCea = 1225} //JACKSON - MS
    if (statelocation1 === 93) {priceCea = 1050} //JACKSONVILLE - FL
    if (statelocation1 === 94) {priceCea = 1425} //KANSAS CITY - KS
    if (statelocation1 === 95) {priceCea = 1425} //Kansas City East - MO
    if (statelocation1 === 96) {priceCea = 1200} //KNOXVILLE - TN
    if (statelocation1 === 97) {priceCea = 1200} //LAFAYETTE - LA
    if (statelocation1 === 98) {priceCea = 1100} //LAUREL - MD
    if (statelocation1 === 99) {priceCea = 4225} //LEES TOWING KAUAI - HI
    if (statelocation1 === 100) {priceCea = 1050} //Lexington - SC
    if (statelocation1 === 101) {priceCea = 1325} //LINCOLN - IL
    if (statelocation1 === 102) {priceCea = 1475} //LITTLE ROCK - AR
    if (statelocation1 === 103) {priceCea = 1050} //LONG ISLAND - NY
    if (statelocation1 === 104) {priceCea = 1150} //LONGVIEW - TX
    if (statelocation1 === 105) {priceCea = 1660} //LOS ANGELES - CA
    if (statelocation1 === 106) {priceCea = 1650} //Los Angeles South - CA
    if (statelocation1 === 107) {priceCea = 1225} //LOUISVILLE - KY
    if (statelocation1 === 108) {priceCea = 1350} //LOUISVILLE NORTH - KY
    if (statelocation1 === 109) {priceCea = 1325} //LUBBOCK - TX
    if (statelocation1 === 110) {priceCea = 1075} //MACON - GA
    if (statelocation1 === 111) {priceCea = 1200} //MANCHESTER - NH
    if (statelocation1 === 112) {priceCea = 1225} //MCALLEN - TX
    if (statelocation1 === 113) {priceCea = 1300} //MEMPHIS - TN
    if (statelocation1 === 114) {priceCea = 1100} //METRO DC - MD
    if (statelocation1 === 115) {priceCea = 950} //MIAMI - FL
    if (statelocation1 === 116) {priceCea = 975} //MIAMI NORTH - FL
    if (statelocation1 === 117) {priceCea = 1250} //MILWAUKEE - WI
    if (statelocation1 === 118) {priceCea = 1475} //Minneapolis South  - MN
    if (statelocation1 === 119) {priceCea = 1475} //MINNEAPOLIS/ST. PAUL - MN
    if (statelocation1 === 120) {priceCea = 2575} //MISSOULA - MT
    if (statelocation1 === 121) {priceCea = 1200} //NASHVILLE - TN
    if (statelocation1 === 122) {priceCea = 1050} //NEW CASTLE - DE
    if (statelocation1 === 123) {priceCea = 1225} //NEW ORLEANS - LA
    if (statelocation1 === 124) {priceCea = 1225} //NEW ORLEANS EAST  - LA
    if (statelocation1 === 125) {priceCea = 1225} //New Orleans and Louisiana Flood - LA
    if (statelocation1 === 126) {priceCea = 1225} //NEW ORLEANS EAST - LA
    if (statelocation1 === 127) {priceCea = 1025} //NEWBURGH - NY
    if (statelocation1 === 128) {priceCea = 1700} //NORTH HOLLYWOOD - CA
    if (statelocation1 === 129) {priceCea = 925} //NORTHERN NEW JERSEY - NJ
    if (statelocation1 === 130) {priceCea = 1050} //NORTHERN VIRGINIA - VA
    if (statelocation1 === 131) {priceCea = 1275} //OKLAHOMA CITY - OK
    if (statelocation1 === 132) {priceCea = 1475} //OMAHA - NE
    if (statelocation1 === 133) {priceCea = 1075} //ORLANDO - FL
    if (statelocation1 === 134) {priceCea = 1075} //ORLANDO-NORTH - FL
    if (statelocation1 === 135) {priceCea = 1225} //PENSACOLA - FL
    if (statelocation1 === 136) {priceCea = 1325} //PERMIAN BASIN - TX
    if (statelocation1 === 137) {priceCea = 1000} //PHILADELPHIA - PA
    if (statelocation1 === 138) {priceCea = 1000} //PHILADELPHIA EAST - PA
    if (statelocation1 === 139) {priceCea = 1850} //PHOENIX - AR
    if (statelocation1 === 140) {priceCea = 1250} //PITTSBURGH - PA
    if (statelocation1 === 141) {priceCea = 1250} //PITTSBURGH NORTH - PA
    if (statelocation1 === 142) {priceCea = 975} //PORT MURRAY - NJ
    if (statelocation1 === 143) {priceCea = 1325} //PORTAGE - WI
    if (statelocation1 === 144) {priceCea = 1275} //PORTLAND - GORHAM - ME
    if (statelocation1 === 145) {priceCea = 2225} //PORTLAND - OR
    if (statelocation1 === 146) {priceCea = 2225} //Portland West - OR
    if (statelocation1 === 147) {priceCea = 1150} //PROVIDENCE - RI
    if (statelocation1 === 148) {priceCea = 1200} //PULASKI - VA
    if (statelocation1 === 149) {priceCea = 1100} //RALEIGH - NC
    if (statelocation1 === 150) {priceCea = 2050} //RENO - NV
    if (statelocation1 === 151) {priceCea = 1000} //RICHMOND - VA
    if (statelocation1 === 152) {priceCea = 1175} //ROANOKE - VA
    if (statelocation1 === 153) {priceCea = 1250} //ROCHESTER - NY
    if (statelocation1 === 154) {priceCea = 1150} //ROSEDALE - MD
    if (statelocation1 === 155) {priceCea = 1150} //SACRAMENTO - CA    3333
    if (statelocation1 === 156) {priceCea = 2050} //SALT LAKE CITY - UT
    if (statelocation1 === 157) {priceCea = 1175} //SAN ANTONIO - TX
    if (statelocation1 === 158) {priceCea = 1175} //SAN ANTONIO-SOUTH - TX
    if (statelocation1 === 159) {priceCea = 1750} //SAN BERNARDINO - CA
    if (statelocation1 === 160) {priceCea = 1730} //SAN DIEGO - CA
    if (statelocation1 === 161) {priceCea = 925} //SAVANNAH - GA
    if (statelocation1 === 162) {priceCea = 950} //Sayreville - NJ
    if (statelocation1 === 163) {priceCea = 1050} //SCRANTON - PA
    if (statelocation1 === 164) {priceCea = 2150} //SEATTLE - WA
    if (statelocation1 === 165) {priceCea = 1425} //SHADY SPRING - WV
    if (statelocation1 === 166) {priceCea = 1190} //SHREVEPORT - LA
    if (statelocation1 === 167) {priceCea = 1675} //SIOUX FALLS - SD
    if (statelocation1 === 168) {priceCea = 1275} //SOUTH BEND - IN
    if (statelocation1 === 169) {priceCea = 1000} //SOUTHERN NEW JERSEY - NJ
    if (statelocation1 === 170) {priceCea = 2325} //SPOKANE - WA
    if (statelocation1 === 171) {priceCea = 1425} //SPRINGFIELD - MO
    if (statelocation1 === 172) {priceCea = 1375} //ST. LOUIS - IL
    if (statelocation1 === 173) {priceCea = 950} //Suffolk - VA
    if (statelocation1 === 174) {priceCea = 1125} //SYRACUSE - NY
    if (statelocation1 === 175) {priceCea = 1075} //TAMPA - FL
    if (statelocation1 === 176) {priceCea = 1100} //Tampa North - FL
    if (statelocation1 === 177) {priceCea = 1175} //TAUNTON - MA
    if (statelocation1 === 178) {priceCea = 1175} //Templeton - MA
    if (statelocation1 === 179) {priceCea = 950} //TIDEWATER - VA
    if (statelocation1 === 180) {priceCea = 1075} //TIFTON - GA
    if (statelocation1 === 181) {priceCea = 1900} //TUCSON - AZ
    if (statelocation1 === 182) {priceCea = 1350} //TULSA - OK
    if (statelocation1 === 183) {priceCea = 3700} //WEST HAWAII TOWING & REPAIR INC KONA - HI
    if (statelocation1 === 184) {priceCea = 1005} //WEST PALM BEACH - FL
    if (statelocation1 === 185) {priceCea = 1425} //WICHITA - KS
    if (statelocation1 === 186) {priceCea = 1175} //WILMINGTON - NC
    if (statelocation1 === 187) {priceCea = 1225} //YORK HAVEN - PA
    if (statelocation1 === 188) {priceCea = 1075} //YORK SPRINGS - PA
    priceCea+=1000;
  };
    if (platform === 1 && deliverytoPort === 2){
    if (statelocation === 0) {priceCea = 0}
    if (statelocation === 1) {priceCea = 1225}   
    if (statelocation === 2) {priceCea = 1800} //ADELANTO - CA
    if (statelocation === 3) {priceCea = 3650} //ADP TOWING MAUI -HI
    if (statelocation === 4) {priceCea = 1075}  //ALBANY - NY
    if (statelocation === 5) {priceCea = 1475}  //ALBUQUERQUE - PA
    if (statelocation === 6) {priceCea = 1250}  //ALTOONA - PA
    if (statelocation === 7) {priceCea = 1400}  //AMARILLO - TX
    if (statelocation === 8) {priceCea = 1300}  //ANDREWS - TX
    if (statelocation === 9) {priceCea = 1900}  //ANTELOPE - CA
    if (statelocation === 10) {priceCea = 1350}  //APPLETON - WI
    if (statelocation === 11) {priceCea = 1125} //ATLANTA EAST - GA
    if (statelocation === 12) {priceCea = 1125} //ATLANTA NORTH - GA
    if (statelocation === 13) {priceCea = 1100} //ATLANTA SOUTH - GA
    if (statelocation === 14) {priceCea = 1100} //ATLANTA WEST - GA
    if (statelocation === 15) {priceCea = 1075} //Augusta - GA
    if (statelocation === 16) {priceCea = 1125} //AUSTIN - TX
    if (statelocation === 17) {priceCea = 1850} //BAKERSFIELD - CA
    if (statelocation === 18) {priceCea = 1125} //BALTIMORE - MD
    if (statelocation === 19) {priceCea = 1125} //BALTIMORE EAST - MD
    if (statelocation === 20) {priceCea = 1225} //BATON ROUGE - LA
    if (statelocation === 21) {priceCea = 2825} //BILLINGS - MT
    if (statelocation === 22) {priceCea = 1175} //BIRMINGHAM - AL
    if (statelocation === 23) {priceCea = 2425} //BOISE - ID
    if (statelocation === 24) {priceCea = 1300} //BUFFALO - NY
    if (statelocation === 25) {priceCea = 1200} //CANDIA - NH
    if (statelocation === 26) {priceCea = 1100} //CARTERSVILLE - GA
    if (statelocation === 27) {priceCea = 1150} //CHAMBERSBURG - PA
    if (statelocation === 28) {priceCea = 1425} //CHARLESTON - WV
    if (statelocation === 29) {priceCea = 1205} //CHICAGO NORTH - IL
    if (statelocation === 30) {priceCea = 1205} //CHICAGO SOUTH - IL
    if (statelocation === 31) {priceCea = 1205} //CHICAGO SOUTH-Wood
    if (statelocation === 32) {priceCea = 1100} //CHINA GROVE - NC
    if (statelocation === 33) {priceCea = 1325} //CICERO - IN
    if (statelocation === 34) {priceCea = 1350} //CLEVELAND EAST - OH
    if (statelocation === 35) {priceCea = 1350} //CLEVELAND WEST - OH
    if (statelocation === 36) {priceCea = 1525} //COLORADO SPRINGS - CO
    if (statelocation === 37) {priceCea = 1350} //COLUMBUS - OH
    if (statelocation === 38) {priceCea = 1100} //CONCORD - NC
    if (statelocation === 39) {priceCea = 1150} //CORPUS CHRISTI - TX
    if (statelocation === 40) {priceCea = 1075} //CRASHEDTOYS ATLANTA - GA
    if (statelocation === 41) {priceCea = 1150} //CRASHEDTOYS DALLAS  - TX
    if (statelocation === 42) {priceCea = 1475} //CRASHEDTOYS EAST BETHEL - MN
    if (statelocation === 43) {priceCea = 1350} //CRASHEDTOYS ELDRIDGE - IA
    if (statelocation === 44) {priceCea = 1475} //CRASHEDTOYS MINNEAPOLIS - MN
    if (statelocation === 45) {priceCea = 1950} //CRASHEDTOYS SACRAMENTO - CA
    if (statelocation === 46) {priceCea = 1150} //DALLAS - TX
    if (statelocation === 47) {priceCea = 1150} //DALLAS SOUTH - TX
    if (statelocation === 48) {priceCea = 1100} //DANVILLE - VA
    if (statelocation === 49) {priceCea = 1350} //DAVENPORT - 169 Davenport sublot - IA
    if (statelocation === 50) {priceCea = 1350} //DAVENPORT - IA
    if (statelocation === 51) {priceCea = 1350} //DAYTON - OH
    if (statelocation === 52) {priceCea = 1675} //DENVER - CO
    if (statelocation === 53) {priceCea = 1675} //DENVER CENTRAL - CO
    if (statelocation === 54) {priceCea = 1675} //DENVER SOUTH - CO
    if (statelocation === 55) {priceCea = 1425} //DES MOINES - IA
    if (statelocation === 56) {priceCea = 1425} //DETROIT - MI
    if (statelocation === 57) {priceCea = 4325} //DK TOWING KAUAI - HI
    if (statelocation === 58) {priceCea = 1175} //DOTHAN - AL
    if (statelocation === 59) {priceCea = 1205} //DYER - IN
    if (statelocation === 60) {priceCea = 1350} //EARLINGTON - KY
    if (statelocation === 61) {priceCea = 1300} //EL PASO - TX
    if (statelocation === 62) {priceCea = 2350} //EUGENE - OR
    if (statelocation === 63) {priceCea = 1150} //EXETER  - RI
    if (statelocation === 64) {priceCea = 1075} //FAIRBURN  - GA
    if (statelocation === 65) {priceCea = 1475} //FLINT - MI
    if (statelocation === 66) {priceCea = 1325} //FORT WAYNE - IN
    if (statelocation === 67) {priceCea = 1050} //FREDERICKSBURG  - VA
    if (statelocation === 68) {priceCea = 1175} //FREETOWN - MA
    if (statelocation === 69) {priceCea = 1875} //FRESNO - CA
    if (statelocation === 70) {priceCea = 1025} //FT. PIERCE - FL
    if (statelocation === 71) {priceCea = 1150} //FT. WORTH - TX
    if (statelocation === 72) {priceCea = 1125} //GASTONIA - NC
    if (statelocation === 73) {priceCea = 1000} //GLASSBORO EAST - NJ
    if (statelocation === 74) {priceCea = 1000} //GLASSBORO WEST - NJ
    if (statelocation === 75) {priceCea = 2125} //GRAHAM - WA
    if (statelocation === 76) {priceCea = 1075} //GREER - SС
    if (statelocation === 77) {priceCea = 1205} //HAMMOND - IN
    if (statelocation === 78) {priceCea = 950}  //HAMPTON - VA
    if (statelocation === 79) {priceCea = 1075} //HARRISBURG - PA
    if (statelocation === 80) {priceCea = 1025} //HARTFORD - CT
    if (statelocation === 81) {priceCea = 1325} //HARTFORD CITY - IN
    if (statelocation === 82) {priceCea = 1050} //HARTFORD SPRINGFIELD - CT
    if (statelocation === 83) {priceCea = 1900} //HAYWARD - CA
    if (statelocation === 84) {priceCea = 2725} //HELENA - MT
    if (statelocation === 85) {priceCea = 2595} //HONOLULU - HI
    if (statelocation === 86) {priceCea = 1055} //HOUSTON - TX
    if (statelocation === 87) {priceCea = 1055} //HOUSTON EAST - TX
    if (statelocation === 88) {priceCea = 1325} //INDIANAPOLIS - IN
    if (statelocation === 89) {priceCea = 1425} //IONIA - MI
    if (statelocation === 90) {priceCea = 1225} //JACKSON - MS
    if (statelocation === 91) {priceCea = 1050} //JACKSONVILLE EAST - FL
    if (statelocation === 92) {priceCea = 1050} //JACKSONVILLE NORTH - FL
    if (statelocation === 93) {priceCea = 1050} //JACKSONVILLE WEST - FL
    if (statelocation === 94) {priceCea = 1425} //KANSAS CITY - KS
    if (statelocation === 95) {priceCea = 1775} //KINCHELOE - MI
    if (statelocation === 96) {priceCea = 3500} //KENS TOWING HILO - HI
    if (statelocation === 97) {priceCea = 1200} //KNOXVILLE - TN
    if (statelocation === 98) {priceCea = 1425} //LANSING - MI
    if (statelocation === 99) {priceCea = 1875} //LAS VEGAS - NV
    if (statelocation === 100) {priceCea = 1875} //LAS VEGAS WEST - NV
    if (statelocation === 101) {priceCea = 1350} //LEXINGTON WEST - KY
    if (statelocation === 102) {priceCea = 1350} //LEXINGTON EAST - KY
    if (statelocation === 103) {priceCea = 1475} //LINCOLN - NE
    if (statelocation === 104) {priceCea = 1475} //LITTLE ROCK - AR
    if (statelocation === 105) {priceCea = 1650} //LONG BEACH - CA
    if (statelocation === 106) {priceCea = 1050} //LONG ISLAND - NY
    if (statelocation === 107) {priceCea = 1150} //LONGVIEW - TX
    if (statelocation === 108) {priceCea = 1660} //LOS ANGELES - CA
    if (statelocation === 109) {priceCea = 1350} //LOUISVILLE - KY
    if (statelocation === 110) {priceCea = 1150} //LUFKIN - TX
    if (statelocation === 111) {priceCea = 1100} //LUMBERTON - NC
    if (statelocation === 112) {priceCea = 1275} //LYMAN - ME
    if (statelocation === 113) {priceCea = 1050} //MACON - GA
    if (statelocation === 114) {priceCea = 1325} //MADISON - WI
    if (statelocation === 115) {priceCea = 1325} //MADISON SOUTH - WI
    if (statelocation === 116) {priceCea = 1900} //MARTINEZ - CA
    if (statelocation === 117) {priceCea = 1225} //MCALLEN - TX
    if (statelocation === 118) {priceCea = 1100} //MEBANE - NC
    if (statelocation === 119) {priceCea = 1300} //MEMPHIS - TN
    if (statelocation === 120) {priceCea = 1800} //MENTONE - CA
    if (statelocation === 121) {priceCea = 950} //MIAMI CENTRAL - FL
    if (statelocation === 122) {priceCea = 950} //MIAMI NORTH - FL
    if (statelocation === 123) {priceCea = 975} //MIAMI SOUTH - FL
    if (statelocation === 124) {priceCea = 1250} //MILWAUKEE - Stutervant sublot - WI
    if (statelocation === 125) {priceCea = 1250} //MILWAUKEE - Waukesha sublot - WI
    if (statelocation === 126) {priceCea = 1250} //MILWAUKEE - WI
    if (statelocation === 127) {priceCea = 1250} //MILWAUKEE SOUTH - WI
    if (statelocation === 128) {priceCea = 1250} //MILWAUKEE NORTH - WI
    if (statelocation === 129) {priceCea = 1250} //MILWAUKEE- Yard 339 Milwaukee sublot - WI
    if (statelocation === 130) {priceCea = 1475} //MINNEAPOLIS - MN
    if (statelocation === 131) {priceCea = 1475} //MINNEAPOLIS NORTH - MN
    if (statelocation === 132) {priceCea = 1425} //MO - COLUMBIA - MO
    if (statelocation === 133) {priceCea = 1200} //MOBILE - AL
    if (statelocation === 134) {priceCea = 1200} //MOBILE SOUTH - AL
    if (statelocation === 135) {priceCea = 1100} //MOCKSVILLE  - NC
    if (statelocation === 136) {priceCea = 1200} //MONTGOMERY - AL
    if (statelocation === 137) {priceCea = 1250} //N.Boston-ROWLEY Sublot - MA
    if (statelocation === 138) {priceCea = 1200} //NASHVILLE - TN
    if (statelocation === 139) {priceCea = 1225} //NEW ORLEANS - LA
    if (statelocation === 140) {priceCea = 1025} //NEWBURGH - NY
    if (statelocation === 141) {priceCea = 1175} //NORTH BOSTON - MA
    if (statelocation === 142) {priceCea = 1075} //NORTH CHARLESTON - SC
    if (statelocation === 143) {priceCea = 2175} //NORTH SEATTLE - WA
    if (statelocation === 144) {priceCea = 1125} //OCALA - FL
    if (statelocation === 145) {priceCea = 2050} //OGDEN - UT
    if (statelocation === 146) {priceCea = 1275} //OKLAHOMA CITY - OK
    if (statelocation === 147) {priceCea = 1075} //ORLANDO - FL
    if (statelocation === 148) {priceCea = 1075} //ORLANDO NORTH - FL
    if (statelocation === 149) {priceCea = 1075} //ORLANDO SOUTH - FL
    if (statelocation === 150) {priceCea = 2325} //PASCO - WA
    if (statelocation === 151) {priceCea = 1325} //PEORIA - IL
    if (statelocation === 152) {priceCea = 1000} //PHILADELPHIA - PA
    if (statelocation === 153) {priceCea = 1000} //PHILADELPHIA EAST - PA
    if (statelocation === 154) {priceCea = 1850} //PHOENIX - AR
    if (statelocation === 155) {priceCea = 1200} //PITTSBURGH EAST - PA
    if (statelocation === 156) {priceCea = 1250} //PITTSBURGH NORTH - PA
    if (statelocation === 157) {priceCea = 1250} //PITTSBURGH SOUTH - PA
    if (statelocation === 158) {priceCea = 1250} //PITTSBURGH WEST - PA
    if (statelocation === 159) {priceCea = 2225} //PORTLAND NORTH - OR
    if (statelocation === 160) {priceCea = 2275} //PORTLAND SOUTH - OR
    if (statelocation === 161) {priceCea = 1050} //PUNTA GORDA - FL
    if (statelocation === 162) {priceCea = 1100} //PUNTA GORDA SOUTH - FL
    if (statelocation === 163) {priceCea = 1100} //RALEIGH - NC
    if (statelocation === 164) {priceCea = 1700} //RANCHO CUCAMONGA - CA
    if (statelocation === 165) {priceCea = 2300} //REDDING - CA
    if (statelocation === 166) {priceCea = 2050} //RENO - NV
    if (statelocation === 167) {priceCea = 975} //RICHMOND - VA
    if (statelocation === 168) {priceCea = 975} //RICHMOND EAST - VA
    if (statelocation === 169) {priceCea = 1250} //ROCHESTER - NY
    if (statelocation === 170) {priceCea = 1900} //SACRAMENTO - CA
    if (statelocation === 171) {priceCea = 2150} //SALT LAKE CITY - UT
    if (statelocation === 172) {priceCea = 2050} //SALT LAKE CITY NORTH - UT
    if (statelocation === 173) {priceCea = 1175} //SAN ANTONIO - TX
    if (statelocation === 174) {priceCea = 1700} //SAN BERNARDINO - CA
    if (statelocation === 175) {priceCea = 1730} //SAN DIEGO - CA
    if (statelocation === 176) {priceCea = 1900} //SAN JOSE - CA
    if (statelocation === 177) {priceCea = 925} //SAVANNAH - GA
    if (statelocation === 178) {priceCea = 975} //SAVANNAH / VERTIA SUBLOT-Georgia Copart - GA
    if (statelocation === 179) {priceCea = 1075} //SC - COLUMBIA - SC
    if (statelocation === 180) {priceCea = 1050} //SCRANTON - PA
    if (statelocation === 181) {priceCea = 1125} //SEAFORD - DE
    if (statelocation === 182) {priceCea = 1190} //SHREVEPORT - LA
    if (statelocation === 183) {priceCea = 1500} //SIKESTON - MO
    if (statelocation === 184) {priceCea = 1900} //SOSACRAMENTO - CA
    if (statelocation === 185) {priceCea = 950} //SOMERVILLE - NJ
    if (statelocation === 186) {priceCea = 1175} //SOUTH BOSTON - MA
    if (statelocation === 187) {priceCea = 1375} //Southern Illinois - IL
    if (statelocation === 188) {priceCea = 1100} //SPARTANBURG - SC
    if (statelocation === 189) {priceCea = 2325} //SPOKANE - WA
    if (statelocation === 190) {priceCea = 1425} //SPRINGFIELD - MO
    if (statelocation === 191) {priceCea = 1525} //ST. CLOUD - MN
    if (statelocation === 192) {priceCea = 1375} //ST. LOUIS - MO
    if (statelocation === 193) {priceCea = 1700} //SUN VALLEY - CA
    if (statelocation === 194) {priceCea = 1125} //SYRACUSE - NY
    if (statelocation === 195) {priceCea = 1125} //TALLAHASSEE - FL
    if (statelocation === 196) {priceCea = 1075} //TAMPA SOUTH - FL
    if (statelocation === 197) {priceCea = 1100} //TAMPA SOUTH - Mulberry Sublot - FL
    if (statelocation === 198) {priceCea = 1225} //TANNER - AL
    if (statelocation === 199) {priceCea = 1075} //TIFTON - GA
    if (statelocation === 200) {priceCea = 3700} //TOW GUYS KAMUELA - HI
    if (statelocation === 201) {priceCea = 950} //TRENTON - NJ
    if (statelocation === 202) {priceCea = 1900} //TUCSON - AZ
    if (statelocation === 203) {priceCea = 1350} //TULSA - OK
    if (statelocation === 204) {priceCea = 1900} //VALLEJO - CA
    if (statelocation === 205) {priceCea = 1700} //VAN NUYS - CA
    if (statelocation === 206) {priceCea = 1200} //WACO - TX
    if (statelocation === 207) {priceCea = 1575} //WALTON - KY
    if (statelocation === 208) {priceCea = 1100} //WASHINGTON DC - MD
    if (statelocation === 209) {priceCea = 1200} //WEBSTER - NH
    if (statelocation === 210) {priceCea = 995} //WEST PALM BEACH - FL
    if (statelocation === 211) {priceCea = 1175} //WEST WARREN - MA
    if (statelocation === 212) {priceCea = 1205} //WHEELING - IL
    if (statelocation === 213) {priceCea = 1275} //Windham - NY
    if (statelocation === 214) {priceCea = 1425} //WICHITA - KS
    if (statelocation === 215) {priceCea = 1075} //YORK HAVEN - PA
    if (statelocation === 216) {priceCea = 1425} //WAYLAND - MI
      priceCea = 0
    };
    if (platform === 2 && deliverytoPort === 2){priceCea = 0};
    // priceCea+=1000;
     DeliverytoPort.textContent = priceCea +" $";
    deliveryAmount();
    ResultTotal();
};
 

//Документы на перегистрацию, цена
function calculationDocuments() {
  let salvageDocumentPrice = 0;

      if (salvageDocument != 0) {
        salvageDocumentPrice =350;
        RegistrationDocuments.textContent = salvageDocumentPrice +" $";
      } else{
        salvageDocumentPrice = 0;
        RegistrationDocuments.textContent = salvageDocumentPrice +" $";
      }

  return salvageDocumentPrice;
}

// Доставка до Минск
function deliveryToMinsk(){
   
  if (deliverytoPort === 1) { //тянем в клайпед
      priceMinsk = 1300;
      document.getElementById("DeliveryMinsk").textContent = priceMinsk +" $";
  }else if(deliverytoPort === 2){
    priceMinsk = 3000;
    document.getElementById("DeliveryMinsk").textContent = priceMinsk +" $";
  };
  deliveryAmount();
  calculationDeliverySea();

};



// подсчёт всех рублей и первод в доллары

function sumRub_Dol(){

  let sum = PreparationExportdocuments$ + 545 + 120 + 400;  // экспортные доки, утиль, таможенные сборы, свх
  return sum / BEL_USD.toFixed(2);
    
}


// сумма первых 3-х
function deliveryAmount(){ //Сумма  Аукционные,доставка,доставка
  if (priceLot === null || priceLot === undefined || priceLot ===" ") {priceLot = 0}
  sum = buyerFee + priceCea + priceMinsk + priceLot;
  // outHtml.textContent = sum + " $";
  ResultTotal();
};


 function RESETFUNCTION() {
  DeliverytoPort.textContent = 0;
  sum = 0;
  priceCea = 0;
  DeliverytoPort.textContent = 0;
  AuctionDealerFees.textContent = 0;
  // outHtml.textContent = 0;
  StateLocation.value = "xui";
  StateLocation1.value = "xui";
  statelocation = 0;
  statelocation1 = 0;
 };

function ResultTotal() {
  resultTotal.textContent = sum + calculationDocuments() + Math.round(sumRub_Dol()) + Math.round(CustomEngine*EUR_USD) +" $";
}



// crosCursEur.addEventListener("input",dataCursEur);
// crosCursDol.addEventListener("input",dataCursDol);


PriceLot.addEventListener("input",dataPrice);

EngineСapacity.addEventListener("input",dataengineСapacity);

AgeAuto.addEventListener("change",getAge);

TypeTC.addEventListener("change",dataTypeTC);

Platform.addEventListener("change",dataPlatform);

StateLocation.addEventListener("change",dataLocation);
StateLocation1.addEventListener("change",dataLocation1);

DeliveyGeo.addEventListener("change",dataDeliverytoPort);

Dacument.addEventListener("change",dataDacument);

OtherEV.addEventListener("change",PreferentialCustoms);

PreparationExportdocumentsCheck.addEventListener("change",CheckDockument);



