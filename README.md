# Avatar Trivia

Quiz aplikasi bertemakan Avatar: The Last Airbender. Test pengetahuanmu tentang dunia pengendali elemen!

## Prerequisites

- Node.js 18+ 
- npm atau package manager lainnya

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```
NEXT_PUBLIC_AVATAR_TRIVIA_API=https://api.sampleapis.com/avatar/questions
NEXT_PUBLIC_AVATAR_CHARACTERS_API=https://api.sampleapis.com/avatar/characters
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Home page
│   ├── quiz/           # Quiz page
│   └── characters/     # Characters gallery (WIP)
├── components/         # React components
│   ├── TriviaGame.tsx  # Main quiz component
│   ├── Header.tsx      # Header component
│   └── CharacterCard.tsx
├── services/           # API calls
│   └── api.ts
├── types/              # TypeScript types
│   └── index.ts
└── lib/                # Utilities
    └── utils.ts
```

## Build untuk Production

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Avatar Wiki](https://avatar.fandom.com)
