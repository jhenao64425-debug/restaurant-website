// Zion Flow API Client
// Connects to the restaurant website backend for reservations sync

class ZionFlowAPI {
  constructor(baseUrl = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
  }

  // Get all reservations from the backend
  async getReservations() {
    try {
      const response = await fetch(`${this.baseUrl}/api/reservations`);
      if (!response.ok) throw new Error('Failed to fetch reservations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
  }

  // Create a new reservation
  async createReservation(reservationData) {
    try {
      // Map field names from client format to backend format
      const payload = {
        nombre: reservationData.name || reservationData.nombre || '',
        email: reservationData.email || '',
        telefono: reservationData.phone || reservationData.telefono || '',
        fecha: reservationData.date || reservationData.fecha || new Date().toISOString().split('T')[0],
        hora: reservationData.time || reservationData.hora || '',
        huespedes: parseInt(reservationData.guests || reservationData.huespedes || 0),
        notas: reservationData.notes || reservationData.message || reservationData.notas || ''
      };

      console.log('Sending to backend:', payload);

      const response = await fetch(`${this.baseUrl}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to create reservation');
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }

  // Update a reservation
  async updateReservation(reservationId, updateData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/reservations/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) throw new Error('Failed to update reservation');
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  }

  // Delete a reservation
  async deleteReservation(reservationId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/reservations/${reservationId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete reservation');
      return await response.json();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  }

  // Format reservation for display
  formatReservation(reservation) {
    return {
      id: reservation.id,
      name: reservation.name,
      guests: reservation.guests,
      time: reservation.time,
      table: reservation.table || 'TBD',
      status: reservation.status || 'CONFIRMED',
      phone: reservation.phone,
      message: reservation.message
    };
  }
}

// Initialize API client with production backend
const api = new ZionFlowAPI('https://restaurant-backend-mngd.onrender.com');
