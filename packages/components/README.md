# @browser-pop/components

Shared UI component library for browser-pop applications built with shadcn/ui and Tailwind CSS.

## Overview

This package contains reusable UI components that can be used across different applications in the browser-pop monorepo. The components are built on top of Radix UI primitives and styled with Tailwind CSS.

## Features

- 🎨 Built with shadcn/ui design system
- 🔧 TypeScript support
- 🎯 Radix UI primitives for accessibility
- 🌙 Dark mode support
- 📦 Tree-shakable exports
- 🎨 Customizable with CSS variables

## Components

### UI Components

- **Button** - Interactive button component with multiple variants
- **Card** - Container component for content organization
- **Checkbox** - Form checkbox input with custom styling
- **DropdownMenu** - Accessible dropdown menu component
- **Input** - Form input component
- **Label** - Form label component
- **Skeleton** - Loading placeholder component
- **Toaster** - Toast notification component

### Utilities

- **cn** - Class name utility function (combines clsx and tailwind-merge)

## Usage

Import components from the package:

```tsx
import { Button, Card, Checkbox } from '@browser-pop/components';

function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
      <Checkbox>Accept terms</Checkbox>
    </Card>
  );
}
```

## Styling

Components use CSS variables for theming that should be defined in your application's global CSS. The components are designed to work with Tailwind CSS and expect the following CSS variables to be defined:

- `--background`
- `--foreground`
- `--primary`
- `--primary-foreground`
- `--secondary`
- `--secondary-foreground`
- `--accent`
- `--accent-foreground`
- `--destructive`
- `--border`
- `--input`
- `--ring`
- And more...

## Development

This package is part of the browser-pop monorepo and should be developed alongside the applications that use it.

### Adding New Components

1. Create the component in `src/ui/`
2. Export it from `index.ts`
3. Add any required dependencies to `package.json`
4. Update this README with the new component

## Dependencies

- React 19+
- Radix UI primitives
- Lucide React (icons)
- class-variance-authority
- clsx
- tailwind-merge
- next-themes (for theme support)
- sonner (for toasts)

## Notes

- Components use relative imports internally to avoid TypeScript path resolution issues
- All components are client-side compatible
- The package exports both individual components and utility functions
