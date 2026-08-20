'use client';

import { useState, useEffect, useCallback } from 'react';
import { Room } from '@/types';
import { getRooms } from '@/utils/storage';
import AddRoom from '@/components/AddRoom';
import RoomInventory from '@/components/RoomInventory';
import SearchFilter, { FilterState } from '@/components/SearchFilter';
import RoomAllocator from '@/components/RoomAllocator';
import RoomStatus from '@/components/RoomStatus';
import Toast from '@/components/Toast';

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });
  const [filters, setFilters] = useState<FilterState>({
    minCapacity: '',
    acFilter: 'any',
    washroomFilter: 'any',
  });

 
  useEffect(() => {
    const loadedRooms = getRooms();
    setRooms(loadedRooms);
    setFilteredRooms(loadedRooms);
  }, []);

 
  useEffect(() => {
    let result = [...rooms];


    if (filters.minCapacity) {
      const minCap = parseInt(filters.minCapacity, 10);
      if (!isNaN(minCap)) {
        result = result.filter(room => room.capacity >= minCap);
      }
    }

  
    if (filters.acFilter !== 'any') {
      const needAC = filters.acFilter === 'yes';
      result = result.filter(room => room.hasAC === needAC);
    }

    // Filter by Washroom
    if (filters.washroomFilter !== 'any') {
      const needWashroom = filters.washroomFilter === 'yes';
      result = result.filter(room => room.hasWashroom === needWashroom);
    }

    setFilteredRooms(result);
  }, [rooms, filters]);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  const handleRoomAdded = useCallback(() => {
    const loadedRooms = getRooms();
    setRooms(loadedRooms);
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

 
  const allocatedRooms = rooms.filter(room => room.isAllocated);
  const availableRooms = rooms.filter(room => !room.isAllocated);

  return (
    <div className="min-h-screen bg-zinc-800">
    {/*header*/}
      <header className="  bg-gray-950 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
             Smart Hostel Room Allocation:
             </h1>
               <p className="text-sm text-zinc-900 dark:text-zinc-400">
                  Efficient room management system
                </p>
         </div>
            </div> 
         <div className="flex gap-4 text-sm">
           <span className="text-green-600 dark:text-green-600 font-medium">
            {availableRooms.length} available
            </span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {allocatedRooms.length} allocated
              </span>
       </div>
          </div>
       </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
       <div className="space-y-6">
            <AddRoom onRoomAdded={handleRoomAdded} showToast={showToast} />
            <RoomAllocator showToast={showToast} onRoomAllocated={handleRoomAdded} />
            <RoomStatus
              allocatedRooms={allocatedRooms}
              availableRooms={availableRooms}
              onRoomUpdated={handleRoomAdded}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
          <SearchFilter onFilterChange={handleFilterChange} />
          <RoomInventory rooms={filteredRooms} onRoomDeleted={handleRoomAdded} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p>Smart Hostel Room Allocation System • Data stored locally in your browser</p>
        </div>
      </footer>

  {}
  {toast.visible && (
    <Toast
      message={toast.message}
      type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, visible: false }))}
        />
      )}
    </div>
  );
}