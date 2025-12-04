// ============================================================================
// HASH TABLE IMPLEMENTATION - Demo Interactiva Mejorada
// ============================================================================

function hashFunction(key, size) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % size;
}

class HashTable {
  constructor(size = 8, strategy = 'chaining') {
    this.size = Math.max(3, size);
    this.strategy = strategy;
    this.entries = 0;
    this.collisions = 0;
    this.init();
  }

  init() {
    if (this.strategy === 'chaining') {
      this.table = Array.from({ length: this.size }, () => []);
    } else {
      this.table = Array(this.size).fill(null);
    }
    this.entries = 0;
    this.collisions = 0;
  }

  set(key, value) {
    if (!key) return { success: false, message: 'La clave no puede estar vacía' };

    const index = hashFunction(key, this.size);
    const result = { index, success: true };

    if (this.strategy === 'chaining') {
      const bucket = this.table[index];
      const existing = bucket.find(e => e.key === key);

      if (existing) {
        existing.value = value;
        result.message = `Actualizado: ${key} = ${value}`;
      } else {
        if (bucket.length > 0) this.collisions++;
        bucket.push({ key, value });
        this.entries++;
        result.message = `Insertado: ${key} = ${value}`;
      }
    } else {
      // Open addressing with linear probing
      let i = index;
      let startIndex = index;
      let found = false;
      let firstTombstone = -1;

      for (let attempts = 0; attempts < this.size; attempts++) {
        const slot = this.table[i];

        if (slot === null) {
          // Empty slot
          this.table[i] = { key, value };
          this.entries++;
          result.message = `Insertado: ${key} = ${value}`;
          found = true;
          break;
        } else if (slot.tombstone) {
          // Deleted slot
          if (firstTombstone === -1) firstTombstone = i;
        } else if (slot.key === key) {
          // Update existing
          slot.value = value;
          result.message = `Actualizado: ${key} = ${value}`;
          found = true;
          break;
        }

        // Linear probing: next slot
        i = (i + 1) % this.size;
        if (i !== startIndex && this.table[i] !== null) {
          this.collisions++;
        }
      }

      if (!found && firstTombstone !== -1) {
        this.table[firstTombstone] = { key, value };
        result.message = `Insertado en tombstone: ${key} = ${value}`;
      } else if (!found) {
        result.success = false;
        result.message = 'Tabla llena';
      }
    }

    return result;
  }

  get(key) {
    if (!key) return { found: false, message: 'La clave no puede estar vacía' };

    const index = hashFunction(key, this.size);

    if (this.strategy === 'chaining') {
      const bucket = this.table[index];
      const entry = bucket.find(e => e.key === key);

      if (entry) {
        return { found: true, value: entry.value, index, message: `Encontrado: ${key} = ${entry.value}` };
      }
    } else {
      let i = index;
      for (let attempts = 0; attempts < this.size; attempts++) {
        const slot = this.table[i];

        if (slot === null) break;
        if (!slot.tombstone && slot.key === key) {
          return { found: true, value: slot.value, index: i, message: `Encontrado: ${key} = ${slot.value}` };
        }

        i = (i + 1) % this.size;
      }
    }

    return { found: false, message: `No encontrado: ${key}` };
  }

  remove(key) {
    if (!key) return { success: false, message: 'La clave no puede estar vacía' };

    const index = hashFunction(key, this.size);

    if (this.strategy === 'chaining') {
      const bucket = this.table[index];
      const idx = bucket.findIndex(e => e.key === key);

      if (idx !== -1) {
        bucket.splice(idx, 1);
        this.entries--;
        return { success: true, message: `Eliminado: ${key}` };
      }
    } else {
      let i = index;
      for (let attempts = 0; attempts < this.size; attempts++) {
        const slot = this.table[i];

        if (slot === null) break;
        if (!slot.tombstone && slot.key === key) {
          this.table[i] = { tombstone: true };
          this.entries--;
          return { success: true, message: `Eliminado: ${key} (marcado como deleted)` };
        }

        i = (i + 1) % this.size;
      }
    }

    return { success: false, message: `No encontrado para eliminar: ${key}` };
  }

  getStats() {
    return {
      size: this.size,
      entries: this.entries,
      loadFactor: (this.entries / this.size).toFixed(2),
      collisions: this.collisions
    };
  }
}

// ============================================================================
// VISUALIZATION
// ============================================================================

