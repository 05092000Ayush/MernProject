module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('UserDetails', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    tableName: 'userdetails' // You can keep this line if you want to specify the table name explicitly
  });

  return UserDetails;
};
