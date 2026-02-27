[简体中文](./README.md) | English

<div align="center">
  <h1>Vue3 Admin Scaffold</h1>
  <p>A Vue 3 admin template with Element Plus and Rspack</p>
</div>

## Features

- Based on Vue 3 + Element Plus + Rspack
- Support for multiple themes and layout modes
- Responsive design for PC, tablet, and mobile
- Complete routing and state management
- Mock data support
- Clean code, easy to extend

## Quick Start

### Using CLI Tool

```bash
# Using npm
npm create vue3-admin-scaffold my-project

# Or using npx
npx create-vue3-admin my-project

# Or install globally
npm install -g vue3-admin-scaffold
create-vue3-admin my-project
```

### Manual Installation

```bash
# Clone project
git clone https://github.com/your-org/vue3-admin-scaffold.git my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run serve:rspack

# Build for production
npm run build
```

## Project Structure

```
vue3-admin-scaffold/
├── src/
│   ├── api/              # API interfaces
│   ├── assets/           # Static assets
│   ├── components/       # Common components
│   ├── config/           # Configuration files
│   ├── layouts/          # Layout components
│   ├── plugins/          # Plugins
│   ├── router/           # Router configuration
│   ├── store/            # Vuex state management
│   ├── styles/           # Style files
│   ├── utils/            # Utility functions
│   └── views/            # Page components
├── public/               # Public assets
├── mock/                 # Mock service
├── .env.development      # Development environment config
├── .env.production       # Production environment config
├── rspack.config.js      # Rspack build config
└── package.json          # Project configuration
```

## Configuration

Main configuration files are located in `src/config/`:

- `index.js` - Main configuration entry
- `setting.config.js` - General settings (title, port, router mode, etc.)
- `theme.config.js` - Theme configuration
- `net.config.js` - Network request configuration

## Development Commands

```bash
# Start development server
npm run serve:rspack

# Build for production
npm run build

# Build and create zip
npm run build:zip
```

## Browser Support

Modern browsers and IE 11+

## License

MIT

## Contributing

Issues and Pull Requests are welcome!
