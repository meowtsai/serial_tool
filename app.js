#!/usr/bin/env node

const argv = require('yargs').argv
const serial = require('./model/serial')

var command = argv._[0];
const event_id = argv.event_id

var result = 0;
if (command==='create') {
    result = serial.createSerial(event_id)
    //console.log("result", result)
    
    
} else if (command==='download') {
    result = serial.downloadCSV(event_id)
    
    //process.exit()
} else  {
    console.log("Command not found!")
}




    // [ RowDataPacket {
    //     id: 1,
    //     event_id: 13,
    //     title: '舞台區虛寶序號：388線索+監管者通用體驗卡7天+求生者通用體驗卡7天+記憶珍寶*2',
    //     qty: 200,
    //     status: 0 },
    //   RowDataPacket {
    //     id: 2,
    //     event_id: 13,
    //     title: '全場集點活動虛寶：158線索+監管者通用體驗卡3天+求生者通用體驗卡3天',
    //     qty: 900,
    //     status: 0 },
    //   RowDataPacket {
    //     id: 3,
    //     event_id: 13,
    //     title: '關主擂台集點活動：288線索+監管者通用體驗卡7天+求生者通用體驗卡7天+記憶珍寶*1',
    //     qty: 1500,
    //     status: 0 } ]
    
// const event_id = argv.event_id
// let event;
// db.query('SELECT * FROM events where id=?', event_id , function(err, result) {
//     if (err) throw err;
//     if (result[0]!==undefined)
//     {
//         //console.log(result[0]);
//         //console.log(result[0].event_name);

//         event = new Event({id:result[0].id,game_id:result[0].game_id, name:result[0].event_name})

//         console.log(`產${event.name}虛寶`);
        
//         // 撈取 sub id 

//     }
//     else{
//         console.log(`Event id: ${event_id} Not Found`);
//     }
    
    
//   });

//const event = new Event({id:1, name:"Event 1", game_id:'h55'})

//console.log(event.name);




//const Foo = require('./model/Foo')

//var object = new Foo('Hello');

//console.log(object);


//const event_id = argv.event_id

//get db 
//console.log('argv',argv)
//console.log(argv._[0])

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log('Plunder more riffiwobbles!')
// } else {
//   console.log('Retreat from the xupptumblers!')
// }

//node app --event_id=11
