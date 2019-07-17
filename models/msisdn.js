module.exports = (sequelize, Sequelize) => {
    const Msisdn = sequelize.define(
        'p_msisdn', {
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
                type: Sequelize.INTEGER,
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
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName:'p_msisdn'
        }
    );
    return Msisdn;
}