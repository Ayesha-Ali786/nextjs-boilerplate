'use client';

import { useState } from 'react';
import { Room, AllocationResult } from '@/types';
import { getRooms, allocateRoom } from '@/utils/storage';

interface RoomAllocatorProps {
  showToast: (message: string, type: 'success' | 'error') => void;
  onRoomAllocated: () => void;
}

export default function RoomAllocator({ showToast, onRoomAllocated }: RoomAllocatorProps) {
  const [formData, setFormData] = useState({
    students: '',
    needAC: false,
    needWashroom: false,
  });
  const [result, setResult] = useState<AllocationResult | null>(null);
  const [allocatedTo, setAllocatedTo] = useState('');

  const handleAllocate = () => {
    const studentsNum = parseInt(formData.students, 10);

    if (isNaN(studentsNum) || studentsNum <= 0) {
      showToast('Please enter a valid number of students', 'error');
      return;
    }

    const rooms = getRooms();

    if (rooms.length === 0) {
      setResult({
        success: false,
        message: 'No rooms available. Please add rooms first.',
      });
      return;
    }

    // Allocation Algorithm - only consider available rooms
    let filteredRooms = rooms.filter(room => {
      // Skip already allocated rooms
      if (room.isAllocated) return false;
      
      // Check capacity
      if (room.capacity < studentsNum) return false;

      // Check AC requirement
      if (formData.needAC && !room.hasAC) return false;

      // Check Washroom requirement
      if (formData.needWashroom && !room.hasWashroom) return false;

      return true;
    });

    if (filteredRooms.length === 0) {
      setResult({
        success: false,
        message: 'No room available matching your requirements.',
      });
      return;
    }

    // Sort by capacity (ascending) to get the smallest suitable room
    filteredRooms.sort((a, b) => a.capacity - b.capacity);

    const selectedRoom = filteredRooms[0];

    // Allocate the room
    const allocationName = allocatedTo.trim() || `Group of ${studentsNum}`;
    allocateRoom(selectedRoom.id, allocationName, studentsNum);

    setResult({
      success: true,
      room: selectedRoom,
      message: `Room ${selectedRoom.roomNo} allocated to ${allocationName}!`,
    });

    setAllocatedTo('');
    onRoomAllocated();
    showToast('Room allocated!', 'success');
  };

  return (
    <section className="bg-white dark:bg-purple-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Allocate Room</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="students" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Number of Students
          </label>
          <input
            type="number"
            id="students"
            value={formData.students}
            onChange={(e) => setFormData({ ...formData, students: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
            placeholder="e.g., 2"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="allocatedTo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Allocated To (Optional)
          </label>
          <input
            type="text"
            id="allocatedTo"
            value={allocatedTo}
            onChange={(e) => setAllocatedTo(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
            placeholder="e.g., John Doe, Group A"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.needAC}
              onChange={(e) => setFormData({ ...formData, needAC: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-zinc-700 dark:text-zinc-300">Need AC</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.needWashroom}
              onChange={(e) => setFormData({ ...formData, needWashroom: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-zinc-700 dark:text-zinc-300">Need Attached Washroom</span>
          </label>
        </div>

        <button
          onClick={handleAllocate}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Allocate Room
        </button>

        {result && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <div>
                <p className={`font-semibold ${result.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                  {result.success ? 'Allocation Successful' : 'Allocation Failed'}
                </p>
                <p className={`mt-1 ${result.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {result.message}
                </p>
                {result.room && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-700 dark:text-green-300">
                      <span className="font-medium">Room:</span> {result.room.roomNo}
                    </div>
                    <div className="text-green-700 dark:text-green-300">
                      <span className="font-medium">Capacity:</span> {result.room.capacity}
                    </div>
                    <div className="text-green-700 dark:text-green-300">
                      <span className="font-medium">AC:</span> {result.room.hasAC ? 'Yes' : 'No'}
                    </div>
                    <div className="text-green-700 dark:text-green-300">
                      <span className="font-medium">Washroom:</span> {result.room.hasWashroom ? 'Yes' : 'No'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
