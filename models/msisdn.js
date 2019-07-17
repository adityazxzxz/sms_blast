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
                type: Sequelize.STRING
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return Msisdn;
}