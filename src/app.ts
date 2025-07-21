// Define types for better code organization
type SearchHandler = (searchTerm: string) => void;

class SearchBar {
  private form: HTMLFormElement | null;
  private input: HTMLInputElement | null;
  private icon: HTMLElement | null;
  private onSearch: SearchHandler;
  private searchTimeout: number | null = null;

  constructor(
    formId: string,
    inputId: string,
    iconSelector: string,
    searchHandler: SearchHandler
  ) {
    this.form = document.getElementById(formId) as HTMLFormElement;
    this.input = document.getElementById(inputId) as HTMLInputElement;
    this.icon = document.querySelector(iconSelector);
    this.onSearch = searchHandler;

    this.initialize();
  }

  private initialize(): void {
    if (!this.form || !this.input) {
      console.error('Search bar elements not found');
      return;
    }

    // Form submission (Enter key)
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Search icon click
    if (this.icon) {
      this.icon.addEventListener('click', this.handleIconClick.bind(this));
    }

    // Optional real-time search with debounce
    this.input.addEventListener('input', this.handleInput.bind(this));

    // Focus/blur effects
    this.input.addEventListener('focus', () => {
      this.form?.classList.add('focused');
    });
    
    this.input.addEventListener('blur', () => {
      this.form?.classList.remove('focused');
    });
  }

  private handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.performSearch();
  }

  private handleIconClick(event: Event): void {
    event.preventDefault();
    this.performSearch();
  }

  private handleInput(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      const term = this.input?.value.trim();
      if (term && term.length > 2) {
        console.log(`Real-time search for: ${term}`);
        // this.onSearch(term); // Uncomment to enable real-time search
      }
    }, 300);
  }

  private performSearch(): void {
    const term = this.input?.value.trim();
    if (term) {
      this.onSearch(term);
      this.input!.value = ''; // Clear after search
    } else {
      this.input?.focus();
    }
  }
}

// Dark Mode Toggle Class
class DarkModeToggle {
  private toggleButton: HTMLElement | null;

  constructor(buttonSelector: string) {
    this.toggleButton = document.querySelector(buttonSelector);
    this.initialize();
  }

  private initialize(): void {
    if (!this.toggleButton) {
      console.error('Dark mode toggle button not found');
      return;
    }

    this.toggleButton.addEventListener('click', this.toggleMode.bind(this));
    this.checkSavedPreference();
  }

  private toggleMode(): void {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    console.log(`Switched to ${isDarkMode ? 'Dark' : 'Light'} Mode.`);
  }

  private checkSavedPreference(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
}

// Notification Handler
class NotificationHandler {
  private icon: HTMLElement | null;

  constructor(iconSelector: string) {
    this.icon = document.querySelector(iconSelector);
    this.initialize();
  }

  private initialize(): void {
    if (!this.icon) {
      console.error('Notification icon not found');
      return;
    }

    this.icon.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(): void {
    alert('Notifications clicked! A popup or dropdown would appear here.');
    console.log('Notifications icon clicked.');
  }
}

// Account Handler
class AccountHandler {
  private icon: HTMLElement | null;

  constructor(iconSelector: string) {
    this.icon = document.querySelector(iconSelector);
    this.initialize();
  }

  private initialize(): void {
    if (!this.icon) {
      console.error('Account icon not found');
      return;
    }

    this.icon.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(): void {
    alert('Account clicked! A user menu or profile page would appear here.');
    console.log('Account icon clicked.');
  }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Search functionality
  new SearchBar(
    'searchForm',
    'searchInput',
    '.search-icon',
    (term: string) => {
      console.log(`Searching for: ${term}`);
      alert(`Searching for: ${term}`);
    }
  );

  // Dark mode toggle
  new DarkModeToggle('.mode-toggle');

  // Notifications
  new NotificationHandler('.notifications-icon');

  // Account
  new AccountHandler('.account-icon');
});