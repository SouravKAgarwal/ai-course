import { GoogleGenAI, Type } from '@google/genai';
import type { Course, CourseInput } from '@/types/course-gemini-creation';

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const courseSchema = {
  type: Type.OBJECT,
  properties: {
    courseId: {
      type: Type.STRING,
      description: 'A slug-safe, lowercase, hyphen-separated ID for the course.',
    },
    title: {
      type: Type.STRING,
      description: 'The course title, 12 words or less.',
    },
    subtitle: {
      type: Type.STRING,
      description: 'A short, one-liner subtitle, 20 words or less.',
    },
    category: { type: Type.STRING },
    level: { type: Type.STRING },
    duration_weeks: { type: Type.INTEGER },
    estimated_total_minutes: { type: Type.INTEGER },
    image_required_before_save: {
      type: Type.BOOLEAN,
      description: 'Should always be true.',
    },
    description: {
      type: Type.STRING,
      description: 'The course description.',
    },
    learning_outcomes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    chapters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          index: { type: Type.INTEGER },
          title: { type: Type.STRING },
          summary: {
            type: Type.STRING,
            description: 'A summary of the chapter, 40 words or less.',
          },
          estimated_minutes: { type: Type.INTEGER },
          youtube_url: { type: Type.STRING, nullable: true },
          content_text: {
            type: Type.STRING,
            description: 'The main text content of the chapter.',
          },
          quiz: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    prompt: { type: Type.STRING },
                    type: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correct_answer_index: {
                      type: Type.INTEGER,
                    },
                    explanation: { type: Type.STRING },
                  },
                  required: [
                    'id',
                    'prompt',
                    'type',
                    'options',
                    'correct_answer_index',
                    'explanation',
                  ],
                },
              },
            },
            required: ['questions'],
          },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                title: { type: Type.STRING },
                url: { type: Type.STRING },
              },
              required: ['type', 'title', 'url'],
            },
          },
        },
        required: [
          'index',
          'title',
          'summary',
          'estimated_minutes',
          'youtube_url',
          'content_text',
          'resources',
        ],
      },
    },
    meta: {
      type: Type.OBJECT,
      properties: {
        created_by_model_version: { type: Type.STRING },
        prompt_used: { type: Type.STRING },
        constraints: { type: Type.STRING },
      },
      required: ['created_by_model_version', 'prompt_used', 'constraints'],
    },
  },
  required: [
    'courseId',
    'title',
    'subtitle',
    'category',
    'level',
    'duration_weeks',
    'estimated_total_minutes',
    'image_required_before_save',
    'description',
    'learning_outcomes',
    'chapters',
    'meta',
  ],
};

export async function generateCourseContent(input: CourseInput): Promise<Course> {
  const prompt = `
    Create a complete educational course based on the provided keyword and constraints.
    Adhere strictly to the JSON schema for the output.

    COURSE TOPIC: "${input.keyword}"
    TARGET LEVEL: ${input.level}

    CONSTRAINTS:
    - Generate exactly ${input.chapters_count} chapters.
    - The main course description should not exceed ${input.max_words_description} words.
    - The text content for each chapter ('content_text') must not exceed ${
      input.max_words_chapter_text
    } words.
    - ${
      input.include_quizzes
        ? 'Include a quiz with at least three question in each chapter.'
        : 'Do not include quizzes.'
    }
    - ${
      input.include_youtube
        ? "If a relevant, high-quality educational video exists on YouTube, provide its URL for each chapter. Otherwise, set 'youtube_url' to null."
        : "Set 'youtube_url' to null for all chapters."
    }
    - All URLs must be HTTPS and point to publicly accessible resources.
    - Titles, summaries, and quiz options must be original and avoid copyrighted text.
    - Generate engaging and accurate educational content.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: courseSchema,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const jsonText = response.text ? response.text.trim() : '';
    if (!jsonText) {
      throw new Error('API returned an empty response. The model may have refused to answer.');
    }

    const courseData = JSON.parse(jsonText);
    return courseData as Course;
  } catch (error) {
    console.error('Error generating course content:', error);
    if (error instanceof Error && error.message.includes('JSON')) {
      throw new Error(
        "Failed to generate valid course structure. The model's response was not in the expected format. Please try adjusting your query."
      );
    }
    throw new Error(
      'An unexpected error occurred while generating the course. Please try again later.'
    );
  }
}
