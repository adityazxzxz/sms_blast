'use strict'
var moment = require('moment');

module.exports = (sequelize,Sequelize) => {
    const Sms = sequelize.define(
        'p_sms_content',{
            id:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull:false
            },
            content:{
                type:Sequelize.STRING,
                allowNull:false
            },
            created_at:{
                type:'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                get:function(){
                    return moment.tz(this.getDataValue('created_at'),'Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
                }

            }
        },
        {
            timestamps:false,
            paranoid:false,
            underscored:false,
            freezeTableName:true,
            tableName:'p_sms_content'
        }
    );
    return Sms;
}