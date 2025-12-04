# Proyecto-Copilot — Blog Técnico: Tablas Hash

## Descripción
Blog estático educativo dedicado a la estructura de datos **Tablas Hash**, con contenido técnico de alta calidad, visualizaciones SVG y una demo interactiva completa.

## Estructura del Proyecto

```
Proyecto-Copilot/
├── index.html              # Página principal + demo interactiva
├── css/
│   └── styles.css          # Estilos profesionales (paleta azul/teal)
├── js/
│   └── script.js           # Implementación HashTable + render
├── posts/
│   ├── post1.html          # Introducción a las Tablas Hash
│   ├── post2.html          # Manejo de Colisiones (chaining vs open addressing)
│   └── post3.html          # Implementación y Operaciones (put/get/delete)
└── README.md               # Este archivo
```

## Contenido del Blog

### Post 1: Introducción a las Tablas Hash
- ¿Qué es una tabla hash?
- Conceptos clave: clave, valor, función hash, índice, colisiones
- ¿Por qué O(1)?
- Diagrama visual de mapeo: hash → índice → array

### Post 2: Manejo de Colisiones
- **Encadenamiento (Chaining)**: listas en cada cubeta
- **Direccionamiento Abierto (Open Addressing)**: linear probing, quadratic probing, double hashing
- Comparación ventajas/desventajas
- Diagramas visuales SVG

### Post 3: Implementación y Operaciones
- Insertar (put): cálculo de hash, almacenamiento
- Buscar (get): localización en ambas estrategias
- Eliminar (delete): remoción en chaining, tombstones en open addressing
- Ejemplos visuales paso a paso

## Demo Interactiva

En `index.html` incluye una demo que permite:

1. **Cambiar modo**: Chaining ↔ Open Addressing (Linear Probing)
2. **Ajustar tamaño**: de 3 a 64 elementos
3. **Operaciones**:
   - Insertar: agregar clave-valor
   - Buscar: localizar un valor por clave
   - Eliminar: remover clave de la tabla
   - Limpiar: reiniciar la tabla
4. **Visualización SVG**: render en tiempo real
5. **Log de operaciones**: historial de las últimas acciones

## Cómo Usar

### Ver en Local

**Opción 1: Con Python (recomendado)**
```bash
cd c:\Users\LENOVO\Desktop\Proyecto-Copilot
python -m http.server 8000
# Luego abre: http://localhost:8000/index.html
```

**Opción 2: Doble clic**
Simplemente abre `index.html` en tu navegador (vista rápida, sin servidor).

**Opción 3: Con Node.js**
```bash
npm install -g http-server
http-server
```

### Publicar en GitHub Pages

1. Sube el repositorio a GitHub (rama `main`)
2. En Settings → Pages, elige:
   - Source: Deploy from a branch
   - Branch: main / root
3. La página estará disponible en: `https://<usuario>.github.io/Proyecto-Copilot/`

## Características Técnicas

- **HTML/CSS/JS**: Sitio estático sin dependencias externas
- **Paleta Profesional**: Gradientes azul/teal, tipografía limpia, sombras suaves
- **Responsive**: Funciona en móvil, tablet y desktop
- **SVG**: Diagramas y visualizaciones vectoriales escalables
- **Accesibilidad**: aria-live para operaciones, navegación semántica
- **Control de Versiones**: Git + GitHub

## Especificaciones Técnicas

### Función Hash
```javascript
function simpleHash(key, size) {
  let sum = 0;
  for(let i = 0; i < key.length; i++) sum += key.charCodeAt(i);
  return Math.abs(sum) % size;
}
```

### Clase HashTable
- **Modos**: `'chaining'` (listas) | `'open'` (linear probing)
- **Métodos**: `put(k, v)`, `get(k)`, `delete(k)`, `clear()`

### Estrategias Soportadas
1. **Chaining**: Cubetas con arrays de pares {k, v}
2. **Open Addressing + Linear Probing**: Sondeo lineal (i+1, i+2, ...) con tombstones para eliminación

## Notas Educativas

- La función hash usada es **simplificada** para fines educativos
- No recomendable para producción (usar librerías criptográficas)
- Ideal para entender conceptos de tablas hash de forma visual e interactiva

## Próximas Mejoras (Opcionales)

- Implementar Quadratic Probing y Double Hashing
- Animaciones paso a paso (visualizar sondeos)
- Persistencia con localStorage
- Estadísticas (factor de carga, colisiones, etc.)
- Tests unitarios

---

**Autor**: Proyecto educativo 2025  
**Licencia**: MIT (puedes usar, modificar y distribuir libremente)
