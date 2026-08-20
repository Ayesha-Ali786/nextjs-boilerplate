'use client';

import { useState } from 'react';
import { Room } from '@/types';
import { getRooms, saveRooms } from '@/utils/storage';

interface AddRoomProps {
  onRoomAdded: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export default function AddRoom({ onRoomAdded, showToast }: AddRoomProps) {
  const [formData, setFormData] = useState({
    roomNo: '',
    capacity: '',
    hasAC: false,
    hasWashroom: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.roomNo.trim()) {
      showToast('Room number is required', 'error');
      return;
    }

    const capacityNum = parseInt(formData.capacity, 10);
    if (isNaN(capacityNum) || capacityNum <= 0) {
      showToast('Capacity must be a positive number', 'error');
      return;
    }

    const rooms = getRooms();
    
    // Check for duplicate room number
    if (rooms.some(room => room.roomNo === formData.roomNo.trim())) {
      showToast('Room number already exists', 'error');
      return;
    }

    const newRoom: Room = {
      id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      roomNo: formData.roomNo.trim(),
      capacity: capacityNum,
      hasAC: formData.hasAC,
      hasWashroom: formData.hasWashroom,
      isAllocated: false,
    };

    saveRooms([...rooms, newRoom]);
    
    setFormData({
      roomNo: '',
      capacity: '',
      hasAC: false,
      hasWashroom: false,
    });

    onRoomAdded();
    showToast('Room added successfully!', 'success');
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Add Room</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="roomNo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Room Number
            </label>
            <input
              type="text"
              id="roomNo"
              value={formData.roomNo}
              onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
              placeholder="e.g., 101"
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
              placeholder="e.g., 3"
              min="1"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasAC}
              onChange={(e) => setFormData({ ...formData, hasAC: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-zinc-700 dark:text-zinc-300">Air Conditioned</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasWashroom}
              onChange={(e) => setFormData({ ...formData, hasWashroom: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-zinc-700 dark:text-zinc-300">Attached Washroom</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Add Room
        </button>
      </form>
    </section>
  );
}
