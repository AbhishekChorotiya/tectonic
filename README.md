# Tectonic Lookbook

Lookbook, a feature that allows users to preview and interact with different looks (images/videos). The application focuses on creating a seamless user experience similar to Instagram stories, primarily optimized for mobile web, with responsiveness for desktop where time permits.

## Features

### 1. Preview Images and Videos

- The Lookbook displays a series of images and videos.
- Each image is shown with a progress bar, completing in 5 seconds.
- Videos are played until completion, and users can mute or unmute the audio.

### 2. Navigation

- Users can navigate between previews by:
  - **Tapping** left/right on the screen to go to the previous or next preview.
  - **Swiping** up/down to move between different looks.

### 3. Focus on Mobile Web

- The application is designed for mobile web with basic responsiveness for desktop.

## Data Format

The `Slides` constant holds the data for rendering stories in the Lookbook. The format is as follows:

```javascript
export const Slides = [
  {
    id: <number>, // Unique identifier for the slide
    name: "<string>", // Name of the look or slide
    price: <number>, // Price of the product being showcased
    story: [
      {
        id: <number>, // Unique identifier for the media
        type: "<image|video>", // Type of media
        src: "<string>", // URL of the media source
        length: "<string>", // (For videos) duration of the video
      },
      // More media objects...
    ],
  },
  // More slide objects...
];
```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AbhishekChorotiya/tectonic.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- ReactJS
- Tailwind CSS
- Lucide React
- Embla Carusel
