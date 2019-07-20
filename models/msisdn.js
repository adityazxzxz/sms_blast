module.exports = (sequelize, Sequelize) => {
    const Msisdn = sequelize.define(
        'msisdn', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            group_id: {
                type: Sequelize.INTEGER,
            },
            msisdn: {
                type: Sequelize.STRING,
                validate:{
                    isNumeric:true
                }
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            name:{
                singular:'msisdn',
                plural:'msisdns'
            },
            timestamps: false,
            underscored: false,
            freezeTableName:true,
            tableName:'p_msisdn'
        }
    );
    return Msisdn;
}