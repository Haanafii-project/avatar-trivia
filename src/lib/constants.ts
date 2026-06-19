/**
 * Application-wide constants
 * Centralize all magic numbers dan values untuk easier maintenance
 */

// ============================================
// Quiz Configuration
// ============================================
export const QUIZ_CONFIG = {
  // Jumlah soal yang ditampilkan dalam satu sesi quiz
  QUESTIONS_PER_QUIZ: 10,
} as const;

// ============================================
// Scoring & Evaluation Thresholds
// ============================================
export const SCORE_THRESHOLDS = {
  // Percentage minimal untuk mendapat rating "Avatar Sejati"
  EXCELLENT: 90,
  // Percentage minimal untuk mendapat rating "Pengendali Elemen Tangguh"
  GOOD: 60,
  // Below GOOD threshold dianggap perlu belajar lagi
} as const;

// ============================================
// Text Patterns
// ============================================
export const TEXT_PATTERNS = {
  // Regex untuk menghapus quotes di awal dan akhir string
  // Contoh: `"Hello"` menjadi `Hello`
  QUOTE_CLEANUP: /^"|"$/g,
} as const;

// ============================================
// UI Layout Dimensions
// ============================================
export const SPACING = {
  // Spacing untuk gaps antar element
  SMALL: "12px",
  MEDIUM: "20px",
  LARGE: "40px",
} as const;

export const SIZING = {
  // Max width untuk container utama (card quiz, error page, etc)
  CONTAINER_MAX_WIDTH: 800,
  // Max width untuk home page card
  HOME_CARD_MAX_WIDTH: 600,
  
  // Size untuk radio button / checkbox indicator
  RADIO_SIZE: "18px",
  
  // Button height untuk answer button
  BUTTON_HEIGHT: "40px",
  
  // Border radius untuk rounded corners (card, button)
  BORDER_RADIUS_MEDIUM: "8px",
  // Border radius untuk circular shape
  BORDER_RADIUS_CIRCLE: "50%",
} as const;

export const TYPOGRAPHY = {
  // Font size untuk regular text dan answer options
  BASE_FONT_SIZE: "16px",
} as const;

// ============================================
// UI Colors
// ============================================
export const COLORS = {
  // Primary color (Ant Design default blue)
  PRIMARY: "#1677ff",
  // Border color untuk unselected state
  BORDER_DEFAULT: "#d9d9d9",
  // Background color untuk selected answer
  BACKGROUND_SELECTED: "#e6f4ff",
  // Text color untuk disabled/secondary text
  TEXT_SECONDARY: "#8c8c8c",
} as const;

// ============================================
// Transition & Animation
// ============================================
export const TRANSITIONS = {
  // Default transition duration untuk smooth effects
  SMOOTH: "all 0.2s",
} as const;
