import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';

const Account = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editing, setEditing] = useState({});
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 555 123 4567'
  });

  useEffect(() => {
    gsap.fromTo('.account-header', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.account-sidebar', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
    gsap.fromTo('.account-content', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' });
  }, []);

  const handleEditToggle = (field) => {
    setEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing({});
  };

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      <Navbar />
      <div className='account-header bg-white shadow-md border-b-2 border-primary-blue/20'>
        <div className='max-w-6xl mx-auto px-6 py-6'>
          <h1 className='text-3xl font-bold text-text-primary-charcoal'>Account</h1>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-10'>
        <div className='flex flex-col md:flex-row gap-8'>
          
          {/* Sidebar */}
          <div className='w-full md:w-64 shrink-0 account-sidebar'>
            <div className='bg-white rounded-2xl shadow-md border-2 border-surface-neutral-grey overflow-hidden'>
              <nav className='flex flex-col'>
                {[
                  { id: 'personal', label: 'Personal Information' },
                  { id: 'address', label: 'Address Book' },
                  { id: 'payment', label: 'Payment Methods' },
                  { id: 'security', label: 'Security' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-6 py-4 font-semibold transition-all duration-300 border-l-4 ${
                      activeTab === tab.id 
                        ? 'bg-primary-light/20 text-primary-blue border-primary-blue' 
                        : 'bg-transparent text-text-secondary-slate border-transparent hover:bg-surface-offwhite hover:text-text-primary-charcoal'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Panel */}
          <div className='flex-1 account-content'>
            <div className='bg-white rounded-2xl shadow-md border-2 border-surface-neutral-grey p-6 sm:p-8'>
              
              {activeTab === 'personal' && (
                <div>
                  <h2 className='text-2xl font-bold text-text-primary-charcoal mb-6'>Personal Information</h2>
                  <div className='space-y-6'>
                    
                    {/* Full Name */}
                    <div>
                      <label className='block text-sm font-bold text-text-primary-charcoal mb-2'>Full Name</label>
                      <div className='flex items-center gap-3'>
                        <input 
                          type='text' 
                          name='fullName' 
                          value={userInfo.fullName} 
                          onChange={handleChange} 
                          disabled={!editing.fullName}
                          className={`flex-1 px-4 py-2.5 rounded-xl border-2 transition-all ${
                            editing.fullName ? 'bg-white border-primary-blue focus:outline-none shadow-sm' : 'bg-surface-offwhite border-surface-neutral-grey text-text-secondary-slate'
                          }`}
                        />
                        <button 
                          onClick={() => handleEditToggle('fullName')}
                          className={`px-5 py-2.5 rounded-xl font-bold border-2 transition-all ${
                            editing.fullName ? 'bg-primary-blue text-white border-primary-blue hover:shadow-lg' : 'bg-white text-text-primary-charcoal border-surface-neutral-grey hover:border-primary-blue'
                          }`}
                        >
                          {editing.fullName ? 'Done' : 'Edit'}
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className='block text-sm font-bold text-text-primary-charcoal mb-2'>Email Address</label>
                      <div className='flex items-center gap-3'>
                        <input 
                          type='email' 
                          name='email' 
                          value={userInfo.email} 
                          onChange={handleChange} 
                          disabled={!editing.email}
                          className={`flex-1 px-4 py-2.5 rounded-xl border-2 transition-all ${
                            editing.email ? 'bg-white border-primary-blue focus:outline-none shadow-sm' : 'bg-surface-offwhite border-surface-neutral-grey text-text-secondary-slate'
                          }`}
                        />
                        <button 
                          onClick={() => handleEditToggle('email')}
                          className={`px-5 py-2.5 rounded-xl font-bold border-2 transition-all ${
                            editing.email ? 'bg-primary-blue text-white border-primary-blue hover:shadow-lg' : 'bg-white text-text-primary-charcoal border-surface-neutral-grey hover:border-primary-blue'
                          }`}
                        >
                          {editing.email ? 'Done' : 'Edit'}
                        </button>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className='block text-sm font-bold text-text-primary-charcoal mb-2'>Phone Number</label>
                      <div className='flex items-center gap-3'>
                        <input 
                          type='tel' 
                          name='phone' 
                          value={userInfo.phone} 
                          onChange={handleChange} 
                          disabled={!editing.phone}
                          className={`flex-1 px-4 py-2.5 rounded-xl border-2 transition-all ${
                            editing.phone ? 'bg-white border-primary-blue focus:outline-none shadow-sm' : 'bg-surface-offwhite border-surface-neutral-grey text-text-secondary-slate'
                          }`}
                        />
                        <button 
                          onClick={() => handleEditToggle('phone')}
                          className={`px-5 py-2.5 rounded-xl font-bold border-2 transition-all ${
                            editing.phone ? 'bg-primary-blue text-white border-primary-blue hover:shadow-lg' : 'bg-white text-text-primary-charcoal border-surface-neutral-grey hover:border-primary-blue'
                          }`}
                        >
                          {editing.phone ? 'Done' : 'Edit'}
                        </button>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className='pt-4 border-t-2 border-surface-neutral-grey mt-8'>
                      <button 
                        onClick={handleSave}
                        className='px-6 py-3 bg-primary-blue text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none'
                        disabled={!Object.values(editing).some(Boolean)}
                      >
                        Save Changes
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Placeholders for other tabs */}
              {activeTab !== 'personal' && (
                <div className='flex flex-col items-center justify-center py-12 text-text-secondary-slate'>
                  <h2 className='text-xl font-bold text-text-primary-charcoal mb-2'>Coming Soon</h2>
                  <p>This section is under development.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
