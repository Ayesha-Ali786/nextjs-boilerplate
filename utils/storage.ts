import { Room } from '@/types';

const STORAGE_KEY = 'hostel_rooms';

export const getRooms = (): Room[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveRooms = (rooms: Room[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addRoom = (room: Room): Room[] => {
  const rooms = getRooms();
  rooms.push(room);
  saveRooms(rooms);
  return rooms;
};

export const removeRoom = (id: string): Room[] => {
  const rooms = getRooms();
  const filtered = rooms.filter(room => room.id !== id);
  saveRooms(filtered);
  return filtered;
};

export const clearAllRooms = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const allocateRoom = (roomId: string, allocatedTo: string, students: number): Room[] => {
  const rooms = getRooms();
  const updated = rooms.map(room =>
    room.id === roomId
      ? { ...room, isAllocated: true, allocatedTo, allocatedStudents: students }
      : room
  );
  saveRooms(updated);
  return updated;
};

export const deallocateRoom = (roomId: string): Room[] => {
  const rooms = getRooms();
  const updated = rooms.map(room =>
    room.id === roomId
      ? { ...room, isAllocated: false, allocatedTo: undefined, allocatedStudents: undefined }
      : room
  );
  saveRooms(updated);
  return updated;
};
