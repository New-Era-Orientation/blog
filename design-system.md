# NEO Design System

## Color Palette
- Primary: cyan-500 (#06b6d4) - Dùng cho hover states và highlights
- Dark Mode Background: slate-800 (#1e293b)
- Light Mode Background: slate-100 (#f1f5f9)
- Text Colors:
  - Primary: slate-800 (#1e293b)
  - Secondary: slate-600 (#475569)
  - Muted: slate-400 (#94a3b8)
- Borders:
  - Light: slate-200 (#e2e8f0)
  - Dark: slate-700 (#334155)

## Typography
- Headings:
  ```css
  .heading {
    font-weight: 600; /* semibold */
    color: #1e293b; /* slate-800 */
  }
  
  .dark .heading {
    color: #e2e8f0; /* slate-200 */
  }
  ```
- Body Text:
  ```css
  body {
    color: #475569; /* slate-600 */
  }
  
  .dark body {
    color: #94a3b8; /* slate-400 */
  }
  ```

## Layout System
1. Container:
   ```css
   .container {
     width: 100%;
     margin-left: auto;
     margin-right: auto;
     padding: 0 1rem; /* px-4 */
   }
   
   /* sm: 640px */
   @media (min-width: 640px) {
     .container { padding: 0 1.5rem; } /* px-6 */
   }
   
   /* lg: 1024px */
   @media (min-width: 1024px) {
     .container { padding: 0 2rem; } /* px-8 */
   }
   ```

2. Grid System:
   - Mobile: 2 columns
   - Tablet (sm): 3 columns
   - Desktop (lg): 4 columns
   ```css
   .grid {
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 1rem; /* gap-4 */
   }
   
   @media (min-width: 640px) {
     .grid {
       grid-template-columns: repeat(3, 1fr);
     }
   }
   
   @media (min-width: 1024px) {
     .grid {
       grid-template-columns: repeat(4, 1fr);
     }
   }
   ```

## Components

### Header
```html
<!-- 
Header với navigation responsive và dark mode support
- Light bg: white
- Dark bg: slate-800
- Shadow: shadow-sm
- Height: h-16
-->
<header class="bg-white dark:bg-slate-800 shadow-sm">
  <div class="container">
    <nav class="h-16 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-xl font-bold text-cyan-600">
        New Era Orientation
      </div>

      <!-- Navigation -->
      <div class="hidden md:flex space-x-8">
        <a href="/tin-hoc-10" class="text-slate-600 hover:text-cyan-500 transition-colors">Tin học 10</a>
        <a href="/tin-hoc-11" class="text-slate-600 hover:text-cyan-500 transition-colors">Tin học 11</a>
        <a href="/tin-hoc-12" class="text-slate-600 hover:text-cyan-500 transition-colors">Tin học 12</a>
        <a href="/huong-dan" class="text-slate-600 hover:text-cyan-500 transition-colors">Hướng dẫn</a>
      </div>

      <!-- Dark Mode Toggle -->
      <button class="p-2 text-slate-600 hover:text-cyan-500 transition-colors">
        🌓
      </button>
    </nav>
  </div>
</header>
```

### Footer
Structure:
1. Categories Section (Grid)
2. Social Links (Flex with wrap)
3. Copyright & Links (Flex col on mobile, row on sm)

```html
<!-- 
Footer with three main sections
- Top: Categories grid
- Middle: Social links with flex-wrap
- Bottom: Copyright and links
-->
<footer class="bg-slate-100 dark:bg-slate-800">
  <div class="container py-8">
    <!-- Categories Section -->
    <div>
      <h4 class="font-semibold text-slate-800 dark:text-slate-200">Chuyên mục</h4>
      <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        <a href="/tin-hoc-10" class="hover:text-cyan-500 transition-colors">Tin học 10</a>
        <a href="/tin-hoc-11" class="hover:text-cyan-500 transition-colors">Tin học 11</a>
        <a href="/tin-hoc-12" class="hover:text-cyan-500 transition-colors">Tin học 12</a>
        <a href="/thuat-toan-va-ctdl" class="hover:text-cyan-500 transition-colors">Thuật toán & CTDL</a>
        <a href="/tin-hoc-van-phong" class="hover:text-cyan-500 transition-colors">Tin học VP</a>
        <a href="/de-thi-dap-an" class="hover:text-cyan-500 transition-colors">Đề thi & Đáp án</a>
        <a href="/huong-dan" class="hover:text-cyan-500 transition-colors">Hướng dẫn</a>
      </div>
    </div>

    <!-- Social Links Section -->
    <div class="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
      <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-4">Kết nối với chúng tôi</h4>
      <div class="flex flex-wrap gap-4">
        <a href="https://www.facebook.com/profile.php?id=61581439181186" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-cyan-500 transition-colors">
          <span>Facebook Fanpage</span>
        </a>
        <a href="https://www.facebook.com/groups/637693609151863" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-cyan-500 transition-colors">
          <span>Facebook Group</span>
        </a>
        <a href="https://discord.gg/dJbbjbHDpp" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-cyan-500 transition-colors">
          <span>Discord</span>
        </a>
        <a href="https://zalo.me/g/amgakz845" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-cyan-500 transition-colors">
          <span>Zalo Group</span>
        </a>
        <a href="mailto:neo.tinhocthptqg@gmail.com" class="text-slate-600 hover:text-cyan-500 transition-colors">
          <span>Email</span>
        </a>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
      <p class="order-2 sm:order-1 mt-4 sm:mt-0">
        &copy; 2025 New Era Orientation. All rights reserved.
      </p>
      <div class="order-1 sm:order-2 flex space-x-6">
        <a href="/about" class="hover:text-cyan-500 transition-colors">Giới thiệu</a>
        <a href="/terms" class="hover:text-cyan-500 transition-colors">Điều khoản</a>
      </div>
    </div>
  </div>
</footer>
```

## Interactive Elements

### Links and Buttons
```css
/* Common hover effect */
.hover-effect {
  transition: color 200ms;
}

.hover-effect:hover {
  color: #06b6d4; /* cyan-500 */
}
```

### Section Dividers
```css
/* Common border style for section separation */
.section-divider {
  border-top: 1px solid #e2e8f0; /* slate-200 */
  margin-top: 2rem;
  padding-top: 2rem;
}

.dark .section-divider {
  border-color: #334155; /* slate-700 */
}
```

## Spacing System
- Default gap: 1rem (gap-4)
- Section spacing: 2rem (mt-8)
- Container padding: 
  - Base: 1rem (px-4)
  - sm: 1.5rem (px-6)
  - lg: 2rem (px-8)

## Dark Mode Implementation
```javascript
// Toggle function
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// Initial setup
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

## Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## Best Practices
1. Always use container for consistent spacing
2. Implement dark mode classes for all color properties
3. Use semantic HTML structure
4. Maintain consistent spacing with utility classes
5. Use relative units (rem) for typography and spacing
6. Include hover states for interactive elements
7. Ensure proper contrast in both light and dark modes

## Accessibility
- Use semantic HTML5 elements
- Include proper ARIA labels where needed
- Ensure sufficient color contrast
- Provide visible focus states
- Support keyboard navigation