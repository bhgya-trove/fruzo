import React, { useState } from 'react';
import { MapPin, X, Check, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LocationModal = ({ isOpen, onClose }) => {
  const { currentUser, activeAddress, setActiveAddress, saveNewAddress } = useAuth();
  const { addToast } = useToast();
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newHouse, setNewHouse] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newPincode, setNewPincode] = useState('560038');
  const [newLabel, setNewLabel] = useState('Home');

  if (!isOpen) return null;

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newHouse.trim() || !newStreet.trim() || !newPincode.trim()) {
      addToast('Please fill in complete address details', 'error');
      return;
    }

    saveNewAddress({
      label: newLabel,
      house: newHouse,
      street: newStreet,
      city: newCity,
      state: 'Karnataka',
      pincode: newPincode,
    });

    addToast('New delivery address saved!', 'success');
    setIsAddingNew(false);
    onClose();
  };

  const savedList = currentUser?.savedAddresses || [
    {
      id: 'addr-default-1',
      label: 'Home',
      house: 'Flat 402, Lotus Gardenia',
      street: '12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    {
      id: 'addr-default-2',
      label: 'Office',
      house: 'Floor 6, Tech Park Phase 2',
      street: 'Outer Ring Road, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-charcoal-900">Choose Delivery Location</h3>
              <p className="text-xs text-charcoal-500">Fast 18–24 min delivery to your door</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-charcoal-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAddingNew ? (
          <div className="py-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">Saved Addresses</p>
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {savedList.map((addr) => {
                const isSelected = activeAddress?.house === addr.house && activeAddress?.pincode === addr.pincode;
                return (
                  <div
                    key={addr.id || addr.house}
                    onClick={() => {
                      setActiveAddress(addr);
                      addToast(`Delivering to ${addr.label}`, 'info');
                      onClose();
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500'
                        : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {addr.label ? addr.label[0] : 'H'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-charcoal-800">{addr.label || 'Home'}</span>
                          {isSelected && (
                            <span className="text-[10px] bg-brand-600 text-white font-bold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">
                          {addr.house}, {addr.street}, {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-brand-600 shrink-0" />}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full mt-2 py-3 px-4 rounded-2xl border-2 border-dashed border-brand-300 text-brand-700 font-semibold text-sm hover:bg-brand-50/60 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>
        ) : (
          <form onSubmit={handleAddNew} className="py-4 space-y-3.5">
            <div className="flex gap-2">
              {['Home', 'Work', 'Other'].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setNewLabel(label)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    newLabel === label
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-medium text-charcoal-600 block mb-1">House / Flat / Floor</label>
              <input
                type="text"
                required
                placeholder="e.g. Flat 301, Sunshine Heights"
                value={newHouse}
                onChange={(e) => setNewHouse(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-charcoal-600 block mb-1">Street / Area / Landmark</label>
              <input
                type="text"
                required
                placeholder="e.g. 5th Cross, Near Metro Station"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal-600 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal-600 block mb-1">PIN Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-charcoal-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
              >
                Save & Deliver Here
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
