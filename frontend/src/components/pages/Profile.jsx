import React, { useEffect, useState } from 'react';
import { BookOpen, MapPin, Target, DollarSign, Award } from 'lucide-react';
import axios from 'axios';

const Profile = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        careerInterest: user?.careerInterest || '',
        locationPreference: user?.locationPreference || '',
        marks: user?.marks || '',
        budget: user?.budget || ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('/api/auth/profile', formData, {
                headers: { 'x-auth-token': token }
            });
            setUser(res.data);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error updating profile');
        }
    };

    return (
        <div>
            <h1 className="page-title">Profile Settings</h1>
            <div className="card" style={{ maxWidth: '600px' }}>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                    Update your academic details and preferences to get better college recommendations.
                </p>
                {message && <p style={{ marginBottom: '1rem', color: 'var(--accent-color)', fontWeight: '500' }}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><BookOpen size={16} style={{ display: 'inline', marginRight: '0.5rem', marginBottom: '-3px' }} /> Career Interest</label>
                        <select name="careerInterest" value={formData.careerInterest} onChange={handleChange}>
                            <option value="">Select Career</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Management">Management</option>
                            <option value="Medical">Medical</option>
                            <option value="Arts">Arts</option>
                            <option value="Science">Science</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label><MapPin size={16} style={{ display: 'inline', marginRight: '0.5rem', marginBottom: '-3px' }} /> Location Preference</label>
                        <select name="locationPreference" value={formData.locationPreference} onChange={handleChange}>
                            <option value="">Select Location</option>
                            <option value="India">India</option>
                            <option value="Abroad">Abroad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label><Award size={16} style={{ display: 'inline', marginRight: '0.5rem', marginBottom: '-3px' }} /> Academic Marks (%)</label>
                        <input type="number" name="marks" value={formData.marks} onChange={handleChange} min="0" max="100" placeholder="e.g. 85" />
                    </div>
                    <div className="form-group">
                        <label><DollarSign size={16} style={{ display: 'inline', marginRight: '0.5rem', marginBottom: '-3px' }} /> Budget (Annual Fees)</label>
                        <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. 500000" />
                    </div>
                    <button type="submit" className="btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
