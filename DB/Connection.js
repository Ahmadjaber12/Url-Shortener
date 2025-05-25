import { Sequelize } from 'sequelize'

export const sequelize= new Sequelize('mydb','Ahmad','12345678',{
        host:'localhost',
        dialect:'mysql',
        logging:false,
        
})
export const connection=async()=>{
    return sequelize.sync({alter:true})
    .then(res=>{ 
        console.log("Successful Connection");    
    }).catch(err=>{
            console.log(`${err}`);
            
    });
}


