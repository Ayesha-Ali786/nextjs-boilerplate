'use client';

import { Room } from '@/types';
import { deallocateRoom } from '@/utils/storage';

interface RoomStatusProps {
  allocatedRooms: Room[];
  availableRooms: Room[];
  onRoomUpdated: () => void;
}

export default function RoomStatus({ allocatedRooms, availableRooms, onRoomUpdated }: RoomStatusProps) {
  const handleDeallocate = (room: Room) => {
    if (confirm(`Free up room ${room.roomNo}?`)) {
      deallocateRoom(room.id);
      onRoomUpdated();
    }
  };

  return (
    <section className="bg-white dark:bg-purple-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Room Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Rooms */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Available Rooms ({availableRooms.length})
            </h3>
          </div>

          {availableRooms.length === 0 ? (
            <div className="text-center py-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-500 dark:text-zinc-400">
              <p className="text-sm">No available rooms</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">Room {room.roomNo}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Capacity: {room.capacity} • {room.hasAC ? 'AC' : 'No AC'} • {room.hasWashroom ? 'Washroom' : 'No Washroom'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Allocated Rooms */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Allocated Rooms ({allocatedRooms.length})
            </h3>
          </div>

          {allocatedRooms.length === 0 ? (
            <div className="text-center py-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-500 dark:text-zinc-400">
              <p className="text-sm">No rooms allocated yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allocatedRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">Room {room.roomNo}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Capacity: {room.capacity} • {room.hasAC ? 'AC' : 'No AC'} • {room.hasWashroom ? 'Washroom' : 'No Washroom'}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Allocated to: {room.allocatedTo || 'N/A'} ({room.allocatedStudents} students)
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeallocate(room)}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors"
                  >
                    Free Up
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
