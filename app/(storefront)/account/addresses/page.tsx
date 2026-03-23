"use client";

import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/components/ui/Toast';

interface SavedAddress {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
  is_default?: boolean;
}

const EMPTY_ADDRESS: Omit<SavedAddress, 'id'> = {
  label: '',
  first_name: '',
  last_name: '',
  phone: '',
  address_1: '',
  city: '',
  state: '',
  country: 'AE',
};

function AddressFormModal({
  address,
  onSave,
  onClose,
  saving,
}: {
  address?: SavedAddress;
  onSave: (data: SavedAddress) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<SavedAddress>(
    address || { id: '', ...EMPTY_ADDRESS }
  );

  const update = (key: keyof SavedAddress, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#191919]">
            {address ? 'Edit Address' : 'Add New Address'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Label</label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => update('label', e.target.value)}
              className="form-input"
              placeholder="e.g. Home, Office, Mom's House"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">First Name</label>
              <input type="text" value={form.first_name} onChange={(e) => update('first_name', e.target.value)} className="form-input" placeholder="Sarah" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Last Name</label>
              <input type="text" value={form.last_name} onChange={(e) => update('last_name', e.target.value)} className="form-input" placeholder="Al Maktoum" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="form-input" placeholder="+971 50 123 4567" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Address</label>
            <input type="text" value={form.address_1} onChange={(e) => update('address_1', e.target.value)} className="form-input" placeholder="Street address" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">City</label>
              <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className="form-input" placeholder="Dubai" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">State</label>
              <input type="text" value={form.state} onChange={(e) => update('state', e.target.value)} className="form-input" placeholder="Dubai" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Country</label>
            <select value={form.country} onChange={(e) => update('country', e.target.value)} className="form-input">
              <option value="AE">United Arab Emirates</option>
              <option value="SA">Saudi Arabia</option>
              <option value="OM">Oman</option>
              <option value="BH">Bahrain</option>
              <option value="KW">Kuwait</option>
              <option value="QA">Qatar</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={saving || !form.first_name || !form.address_1 || !form.city}
            className="flex-1 py-2.5 rounded-xl bg-[#E53935] text-white text-sm font-semibold hover:bg-[#C62828] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Address'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState<SavedAddress | undefined>(undefined);
  const authCustomer = useAuthStore((s) => s.customer);

  const fetchAddresses = async () => {
    if (!authCustomer?.id) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/woo-addresses?customer_id=${authCustomer.id}`);
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses || []);
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCustomer?.id]);

  const handleSave = async (addr: SavedAddress) => {
    if (!authCustomer?.id) return;
    setSaving(true);
    try {
      const isEdit = !!addr.id && addresses.some((a) => a.id === addr.id);
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch('/api/woo-addresses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: authCustomer.id, address: addr }),
      });
      if (res.ok) {
        toast(isEdit ? 'Address updated!' : 'Address added!');
        setShowForm(false);
        setEditAddress(undefined);
        await fetchAddresses();
      } else {
        toast('Failed to save address', 'error');
      }
    } catch {
      toast('Failed to save address', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!authCustomer?.id || !confirm('Delete this address?')) return;
    try {
      const res = await fetch(
        `/api/woo-addresses?customer_id=${authCustomer.id}&address_id=${addressId}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        toast('Address deleted');
        await fetchAddresses();
      } else {
        const data = await res.json();
        toast(data.error || 'Failed to delete', 'error');
      }
    } catch {
      toast('Failed to delete address', 'error');
    }
  };

  if (!authCustomer) {
    return (
      <AccountLayout title="My Addresses">
        <div className="text-center py-12">
          <p className="text-[#999] text-sm">Please log in to manage your addresses.</p>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="My Addresses">
      {loading ? (
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#999]">{addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved</p>
            <button
              onClick={() => { setEditAddress(undefined); setShowForm(true); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#E53935] text-white text-xs font-semibold hover:bg-[#C62828] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <span className="text-4xl mb-3 block">📍</span>
              <p className="text-sm font-medium text-[#191919] mb-1">No addresses saved yet</p>
              <p className="text-xs text-[#999]">Add your first delivery address to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{addr.id === 'billing' ? '🧾' : addr.id === 'shipping' ? '📦' : '📍'}</span>
                      <span className="text-xs font-bold text-[#191919] uppercase tracking-wider">
                        {addr.label || (addr.id === 'billing' ? 'Billing' : addr.id === 'shipping' ? 'Shipping' : 'Address')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setEditAddress(addr); setShowForm(true); }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#E53935]"
                        aria-label="Edit address"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {addr.id !== 'billing' && addr.id !== 'shipping' && (
                        <button
                          onClick={() => handleDelete(addr.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-[#E53935]"
                          aria-label="Delete address"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-[#666] space-y-0.5">
                    <p className="font-medium text-[#333]">{`${addr.first_name} ${addr.last_name}`.trim() || 'Not set'}</p>
                    {addr.address_1 && <p>{addr.address_1}</p>}
                    {addr.city && <p>{[addr.city, addr.state].filter(Boolean).join(', ')}</p>}
                    {addr.country && <p>{addr.country}</p>}
                    {addr.phone && <p>{addr.phone}</p>}
                    {!addr.first_name && !addr.address_1 && (
                      <p className="text-[#999] italic">No address saved yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <AddressFormModal
              address={editAddress}
              onSave={handleSave}
              onClose={() => { setShowForm(false); setEditAddress(undefined); }}
              saving={saving}
            />
          )}
        </>
      )}
    </AccountLayout>
  );
}
