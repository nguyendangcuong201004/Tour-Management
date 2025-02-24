import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    `${process.env.DATABASE_NAME}`,
    `${process.env.USER_NAME}`, // username
    `${process.env.PASSWORD}`,     // password
     {
       host: `${process.env.HOST}`,
       dialect: 'mysql'
     }
   );
 
 sequelize.authenticate().then(() => {
    console.log('Connect Database Successful!');
 }).catch((error) => {
    console.error('Connect Database Fail: ', error);
 });

 export default sequelize;