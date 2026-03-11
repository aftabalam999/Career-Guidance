import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  academicWeight: { type: Number, default: 30 },
  aptitudeWeight: { type: Number, default: 40 },
  placementWeight: { type: Number, default: 20 },
  budgetWeight: { type: Number, default: 10 },
  notificationSettings: {
    emailAlerts: { type: Boolean, default: true },
    systemToasts: { type: Boolean, default: true },
    browserNotifications: { type: Boolean, default: true },
    weeklySummaries: { type: Boolean, default: true }
  },
  maintenanceMode: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
