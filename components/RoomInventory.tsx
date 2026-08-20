'use client';

import { Room } from '@/types';
import { removeRoom } from '@/utils/storage';

interface RoomInventoryProps {
  rooms: Room[];
  onRoomDeleted: () => void;
}

export default function RoomInventory({ rooms, onRoomDeleted }: RoomInventoryProps) {
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      removeRoom(id);
      onRoomDeleted();
    }
  };

  if (rooms.length === 0) {
    return (
      <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Room Inventory</h2>
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-lg">No rooms added yet</p>
          <p className="text-sm mt-1">Add your first room to get started</p>
        </div>
      </section>
    );
  }

  const allocatedCount = rooms.filter(r => r.isAllocated).length;
  const availableCount = rooms.length - allocatedCount;

  return (
    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Room Inventory</h2>
        <div className="flex gap-4 text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">
          {availableCount} available
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">
           {allocatedCount} allocated
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
           {rooms.length} total
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Room No</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Capacity</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">AC</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Washroom</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className={`border-b border-zinc-100 dark:border-zinc-800 transition-colors ${
                  room.isAllocated
                    ? 'bg-blue-50 dark:bg-blue-900/10'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <td className="py-3 px-4 text-zinc-900 dark:text-white font-medium">{room.roomNo}</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">{room.capacity}</td>
                <td className="py-3 px-4">
                  {room.hasAC ? (
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Yes
                    </span>
                  ) : (
                    <span className="text-zinc-400">No</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {room.hasWashroom ? (
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Yes
                    </span>
                  ) : (
                    <span className="text-zinc-400">No</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {room.isAllocated ? (
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                      Allocated
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Available
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  {room.isAllocated ? (
                    <span className="text-zinc-400 text-sm" title="Deallocate from Room Status section">
                      Allocated
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
