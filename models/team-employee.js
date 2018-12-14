const Employee = require('./employee')
const Team = require('./team')
const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const TeamEmployee = sequelize.define('teamemployee', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            classMethods: {
                associate: function(models) {
                    Team.belongsToMany(Employee, { as: 'members', through: 'Id' });
                    Team.hasOne(Employee, { as: 'leader', foreignKey: 'Id' });;
                }
            }
        }

    );
    return TeamEmployee;
};