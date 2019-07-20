module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define(
        'p_users',{
            id:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull:false
            },
            username:{
                type:Sequelize.STRING,
            },
            password:{
                type:Sequelize.STRING
            }
        },{
            timestamps:false,
            paranoid:false,
            tableName:'p_users',
            freezeTableName:true,
            underscored:false
        }
    );
    return User;
}