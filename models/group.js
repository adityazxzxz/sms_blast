module.exports = (sequelize,Sequelize) => {
    const Group = sequelize.define(
        'group',{
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            name:{
                type:Sequelize.STRING
            },
            source:{
                type:Sequelize.STRING
            },
            created_at:{
                type:'TIMESTAMP',
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at:{
                type:'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },{
            name:{
                singular:'group',
                plural:'groups'
            },
            underscored: false,
            timestamps:false,
            freezeTableName:true,
            tableName:'p_group'
        }
    );

    return Group;
}