function renderTable(hashTable, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', '100%');

  const cellWidth = 120;
  const cellHeight = 50;
  const cols = Math.min(4, hashTable.size);
  const rows = Math.ceil(hashTable.size / cols);
  svg.setAttribute('height', rows * (cellHeight + 20) + 40);

  for (let i = 0; i < hashTable.size; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * (cellWidth + 15) + 10;
    const y = row * (cellHeight + 20) + 10;

    // Determine cell content and styling
    let content = '';
    let fill = '#ffffff';
    let stroke = '#e5e7eb';
    let textColor = '#1f2937';

    if (hashTable.strategy === 'chaining') {
      const bucket = hashTable.table[i];
      if (bucket.length > 0) {
        fill = '#f3f4f6';
        content = bucket.map(e => `${e.key}:${e.value}`).join('\n');
      }
    } else {
      const slot = hashTable.table[i];
      if (slot && slot.tombstone) {
        fill = '#fef3c7';
        content = '[deleted]';
      } else if (slot && !slot.tombstone) {
        fill = '#e0e7ff';
        content = `${slot.key}:${slot.value}`;
      }
    }

    // Draw cell background
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', cellWidth);
    rect.setAttribute('height', cellHeight);
    rect.setAttribute('fill', fill);
    rect.setAttribute('stroke', stroke);
    rect.setAttribute('stroke-width', '1.5');
    rect.setAttribute('rx', '6');
    svg.appendChild(rect);

    // Draw index number
    const indexText = document.createElementNS(SVG_NS, 'text');
    indexText.setAttribute('x', x + 8);
    indexText.setAttribute('y', y + 16);
    indexText.setAttribute('font-size', '12');
    indexText.setAttribute('font-weight', 'bold');
    indexText.setAttribute('fill', '#7c3aed');
    indexText.textContent = `[${i}]`;
    svg.appendChild(indexText);

    // Draw content
    const lines = content.split('\n');
    lines.forEach((line, lineIdx) => {
      const contentText = document.createElementNS(SVG_NS, 'text');
      contentText.setAttribute('x', x + cellWidth / 2);
      contentText.setAttribute('y', y + 30 + lineIdx * 12);
      contentText.setAttribute('text-anchor', 'middle');
      contentText.setAttribute('font-size', '11');
      contentText.setAttribute('fill', textColor);
      contentText.textContent = line.substring(0, 12);
      svg.appendChild(contentText);
    });
  }

  container.appendChild(svg);
}

// ============================================================================
// INITIALIZATION & EVENT LISTENERS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const strategySelect = document.getElementById('strategySelect');
  const tableSizeInput = document.getElementById('tableSizeInput');
  const keyInput = document.getElementById('keyInput');
  const valueInput = document.getElementById('valueInput');
  const insertBtn = document.getElementById('insertBtn');
  const searchBtn = document.getElementById('searchBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const clearBtn = document.getElementById('clearBtn');
  const demoVisual = document.getElementById('demoVisual');
  const operationLog = document.getElementById('operationLog');

  let hashTable = new HashTable(parseInt(tableSizeInput.value), strategySelect.value);

  function log(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `→ ${message}`;
    operationLog.prepend(entry);

    // Keep only last 10 entries
    while (operationLog.children.length > 10) {
      operationLog.removeChild(operationLog.lastChild);
    }
  }

  function render() {
    renderTable(hashTable, 'demoVisual');
    const stats = hashTable.getStats();
    log(`[Tabla: ${stats.entries}/${stats.size} elementos, Load Factor: ${stats.loadFactor}]`, 'info');
  }

  function reinitialize() {
    const size = Math.max(3, Math.min(64, parseInt(tableSizeInput.value || 8)));
    tableSizeInput.value = size;
    hashTable = new HashTable(size, strategySelect.value);
    log(`Tabla reiniciada: ${strategySelect.value}, tamaño=${size}`, 'info');
    render();
  }

  // Event listeners
  strategySelect.addEventListener('change', reinitialize);
  tableSizeInput.addEventListener('change', reinitialize);

  insertBtn.addEventListener('click', () => {
    const key = (keyInput.value || '').trim();
    const value = (valueInput.value || '').trim();
    if (!key) {
      log('Clave vacía', 'error');
      return;
    }
    const result = hashTable.set(key, value);
    log(result.message, result.success ? 'success' : 'error');
    render();
    keyInput.value = '';
    valueInput.value = '';
  });

  searchBtn.addEventListener('click', () => {
    const key = (keyInput.value || '').trim();
    if (!key) {
      log('Clave vacía', 'error');
      return;
    }
    const result = hashTable.get(key);
    log(result.message, result.found ? 'success' : 'error');
  });

  deleteBtn.addEventListener('click', () => {
    const key = (keyInput.value || '').trim();
    if (!key) {
      log('Clave vacía', 'error');
      return;
    }
    const result = hashTable.remove(key);
    log(result.message, result.success ? 'success' : 'error');
    render();
    keyInput.value = '';
  });

  clearBtn.addEventListener('click', () => {
    reinitialize();
    keyInput.value = '';
    valueInput.value = '';
  });

  // Initial render
  render();
});

