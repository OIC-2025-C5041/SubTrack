const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false,
});

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });

const Subscription = sequelize.define('Subscription', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  frequency: { type: DataTypes.STRING, allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USD' },
  platform: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATEONLY },
  next_payment_date: { type: DataTypes.DATEONLY },
}, { tableName: 'subscriptions', timestamps: false });

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  subscription_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
}, { tableName: 'transactions', timestamps: false });

User.hasMany(Subscription, { foreignKey: 'user_id' });
Subscription.belongsTo(User, { foreignKey: 'user_id' });
Subscription.hasMany(Transaction, { foreignKey: 'subscription_id' });
Transaction.belongsTo(Subscription, { foreignKey: 'subscription_id' });

module.exports = { sequelize, User, Subscription, Transaction };
