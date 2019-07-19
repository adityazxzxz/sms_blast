module.exports = (sequelize,Sequelize) => {
    const Logs = sequelize.define(
        'p_logs',{
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            content_id:{
                type:Sequelize.INTEGER,
            },
            msisdn:{
                type:Sequelize.STRING,
            },
            status:{
                type:Sequelize.ENUM,
                values:['process','fail','success'],
                defaultValue:'process'
            },
            response:{
                type:Sequelize.STRING
            },
            created_at:{
                type:'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                get:function(){
                    return moment.tz(this.getDataValue('created_at'),'Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
                }
            },
            updated_at:{
                type:'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                get:function(){
                    return moment.tz(this.getDataValue('updated_at'),'Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        {
            timestamps:false,
            paranoid:false,
            underscored:false,
            freezeTableName:true,
            tableName:'p_logs'
        }
    );
    return Logs;
}