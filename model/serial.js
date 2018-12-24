//const Event = require('./model/Event')
const Database = require('./db');
const Serial_generator = require('./serial_generator')
const config = require('../config.json')
const fs = require('fs')
var database = new Database(config)


var createSerial = (event_id) => {
    
    let serial_array = [];
    let total_rows = 0;
    database.query( 'SELECT * FROM events where id=?',event_id )
    .then( rows => {
        console.log(rows);
        return database.query( 'SELECT * FROM serial_main where event_id=? and status=0',event_id )
    } )
    .then( rows => {
        if (rows.length>0)
        {
            for (let index = 0; index < rows.length; index++) {
                const subEvent = rows[index];
                console.log(`開始產出 ${subEvent.title} 共 ${subEvent.qty} 組虛寶中....`);
                total_rows = total_rows + subEvent.qty;
                //for (let j = 0; j < 2; j++) {
                for (let j = 0; j < subEvent.qty; j++) {
                    const result = Serial_generator(12)
                    
                    var fields = [event_id,result,subEvent.id]
                    serial_array.push(fields)
                    
                    
                    //
                }
                
                
            }
    
            //console.log(serial_array);
            return database.query( 'Insert into event_serial(event_id,serial, event_sub_id) values ?',[serial_array] )
        }
        else
        {
            console.log(`該虛寶沒有需要產出的項目`)
            return 0
        }
        
       
    } )
    .then(rows => {
        if (rows!==0){
            console.log(rows)
            if (rows.affectedRows === total_rows){
                console.log(`共產出${rows.affectedRows}虛寶`)
                return database.query( 'update serial_main set status=1 where event_id = ?',event_id )
            }
            else {
                console.log(`虛寶產出錯誤 total_rows=${total_rows} , affectedRows=${rows.affectedRows}`)
                database.close()
            }
        }
        else 
        {
            return 0
        }
        
    }).then(rows => {
        console.log(`作業完畢`)
        return 1
        database.close()
    });
}

var downloadCSV = (event_id) => {
    let content = "";
    database.query( `select  b.event_name, c.title, a.serial 
    from event_serial a 
    left join events b on a.event_id = b.id
    left join serial_main c on a.event_sub_id =c.id
    where a.event_id=? limit 20`,event_id )
    .then( rows => {
        if (rows.length>0)
        {
            const fileName = rows[0].event_name + ".csv"
            for (let index = 1; index <= rows.length; index++) {
                const item = rows[index-1];
                content =  content + `${index},${item.event_name},${item.title},${item.serial}\n`
                
            }
    
            fs.writeFileSync( fileName, content, (err)=>{
                if (err) {
                    console.log('Something went wrong while adding note!', err);
                }
            })

            console.log(`OK`)
            return 1
            
        }
        else
        {
            console.log(`該活動沒有已經產出的虛寶項目`)
            return 0
        }
        
        database.close()
    } )
}


module.exports= {
    createSerial,
    downloadCSV,
}