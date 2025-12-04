# 📚 Proyecto Copilot - Blog Educativo sobre Tablas Hash

Un proyecto web interactivo que explora el fascinante mundo de las **tablas hash** (hash tables), una estructura de datos fundamental en la programación moderna.

## 🎯 Objetivo

Este proyecto proporciona:
- **Contenido educativo** en profundidad sobre conceptos y implementación de tablas hash
- **Demostración interactiva** que visualiza cómo funcionan las tablas hash en tiempo real
- **Explicaciones claras** con ejemplos prácticos y diagramas visuales

## 📁 Estructura del Proyecto

```
Proyecto-Copilot/
├── index.html              # Página principal con demo interactiva
├── css/
│   └── styles.css          # Estilos del proyecto (diseño responsivo)
├── js/
│   └── script.js           # Implementación de HashTable + controles
├── posts/
│   ├── post1.html          # 📚 Conceptos Fundamentales
│   ├── post2.html          # 🔗 Manejo de Colisiones
│   └── post3.html          # ⚙️ Implementación Práctica
└── README.md               # Este archivo
```

## 🎨 Características Principales

### 1. **Demo Interactiva** (index.html)
- Selector de estrategia: **Encadenamiento** vs **Direccionamiento Abierto**
- Control del tamaño de la tabla (3-64 elementos)
- Operaciones en tiempo real:
  - ✅ Insertar pares clave-valor
  - 🔍 Buscar valores
  - ❌ Eliminar elementos
  - 🔄 Limpiar tabla
- Visualización en SVG con colores distintivos
- Registro de operaciones con mensajes de éxito/error

### 2. **Artículos Técnicos** (posts/)

**Post 1: Conceptos Fundamentales**
- Qué es una tabla hash y por qué son O(1)
- Función hash, claves, valores e índices
- Visualización conceptual con ejemplos

**Post 2: Manejo de Colisiones**
- Encadenamiento (Chaining) vs Direccionamiento Abierto
- Prueba Lineal y Prueba Cuadrática
- Factor de carga y su importancia
- Comparativa de estrategias

**Post 3: Implementación Práctica**
- Función hash eficiente en JavaScript
- Clase HashTable completa con ejemplos
- Análisis de complejidad temporal
- Rehashing y mejoras avanzadas
- Casos de uso reales

### 3. **Diseño Moderno y Responsivo**
- Color scheme profesional: **Púrpura (#7c3aed)** a **Azul (#3b82f6)**
- Optimizado para móvil, tablet y desktop
- Interfaz intuitiva con emojis educativos
- Accesibilidad mejorada

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Comienza a explorar!

### Opción 2: Con Servidor Local (Recomendado)

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

Luego abre `http://localhost:8000`

## 💡 Conceptos Clave

### ¿Qué es una Tabla Hash?
Una estructura de datos que mapea **claves** a **valores** usando una **función hash** para calcular índices, permitiendo operaciones de búsqueda/inserción en **O(1) promedio**.

```javascript
tabla_hash["nombre"] = "Juan";      // O(1)
valor = tabla_hash["nombre"];        // O(1)
delete tabla_hash["nombre"];         // O(1)
```

### Función Hash
Transforma una clave en un índice de manera:
- ✅ **Determinista**: entrada idéntica → salida idéntica
- ✅ **Rápida**: ejecución O(1)
- ✅ **Uniforme**: distribuye bien los valores en el rango

### Colisiones
Ocurren cuando dos claves diferentes generan el mismo índice. Se resuelven con:
- **Encadenamiento**: Almacena listas en cada posición
- **Direccionamiento Abierto**: Busca otra posición libre en el array

### Factor de Carga
`Load Factor = elementos_almacenados / tamaño_tabla`

- Valor bajo = pocas colisiones, eficiente
- Valor alto = muchas colisiones, rendimiento degradado
- Cuando supera umbral → **Rehashing** (agrandar tabla)

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, variables CSS, gradientes
- **JavaScript (ES6+)**: Implementación completa de HashTable
- **SVG**: Visualizaciones interactivas en tiempo real

**✨ Sin dependencias externas** - Todo funciona en el navegador

## 📊 Tabla de Complejidad

| Operación | Mejor | Promedio | Peor  | Notas |
|-----------|-------|----------|-------|-------|
| Insertar  | O(1)  | O(1)     | O(n)  | Con buen hash, promedio domina |
| Buscar    | O(1)  | O(1)     | O(n)  | Factor de carga crítico |
| Eliminar  | O(1)  | O(1)     | O(n)  | Requiere búsqueda primero |
| Rehashing | O(n)  | O(n)     | O(n)  | Raro, amortizado |

*El peor caso O(n) ocurre cuando hay colisiones completas (muy raro en práctica con buena función hash)*

## 🎓 Público Objetivo

- 👨‍🎓 **Estudiantes** de Ciencias de la Computación
- 💼 **Desarrolladores** preparándose para entrevistas técnicas
- 🔍 **Curiosos** interesados en estructuras de datos
- 📚 **Educadores** buscando recursos interactivos
- 🎮 **Principiantes** en programación avanzada

## 💻 Compatibilidad del Navegador

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Microsoft Edge (v90+)
- ✅ Navegadores móviles modernos (iOS Safari, Chrome móvil)

## 🔮 Funcionalidades Futuras

- [ ] Exportar gráficos de estadísticas
- [ ] Más estrategias de colisión: Double Hashing, Cuckoo Hashing
- [ ] Persistencia en localStorage
- [ ] Generador de funciones hash personalizadas
- [ ] Modo tutorial con pasos guiados
- [ ] Benchmarks de rendimiento interactivos
- [ ] Versión en inglés

## 📝 Notas Técnicas

### Implementación de Encadenamiento
Cada posición del array contiene una lista de pares [clave, valor]. Simple pero requiere memoria extra.

### Implementación de Direccionamiento Abierto
Todos los datos en el array principal. Si hay colisión, se prueba la siguiente posición. Más eficiente en memoria pero más complejo.

### Función Hash Mejorada
Usa **bit shifting** `((hash << 5) - hash)` para mejor distribución de valores, especialmente importante para claves con patrones.

## 📖 Referencias y Recursos

- [Wikipedia - Hash Table](https://es.wikipedia.org/wiki/Tabla_hash)
- [JavaScript Map & Set](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Puedes:
- 🐛 Reportar bugs
- 💡 Sugerir mejoras
- ✨ Agregar nuevas funcionalidades
- 📝 Mejorar la documentación
- 🌍 Traducir a otros idiomas

## 📧 Soporte

Para preguntas, sugerencias o reportar issues, no dudes en abrir una issue en el repositorio.

---

**Creado como herramienta educativa interactiva**

Aprende una de las estructuras de datos más importantes en programación moderna de forma visual y práctica.

**¡Feliz aprendizaje!** 🚀
