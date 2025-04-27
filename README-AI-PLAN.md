# AI Plan Feature

This feature uses OpenAI to suggest intelligent daily plan items based on the user's goals when starting a day.

## Setup

1. Install the OpenAI package:
```bash
npm install openai@^4.32.0
```

2. Add an OpenAI API key to your environment:
   - Create a `.env.local` file in the root of your project
   - Add the following line: `OPENAI_API_KEY="your-actual-api-key"`

## How It Works

1. When a user starts a day with goals, the system:
   - Creates the day entry and user goals in the database
   - Creates an AI plan entry associated with the day
   - Calls OpenAI to generate specific plan items based on the goals
   - Saves the generated plan items in the database

2. The API handles failures gracefully:
   - If OpenAI generation fails, the day still starts successfully
   - Errors are logged but don't prevent day creation

## Implementation Details

The implementation includes:
- OpenAI client in `src/lib/openai/client.ts`
- Plan generation logic in `src/lib/openai/planGenerator.ts`
- Database services for AI plans in `src/lib/supabase/db.ts`
- Integration with the day start API in `src/app/api/day/start/route.ts`

## Data Structure

The AI plan consists of:
- A main `ai_plan` record linked to the day
- Multiple `plan_items` with:
  - Title and description
  - Priority level (low/medium/high)
  - Scheduled start and end times
  - Current status 