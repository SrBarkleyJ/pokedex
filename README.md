# 📱 Pokédex - React Native

<div align="center">

![Pokédex](./src/assets/images/pokeball.png)

Una aplicación Pokédex moderna y completa construida con React Native y Expo, que ofrece una experiencia fluida tanto en dispositivos móviles como en la web.

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ Espíritu del Proyecto

Este proyecto nace del amor por Pokémon y la pasión por crear aplicaciones móviles modernas y funcionales. La Pokédex no es solo una aplicación de consulta, sino una experiencia interactiva que permite a los entrenadores explorar el vasto mundo Pokémon de manera intuitiva y visualmente atractiva.

### 🎯 Objetivos

- **Experiencia Universal**: Una aplicación que funciona perfectamente en iOS, Android y Web
- **Diseño Responsivo**: Interfaz adaptada tanto para móviles como para tablets y escritorio
- **Información Completa**: Datos detallados de cada Pokémon, incluyendo estadísticas, habilidades y tipos
- **Navegación por Generaciones**: Explora Pokémon organizados por sus generaciones originales
- **Regiones y Medallas**: Descubre las diferentes regiones del mundo Pokémon y sus medallas de gimnasio

---

## 🚀 Características Principales

### 📚 Exploración de Pokémon
- **Navegación por Generaciones**: Filtra Pokémon por generación (I-IX)
- **Vista de Tarjetas Responsiva**: Grid de 4 columnas en escritorio, vista de columna única en móvil
- **Pull to Refresh**: Actualiza la lista de Pokémon con un simple gesto
- **Búsqueda Eficiente**: Encuentra rápidamente cualquier Pokémon

### 🔍 Información Detallada
- **Estadísticas Completas**: HP, Ataque, Defensa, Velocidad y más
- **Habilidades Localizadas**: Nombres de habilidades en español
- **Tipos Pokémon**: Visualización clara de tipos primarios y secundarios
- **Sprites Oficiales**: Imágenes de alta calidad de cada Pokémon

### 🗺️ Regiones del Mundo Pokémon
- **9 Regiones Disponibles**: Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar y Paldea
- **Mapas Regionales**: Visualiza el mapa de cada región
- **Medallas de Gimnasio**: Colección completa de medallas con imágenes oficiales
- **Enlaces a Bulbapedia**: Información adicional sobre cada región

### 🎨 Diseño y UX
- **Interfaz Moderna**: Diseño limpio y atractivo
- **Animaciones Suaves**: Transiciones fluidas entre pantallas
- **Modo Responsivo**: Adaptación automática a diferentes tamaños de pantalla
- **Feedback Háptico**: Retroalimentación táctil en interacciones (dispositivos compatibles)

