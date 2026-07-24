// Zion Flow — Simple Navigation System
class ZionFlow {
  constructor() {
    this.currentScreen = 'dashboard';
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Navigation buttons
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const label = link.querySelector('.nav-label').textContent.trim();
        this.navigate(label);
      });
    });

    // Guest items - use event delegation for more reliable handling
    const guestsList = document.querySelector('.guests-list');
    if (guestsList) {
      guestsList.addEventListener('click', (e) => {
        const guestItem = e.target.closest('.guest-item');
        if (guestItem) {
          this.showGuestProfile(guestItem);
        }
      });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const allGuestItems = document.querySelectorAll('.guest-item');

        allGuestItems.forEach(item => {
          const guestName = item.querySelector('.guest-item-name').textContent.toLowerCase();
          if (searchTerm === '' || guestName.includes(searchTerm)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }

    // Back button
    const backBtn = document.getElementById('back-from-profile');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.showScreen('guests'));
    }

    // Add table buttons (using event delegation)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.btn-add-table');
      if (target) {
        const section = target.dataset.section;
        this.openTableModal('add', null, section);
      }
    });

    // Modal buttons
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', () => this.closeTableModal());
    }

    const btnCancel = document.getElementById('btn-cancel');
    if (btnCancel) {
      btnCancel.addEventListener('click', () => this.closeTableModal());
    }

    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
      btnSave.addEventListener('click', () => this.saveTable());
    }

    const btnDelete = document.getElementById('btn-delete');
    if (btnDelete) {
      btnDelete.addEventListener('click', () => this.deleteTable());
    }

    // Close modal when clicking overlay
    const modalOverlay = document.getElementById('table-modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          this.closeTableModal();
        }
      });
    }

    // FAB - Floating Action Button
    const fabBtn = document.getElementById('fab-btn');
    if (fabBtn) {
      fabBtn.addEventListener('click', () => this.openReservationModal());
    }

    // Reservation modal buttons
    const reservationClose = document.getElementById('reservation-modal-close');
    if (reservationClose) {
      reservationClose.addEventListener('click', () => this.closeReservationModal());
    }

    const reservationCancel = document.getElementById('reservation-cancel');
    if (reservationCancel) {
      reservationCancel.addEventListener('click', () => this.closeReservationModal());
    }

    const reservationSave = document.getElementById('reservation-save');
    if (reservationSave) {
      reservationSave.addEventListener('click', () => this.saveReservation());
    }

    // Close reservation modal when clicking overlay
    const reservationOverlay = document.getElementById('reservation-modal-overlay');
    if (reservationOverlay) {
      reservationOverlay.addEventListener('click', (e) => {
        if (e.target === reservationOverlay) {
          this.closeReservationModal();
        }
      });
    }

    // Edit Reservation buttons
    document.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-reservation');
      if (editBtn) {
        const reservationItem = editBtn.closest('.reservation-item');
        if (reservationItem) {
          const guestName = reservationItem.getAttribute('data-guest-name');
          const guests = reservationItem.getAttribute('data-guests');
          this.openTableSelectionModal(guestName, guests);
        }
      }
    });

    // Table Selection Modal
    const tableSelectionClose = document.getElementById('table-selection-close');
    if (tableSelectionClose) {
      tableSelectionClose.addEventListener('click', () => this.closeTableSelectionModal());
    }

    const areaSelector = document.getElementById('area-selector');
    if (areaSelector) {
      areaSelector.addEventListener('change', (e) => this.updateAvailableTables(e.target.value));
    }

    const tableSelectionCancel = document.getElementById('table-selection-cancel');
    if (tableSelectionCancel) {
      tableSelectionCancel.addEventListener('click', () => this.closeTableSelectionModal());
    }

    const tableSelectionSave = document.getElementById('table-selection-save');
    if (tableSelectionSave) {
      tableSelectionSave.addEventListener('click', () => this.saveTableSelection());
    }

    const tableSelectionOverlay = document.getElementById('table-selection-modal');
    if (tableSelectionOverlay) {
      tableSelectionOverlay.addEventListener('click', (e) => {
        if (e.target === tableSelectionOverlay) {
          this.closeTableSelectionModal();
        }
      });
    }

    // Available tables click handler
    document.addEventListener('click', (e) => {
      const tableBtn = e.target.closest('.table-btn');
      if (tableBtn) {
        document.querySelectorAll('.table-btn').forEach(btn => btn.classList.remove('selected'));
        tableBtn.classList.add('selected');
        this.selectedTable = tableBtn.getAttribute('data-table');
        document.getElementById('selected-table-display').textContent = this.selectedTable;
      }
    });

    // Table click in FLOOR to show guest info
    document.addEventListener('click', (e) => {
      const tableItem = e.target.closest('.table-item.occupied');
      if (tableItem) {
        const tableId = tableItem.getAttribute('data-table');
        const guestName = tableItem.getAttribute('data-guest');
        this.showTableDetailPanel(tableId, guestName);
      }
    });

    // Close detail panel (using event delegation)
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.detail-close');
      if (closeBtn) {
        this.closeTableDetailPanel();
      }
    });
  }

  navigate(label) {
    const screenMap = {
      'TODAY': 'dashboard',
      'GUESTS': 'guests',
      'FLOOR': 'floor',
      'MSG': 'messages',
      'ADMIN': 'admin'
    };

    const screenName = screenMap[label] || 'dashboard';
    this.showScreen(screenName);

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
  }

  showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show selected screen
    const screen = document.getElementById(`screen-${screenName}`);
    if (screen) {
      screen.classList.add('active');
      this.currentScreen = screenName;
    }
  }

  showGuestProfile(item) {
    const name = item.querySelector('.guest-item-name').textContent;
    const vipBadge = item.querySelector('.vip-badge');
    const isVip = vipBadge !== null;

    const guestData = {
      'Sarah Chen': {
        phone: '+1 (415) 555-0123',
        email: 'sarah.chen@email.com',
        notes: 'We are celebrating our anniversary. Please surprise us with champagne if possible. We are looking forward to an unforgettable evening!'
      },
      'Julianne Moore': {
        phone: '+1 (415) 555-0124',
        email: 'julianne.moore@email.com',
        notes: 'Celebrating 10 years together. This is our favorite restaurant. Please make it special!'
      },
      'Elena Ferrante': {
        phone: '+1 (415) 555-0125',
        email: 'elena.ferrante@email.com',
        notes: 'I am allergic to peanuts and shellfish. Please be careful with all dishes.'
      },
      'Ren Tanaka': {
        phone: '+1 (415) 555-0126',
        email: 'ren.tanaka@email.com',
        notes: 'Please keep the reservation quiet. We prefer discretion.'
      },
      'Marcus Aurelius': {
        phone: '+1 (415) 555-0127',
        email: 'marcus.aurelius@email.com',
        notes: 'We will bring a baby stroller. Please ensure we have a quiet table.'
      },
      'Adaeze Okafor': {
        phone: '+1 (415) 555-0128',
        email: 'adaeze.okafor@email.com',
        notes: 'We need wheelchair access. Please have the main entrance available.'
      }
    };

    const cleanName = name.replace(' VIP', '').trim();
    const data = guestData[cleanName] || guestData['Sarah Chen'];

    document.getElementById('profile-guest-name').textContent = cleanName;
    document.getElementById('profile-guest-badge').style.display = isVip ? 'inline' : 'none';
    document.getElementById('profile-phone').textContent = data.phone;
    document.getElementById('profile-email').textContent = data.email;
    document.getElementById('profile-notes').textContent = data.notes;

    // Find active reservation for this guest
    const reservation = this.findGuestReservation(cleanName);

    const reservationCard = document.getElementById('profile-reservation-card');
    const noReservationCard = document.getElementById('profile-no-reservation');

    if (reservation) {
      // Show reservation details
      reservationCard.style.display = 'block';
      noReservationCard.style.display = 'none';

      document.getElementById('profile-reservation-time').textContent = reservation.time;
      document.getElementById('profile-reservation-guests').textContent = reservation.guests + ' guests';
      document.getElementById('profile-reservation-table').textContent = reservation.table || 'TBD';
      document.getElementById('profile-reservation-status').textContent = reservation.status;
    } else {
      // Show no reservation message
      reservationCard.style.display = 'none';
      noReservationCard.style.display = 'block';
    }

    this.showScreen('guest-profile');
  }

  findGuestReservation(guestName) {
    // Hardcoded reservation data for demo
    const reservationData = {
      'Sarah Chen': { time: '20:00', guests: 4, table: 'Table 18', status: 'CONFIRMED' },
      'Julianne Moore': { time: '18:30', guests: 4, table: 'Table 12', status: 'CONFIRMED' },
      'Elena Ferrante': { time: '19:00', guests: 6, table: 'Table 22', status: 'ARRIVING' },
      'Ren Tanaka': { time: '19:30', guests: 3, table: 'Booth B', status: 'CONFIRMED' },
      'Marcus Aurelius': { time: '18:45', guests: 2, table: 'Bar 04', status: 'SEATED' },
      'Adaeze Okafor': { time: '19:15', guests: 2, table: 'Table 07', status: 'CONFIRMED' }
    };

    if (reservationData[guestName]) {
      return reservationData[guestName];
    }

    // Fallback: Get all reservations from the dashboard
    const reservationItems = document.querySelectorAll('.reservation-item');

    for (let item of reservationItems) {
      const reservationName = item.querySelector('.reservation-name').textContent;
      if (reservationName === guestName) {
        // Extract reservation details
        const details = item.querySelector('.reservation-details').textContent;
        const time = item.querySelector('.reservation-time').textContent;
        const status = item.querySelector('.reservation-status').textContent;

        // Parse the details to get guests and table
        const detailsParts = details.split('·');
        const guests = detailsParts[0].trim().match(/\d+/) ? parseInt(detailsParts[0].trim().match(/\d+/)[0]) : 0;
        const table = detailsParts[1]?.trim() || 'TBD';

        return {
          name: guestName,
          time: time,
          guests: guests,
          table: table,
          status: status.trim()
        };
      }
    }

    return null;
  }

  openTableModal(mode, tableId, section) {
    this.currentTableMode = mode;
    this.currentTableId = tableId;
    const modal = document.getElementById('table-modal-overlay');
    const title = document.getElementById('modal-title');
    const btnDelete = document.getElementById('btn-delete');

    if (mode === 'add') {
      title.textContent = 'Add Table';
      document.getElementById('table-name').value = '';
      document.getElementById('table-capacity').value = '';
      document.getElementById('table-status').value = 'available';
      document.getElementById('table-section').value = section || 'terrace-non-smoking';
      btnDelete.style.display = 'none';
    } else if (mode === 'edit') {
      title.textContent = 'Edit Table';
      const item = document.querySelector(`[data-table="${tableId}"]`);
      if (!item) return;
      document.getElementById('table-name').value = tableId;
      document.getElementById('table-capacity').value = item.dataset.guests;
      const status = item.className.match(/\b(available|reserved|occupied|out-of-service)\b/)?.[1] || 'available';
      document.getElementById('table-status').value = status;
      btnDelete.style.display = 'block';
    }

    modal.classList.add('active');
  }

  closeTableModal() {
    const modal = document.getElementById('table-modal-overlay');
    modal.classList.remove('active');
  }

  saveTable() {
    const tableName = document.getElementById('table-name').value.trim();
    const capacity = document.getElementById('table-capacity').value.trim();
    const status = document.getElementById('table-status').value;
    const section = document.getElementById('table-section').value;

    if (!tableName || !capacity) {
      alert('Please fill in all fields');
      return;
    }

    if (this.currentTableMode === 'add') {
      this.createTable(tableName, capacity, status, section);
    } else {
      this.updateTable(this.currentTableId, tableName, capacity, status, section);
    }

    this.closeTableModal();
  }

  createTable(name, capacity, status, section) {
    const grid = document.querySelector(`.tables-grid[data-section="${section}"]`);
    if (!grid) return;

    const tableHtml = `
      <div class="table-item ${status}" data-table="${name}" data-guests="${capacity}">
        <div class="table-circle">${name}</div>
        <div class="table-capacity">${capacity}</div>
      </div>
    `;

    grid.insertAdjacentHTML('beforeend', tableHtml);
    alert(`Table ${name} added successfully!`);
  }

  updateTable(oldName, newName, capacity, status, section) {
    const item = document.querySelector(`[data-table="${oldName}"]`);
    if (!item) return;

    item.dataset.table = newName;
    item.dataset.guests = capacity;
    item.className = `table-item ${status}`;
    item.querySelector('.table-circle').textContent = newName;
    item.querySelector('.table-capacity').textContent = capacity;
    alert(`Table ${oldName} updated successfully!`);
  }

  deleteTable() {
    if (confirm('Are you sure you want to delete this table?')) {
      const item = document.querySelector(`[data-table="${this.currentTableId}"]`);
      if (item) {
        item.remove();
        alert(`Table ${this.currentTableId} deleted!`);
      }
      this.closeTableModal();
    }
  }

  openReservationModal() {
    const modal = document.getElementById('reservation-modal-overlay');
    // Clear form fields
    document.getElementById('reservation-name').value = '';
    document.getElementById('reservation-guests').value = '';
    document.getElementById('reservation-time').value = '';
    document.getElementById('reservation-table').value = '';
    document.getElementById('reservation-notes').value = '';

    modal.classList.add('active');
  }

  closeReservationModal() {
    const modal = document.getElementById('reservation-modal-overlay');
    modal.classList.remove('active');
  }

  saveReservation() {
    const name = document.getElementById('reservation-name').value.trim();
    const guests = document.getElementById('reservation-guests').value.trim();
    const time = document.getElementById('reservation-time').value.trim();
    const table = document.getElementById('reservation-table').value.trim();
    const notes = document.getElementById('reservation-notes').value.trim();

    if (!name || !guests || !time) {
      alert('Please fill in guest name, number of guests, and reservation time');
      return;
    }

    this.createReservation(name, guests, time, table, notes);

    // Also save to backend API if available
    if (typeof api !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      const reservationData = {
        name: name,
        guests: guests,
        time: time,
        date: today,
        table: table || '',
        message: notes || '',
        phone: '',
        status: 'CONFIRMED'
      };

      api.createReservation(reservationData).catch(err => {
        console.error('Error syncing with backend API:', err);
      });
    }

    this.closeReservationModal();
  }

  createReservation(name, guests, time, table, notes) {
    const reservationsList = document.querySelector('.reservations');
    if (!reservationsList) return;

    const status = 'CONFIRMED';
    const statusClass = 'confirmed';
    const tableInfo = table ? `Table ${table}` : 'TBD';
    const notesText = notes ? `· ${notes}` : '';

    const reservationHtml = `
      <div class="reservation-item">
        <div class="reservation-time">${time}</div>
        <div class="reservation-main">
          <p class="reservation-name">${name}</p>
          <p class="reservation-details">${guests} guests · ${tableInfo} ${notesText}</p>
        </div>
        <span class="reservation-status ${statusClass}">${status}</span>
      </div>
    `;

    reservationsList.insertAdjacentHTML('beforeend', reservationHtml);
    alert(`Reservation for ${name} at ${time} created successfully!`);
  }

  openTableSelectionModal(guestName, guests) {
    this.editingReservation = { guestName, guests };
    this.selectedTable = null;
    document.getElementById('selected-table-display').textContent = 'Ninguna';
    document.getElementById('area-selector').value = '';
    document.getElementById('available-tables').innerHTML = '';
    const modal = document.getElementById('table-selection-modal');
    if (modal) modal.classList.add('active');
  }

  closeTableSelectionModal() {
    const modal = document.getElementById('table-selection-modal');
    if (modal) modal.classList.remove('active');
  }

  updateAvailableTables(areaSection) {
    const tablesContainer = document.getElementById('available-tables');
    tablesContainer.innerHTML = '';

    if (!areaSection) return;

    const tablesGrid = document.querySelector(`.tables-grid[data-section="${areaSection}"]`);
    if (!tablesGrid) return;

    const tableItems = tablesGrid.querySelectorAll('.table-item');
    tableItems.forEach(tableItem => {
      const tableId = tableItem.getAttribute('data-table');
      const capacity = tableItem.getAttribute('data-guests');
      const status = tableItem.className.match(/\b(available|reserved|occupied|out-of-service)\b/)?.[1] || 'available';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `table-btn ${status === 'available' ? 'available' : 'unavailable'}`;
      btn.setAttribute('data-table', tableId);
      btn.textContent = `${tableId}\n(${capacity})`;
      btn.style.padding = '10px';
      btn.style.borderRadius = '8px';
      btn.style.border = '2px solid #ccc';
      btn.style.cursor = status === 'available' ? 'pointer' : 'not-allowed';
      btn.disabled = status !== 'available';

      if (status === 'available') {
        btn.style.backgroundColor = '#90EE90';
        btn.style.borderColor = '#006400';
      } else {
        btn.style.backgroundColor = '#ccc';
        btn.style.borderColor = '#999';
      }

      tablesContainer.appendChild(btn);
    });
  }

  saveTableSelection() {
    if (!this.selectedTable) {
      alert('Por favor selecciona una mesa');
      return;
    }

    const reservationItem = document.querySelector(
      `.reservation-item[data-guest-name="${this.editingReservation.guestName}"]`
    );

    if (reservationItem) {
      const tableSpan = reservationItem.querySelector('.reservation-table');
      if (tableSpan) {
        tableSpan.textContent = this.selectedTable;
      }

      // Update table in FLOOR section
      this.updateFloorWithReservation(
        this.editingReservation.guestName,
        this.selectedTable,
        this.editingReservation.guests
      );
    }

    this.closeTableSelectionModal();
    alert(`Mesa ${this.selectedTable} asignada a ${this.editingReservation.guestName}`);
  }

  updateFloorWithReservation(guestName, tableId, guestCount) {
    const tableItem = document.querySelector(`[data-table="${tableId}"]`);
    if (tableItem) {
      // Mark table as occupied
      tableItem.className = 'table-item occupied';
      tableItem.setAttribute('data-guest', guestName);
      tableItem.querySelector('.table-circle').textContent = tableId;
    }
  }

  showTableDetailPanel(tableId, guestName) {
    // Guest data map
    const guestData = {
      'Sarah Chen': { phone: '+1 (415) 555-0123', email: 'sarah.chen@email.com', time: '20:00', guests: 4 },
      'Julianne Moore': { phone: '+1 (415) 555-0124', email: 'julianne.moore@email.com', time: '18:30', guests: 4 },
      'Elena Ferrante': { phone: '+1 (415) 555-0125', email: 'elena.ferrante@email.com', time: '19:00', guests: 6 },
      'Ren Tanaka': { phone: '+1 (415) 555-0126', email: 'ren.tanaka@email.com', time: '19:30', guests: 3 },
      'Marcus Aurelius': { phone: '+1 (415) 555-0127', email: 'marcus.aurelius@email.com', time: '18:45', guests: 2 },
      'Adaeze Okafor': { phone: '+1 (415) 555-0128', email: 'adaeze.okafor@email.com', time: '19:15', guests: 2 }
    };

    const data = guestData[guestName] || { phone: 'N/A', email: 'N/A', time: 'N/A', guests: 0 };

    // Update panel with data
    document.getElementById('detail-table-id').textContent = tableId;
    document.getElementById('detail-status').textContent = 'Occupied';
    document.getElementById('detail-guest').textContent = guestName;
    document.getElementById('detail-time').textContent = data.time;
    document.getElementById('detail-guests').textContent = data.guests + ' Guests';

    // Show panel using active class
    const panel = document.getElementById('table-detail-panel');
    if (panel) {
      panel.classList.add('active');
    }
  }

  closeTableDetailPanel() {
    const panel = document.getElementById('table-detail-panel');
    if (panel) {
      panel.classList.remove('active');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ZionFlow();
  });
} else {
  new ZionFlow();
}
