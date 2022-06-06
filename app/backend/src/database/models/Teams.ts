import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  id: number;
  teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