---

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **[React Native](https://reactnative.dev/)** `0.81.5` - Framework principal para desarrollo móvil multiplataforma
- **[Expo](https://expo.dev/)** `~54.0` - Plataforma para desarrollo y despliegue rápido
- **[TypeScript](https://www.typescriptlang.org/)** `~5.9` - Tipado estático para mayor robustez del código

### Navegación y Routing
- **[Expo Router](https://docs.expo.dev/router/introduction/)** `~6.0` - Sistema de routing basado en archivos
- **[React Navigation](https://reactnavigation.org/)** `^7.1` - Navegación nativa con soporte para:
  - Native Stack Navigator
  - Bottom Tabs
  - Drawer Navigation

### UI y Experiencia de Usuario
- **[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)** - Componente de imagen optimizado
- **[Expo Vector Icons](https://docs.expo.dev/guides/icons/)** - Iconos de Ionicons
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** `~4.1` - Animaciones de alto rendimiento
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** `~2.28` - Gestos nativos

### API y Datos
- **[Axios](https://axios-http.com/)** `^1.13` - Cliente HTTP para consumir la PokeAPI
- **[PokeAPI](https://pokeapi.co/)** - API REST con información completa de Pokémon
- **[WikiDex CDN](https://www.wikidex.net/)** - Imágenes oficiales de medallas de gimnasio

### Desarrollo y Calidad
- **[ESLint](https://eslint.org/)** `^9.25` - Linter para mantener código limpio
- **[Babel React Compiler](https://babeljs.io/)** - Compilación optimizada de React
- **React Compiler Experimental** - Mejoras de rendimiento automáticas

### Despliegue
- **[Vercel](https://vercel.com/)** - Despliegue de la versión web
- **[Next.js](https://nextjs.org/)** `^16.0` - Framework para la versión web

---

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI (opcional, se puede usar npx)

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/pokedex.git
cd pokedex
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia la aplicación**
```bash
npm run dev
# o
npx expo start
```

### Opciones de Ejecución

- **📱 Desarrollo Móvil**: Escanea el código QR con Expo Go (iOS/Android)
- **🌐 Versión Web**: Presiona `w` en la terminal para abrir en el navegador
- **📲 Emulador Android**: Presiona `a` para abrir en Android Studio
- **🍎 Simulador iOS**: Presiona `i` para abrir en el simulador de iOS (solo macOS)

### Build para Producción

**Web**
```bash
npm run build:web
```

---

## 📁 Estructura del Proyecto

```
pokedex/
├── app/                          # Rutas de la aplicación (Expo Router)
│   ├── _layout.tsx              # Layout principal
│   ├── index.tsx                # Pantalla principal (lista de Pokémon)
│   ├── pokemon/
│   │   └── [id].tsx             # Detalle de Pokémon (ruta dinámica)
│   └── regions/
│       ├── index.tsx            # Lista de regiones
│       └── [name].tsx           # Detalle de región (medallas y mapas)
├── src/
│   ├── assets/                  # Recursos estáticos
│   │   └── images/
│   │       ├── badges/          # Medallas de gimnasio locales
│   │       └── maps/            # Mapas de regiones
│   ├── components/              # Componentes reutilizables
│   │   ├── GenerationNavbar.tsx # Navegación por generaciones
│   │   └── PokemonCard.tsx      # Tarjeta de Pokémon
│   ├── data/                    # Datos estáticos y configuraciones
│   ├── theme/                   # Temas y estilos globales
│   └── types/                   # Tipos TypeScript e interfaces
│       ├── api/                 # Tipos de API
│       └── components/          # Tipos de componentes
├── package.json
├── app.json                     # Configuración de Expo
├── tsconfig.json               # Configuración de TypeScript
└── vercel.json                 # Configuración de Vercel
```

---

## 🎮 Características Técnicas Destacadas

### 🔄 Arquitectura Reactiva
- **Estado Local con Hooks**: Uso extensivo de `useState`, `useEffect` y hooks personalizados
- **Optimización de Renders**: React Compiler experimental para mejoras automáticas
- **Gestión de Errores**: Manejo robusto de errores de red y estados de carga

### 📱 Responsividad Avanzada
- **Detección de Tamaño de Pantalla**: `useWindowDimensions` para adaptación dinámica
- **Layouts Condicionales**: Diferentes diseños para móvil (< 768px) y escritorio
- **Grids Adaptativos**: 1 columna en móvil, 4 columnas en escritorio

### 🌐 Integración con APIs
- **PokeAPI**: Consumo eficiente de endpoints REST
- **Caché de Imágenes**: Optimización con Expo Image
- **Localización**: Traducción automática de habilidades al español

### ⚡ Rendimiento
- **Lazy Loading**: Carga progresiva de Pokémon
- **Optimización de Imágenes**: Compresión y caché automático
- **Animaciones Nativas**: 60 FPS con Reanimated

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🙏 Agradecimientos

- **[PokéAPI](https://pokeapi.co/)** - Por proporcionar una API completa y gratuita
- **[WikiDex](https://www.wikidex.net/)** - Por las imágenes oficiales de medallas
- **[The Pokémon Company](https://www.pokemon.com/)** - Por crear este increíble universo
- **Comunidad de Expo y React Native** - Por las herramientas y el soporte

---

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio.

---

<div align="center">

**Hecho con ❤️ para entrenadores Pokémon de todo el mundo**

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub! ⭐

</div>
